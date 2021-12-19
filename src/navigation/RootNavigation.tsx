import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Redirect } from 'react-router';
import { Switch, Route } from 'react-router-loading';
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
import ConfirmEmail from '../screens/ConfirmEmail/ConfirmEmail';
import ConfirmEmailWithLink from '../components/ConfirmEmailComponent/ConfirmEmailWithLink';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import SuggestionScreen from '../screens/Suggestion/SuggestionScreen';
import { GameType, GameDiscoverType } from '../interfaces/rootInterface';
import suggestionGameReducer from '../redux/reducers/suggestionGame';
import WishlistScreen from '../screens/Wishlist/WishlistScreen';
import { getGameSuggestionApi } from '../api/suggestionApi';

function RootNavigation() {
  let location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const { idUser } = user || {};
  const dispatch = useDispatch();
  const isLogin = useMemo(() => !!idUser, [idUser]);
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector((state: RootState) => state.email);
  const forgot = useSelector((state: RootState) => state.forgotPassword);

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

  let isLoadingDiscover = 0;
  let data: GameDiscoverType = {
    gameData: [],
    itemsFree: [],
    topGamesWeek: [],
    mostPopular: [],
    topSellers: [],
    newRelease: [],
    freeGames: [],
    topGamesMonth: [],
    gameOnSales: [],
    mostFavorite: [],
    isLoading: 10,
    type: 'set',
  };

  const GetData = async (title: string, count: number, start: number) => {
    const res = await getGameSuggestionApi(title, count, start);
    if (Array.isArray(res)) {
      switch (title) {
        case 'Carousel':
          data.gameData = res;
          break;
        case 'Top sellers':
          data.topSellers = res;
          break;
        case 'New release':
          data.newRelease = res;
          break;
        case 'Most favorite':
          data.mostFavorite = res;
          break;
        case 'Free games':
          data.freeGames = res;
          break;
        case 'Most popular':
          data.mostPopular = res;
          break;
        case 'Top games week':
          data.topGamesWeek = res;
          break;
        case 'Top games month':
          data.topGamesMonth = res;
          break;
        case 'Game on sales':
          data.gameOnSales = res;
          break;
        case 'Free now':
          data.itemsFree = res;
          break;
      }
    }

    isLoadingDiscover++;
    if (isLoadingDiscover >= 10) {
      if (data !== null) {
        dispatch(suggestionGameReducer(undefined, data));
      }
    }
  };

  useEffect(() => {
    dispatch(setTabAction(location.pathname));
  }, [location]);

  useEffect(() => {
    fetchData();
    GetData('Carousel', 5, 0);
    GetData('Top sellers', 5, 0);
    GetData('New release', 5, 0);
    GetData('Most favorite', 5, 0);
    GetData('Free games', 5, 0);
    GetData('Most popular', 4, 0);
    GetData('Top games week', 12, 0);
    GetData('Top games month', 12, 0);
    GetData('Game on sales', 4, 0);
    GetData('Free now', 4, 0);
  }, []);
  return (
    <Switch>
      {isLoading ? (
        <>
          <Route path='/' />
          <SplashScreen />
          <Route />
        </>
      ) : (
        <>
          {/* user login */}
          <PrivateRoute loading path='/edit/user/:id'>
            <EditProfile />
          </PrivateRoute>
          <PrivateRoute loading path='/user/:idUser'>
            <User />
          </PrivateRoute>
          <PrivateRoute loading path='/admin/create-game'>
            <AdminCreateGame />
          </PrivateRoute>
          <PrivateRoute loading path='/admin/update-game/:idGame'>
            <AdminUpdateGame />
          </PrivateRoute>
          <PrivateRoute path='/wishlist/:idUser'>
            <WishlistScreen />
          </PrivateRoute>

          <Route
            path='/admin/console/game-list'
            component={ConsoleGameListScreen}
            loading={true}></Route>
          <Route loading path='/admin/console/user-list'>
            <Route />
          </Route>
          <Route loading path='/admin/console/discount-list'>
            <DiscountEvent />
          </Route>
          <Route loading path='/admin/console/genres-list'>
            <GenresManager />
          </Route>
          <Route loading path='/admin/console/privacy-policy-edit'>
            <PrivacyPolicyEditor />
          </Route>
          <Route loading path='/admin/console/store-refund-edit'>
            <StoreRefundPolicyEditor />
          </Route>
          <Route loading path='/admin/console/term-of-service-edit'>
            <TermOfService />
          </Route>
          <Route loading path='/admin/console/discover-cms'>
            <DiscoverCMS />
          </Route>
          <Route loading path='/admin/console/history/:idGame'>
            <AllGameVersion />
          </Route>

          {/* Auth*/}
          <Route
            loading
            path='/sign-in'
            render={() => (isLogin ? <Redirect to='/' /> : <SignIn />)}
          />
          <Route
            loading
            path='/sign-up'
            render={() => (isLogin ? <Redirect to='/' /> : <SignUp />)}
          />
          <Route
            loading
            path='/confirm-email'
            render={() =>
              email === null ? <Redirect to='/' /> : <ConfirmEmail />
            }
          />
          <Route
            loading
            path='/forgot-password'
            render={() => (isLogin ? <Redirect to='/' /> : <ForgotPassword />)}
          />
          <Route
            loading
            path='/reset-password'
            render={() =>
              forgot === false ? <Redirect to='/' /> : <ResetPassword />
            }
          />
          <Route path='/email-verify/:url'>
            <ConfirmEmailWithLink />
          </Route>

          {/* everyone */}
          <Route path='/suggestion/:title' component={SuggestionScreen} />
          <Route path='/game/:idGame' component={GameDetail} />
          <Route path='/browse' component={BrowseScreen} />
          <Route exact path='/' component={DiscoverScreen} />
          {/* <Route path='*' component={NotFoundScreen} /> */}

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
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default RootNavigation;
