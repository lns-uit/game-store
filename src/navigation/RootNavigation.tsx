import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation, Redirect } from 'react-router';
import { setTabAction } from '../redux/actions/tabAction';
import BrowseScreen from '../screens/Browse/BrowseScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import AdminScreen from '../screens/Admin/AdminScreen';
import AdminCreateGame from '../screens/AdminCreateGame/AdminCreateGame';
import GameDetail from '../screens/GameDetail/GameDetail';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import User from '../screens/User/User';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import RootErrorMessage from '../constants/ErrorMessage';
import { login } from '../redux/actions/userAction';
import userApi from '../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

import ConsoleGameListScreen from '../screens/Admin/components/AllGame/ConsoleGameListScreen';
import ConsoleUsersListScreen from '../screens/Admin/components/AllUser/ConsoleUsersListScreen';
import DiscountEvent from '../screens/Admin/components/DiscountEvent/DiscountEvent';
import GenresManager from '../screens/Admin/components/GenresManager/GenresManager';
import PrivacyPolicyEditor from '../screens/Admin/components/PrivacyPolicy/PrivacyPolicyEditor';
import StoreRefundPolicyEditor from '../screens/Admin/components/StoreRefundPolicy/StoreRefundPolicyEditor';
import TermOfService from '../screens/Admin/components/TermOfService/TermOfServiceEditor';
import DiscoverCMS from '../screens/Admin/components/DiscoverCMS/DiscoverCMS';
import AllGameVersion from '../screens/Admin/components/GameVersion/AllGameVersion';
import EditProfile from '../screens/EditProfile/EditProfile';
import NotFoundScreen from '../screens/NotFound/NotFoundScreen';
import AdminUpdateGame from '../screens/AdminUpdateGame/AdminUpdateGame';

function RootNavigation() {
  let location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const { idUser } = user || {};
  const dispatch = useDispatch();
  const isLogin = useMemo(() => !!idUser, [idUser]);
  const [isLoading, setIsLoading] = useState(true);

  const loginWithToken = async tokenLogin => {
    if (!tokenLogin) return false;

    const responsive = await userApi.loginToken(tokenLogin);
    const { user, token } = responsive || {};
    if (token) {
      dispatch(login(user));
      localStorage.setItem('accessToken', token);
    }
  };

  const fetchData = useCallback(async () => {
    const tokenLogin = localStorage.getItem('accessToken');
    await loginWithToken(tokenLogin);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    dispatch(setTabAction(location.pathname));
  }, [location]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Switch>
      {isLoading ? (
        <Route path='/' render={() => <SplashScreen />} />
      ) : (
        <>
          {/* user login */}
          <PrivateRoute path='/edit/user/:id'>
            <EditProfile />
          </PrivateRoute>
          <PrivateRoute path='/user/:idUser'>
            <User />
          </PrivateRoute>
          <PrivateRoute path='/admin/create-game'>
            <AdminCreateGame />
          </PrivateRoute>
          <PrivateRoute path='/admin/update-game/:idGame'>
            <AdminUpdateGame />
          </PrivateRoute>

          <PrivateRoute path='/admin/console/game-list'>
            <ConsoleGameListScreen />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/user-list'>
            <ConsoleUsersListScreen />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/discount-list'>
            <DiscountEvent />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/genres-list'>
            <GenresManager />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/privacy-policy-edit'>
            <PrivacyPolicyEditor />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/store-refund-edit'>
            <StoreRefundPolicyEditor />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/term-of-service-edit'>
            <TermOfService />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/discover-cms'>
            <DiscoverCMS />
          </PrivateRoute>
          <PrivateRoute path='/admin/console/history/:idGame'>
            <AllGameVersion />
          </PrivateRoute>

          {/* Auth*/}
          <Route
            path='/sign-in'
            render={() => (isLogin ? <Redirect to='/' /> : <SignIn />)}
          />
          <Route
            path='/sign-up'
            render={() => (isLogin ? <Redirect to='/' /> : <SignUp />)}
          />

          {/* everyone */}
          <Route path='/game/:idGame' component={GameDetail} />
          <Route path='/browse' component={BrowseScreen} />
          <Route exact path='/' component={DiscoverScreen} />
          <Route path='*' component={NotFoundScreen} />

          {/* move to not found page */}
          {/* <Redirect from='*' to='/404' /> */}
        </>
      )}
    </Switch>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state: RootState) => state.user);
  const { idUser } = user || {};

  return (
    <Route
      {...rest}
      render={({ location }) =>
        idUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/buyer/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default RootNavigation;
