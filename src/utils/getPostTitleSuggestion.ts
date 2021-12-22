const getPostTitleSuggestion = (title: string) => {
  switch (title) {
    case 'top-sellers':
      return 'Top sellers';
    case 'new-release':
      return 'New release';
    case 'free-games':
      return 'Free games';
    case 'most-popular':
      return 'Most popular';
    case 'free-now':
      return 'Free now';
    case 'most-favorite':
      return 'Most favorite';
    case 'game-on-sales':
      return 'Game on sales';
  }
  return '';
};
export default getPostTitleSuggestion;
