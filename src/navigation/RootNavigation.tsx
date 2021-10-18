import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import { setTabAction } from '../redux/actions/tabAction';
import BrowseScreen from '../screens/Browse/BrowseScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import NotFoundScreen from '../screens/NotFound/NotFoundScreen';

function RootNavigation() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location.pathname);
    dispatch(setTabAction(location.pathname));
  }, [location]);
  return (
    <Switch>
      <Route exact path='/'>
        <DiscoverScreen />
      </Route>
      <Route exact path='/browse'>
        <BrowseScreen />
      </Route>
      <Route exact path='/help'>
        <HelpScreen />
      </Route>
      <Route exact path='/faq'>
        <FAQScreen />
      </Route>
      <Route component={NotFoundScreen} />
    </Switch>
  );
}

export default RootNavigation;
