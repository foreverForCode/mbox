/**
 * Updated by linxin on 2017/7/27.
 */

Toast = {};

Toast.install = function (Vue, options) {

    // 公共变量 和 公共 方法
    var doc = document,
        JM = {
            timer: {},
            endCall: {}
        },
        regPxe = /\px|pt|em|rem/g,
        $QM = function (elem, root) {
            return doc.querySelectorAll(root ? (root + " " + elem) : elem);
        }; // $QM ----------------> 获取节点

    JM.isType = function (obj, type) {
        type = type.replace(/(\w)/, function (v) {
            return v.toUpperCase()
        });
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }; //  判断对象的类型
    //事件点击
    JM.onTouch = function (elem, callback) {
        var move, touchStartY;
        if (!/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod|ios/.test(navigator.userAgent)) {
            return elem.addEventListener("click", function (e) {
                callback.call(this, e);
            }, false);
        } else {
            elem.addEventListener("touchmove", function (e) {
                touchStartY = e.changedTouches[0].clientY;
                move = true;
            }, false);
            elem.addEventListener("touchend", function (e) {
                if (Math.abs(e.changedTouches[0].clientY - touchStartY) > 10) return;
                e.preventDefault();
                move || callback.call(this, e);
                move = false;
            }, false);
        }
    };
    JM.toCssArr = function (attr) {
        return Object.keys(attr).map(function (k) {
            return k + ":" + attr[k]
        });
    }; // 遍历css的属性
    JM.goCss = function (elem, attr) {
        var val, cssNumber = {
                'column-count': 1,
                'columns': 1,
                'box-flex': 1,
                'line-clamp': 1,
                'font-weight': 1,
                'opacity': 1,
                'z-index': 1,
                'zoom': 1
            },
            toLower = function (str) {
                return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase()
            },
            addPx = function (name, value) {
                return (typeof value == "number" && !cssNumber[toLower(name)]) ? value + "px" : value
            };
        if (JM.isType(attr, "object")) {
            for (var key in attr) {
                elem.style[toLower(key)] = addPx(key, attr[key]);
            }
        } else {
            val = document.defaultView.getComputedStyle(elem, null)[attr];
            return regPxe.test(val.toString()) ? Math.round(val.toString().replace(regPxe, "")) : val;
        }
    };
    var idx = 1,
        jemCell = ["jembox"],
        JemBox = function (options) {
            //默认配置
            var config = {
                cell: "",
                width: "", // 弹层的宽度，可用是百分比，可用是如（320px）
                height: "", // 弹层的高度，可用是百分比，可用是如（320px）
                radius: "4px", //弹层的类型
                title: [], // 标题可以有2个参数，例如 ["标题",{"background-color":"#fff","color":"#fff"}]，如果title:[]参数为空，不显示标题
                content: "请稍等,暂无内容！", // 内容	
                conStyle: {}, //内容框的css样式，你可以写更多样式，例如{"background-color":"#fff"}
                skin: "scale", //弹出风格
                yesCall: null, // 确定按钮回调函数，例如{name:"确定",css:{"background-color":"#fff"},fun:function (){}}
                noCall: null, // 取消按钮回调函数，例如{name:"取消",css:{"background-color":"#fff"},fun:function (){}}
                closeCall: null, // 右上角关闭取消按钮回调函数
                closeBtn: [false, 1], // 参数一是否显示右上角关闭取消按钮，默认false，参数二按钮颜色 1是黑色，2是白色
                time: null, // 自动关闭时间(毫秒)
                mask: true, //是否显示遮罩层
                maskClose: true, // 点击遮罩层是否关闭，默认true
                maskColor: "rgba(0,0,0,0.5)", // 遮罩层颜色可以是rgba也可以是rgb
                padding: "10px 10px",
                zIndex: 1e4, // 层级关系
                success: null, //层成功弹出层的回调函数，返回一个参数为当前层元素对象
                endCall: null //层彻底销毁后的回调函数
            };
            var that = this,
                newobj = JSON.parse(JSON.stringify(config));
            that.opts = Object.assign(newobj, options);
            var Wcell = that.opts.content;
            if (Wcell && Wcell.nodeType === 1) {
                JM.WisShow = JM.goCss(Wcell, "display");
                JM.Wprev = Wcell.previousSibling;
                JM.Wnext = Wcell.nextSibling;
                JM.Wparent = Wcell.parentNode;
            }
            that.viewInit();
        };
    
    var jefn = JemBox.prototype;
    jefn.viewInit = function () {
        var that = this,
            opts = that.opts,
            modDiv = doc.createElement("div"),
            maskDiv = doc.createElement("div"),
            cellidx = (opts.cell == "" || opts.cell == null) ? idx : opts.cell;
        //判断是否有标题参数，创建标题	
        var titDiv = function () {
            var titName, tCss;
            if (JM.isType(opts.title, "array") && opts.title.length > 0) {
                titName = opts.title[0];
                tCss = JM.isType(opts.title[1], "object") ? JM.toCssArr(opts.title[1]).join(";") : "";
            } else if (opts.title != "") {
                titName = opts.title;
            } else {
                tCss = "height:0px;";
            }
            return '<div class="jemboxhead" id="head' + cellidx + '" style="' + (tCss || "") + '">' + (titName || "") + "</div>";
        }();
        //判断是否有按钮参数，创建按钮
        var btnDiv = function () {
            var yesArr = opts.yesCall,
                noArr = opts.noCall,
                footCss, btnDom;
            //判断按钮对象是否为空
            if (yesArr == null && noArr == null) {
                footCss = "display:none;height:0px;";
                btnDom = "";
            } else {
                if ((yesArr && yesArr.name) && (noArr && noArr.name)) {
                    //确认与取消都不为空的情况
                    var yesCss = JM.isType(yesArr.css, "object") ? JM.toCssArr(yesArr.css).join(";") : "",
                        noCss = JM.isType(noArr.css, "object") ? JM.toCssArr(noArr.css).join(";") : "";
                    btnDom = '<span type="no" style="' + noCss + '">' + noArr.name + '</span><span type="yes" style="' + yesCss + '">' + yesArr.name + "</span>";
                } else {
                    //确认与取消部分为空的情况
                    if ((yesArr && yesArr.name) && noArr == null) {
                        var btnCss = JM.isType(yesArr.css, "object") ? JM.toCssArr(yesArr.css).join(";") : "";
                        btnDom = '<span type="yes" style="' + btnCss + '">' + yesArr.name + "</span>";
                    } else if (yesArr == null && (noArr && noArr.name)) {
                        var btnCss = JM.isType(noArr.css, "object") ? JM.toCssArr(noArr.css).join(";") : "";
                        btnDom = '<span type="no" style="' + btnCss + '">' + noArr.name + "</span>";
                    }
                }
            }
            return '<div class="jemboxfoot" id="foot' + cellidx + '" style="' + (footCss || "") + '">' + btnDom + "</div>";
        }();
        that.id = modDiv.id = jemCell[0] + cellidx;
        modDiv.setAttribute("class", "jemboxer jemboxmain-" + opts.skin);
        modDiv.setAttribute("jmcellidx", cellidx);
        modDiv.setAttribute("skin", opts.skin);
        JM.goCss(modDiv, {
            "pointer-events": "none",
            "z-index": opts.zIndex
        });
        //设置遮罩层
        maskDiv.setAttribute("id", "jemmask" + cellidx);
        maskDiv.classList.add("jemboxmask");
        JM.goCss(maskDiv, {
            "background-color": opts.maskColor,
            "z-index": opts.zIndex - 5
        });
        //弹层模板元素
        modDiv.innerHTML =
            '<div class="jemboxchild ' + opts.skin + '">' + titDiv +
            '<span class="jemboxclose0' + opts.closeBtn[1] + '" style="display:' + (opts.closeBtn[0] ? "block" : "none") + '"></span>' +
            '<div class="jemboxmcont" style="padding:' + opts.padding + ';"></div>' + btnDiv +
            '</div>';
        //把弹层插入到body内之下
        if (opts.mask) doc.body.appendChild(maskDiv);
        doc.body.appendChild(modDiv);
        var elem = that.elem = $QM("#" + that.id)[0],
            setWH = {
                "width": opts.width != "" ? opts.width : "",
                "height": opts.height != "" ? opts.height : ""
            },
            conStyle = Object.assign({
                "pointer-events": "auto",
                "background-color": "#fff",
                "border-radius": opts.radius
            }, opts.conStyle);
        JM.goCss($QM("#" + that.id + " .jemboxchild")[0], Object.assign(setWH, conStyle));
        that.idx = (opts.cell == "" || opts.cell == null) ? idx++ : opts.cell;
        that.contype(opts);
        that.action(opts);
        setTimeout(function () {
            try { //弹出时添加动画效果
                $QM(".jemboxchild", "#" + that.id)[0].classList.add("jemanim-" + opts.skin);
            } catch (e) {
                return;
            }
            //弹出成功后的回调
            opts.success && opts.success(elem);
        }, 5);
    };
    jefn.contype = function (opts) {
        //设置显示的类型
        var that = this,
            ctype, tid = "#" + that.id,
            msg = opts.content,
            conCell = $QM(".jemboxmcont", tid)[0];
        if (msg === undefined) return conCell;
        if (typeof msg === "string") {
            conCell.innerHTML = opts.content;
            ctype = "string";
        } else if (msg && msg.nodeType === 1) {
            conCell.innerHTML = "";
            var wrap = doc.createElement("div");
            if (JM.goCss(msg, "display") == "none") JM.goCss(msg, {
                "display": "block"
            });
            conCell.appendChild(wrap.appendChild(msg));
            ctype = "html";
        };
        $QM(tid)[0].setAttribute("contype", ctype);
    };
    jefn.action = function (opts) {
        var that = this,
            tid = "#" + that.id,
            yesArr = opts.yesCall,
            noArr = opts.noCall;
        //自动关闭
        if (opts.time) {
            JM.timer[that.idx] = setTimeout(function () {
                mBox.close(that.idx);
            }, opts.time * 1e3);
        }
        //关闭按钮
        if (opts.closeBtn[0]) {
            var elclose = $QM(".jemboxclose0" + opts.closeBtn[1], tid)[0];
            JM.onTouch(elclose, function () {
                //关闭按钮回调函数
                opts.closeCall && opts.closeCall();
                mBox.close(that.idx);
            });
        }
        //确认取消
        if (yesArr || noArr) {
            var btnArr = $QM(".jemboxfoot", tid)[0].children;
            for (var i = 0; i < btnArr.length; i++) {
                JM.onTouch(btnArr[i], function () {
                    var onytpe = this.getAttribute("type");
                    if (onytpe == "yes") {
                        //确定按钮回调函数
                        if (JM.isType(yesArr.fun, "function")) yesArr.fun && yesArr.fun(that.idx);
                    } else {
                        //取消按钮回调函数
                        if (JM.isType(noArr.fun, "function")) noArr.fun && noArr.fun();
                        mBox.close(that.idx);
                    }
                });
            }
        }
        //点遮罩关闭
        if (opts.mask && opts.maskClose) {
            var oncover = $QM("#jemmask" + that.idx)[0];
            JM.onTouch(oncover, function () {
                mBox.close(that.idx, opts.endCall);
            });
        }
        opts.endCall && (JM.endCall[that.idx] = opts.endCall);
    };
    // 让传入的元素在对话框关闭后可以返回到原来的地方
    function backSitu(elem, prev, next, parent, isShow) {
        JM.goCss(elem.firstChild, {
            "display": isShow == "block" ? "block" : "none"
        });
        if (prev && prev.parentNode) {
            prev.parentNode.insertBefore(elem.firstChild, prev.nextSibling);
        } else if (next && next.parentNode) {
            next.parentNode.insertBefore(elem.firstChild, next);
        } else if (parent) {
            parent.appendChild(elem.firstChild);
        }
        this.backSitu = null;
    };
    //核心方法
    var mBox = function (options) {
         var newm = new JemBox(options || {});
        return newm.idx;
    };

    //获取元素节点

    // Vue.prototype.mBox.Q = mBox.Q = function (elem) {
    //     return $QM(elem)[0];
    // };
    //弹出式提示
    mBox.toast = function (options) {
        var conHtml = "",
            asscon = {
                "background-color": "rgba(0,0,0,0.80)",
                "color": "#fff"
            },
            opts = Object.assign({
                width: '',
                padding: "20px 10px",
                content: "",
                conStyle: {},
                type: "",
                time: 0,
                success: null
            }, options);
        //判断类型
        switch (opts.type) {
            case "none":
                conHtml = "<div class='jemtc'>" + opts.content + "</div>";
                break;
            case "success":
                conHtml = "<div class='success'></div><div class='jemtc'>" + opts.content + "</div>";
                break;
            case "error":
                conHtml = "<div class='error'></div><div class='jemtc'>" + opts.content + "</div>";
                break;
            case "loading":
                conHtml = "<div class='loading'><span></span></div><div class='jemtc'>" + opts.content + "</div>";
                break;
        }
        return mBox({
            cell: opts.cell,
            width: opts.width,
            padding: opts.padding,
            mask: false,
            time: opts.time,
            content: conHtml,
            conStyle: Object.assign(asscon, opts.conStyle),
            success: opts.success
        });
    };
    Vue.prototype.$toast = function(options){
        var conHtml = "",
        asscon = {
            "background-color": "rgba(0,0,0,0.80)",
            "color": "#fff"
        },
        opts = Object.assign({
            width: '',
            padding: "20px 10px",
            content: "",
            conStyle: {},
            type: "",
            time: 0,
            success: null
        }, options);
        //判断类型
        switch (opts.type) {
            case "none":
                conHtml = "<div class='jemtc'>" + opts.content + "</div>";
                break;
            case "success":
                conHtml = "<div class='success'></div><div class='jemtc'>" + opts.content + "</div>";
                break;
            case "error":
                conHtml = "<div class='error'></div><div class='jemtc'>" + opts.content + "</div>";
                break;
            case "loading":
                conHtml = "<div class='loading'><span></span></div><div class='jemtc'>" + opts.content + "</div>";
                break;
        }
        return mBox({
            cell: opts.cell,
            width: opts.width,
            padding: opts.padding,
            mask: false,
            time: opts.time,
            content: conHtml,
            conStyle: Object.assign(asscon, opts.conStyle),
            success: opts.success
        });
    }
    // Vue.prototype.mBox.toast = mBox.toast = function (options) {
    //     var conHtml = "",
    //         asscon = {
    //             "background-color": "rgba(0,0,0,0.80)",
    //             "color": "#fff"
    //         },
    //         opts = Object.assign({
    //             width: '',
    //             padding: "20px 10px",
    //             content: "",
    //             conStyle: {},
    //             type: "",
    //             time: 0,
    //             success: null
    //         }, options);
    //     //判断类型
    //     switch (opts.type) {
    //         case "none":
    //             conHtml = "<div class='jemtc'>" + opts.content + "</div>";
    //             break;
    //         case "success":
    //             conHtml = "<div class='success'></div><div class='jemtc'>" + opts.content + "</div>";
    //             break;
    //         case "error":
    //             conHtml = "<div class='error'></div><div class='jemtc'>" + opts.content + "</div>";
    //             break;
    //         case "loading":
    //             conHtml = "<div class='loading'><span></span></div><div class='jemtc'>" + opts.content + "</div>";
    //             break;
    //     }
    //     return mBox({
    //         cell: opts.cell,
    //         width: opts.width,
    //         padding: opts.padding,
    //         mask: false,
    //         time: opts.time,
    //         content: conHtml,
    //         conStyle: Object.assign(asscon, opts.conStyle),
    //         success: opts.success
    //     });
    // };
    //警告提示
    // Vue.prototype.mBox.alert = mBox.alert = function (text) {
    //     return mBox({
    //         width: '86%',
    //         padding: "20px 10px",
    //         content: text,
    //         yesCall: {
    //             name: "确定",
    //             fun: function (idx) {
    //                 mBox.close(idx)
    //             }
    //         }
    //     });
    // };
    // //通知提示
    // Vue.prototype.mBox.notice = mBox.notice = function (options) {
    //     var opts = Object.assign({
    //             content: "",
    //             time: 5,
    //             conStyle: {}
    //         }, options),
    //         asscon = {
    //             position: "fixed",
    //             top: 0,
    //             left: 0,
    //             "background-color": "rgba(0,0,0,0.80)",
    //             "color": "#fff"
    //         };
    //     return mBox({
    //         cell: opts.cell,
    //         width: '100%',
    //         padding: "8px 10px",
    //         time: opts.time,
    //         radius: "0px",
    //         content: "<div class='jemtc'>" + opts.content + "</div>",
    //         mask: false,
    //         conStyle: Object.assign(asscon, opts.conStyle)
    //     });
    // };
    // //弹出式菜单
    // Vue.prototype.mBox.actionSheet = mBox.actionSheet = function (options) {
    //     //合并默认的API
    //     var opts = Object.assign({
    //         title: "",
    //         closeBtn: [false, 1],
    //         content: "",
    //         skins: "",
    //         time: 0,
    //         conStyle: {},
    //         success: null,
    //         yesCall: null,
    //         noCall: {
    //             name: "取消"
    //         }
    //     }, options);
    //     //判断向上弹出层的效果类型
    //     if (opts.skins == "websheet") {
    //         var childWidth = '100%',
    //             bgColor = {
    //                 "background-color": "#fff"
    //             };
    //     } else if (opts.skins == "itemsheet") {
    //         var childWidth = '95%',
    //             bgColor = {
    //                 "background-color": "rgba(255,255,255,0)"
    //             };
    //     }
    //     return mBox({
    //         cell: opts.cell,
    //         width: childWidth,
    //         padding: "0px",
    //         time: opts.time,
    //         title: opts.title,
    //         closeBtn: opts.closeBtn,
    //         skin: opts.skins,
    //         radius: "",
    //         content: opts.content,
    //         conStyle: Object.assign(bgColor, opts.conStyle),
    //         success: opts.success,
    //         yesCall: opts.yesCall,
    //         noCall: opts.noCall
    //     });
    // };
    // //关闭单个层
    // Vue.prototype.mBox.close = mBox.close = function (mid) {
    //     var mCell = $QM("#jembox" + mid)[0],
    //         maskCell = $QM("#jemmask" + mid),
    //         conCell = $QM(".jemboxmcont", "#jembox" + mid)[0];
    //     if (!mCell) return;
    //     //关闭时移除动画效果
    //     $QM(".jemboxchild", "#jembox" + mid)[0].classList.remove("jemanim-" + mCell.getAttribute("skin"));
    //     //动画效果移除后，再删除弹层
    //     var animas = (function () {
    //         var t, el = document.createElement('mboxelement'),
    //             transitions = {
    //                 'transition': 'transitionend',
    //                 'OTransition': 'oTransitionEnd',
    //                 'MozTransition': 'transitionend',
    //                 'WebkitTransition': 'webkitTransitionEnd'
    //             };
    //         for (t in transitions) {
    //             if (el.style[t] !== undefined) return transitions[t];
    //         }
    //     })();
    //     animas && mCell.addEventListener(animas, function () { //动画结束时事件
    //         if (mCell.getAttribute("contype") == "html") {
    //             backSitu(conCell, JM.Wprev, JM.Wnext, JM.Wparent, JM.WisShow);
    //         }
    //         if (maskCell.length > 0) doc.body.removeChild(maskCell[0]);
    //         doc.body.removeChild(mCell);
    //     }, false);
    //     clearTimeout(JM.timer[idx]);
    //     delete JM.timer[idx];
    //     JM.isType(JM.endCall[idx], "function") && JM.endCall[idx]();
    //     delete JM.endCall[idx];
    // };
    // //关闭所有弹层
    // Vue.prototype.mBox.closeAll = mBox.closeAll = function () {
    //     var allboxs = $QM(".jemboxer");
    //     for (var c = 0; c < allboxs.length; c++) {
    //         mBox.close(allboxs[c].getAttribute("jmidx"));
    //     }
    // };




}