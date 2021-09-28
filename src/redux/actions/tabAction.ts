import rootType from '../types';

const setTabAction = (tab: string) => {
  return {
    type: rootType.tab.setTab,
    payload: tab,
  };
};

export { setTabAction };
