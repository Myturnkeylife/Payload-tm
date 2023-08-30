import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './utilities/Auth/index.js';
import { useConfig } from './utilities/Config/index.js';
import List from './views/collections/List/index.js';
import DefaultTemplate from './templates/Default/index.js';
import { requests } from '../api.js';
import StayLoggedIn from './modals/StayLoggedIn/index.js';
import Versions from './views/Versions/index.js';
import Version from './views/Version/index.js';
import { DocumentInfoProvider } from './utilities/DocumentInfo/index.js';
import { useLocale } from './utilities/Locale/index.js';
import { LoadingOverlayToggle } from './elements/Loading/index.js';

const Dashboard = lazy(() => import('./views/Dashboard/index.js'));
const ForgotPassword = lazy(() => import('./views/ForgotPassword/index.js'));
const Login = lazy(() => import('./views/Login/index.js'));
const Logout = lazy(() => import('./views/Logout/index.js'));
const NotFound = lazy(() => import('./views/NotFound/index.js'));
const Verify = lazy(() => import('./views/Verify/index.js'));
const CreateFirstUser = lazy(() => import('./views/CreateFirstUser/index.js'));
const Edit = lazy(() => import('./views/collections/Edit/index.js'));
const EditGlobal = lazy(() => import('./views/Global/index.js'));
const ResetPassword = lazy(() => import('./views/ResetPassword/index.js'));
const Unauthorized = lazy(() => import('./views/Unauthorized/index.js'));
const Account = lazy(() => import('./views/Account/index.js'));

