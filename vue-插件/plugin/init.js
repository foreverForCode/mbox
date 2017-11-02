

;(function(){
    //简单制作一个插件的实例 

var alt = {};

alt.install = function(Vue,options){
    Vue.prototype.$msg = "这是我的第一个vue插件";
}

if(typeof exports == 'object'){
    module.exports = alt
}else if(typeof define == 'function' && define.amd){
    define([],function(){return alt})
}else if(window.Vue){
    window.alt = alt
    Vue.use(alt)
}
})(window)