
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { setTabAction } from "../redux/actions/tabAction";
import BrowseScreen from "../screens/Browse/BrowseScreen";
import DiscoverScreen from "../screens/Discover/DiscoverScreen";
import FAQScreen from "../screens/FAQ/FAQScreen";
import HelpScreen from "../screens/Help/HelpScreen";
import AdminScreen from "../screens/Admin/AdminScreen";
import AdminCreateGame from "../screens/AdminCreateGame/AdminCreateGame";
import GameDetail from "../screens/GameDetail/GameDetail";
import SignIn  from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';

function RootNavigation() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabAction(location.pathname));
  }, [location]);
  return (
    <Switch>
      <Route path="/game/:idGame/:nameGame">
        <GameDetail></GameDetail>
      </Route>
      <Route path="/browse">
        <BrowseScreen />
      </Route>
      <Route path="/buyer/sign-in"
        render={()=>{
          return localStorage.getItem("accessToken") === null ? <SignIn></SignIn> : <Redirect to="/"></Redirect>
        }}
      >
      </Route>
      <Route path="/buyer/sign-up"
        render={()=>{
          return localStorage.getItem("accessToken") === null ? <SignUp></SignUp> : <Redirect to="/"></Redirect>
        }}
      >
      </Route>
       
      <Route path="/help">
        <HelpScreen />
      </Route>
      <Route path="/faq">
        <FAQScreen />
      </Route>
      <Route path="/admin/create-game">
        <AdminCreateGame></AdminCreateGame>
      </Route>
      <Route path="/admin/console">
        <AdminScreen />
      </Route>
      <Route path="/">
        <DiscoverScreen />
      </Route>
    </Switch>
  );
}

export default RootNavigation;
