

const numberWithCommas = (number: number) => {
    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(number);
  };

export default numberWithCommas;