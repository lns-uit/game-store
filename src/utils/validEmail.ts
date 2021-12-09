const CheckValidEmail = (email:string) => {
    let valid = email.match(/^[a-zA-Z0-9.@]+$/)
    if (valid===null) return false;
    let spl = email.split('@'); 
    if (spl.length!==2) return false;
    let i = email.indexOf('.');
    if (i===-1) return false;
    return true;
};

export default CheckValidEmail;