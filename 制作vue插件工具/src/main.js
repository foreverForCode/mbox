import messageboxComponet from './App.vue';
let  messagebox = {};
messagebox.install = function (Vue,options) {
    var opt = {
        mainStyle:{
            width:'400px',
            height:'200px'
        },
        titleBgColor:'#50bfff',
        buttonName:['取消','确认'],
        buttonColor:['#333','#fff'],
        buttonBgcolor:['#fff','#50bfff'],
        bgColor:'#fff',
        cb:function () {

        }
    }
    for (var key in options){
        opt[key] = options [key]
    }
    const messageboxControll = Vue.extend(messageboxComponet);
    var instance = new messageboxControll().$mount(document.createElement('div'));
    console.log(instance)
    Vue.prototype.$messagebox = function (message,option) {
        if(typeof option == 'object'){
            for (var key in option){
                opt[key] = option[key]
            }
        }
        instance.message = message;
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
        Vue.prototype.$messagebox(message, option);
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

}
if(window.Vue){
    Vue.use(messagebox)
}
export default messagebox;


