import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { setTabAction } from '../redux/actions/tabAction';
import BrowseScreen from '../screens/Browse/BrowseScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';
import HelpScreen from '../screens/Help/HelpScreen';

import AdminScreen from '../screens/Admin/AdminScreen';
import ConsoleGameListScreen from '../screens/Admin/ConsoleGameListScreen';
import ConsoleUsersListScreen from '../screens/Admin/ConsoleUsersListScreen';

import AdminCreateGame from '../screens/AdminCreateGame/AdminCreateGame';

// import GameDetail from '../screens/GameDetail/GameDetail';

function RootNavigation() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabAction(location.pathname));
  }, [location]);
  return (
    <Switch>
      {/* <Route path='/game/:nameGame'>
        <GameDetail></GameDetail>
      </Route> */}
      
      <Route path='/browse'>
        <BrowseScreen />
      </Route>
      <Route path='/help'>
        <HelpScreen />
      </Route>
      <Route path='/faq'>
        <FAQScreen />
      </Route>

      <Router basename='/admin'>
        <Switch>
          <Route path='/create-game'>
            <AdminCreateGame></AdminCreateGame>
          </Route>
          <Route path='/console'>
            <AdminScreen/>
          </Route>
          <Route path='/game-list'>
            <ConsoleGameListScreen/>
          </Route>
          <Route path='/users-list'>
            <ConsoleUsersListScreen/>
          </Route>
        </Switch>
        
       
      </Router>

      <Route path='/'>
        <DiscoverScreen />
      </Route>
    </Switch>
  );
}

export default RootNavigation;
