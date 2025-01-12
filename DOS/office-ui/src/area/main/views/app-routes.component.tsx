import React, { useEffect } from 'react';
// import { History } from 'history';
import { Switch, Route, Redirect, /*useRouteMatch*/ } from 'react-router-dom';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { NotFound } from './not-found.component';
// import { Unauthorized } from './unauthorized.component';
// import { TabPanelMenu } from './home-screen.component';
import { CatalogsContainer } from 'src/area/catalogs/views/catalogs.container';
import { LoginFormContainer } from 'src/area/auth/views/login-form.container';
import { UsersTableContainer } from 'src/area/users/views/users-table.container';

// import { PERMISSIONS } from 'src/shared/constants/permissions.contants';

type Props = {
  // history: History,
  // checkAuthAction: Function,
  // isLoggedIn: boolean,
  // checked: boolean,
  // isAllowed: Function,
};

type CustomRoute = {
  props: {
    path: Array<string> | string,
    exact?: boolean,
  },
  component: JSX.Element | null,
  app?: string,
};

const routes: Array<CustomRoute> = [
  {
    props: {
      path: ['/', ],
      exact: true,
    },
    component: <LoginFormContainer />,
  },
  {
    props: {
      path: ['/users', '/users/:category'],
      exact: true,
    },
    component: <UsersTableContainer />,
  },
  {
    props: {
      path: ['/catalogs'],
      exact: true,
    },
    component: <CatalogsContainer />,
  },
  {
    props: {
      path: ['/processes/list', '/processes/:id/edit'],
      exact: true,
    },
    component: <NotFound />,
  },
  {
    props: {
      path: "/sign-in",
      exact: true,
    },
    component: <Redirect to='/menu' />,
  },
  {
    props: {
      path: "*",
      exact: true,
    },
    component: <NotFound />,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      top: 156,
      position: 'relative',
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
  }),
);

export const AppRoutes = (props: Props) => {
  const classes = useStyles();
  useEffect(() => {
    // props.checkAuthAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const { isAllowed } = props;
  /*
  const match: any | null = useRouteMatch([
    '/:module/:view(list|create)',
    '/:module/:id/:action(edit|view)',
  ]);
  */
  /*
  const hasAccess = (app: string | undefined) => {
    if (!app) {
      return true;
    }
    if (
      !(match && match.params && (match.params.view || match.params.action))
    ) {
      return isAllowed(app);
    }
    const { action, view } = match.params;
    const type = action || view;
    switch(type) {
      case 'create':
        return isAllowed(app, PERMISSIONS.CREATE);
      case 'list':
      case 'view':
        return isAllowed(app, PERMISSIONS.READ);
      case 'edit':
        return isAllowed(app, PERMISSIONS.UPDATE);
      default:
        return false;
    }
  };
  */
  return (
    <>
    {/* props.checked true && (
      props.isLoggedIn true ? (
      <>
        <Route path="*">
          <LoginFormContainer />
        </Route>
      </>
      ) : ( 
      */}
      <Switch>
        {routes.map((route: CustomRoute, index: number) => {
          return (
            <Route {...route.props} key={`${index}-${route.app}`}>
              {/* hasAccess(route.app) ? route.component : <Unauthorized /> */}
              <div className={classes.content}>
                {route.component}
              </div>
            </Route>
          );
        })}
      </Switch>
    </>
  );
};
