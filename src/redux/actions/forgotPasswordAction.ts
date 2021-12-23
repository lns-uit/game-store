const setForgotPassword = (str: string, bool: any) => {
  return {
    type: str,
    payload: bool
  };
};

export { setForgotPassword };

