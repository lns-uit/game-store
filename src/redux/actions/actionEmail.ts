const setEmail = (str: string, email: string) => {
  return {
    type: str,
    payload: email
  };
};

export { setEmail };

