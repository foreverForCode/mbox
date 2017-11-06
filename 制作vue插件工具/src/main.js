import messageboxComponet from './App.vue';

let  messagebox = {};

messagebox.install = function (Vue,options) {
    var opt = {
        mainStyle:{
            width:'400px',
            height:'200px',
            marginTop:'-100px',
            marginLeft:'-200px'
        },
        maskStatus:true,
        titleBgColor:'#50bfff',
        buttonName:['取消','确认'],
        buttonColor:['#333','#fff'],
        buttonBgcolor:['#fff','#50bfff'],
        bgColor:'#fff',
        cb:function () {

        }
    },delay;

    // for (var key in options){
    //     opt[key] = options [key]
    // }

    const messageboxControll = Vue.extend(messageboxComponet);
    var instance = new messageboxControll().$mount(document.createElement('div'));

    Vue.prototype.$messagebox = function (message,option) {
        if(typeof option == 'object'){
            for (var key in option){
                opt[key] = option[key]
            }
        }else{
            document.body.appendChild(instance.$el);
            return;
        }
        instance.message = message || '';
        instance.visible = true;
        instance.options = opt;
        if(opt.buttonName.length<1){
            instance.message.showButton = false;
        }else {
            instance.message.showButton = true;
        }
        document.body.appendChild(instance.$el);


    }
    Vue.prototype.$messagebox['show'] = function (message,option) {
        instance.options.maskStatus = true;
        Vue.prototype.$messagebox(message, option);
        clearTimeout(delay);
    }
    Vue.prototype.$messagebox['cancle'] = function () {
        instance.visible = false;
        document.body.removeChild(instance.$el);
    }
    Vue.prototype.$messagebox['sure'] = function () {
        instance.options.cb();
        instance.visible = false;
        document.body.removeChild(instance.$el);
    }
    // 显示提示框
    Vue.prototype.$messagebox['alerts'] = function (message,option) {
        instance.options.maskStatus = true;
        Vue.prototype.$messagebox(message, option);
        clearTimeout(delay);
    }
    // 显示成功图标
    Vue.prototype.$messagebox['success'] = function(){
        instance.options.type = 'success';
        instance.options.maskStatus = false;
        Vue.prototype.$messagebox();
        delay = setTimeout(function(){
            document.body.removeChild(instance.$el); 
        },5000)
    }
    // 显示失败图标
    Vue.prototype.$messagebox['error'] = function(){
        instance.options.type = 'error';
        instance.options.maskStatus = false;
        Vue.prototype.$messagebox();
        delay = setTimeout(function(){
            document.body.removeChild(instance.$el); 
        },5000)
    }
    // 显示失败图标
    Vue.prototype.$messagebox['none'] = function(){
        instance.options.type = 'none';
        instance.options.maskStatus = false;
        Vue.prototype.$messagebox();
        delay = setTimeout(function(){
            document.body.removeChild(instance.$el); 
        },50000)
    }
    // 显示加载中图标
    Vue.prototype.$messagebox['loading'] = function(){
        instance.options.type = 'loading';
        instance.options.maskStatus = false;
        Vue.prototype.$messagebox();
        delay = setTimeout(function(){
            document.body.removeChild(instance.$el); 
        },50000)
    }
    // 显示加载中图标
    Vue.prototype.$messagebox['notice'] = function(){
        instance.options.type = 'notice';
        instance.options.maskStatus = false;
        Vue.prototype.$messagebox();
        delay = setTimeout(function(){
            document.body.removeChild(instance.$el); 
        },50000)
    }

}
if(window.Vue){
    Vue.use(messagebox)
}
export default messagebox;


