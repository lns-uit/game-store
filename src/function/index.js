function dotNumber(value){
    let str = '';
    let dot = 0;
    while(parseInt(value) > 0){
        str = (value % 10).toString()+str;
        dot += 1;
        value /= 10;
        value = parseInt(value);
        if (dot === 3 && parseInt(value) > 0){
            str = '.' + str;
            dot = 0;
        }
    }
    return str;
}

module.exports = {dotNumber}