const numberDot = (number: number | undefined) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default numberDot;