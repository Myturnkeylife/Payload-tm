import jwt from 'jsonwebtoken';
import { Config as GeneratedTypes } from 'payload/generated-types';
import { CookieOptions, Response } from 'express';
import { AuthenticationError, LockedAuth } from '../../errors.js';
import { PayloadRequest } from '../../express/types.js';
import getCookieExpiration from '../../utilities/getCookieExpiration.js';
import isLocked from '../isLocked.js';
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields.js';
import { User } from '../types.js';
import { Collection } from '../../collections/config/types.js';
import { afterRead } from '../../fields/hooks/afterRead.js';
import unlock from './unlock.js';
import { buildAfterOperation } from '../../collections/operations/utils.js';
import { incrementLoginAttempts } from '../strategies/local/incrementLoginAttempts.js';
import { authenticateLocalStrategy } from '../strategies/local/authenticate.js';
import { getFieldsToSign } from './getFieldsToSign.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';

export type Result = {
  user?: User,
  token?: string,
  exp?: number,
}

export type Arguments = {
  collection: Collection,
  data: {
    email: string
    password: string
  }
  req: PayloadRequest
  res?: Response
  depth?: number
  overrideAccess?: boolean
  showHiddenFields?: boolean
}

async function login<TSlug extends keyof GeneratedTypes['collections']>(
  incomingArgs: Arguments,
): Promise<Result & { user: GeneratedTypes['collections'][TSlug] }> {
  let args = incomingArgs;

  // /////////////////////////////////////
  // beforeOperation - Collection
  // /////////////////////////////////////

  await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
    await priorHook;

    args = (await hook({
      args,
      operation: 'login',
      context: args.req.context,
    })) || args;
  }, Promise.resolve());

  const {
    collection: {
      config: collectionConfig,
    },
    data,
    req: {
      payload,
      payload: {
        secret,
        config,
      },
    },
    req,
    depth,
    overrideAccess,
    showHiddenFields,
  } = args;

  try {
    const shouldCommit = await initTransaction(req);

    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////

    await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook) => {
      await priorHook;

      args = (await hook({
        args,
        operation: 'login',
        context: args.req.context,
      })) || args;
    }, Promise.resolve());

    // /////////////////////////////////////
    // Login
    // /////////////////////////////////////

    const { email: unsanitizedEmail, password } = data;

    const email = unsanitizedEmail ? (unsanitizedEmail as string).toLowerCase().trim() : null;

    let user = await payload.db.findOne<any>({
      collection: collectionConfig.slug,
      where: { email: { equals: email.toLowerCase() } },
      req,
    });

    if (!user || (args.collection.config.auth.verify && user._verified === false)) {
      throw new AuthenticationError(req.t);
    }

    if (user && isLocked(user.lockUntil)) {
      throw new LockedAuth(req.t);
    }

    const authResult = await authenticateLocalStrategy({ password, doc: user });

    user = sanitizeInternalFields(user);

    const maxLoginAttemptsEnabled = args.collection.config.auth.maxLoginAttempts > 0;

    if (!authResult) {
      if (maxLoginAttemptsEnabled) {
        await incrementLoginAttempts({
          req,
          payload: req.payload,
          doc: user,
          collection: collectionConfig,
        });
      }

      throw new AuthenticationError(req.t);
    }

    if (maxLoginAttemptsEnabled) {
      await unlock({
        collection: {
          config: collectionConfig,
        },
        req,
        data,
        overrideAccess: true,
      });
    }

    const fieldsToSign = getFieldsToSign({
      collectionConfig,
      user,
      email,

    });

    await collectionConfig.hooks.beforeLogin.reduce(async (priorHook, hook) => {
      await priorHook;

      user = (await hook({
        user,
        req: args.req,
        context: args.req.context,
      })) || user;
    }, Promise.resolve());

    const token = jwt.sign(
      fieldsToSign,
      secret,
      {
        expiresIn: collectionConfig.auth.tokenExpiration,
      },
    );

    if (args.res) {
      const cookieOptions: CookieOptions = {
        path: '/',
        httpOnly: true,
        expires: getCookieExpiration(collectionConfig.auth.tokenExpiration),
        secure: collectionConfig.auth.cookies.secure,
        sameSite: collectionConfig.auth.cookies.sameSite,
        domain: undefined,
      };

      if (collectionConfig.auth.cookies.domain) cookieOptions.domain = collectionConfig.auth.cookies.domain;

      args.res.cookie(`${config.cookiePrefix}-token`, token, cookieOptions);
    }

    req.user = user;

    // /////////////////////////////////////
    // afterLogin - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterLogin.reduce(async (priorHook, hook) => {
      await priorHook;

      user = await hook({
        user,
        req: args.req,
        token,
        context: args.req.context,
      }) || user;
    }, Promise.resolve());

    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////

    user = await afterRead({
      depth,
      doc: user,
      entityConfig: collectionConfig,
      overrideAccess,
      req,
      showHiddenFields,
      context: req.context,
    });

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook;

      user = await hook({
        req,
        doc: user,
        context: req.context,
      }) || user;
    }, Promise.resolve());

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook;

      user = await hook({
        req,
        doc: user,
        context: req.context,
      }) || user;
    }, Promise.resolve());

    let result: Result & { user: GeneratedTypes['collections'][TSlug] } = {
      token,
      user,
      exp: (jwt.decode(token) as jwt.JwtPayload).exp,
    };

    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////

    result = await buildAfterOperation<GeneratedTypes['collections'][TSlug]>({
      operation: 'login',
      args,
      result,
    });

    if (collectionConfig.auth.removeTokenFromResponses) {
      delete result.token;
    }

    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////

    if (shouldCommit) await payload.db.commitTransaction(req.transactionID);

    return result;
  } catch (error: unknown) {
    await killTransaction(req);
    throw error;
  }
}

export default login;
