import React, { useEffect, useState } from 'react';
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
import userApi from "../api/userApi";
import RootErrorMessage from '../constants/ErrorMessage';
import { login } from '../redux/actions/userAction';
import axios from 'axios'

function RootNavigation() {
  let location = useLocation();
  const dispatch = useDispatch();
  const [isLoginToken, setIsLoginToken] = useState(false);

  useEffect(() => {
    dispatch(setTabAction(location.pathname));
    const tokenLogin = localStorage.getItem('accessToken');
    async function LoginByToken(){
      // try {
      //   const responsive = await userApi.loginApi(localStorage.getItem("accessToken"));
      //   const { token, user } = responsive || {};
        
      //   setIsLoginToken(true);
      //   console.log(responsive);
  
      //   if (token) {
      //     localStorage.setItem('accessToken', token);
      //     dispatch(login(user));
      //     setIsLoginToken(true);
      //   }
      // } catch (e) {
      //   console.log(e);
      //   setIsLoginToken(true);
      //   alert(RootErrorMessage.DEFAULT_ERROR_MESSAGE);
      // }
      axios.post("https://localhost:5001/api/user/login",{},{
        headers:{
          token: tokenLogin || ''
        }
      })
        .then(res=>{
          const { token, user } = res.data || {};
          localStorage.setItem('accessToken', token);
          dispatch(login(user));
          setIsLoginToken(true);
        })
        .catch((error) => {
          console.log(error)
          setIsLoginToken(true);
        })
    }

    LoginByToken();
  }, [location,isLoginToken]);
  return (
    <div>
      {
        isLoginToken=== false?
        <Switch>
          <Route path="/">
            <SplashScreen />
          </Route>
        </Switch>
        :
        <Switch>
          <Route path='/game/:idGame/:version'>
            <GameDetail />
          </Route>
          <Route path='/browse'>
            <BrowseScreen />
          </Route>
          <Route
            path='/buyer/sign-in'
            render={() => {
              return localStorage.getItem('accessToken') === null ? (
                <SignIn/>
              ) : (
                <Redirect to='/'/>
              );
            }}></Route>
          <Route
            path='/buyer/sign-up'
            render={() => {
              return localStorage.getItem('accessToken') === null ? (
                <SignUp/>
              ) : (
                <Redirect to='/'/>
              );
            }}></Route>
          <Route path='/user/:idUser'>
            <User></User>
          </Route>

          <Route path='/help'>
            <HelpScreen />
          </Route>
          <Route path='/faq'>
            <FAQScreen />
          </Route>
          <Route path='/admin/create-game'>
            <AdminCreateGame></AdminCreateGame>
          </Route>
          <Route
            path='/admin/console'
            render={() => {
              return localStorage.getItem('accessToken') === null ? (
                <Redirect to='/'></Redirect>
              ) : (
                <AdminScreen />
              );
            }}></Route>
          <Route path='/'>
            <DiscoverScreen />
          </Route>
        </Switch>
      }
    </div>
  );
}

export default RootNavigation;
