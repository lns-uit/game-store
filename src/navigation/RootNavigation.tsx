import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation, Redirect } from 'react-router';
import { setTabAction } from '../redux/actions/tabAction';
import BrowseScreen from '../screens/Browse/BrowseScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';
import HelpScreen from '../screens/Help/HelpScreen';
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
          <PrivateRoute path='/user/:idUser/edit'>
            <div>map dit</div>
          </PrivateRoute>

          <PrivateRoute path='/user/:idUser'>
            <User></User>
          </PrivateRoute>

          <PrivateRoute path='/admin/create-game'>
            <AdminCreateGame></AdminCreateGame>
          </PrivateRoute>
          <PrivateRoute path='/admin/console'>
            <AdminScreen />
          </PrivateRoute>

          {/* Auth*/}
          <Route
            path='/buyer/sign-in'
            render={() => (isLogin ? <Redirect to='/' /> : <SignIn />)}
          />
          <Route
            path='/buyer/sign-up'
            render={() => (isLogin ? <Redirect to='/' /> : <SignUp />)}
          />

          {/* everyone */}
          <Route path='/game/:idGame/:version'>
            <GameDetail />
          </Route>
          <Route path='/browse'>
            <BrowseScreen />
          </Route>
          <Route path='/help'>
            <HelpScreen />
          </Route>
          <Route path='/faq'>
            <FAQScreen />
          </Route>
          <Route exact path='/'>
            <DiscoverScreen />
          </Route>
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
