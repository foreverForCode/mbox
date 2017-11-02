isType = function (obj, type) {
    type = type.replace(/(\w)/, function (v) { return v.toUpperCase() });
    console.log(type,Object.prototype.toString.call(obj));
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

isType('background','object');

toCssArr = function (attr) {
    return Object.keys(attr).map(function (k) { return k + ":" + attr[k] });
};
var attr = {
    'width':'100px',
    'height':'100px'
}
console.log(toCssArr(attr))