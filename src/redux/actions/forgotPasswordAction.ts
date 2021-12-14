const setForgotPassword = (str: string, forgot: boolean) => {
  return {
    forgot: forgot,
    type: str
  };
};

export { setForgotPassword};

