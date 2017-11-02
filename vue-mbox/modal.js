Vue.component('zen-modal', {
    template: `
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-content":style={width:options.width,height:options.height}>
              <div class="box">
                  <slot>默认模态框内容</slot>
                  <p>{{options.width}}</p>
                  <button class="modal-close" @click="$emit('fireclose')">取消</button>
              </div>     
          </div>
          
        </div>
    `,
    props:["options"],
    data:function(){
        return{
            options:this.options
        }
    }

});