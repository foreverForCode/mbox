let messageboxComponet = `
<section class="messagebox-container">
    <div class="messagebox" v-if="visible">
        <h2>标题</h2>
    </div>
</section>
`;
let  messagebox = {};
messagebox.install = function (Vue,options) {
    var opt = {
        visible:false,
    }
    // for (var key in options){
    //     opt[key] = options [key]
    // }
    const messageboxControll = Vue.extend(messageboxComponet); //Vue 扩展实例
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
        /*
            1. instance  ---->  data
        */
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



