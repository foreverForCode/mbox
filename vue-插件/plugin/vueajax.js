//Install Vue Ajax
function installAjax(Vue, options) {
    // 添加全局方法或属性
    Vue.myGlobalMethod ={};

    // 添加全局资源
    Vue.directive('my-directive', {});
    
    var resProAjax = function (urls,options) {
        return new Promise(function (resolve,reject) {
            jeAjax(extend({ 
                url: urls, 
                success: function (res) {resolve(res);},
                error: function(err){reject(err)}
                }, options || {})
            );
        });
    };
    Vue.prototype.get = function(url){
        return resProAjax(url, {});
    };

    Vue.prototype.post = function(url, data, dataType){
        if (typeof (data) === 'function') dataType = dataType, data = null;
        return resProAjax(url, {type: 'POST',data: data,dataType: dataType});
    };

    Vue.prototype.getJSON = function(url, data){
        data = data == undefined ? {} : data;
        return resProAjax(url, {data: data,dataType: 'json'});
    };

    Vue.prototype.JSONP = function(url, data){
        data = data == undefined ? {} : data;
        return resProAjax(url, {data: data,dataType: 'jsonp'});
    };
}

window.jeAjax = jeAjax;
if (typeof exports == "object") {
    module.exports = installAjax;
} else if (typeof define == "function" && define.amd) {
    define([], function(){ return installAjax });
} else if(window.Vue){
    Vue.use(installAjax);
}
