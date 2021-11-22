const setUrlGameAvatar = (str: string, name: string, url: string) => {
  return {
    type: str,
    name: name,
    url: url
  };
};

export { setUrlGameAvatar };
