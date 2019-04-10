
module.exports = function(input, omitList){
    let  _temp = Object.assign({}, input);
    for(let x in omitList){
        delete _temp[omitList[x]];
    }
    return _temp;
}