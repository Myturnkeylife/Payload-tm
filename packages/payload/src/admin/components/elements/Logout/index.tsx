import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config/index.js';
import RenderCustomComponent from '../../utilities/RenderCustomComponent/index.js';
import LogOut from '../../icons/LogOut/index.js';

const baseClass = 'nav';

const DefaultLogout = () => {
  const { t } = useTranslation('authentication');
  const config = useConfig();
  const {
    routes: { admin },
    admin: {
      logoutRoute,
      components: { logout },
    },
  } = config;
  return (
    <Link
      to={`${admin}${logoutRoute}`}
      className={`${baseClass}__log-out`}
      aria-label={t('logOut')}
    >
      <LogOut />
    </Link>
  );
};

const Logout: React.FC = () => {
  const {
    admin: {
      components: {
        logout: { Button: CustomLogout } = {
          Button: undefined,
        },
      } = {},
    } = {},
  } = useConfig();

  return (
    <RenderCustomComponent
      CustomComponent={CustomLogout}
      DefaultComponent={DefaultLogout}
    />
  );
};

export default Logout;
