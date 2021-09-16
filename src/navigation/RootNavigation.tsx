import React from 'react';
import { Route, Switch } from 'react-router';
import BrowseScreen from '../screens/Browse/BrowseScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import FAQScreen from '../screens/FAQ/FAQScreen';
import HelpScreen from '../screens/Help/HelpScreen';

function RootNavigation() {
  return (
    <Switch>
      <Route path='/browse'>
        <BrowseScreen />
      </Route>
      <Route path='/help'>
        <HelpScreen />
      </Route>
      <Route path='/faq'>
        <FAQScreen />
      </Route>
      <Route path='/'>
        <DiscoverScreen />
      </Route>
    </Switch>
  );
}

export default RootNavigation;
