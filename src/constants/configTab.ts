const defaultTab = [
  {
    name: 'discover',
    linkTo: '/',
  },
  {
    name: 'browse',
    linkTo: '/browse/?page=1',
  },
];
const drawerTab = [
  {
    name: 'account',
    linkTo: '/account',
  },
  {
    name: 'wishlist',
    linkTo: '/wishlist',
  },
];

const HEADER_TABS = [...defaultTab];

const DRAWER_TABS = [...defaultTab, ...drawerTab];

const rootConfigTab = {
  HEADER_TABS,
  DRAWER_TABS,
};

export default rootConfigTab;