const Routes: React.FC = () => {
  const [initialized, setInitialized] = useState(null);
  const { user, permissions, refreshCookie } = useAuth();
  const { i18n } = useTranslation();
  const { code: locale } = useLocale();

  const canAccessAdmin = permissions?.canAccessAdmin;

  const config = useConfig();

  const {
    admin: {
      user: userSlug,
      logoutRoute,
      inactivityRoute: logoutInactivityRoute,
      components: {
        routes: customRoutes,
      } = {},
    },
    routes,
    collections,
    globals,
  } = config;

  const isLoadingUser = Boolean(typeof user === 'undefined' || (user && typeof canAccessAdmin === 'undefined'));
  const userCollection = collections.find(({ slug }) => slug === userSlug);

  useEffect(() => {
    const { slug } = userCollection;

    if (!userCollection.auth.disableLocalStrategy) {
      requests.get(`${routes.api}/${slug}/init`, {
        headers: {
          'Accept-Language': i18n.language,
        },
      }).then((res) => res.json().then((data) => {
        if (data && 'initialized' in data) {
          setInitialized(data.initialized);
        }
      }));
    } else {
      setInitialized(true);
    }
  }, [i18n.language, routes, userCollection]);

  return (
    <Suspense fallback={(
      <LoadingOverlayToggle
        show
        name="route-suspense"
      />
    )}
    >
      <LoadingOverlayToggle
        name="route-loader"
        show={isLoadingUser}
      />
      <Route
        path={routes.admin}
        render={({ match }) => {
          if (initialized === false) {
            return (
              <Switch>
                <Route path={`${match.url}/create-first-user`}>
                  <CreateFirstUser setInitialized={setInitialized} />
                </Route>
                <Route>
                  <Redirect to={`${match.url}/create-first-user`} />
                </Route>
              </Switch>
            );
          }

          if (initialized === true && !isLoadingUser) {
            return (
              <Switch>
                {Array.isArray(customRoutes) && customRoutes.map(({ path, Component, strict, exact, sensitive }) => (
                  <Route
                    key={`${match.url}${path}`}
                    path={`${match.url}${path}`}
                    strict={strict}
                    exact={exact}
                    sensitive={sensitive}
                  >
                    <Component
                      user={user}
                      canAccessAdmin={canAccessAdmin}
                    />
                  </Route>
                ))}
                <Route path={`${match.url}/login`}>
                  <Login />
                </Route>
                <Route path={`${match.url}${logoutRoute}`}>
                  <Logout />
                </Route>
                <Route path={`${match.url}${logoutInactivityRoute}`}>
                  <Logout inactivity />
                </Route>
                {!userCollection.auth.disableLocalStrategy && (
                  <Route path={`${match.url}/forgot`}>
                    <ForgotPassword />
                  </Route>
                )}

                {!userCollection.auth.disableLocalStrategy && (
                  <Route path={`${match.url}/reset/:token`}>
                    <ResetPassword />
                  </Route>
                )}

                {collections.map((collection) => {
                  if (collection?.auth?.verify && !collection.auth.disableLocalStrategy) {
                    return (
                      <Route
                        key={`${collection.slug}-verify`}
                        path={`${match.url}/${collection.slug}/verify/:token`}
                        exact
                      >
                        <Verify collection={collection} />
                      </Route>
                    );
                  }
                  return null;
                })}

                <Route>
                  {user ? (
                    <Fragment>
                      {canAccessAdmin && (
                        <DefaultTemplate>
                          <Switch>
                            <Route
                              path={`${match.url}/`}
                              exact
                            >
                              <Dashboard />
                            </Route>
                            <Route path={`${match.url}/account`}>
                              <DocumentInfoProvider
                                collection={collections.find(({ slug }) => slug === userSlug)}
                                id={user.id}
                              >
                                <Account />
                              </DocumentInfoProvider>
                            </Route>
                            {collections
                              .filter(({ admin: { hidden } }) => !(typeof hidden === 'function' ? hidden({ user }) : hidden))
                              .reduce((collectionRoutes, collection) => {
                                const routesToReturn = [
                                  ...collectionRoutes,
                                  <Route
                                    key={`${collection.slug}-list`}
                                    path={`${match.url}/collections/${collection.slug}`}
                                    exact
                                  >
                                    {permissions?.collections?.[collection.slug]?.read?.permission
                                      ? <List collection={collection} />
                                      : <Unauthorized />}
                                  </Route>,
                                  <Route
                                    key={`${collection.slug}-create`}
                                    path={`${match.url}/collections/${collection.slug}/create`}
                                    exact
                                  >
                                    {permissions?.collections?.[collection.slug]?.create?.permission ? (
                                      <DocumentInfoProvider
                                        collection={collection}
                                        idFromParams
                                      >
                                        <Edit collection={collection} />
                                      </DocumentInfoProvider>
                                    ) : (
                                      <Unauthorized />
                                    )}
                                  </Route>,
                                  <Route
                                    key={`${collection.slug}-edit`}
                                    path={`${match.url}/collections/${collection.slug}/:id`}
                                    exact
                                  >
                                    {permissions?.collections?.[collection.slug]?.read?.permission ? (
                                      <DocumentInfoProvider
                                        collection={collection}
                                        idFromParams
                                      >
                                        <Edit
                                          isEditing
                                          collection={collection}
                                        />
                                      </DocumentInfoProvider>
                                    ) : <Unauthorized />}
                                  </Route>,
                                ];

                                if (collection.versions) {
                                  routesToReturn.push(
                                    <Route
                                      key={`${collection.slug}-versions`}
                                      path={`${match.url}/collections/${collection.slug}/:id/versions`}
                                      exact
                                    >
                                      {permissions?.collections?.[collection.slug]?.readVersions?.permission ? (
                                        <Versions collection={collection} />
                                      ) : <Unauthorized />}
                                    </Route>,
                                  );

                                  routesToReturn.push(
                                    <Route
                                      key={`${collection.slug}-view-version`}
                                      path={`${match.url}/collections/${collection.slug}/:id/versions/:versionID`}
                                      exact
                                    >
                                      {permissions?.collections?.[collection.slug]?.readVersions?.permission ? (
                                        <DocumentInfoProvider
                                          collection={collection}
                                          idFromParams
                                        >
                                          <Version collection={collection} />
                                        </DocumentInfoProvider>
                                      ) : <Unauthorized />}
                                    </Route>,
                                  );
                                }

                                return routesToReturn;
                              }, [])}
                            {globals && globals
                              .filter(({ admin: { hidden } }) => !(typeof hidden === 'function' ? hidden({ user }) : hidden))
                              .reduce((globalRoutes, global) => {
                                const routesToReturn = [
                                  ...globalRoutes,
                                  <Route
                                    key={global.slug}
                                    path={`${match.url}/globals/${global.slug}`}
                                    exact
                                  >
                                    {permissions?.globals?.[global.slug]?.read?.permission ? (
                                      <DocumentInfoProvider
                                        global={global}
                                        key={`${global.slug}-${locale}`}
                                        idFromParams
                                      >
                                        <EditGlobal global={global} />
                                      </DocumentInfoProvider>
                                    ) : <Unauthorized />}
                                  </Route>,
                                ];

                                if (global.versions) {
                                  routesToReturn.push(
                                    <Route
                                      key={`${global.slug}-versions`}
                                      path={`${match.url}/globals/${global.slug}/versions`}
                                      exact
                                    >
                                      {permissions?.globals?.[global.slug]?.readVersions?.permission
                                        ? <Versions global={global} />
                                        : <Unauthorized />}
                                    </Route>,
                                  );

                                  routesToReturn.push(
                                    <Route
                                      key={`${global.slug}-view-version`}
                                      path={`${match.url}/globals/${global.slug}/versions/:versionID`}
                                      exact
                                    >
                                      {permissions?.globals?.[global.slug]?.readVersions?.permission ? (
                                        <Version global={global} />
                                      ) : <Unauthorized />}
                                    </Route>,
                                  );
                                }

                                return routesToReturn;
                              }, [])}

                            <Route path={`${match.url}*`}>
                              <NotFound />
                            </Route>
                          </Switch>
                        </DefaultTemplate>
                      )}
                      {canAccessAdmin === false && (
                        <Unauthorized />
                      )}
                    </Fragment>
                  ) : <Redirect to={`${match.url}/login${window.location.pathname.startsWith(routes.admin) ? `?redirect=${encodeURIComponent(window.location.pathname.replace(routes.admin, ''))}` : ''}`} />}
                </Route>
                <Route path={`${match.url}*`}>
                  <NotFound />
                </Route>
              </Switch>
            );
          }

          return null;
        }}
      />
      <StayLoggedIn refreshCookie={refreshCookie} />
    </Suspense>
  );
};

export default Routes;
