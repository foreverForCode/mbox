<template>
    <section class="messagebox-container">
       <!-- 普通类型 -->
        <div v-if="options.type == 'general' " class="messagebox" :style="options.mainStyle" v-bind:class="[visible?'fade-in':'fade-out']">
            <div class="mboxTitle" :style="{backgroundColor:options.titleBgColor}" v-if="options.titleStatus">
                <span>{{message.title}}</span>
                <span class="xbtn" @click="cancle"></span>
            </div>
            <p class="describe" :class="[options.titleStatus?'':'generalNoTitle']">{{message.describe}}</p>
            <p class="mboxFooter" v-bind:class="[message.showButton?'show':'hide']" v-if="options.titleStatus">
                <span class="cancle" v-bind:style="{color:options.buttonColor[0],background:options.buttonBgcolor[0]}" v-text="options.buttonName[0]" @click="cancle"></span>
                <span class="sure" v-bind:style="{color:options.buttonColor[1],background:options.buttonBgcolor[1]}" v-text="options.buttonName[1]" @click="sure" v-if="options.buttonName.length>=2"></span>
            </p>
            <div class="mboxFooter" :style="{height:options.titleStatus?'50px':'40px'}"  v-if="!options.titleStatus">
                <p  v-text="options.buttonName[0]" @click="cancle"></p>
                <p v-text="options.buttonName[1]" @click="sure" v-if="options.buttonName.length>=2"></p>
            </div>
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
                  type:"",
                    mainStyle:{
                      width:'',
                      height:''
                    },
                    titleBgColor:'',
                    titleStatus:false,
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
p{
  margin:0;
  padding:0;
}
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
  background-color: rgba(0,0,0,0.61);
}
.messagebox-container .messagebox {
    background: #fff;
    color: #333;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -200px
}
.messagebox-container .messagebox .mboxTitle {
  box-sizing:border-box;
  font-weight: 700;
  font-size: 18px;
  width:100%;
  height:50px;
  line-height: 37px;
  padding-left: 10px;

}
.messagebox-container .messagebox .mboxTitle .xbtn{
    display:inline-block;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 3px;
    right: 3px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADyUlEQVR4Xs3Z205cdRjG4ZnlYGkK6rRH3kA9NTExnrhptYRoa4GkJcYadTZshgIydICBVrtJsTMFSkuHMqQUKGE3WEqrcg0eeQFeQQ+8Aa0D/g46CVnJ/12szLBmvclz9MGavOv7r6xJJvjO8fetQCCQQAteYAx/ws/5/pV6/IpM6FWJKZTSiM/xB/yYYdxEKe/iLYtBFHsTxjY+ht/yU6mETbPF4DXYE8YmTsIvuYKrhtnfFoNlw/AofsGHqHYGcd0wK+KaxWAC84YyYfyOE6hW0rhlmO3ga2xZDF4ihiVDmXps4TN4nQGMik1EsI6AtadZRGzmDRTQAK+SQsYw+w9xLIJQxDaM4qE4Zps44VGJrGG2i6j9pluw/1EbFgxljuD5AR+zXmTFPIbH9oFlaBxB3lCmDk9wGpVOEpPimYjjEYgoYivTgRnxzKyiEZXKRYyLeUIce4rodOK+2MxTfIFy04Mph+M0C6KKaN3iQ2qxgTMQkbpwV8zbMQcZy8Udyxlmh7GCs3CbhNjELrrVJnQRfYYnxTEruCzTiRyCYlP3IaKKaH3i4q+jgC/hlBimHTb1AKScIlo37ogyazgHUzqQF/MfVAldxL0kxsUzs4TzsCeOaVhi43dBvCgCXBKbOYRlNKOUbzCLoLjeJIiXRYCk+Iodwjqa8BUWXGzY4yJAWnw3qkEBS2L7Q7iDshJCJTKIAAYMZdRNyIDA043oMjew3wyIY+lBEe1HjOAlTPkXSdwGqWYR7S8UxXwHL0D8W6QFq6iFKbVYxgW/FmnFGkJwShCPEfNbkVYsoga2yDKzaPNLkSYs4JBhfhmDoswMItV+jzRjXWziKm6ilIyhzBxqkK/GRpqwKkrcwjWUksUITJlBh9dFzmJJHKcM0rBnFMMwJYeEV0VOYx11hvnPGEJAzPvFjc2h/aCLNGJDbGIcw3DKBAYcjlnioIqcQUG87MZwCfvNbfQ7HLO+Shc5hRXUi02k4DYT6HOYd1eqSAOeoa6MTSiTuCjm99BfbpEGPMFhccdSKDc5dIn5mC6ji5zCmtjElLy4e9Poxa4ok3Jb5CQ2ERbr7kGlcw+dYp7F0H6LfIRnDpvoxUElj4TDeyjlVORTPBUlHlR6E+JzOlAUm7lsKvIJNnDUzUuqipu5gSv2Ih9gSzwTj9AJrzOLuJhfR7pU5D1s401xsSiqlYf4DjuG+Si+tRikxSbm0Y5qZxFtokzMYvC2+Oc4/JI5xAxljlgM1gybiKAIP2UeF2B/af4W2vODSyuCeI4sduHHrOIfDOIYtpH5Hyz/zQ5rSWhDAAAAAElFTkSuQmCC");
    background-position: center center;
    background-repeat: no-repeat;
    -moz-background-size: 15px 15px;
    -webkit-background-size: 15px 15px;
    background-size: 15px 15px;
    z-index: 150;
    cursor:pointer;
}

.messagebox-container .messagebox .describe {
  box-sizing:border-box;
  text-align: left;
  font-size: 14px;
  height:100px;
  padding:10px;

}
.messagebox-container .messagebox .mboxFooter{
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #F6F6F6;
    position: fixed;
    bottom: 0px;
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
.messagebox-container .messagebox div>p {
    width: 79px;
    float: left;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-right: 1px solid #ccc;
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

.generalNoTitle{
  text-align:center!important;
  height:auto!important;
}



</style>
