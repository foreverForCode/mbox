<template>
    <section class="messagebox-container">
        <div class="messagebox" v-bind:class="[visible?'fade-in':'fade-out']">
            <h2>{{message.title}}</h2>
            <p class="describe">{{message.describe}}</p>
            <p v-bind:class="[message.showButton?'show':'hide']">
                <span class="cancle" v-bind:style="{color:options.buttonColor[0],background:options.buttonBgcolor[0]}" v-text="options.buttonName[0]" @click="cancle"></span>
                <span class="sure" v-bind:style="{color:options.buttonColor[1],background:options.buttonBgcolor[1]}" v-text="options.buttonName[1]" @click="sure" v-if="options.buttonName.length>=2"></span>
            </p>
        </div>
    </section>
</template>

<script>
  export default {
        data() {
            return {
                message:{
                    title:'',
                    describe:'',
                    showButton:''
                },
                options:{
                    buttonName:[],
                    buttonColor:[],
                    buttonBgcolor:[],
                    bgColor:'',
                    cb:function () {

                    }
                },
                visible:false,
            }
        },
        methods:{
            cancle(){
                this.$messagebox['cancle']();
            },
            sure(){
                this.$messagebox['sure']();
            }
        }

    }
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
.messagebox-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.61);
}
.messagebox-container .messagebox {
  width: 400px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  color: #333;
  padding: 20px;
  min-height: 130px;
}
.messagebox-container .messagebox h2 {
  font-weight: 700;
  font-size: 18px;
  text-align: left;
}
.messagebox-container .messagebox p,
.messagebox-container .messagebox h2 {
  padding: 0;
  margin: 0;
}
.messagebox-container .messagebox .describe {
  text-align: left;
  padding: 20px 0 30px;
  font-size: 14px;
}
.messagebox-container .messagebox .show {
  display: block;
}
.messagebox-container .messagebox .hide {
  display: none;
}
.messagebox-container .messagebox p>span {
  display: inline-block;
  width: 60px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 4px;
  margin: 0 10px;
  cursor: pointer;
}
.messagebox-container .messagebox p>span:hover {
  opacity: .8;
}
.messagebox-container .fade-in {
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.messagebox-container .fade-out {
  animation-name: fade-out;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

</style>
