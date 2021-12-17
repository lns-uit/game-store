

const numberWithCommas = (number: number | undefined) => {
    if (number !== undefined) {
      return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(number);
    }
    else
    return -1;
  };

export default numberWithCommas;