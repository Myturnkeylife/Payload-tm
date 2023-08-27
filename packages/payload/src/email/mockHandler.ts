import nodemailer from 'nodemailer';
import { EmailOptions } from '../config/types.js';
import { MockEmailHandler } from './types.js';

import { defaults as emailDefaults } from './defaults.js';

const mockEmailHandler = async (emailConfig: EmailOptions): Promise<MockEmailHandler> => {
  const testAccount = await nodemailer.createTestAccount();

  const smtpOptions = {
    ...emailConfig,
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    fromName: emailConfig?.fromName || emailDefaults.fromName,
    fromAddress: emailConfig?.fromAddress || emailDefaults.fromAddress,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };

  return {
    account: testAccount,
    transport: nodemailer.createTransport(smtpOptions),
  };
};

export default mockEmailHandler;
