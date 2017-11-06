/**
 * Created by onion on 2017/11/6.
 * author:jorden
 */

;
(function (window, undefined) {
    //  公共方法
    //返回角度
    function GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }
    //根据起点和终点返回方向 1：向上，2：向下，0：未滑动
    function GetSlideDirection(startX, startY, endX, endY) {
        var dy = startY - endY;
        var dx = endX - startX;
        var result = 0;

        //如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return result;
        }
        var angle = GetSlideAngle(dx, dy);
        if (angle >= 45 && angle < 135) {
            result = 1;
        } else if (angle >= -135 && angle < -45) {
            result = 2;
        } else {
            return result;
        }
        return result;
    }
    // 获取滚动条距离顶部的距离
    function scrollTop(obj, len) {
        if (typeof len === 'undefined') {
            return obj.scrollTop;
        } else {
            obj.scrollTop = len;
        }
    }
    // 获取节点
    function getEle(el){
        return document.querySelector(el)
    }

    // 定义局部变量
    var startX, startY, containerNode, loadingNode, judge = 0, reSroll = {};
       
    reSroll.install = function (Vue, options) {
        
    };

    if (typeof exports == "object") {
        module.exports = reSroll;
    } else if (typeof define == "function" && define.amd) {
        define([], function () {
            return reSroll
        })
    } else if (window.Vue) {
        Vue.use(reSroll);
    }

})(window);