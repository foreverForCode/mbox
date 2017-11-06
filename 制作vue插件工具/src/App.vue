<template>
    <section :class="[options.maskStatus?'messagebox-container':'']">
       <!-- 普通类型 (1.有标题  2.没标题) -->
        <div v-if="options.type == 'general' " class="messagebox" :style="options.mainStyle" :class="[visible?'fade-in':'fade-out']">
            <div class="mboxTitle" :style="{backgroundColor:options.titleBgColor}" v-if="options.titleStatus">
                <span>{{message.title}}</span>
                <span class="xbtn" @click="cancle"></span>
            </div>
            <!-- 普通型的底部 -->
            <p class="describe" :class="[options.titleStatus?'':'generalNoTitle']">{{message.describe}}</p>
            <p class="mboxFooter" v-bind:class="[message.showButton?'show':'hide']" v-if="options.titleStatus">
                <span class="cancle" v-bind:style="{color:options.buttonColor[0],background:options.buttonBgcolor[0]}" v-text="options.buttonName[0]" @click="cancle"></span>
                <span class="sure" v-bind:style="{color:options.buttonColor[1],background:options.buttonBgcolor[1]}" v-text="options.buttonName[1]" @click="sure" v-if="options.buttonName.length>=2"></span>
            </p>
             <!-- 提示型的底部 -->
            <div class="mboxFooter" :style="{height:options.titleStatus?'50px':'40px'}"  v-if="!options.titleStatus">
                <p  v-text="options.buttonName[0]" @click="cancle"></p>
                <p  v-text="options.buttonName[1]" @click="sure" v-if="options.buttonName.length>=2"></p>
            </div>
            
        </div>
        <!-- alert弹框 -->
        <div v-if="options.type == 'alerts' " class="messagebox" :style="options.mainStyle" :class="[visible?'fade-in':'fade-out']">
            <div class="mboxTitle" :style="{backgroundColor:options.titleBgColor}" v-if="options.titleStatus">
                <span>{{message.title}}</span>
                <span class="xbtn" @click="cancle"></span>
            </div>
            
            <p class="describe" :class="[options.titleStatus?'':'generalNoTitle']">{{message.describe}}</p>
            
             <!-- 提示型的底部 -->
            <div class="mboxFooter" :style="{height:options.titleStatus?'50px':'40px'}"  v-if="!options.titleStatus">
                <p  v-text="options.buttonName[0]" @click="cancle" v-if="false"></p>
                <p  class="onlysurebtn" v-text="options.buttonName[1]" @click="cancle" v-if="options.buttonName.length>=2"></p>
            </div>
            
        </div>

       <!-- 成功弹框 -->
        <div class="logolayout" v-if="options.type == 'success'">
          <div class="success"></div>
          <span>保存成功了</span>
        </div>
        <!-- 失败弹框 --> 
        <div class="logolayout" v-if="options.type == 'error'">
          <div class="error"></div>
          <span>保存出错了</span>
        </div>
        <!-- 没有logo弹框 -->
        <div class="logolayout nonesty"  v-if="options.type == 'none'">
          <span>一个没有任何图标的提示</span>
        </div> 
        <!-- loading弹框 -->
        <div class="logolayout" v-if="options.type == 'loading'">
          <div class="loading">
            <span></span>
          </div>
          <span>加载中，请稍后...</span>
        </div>  
        <!-- notice弹框 -->
        <div class="logolayout noticesty"  v-if="options.type == 'notice'">
          <span>5秒后自动消失，点击我也可以自动消失！！！</span>
        </div>    
    </section>
    
</template>

<script>
  export default {
        data() {
            return {
                message:{           // 显示消息内容
                    title:'',       // 显示标题
                    describe:'',    // 主体内容
                    showButton:''   // 按钮名字
                },
                options:{           // 配置选项
                  type:"",          // 弹框类型（根据这个显示不同的弹框！！！）
                    mainStyle:{     // 弹框内容主体css
                      width:'',
                      height:'',
                      marginTop:'',
                      marginLeft:''
                    },
                    maskStatus:true,    // 遮罩层状态
                    titleBgColor:'',    // 标题区背景颜色
                    titleStatus:false,  // 标题区状态
                    buttonName:[],      // 按钮名字数组
                    buttonColor:[],     // 按钮字体颜色
                    buttonBgcolor:[],   // 按钮背景颜色
                    bgColor:'',         
                    cb:function () {    // 确定时回调

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
    left: 50%
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
.messagebox-container .messagebox div>p:nth-child(2){
  color:#0BB20C
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


.logolayout{
    background-color: rgba(0,0,0,.6);
    position: absolute;
    width: 160px;
    height: 102px;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -80px;
    text-align:center;
    color:#fff;
    font-size:14px;
}
.success {
    width: 100%;
    height: 50px;
    text-align: center;
    display: block;
    overflow: hidden;
    position: relative;
    font-size: 16px;
    padding-top:20px;
}

.success:after {
    width: 50px;
    height: 41px;
    display: inline-block;
    content: '';
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABSCAMAAACVH4HWAAACH1BMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9O2oTAAAAtHRSTlMAAQIEBQYHCAkKCw0ODxAREhQVFhcYGRobHB0gISIkJSYnKCkqKy4vMDM1Nzg5Ojw+QEJDREZHSElKTE9VVldYWltdXl9gYWJlZmdoaWprbG5zd3h6e3x9fn+AgoOFhoiJiouNjpCSlJWYmZqbnJ2eoKKjpKaoqausrq+wtLa3ubq7vL2+wcLFxsfIy83Oz9DR0tPV19jZ2tvc3d7f4OHm5+jp6uvs7e7v8PL19/j5+vv8/f6CNheHAAACzElEQVQYGbXBCVtMUQAG4G9KJUok2cmSCNkqIbIURbRIlrIrRAhZUgoJpc1ehKK0yGR8P9CD1F3O3Lkzc877QqlFJTV7A6BUeMkgyYYYKBT3ln81h0CZjYMcVQJVNo/wvyoospvjjkGNPI57MRFKFFNjH5Qoo8YdKFFJjTdhUCD0PjU+L4MC0Y3UcG6AAvM6qbUNCqz4QK0jUGD1ELUuQ4HkAWrVTYB8O35Rqy0c8uVQp38J5DtFneFEyFdGvQxI57hDvQJIN/Eu9cohXVgT9aoh3bwm6rVMg2yxPdTrnQvZ1vdSz5UC2Tb/oMF2yJZBowLIlkOjS5DtEI3qIdtZGrXMgFwBN2j0aT7kCrpHI1ci5Ip+QpNMWAieG+WAdyLbaVIE9yafeD3wpX4LvLH8PU0uwL0FzfzrSjBsS/hKkzoH3Apq5aj2xbBpk5Mm7dPg3n6O6U+BLalOmnTHwcJNapyGDbk0+5kAK1epdXsKPMmjQBYsZVDnXQysXaBAPqxFfqRO31ZYuUaBCnhykAZH4VZoDQVq4Nl9GlSFQSy8gQKdEfBszhcadKyCyMwWCnyMhR2pNBpOhdnCVxRwrYc952hS6oBBfC9FdsGmwGc0eRQFnaQBihTDtqW9NOlaCY2dFLoCL2TQ7HsmxhygUHUAvFFCgVKMKqTQyzB4JeQpBR7OwR9nKNQXBy/F9VOgJwFAOYWcSfBaGoXSUUmxHfDBRYoMtI5Q6DB8EdJIL1yHb5YN0bb6YPgom3Y9j4DPymlPfwx8N+kN7XBthD/WOWnDHvgni54Vwl+V9OQq/BbeTGu1kCB+hFZaoiFDLi18i4EcFXQvGZJM7aA76ZAmmW4UQaJ8CpVDqloKPA6EVLM6adI2HZIl0ag7FtIVUc+1FgrcpU42VJjdRY3jUGMDx12EKof4X50DyhTzn4YIKJTWTdJ1MghKzTj/4NYa+Os3kb93+haplFoAAAAASUVORK5CYII=') no-repeat;
    background-size: 50px 41px;
}
.error {
    width: 100%;
    height: 50px;
    text-align: center;
    margin: 0 auto 10px auto;
    display: block;
    overflow: hidden;
    position: relative;
    padding-top:20px;
    margin-bottom:0px;
}

.error:after {
    width: 40px;
    height: 40px;
    display: inline-block;
    content: '';
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACWFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+SCbtoAAAAx3RSTlMAAQIDBAUGBwgKDA4PEBESExQVFhcYGRobHB4fICEiIyQlJikqLC0uLzAxMjM0NTY3ODo7PD0/QEFCREVGSElLTE1OT1BRUlNUVVlaW1xdXl9iY2RlZ2hpamttbnBxc3R1dnh5fYCBhIeIiouMj5CRk5SVlpeYmZqbnJ2eoKGjpKaoqaqrrLCxsrS1tre4ubq8vb7AwsPFxsfIycrOz9HS09TV1tjZ2tvd3t/g4uPk5efo6err7e7v8PHy8/T19vf4+fr7/P3+xMlmOwAABJZJREFUGBntwf1jTWUAB/Dv2d2u7W5ZjcXMYuJWGFuaSFmW0SIKIRkaFauksCQieemFNBOmWKWZl43ptnXNLp3tOt9/K8bmPM9z7rnnnHv6zeeDhx56yI3w2TVB/M9md5OtVfBLKBeqVXHedbIMfgiu7KiHLH0b7zPqhyJVaa+1kn3FEOX8yAeuLUBqnv+Vd30NQdHvFBwdA+9G7ec9RgnMPqPk5to0eBOsjXHAUQhqein5eQy8KD9Hk3IIpl2hpGe5Breytxs02TYEorxjlB0eAXdmtdEk9joUgTrKIrPhQqjeoEnLBFhZcJMS48MMODWlhWYHs2FtUhtlp4vgSNr6XpoY72lIZNhxyqJz4cCoRpp1vwIbwS8oMz4IIJmKTpq1joe9dXHKDufCVmCTQbPGXCQzt4eyC8/ARv4xCnZkILnJHZTFqpFQeQfNbq+DI4V/UGZs0GBteS/NeirhUO5xKvZmwkLGdgquTYVjmQeoOJkPRd5xClqegAtpn1BxeTwk4csUnHgU7tQalHWVQ/BSNwXfZsKtZXHKbs2HyfI+Cr5Kh3vVOmW338GAtDqKtmjwYlYPFZs09Ms8QNH78Kisi4rPA7jjkUYKjNXwbOLfVOwLAo+fpSD+BlIwvoOKI1njLlHw71ykZFwbFb9EKLgxEykafZFJXJ+GlBVepK1oGXxQeJE2/pkCXxReYkJdk+CTwktMIDoZvilqp6XoVPiouIMWup+FryZEqKqGzyZGqWh+DD77iKrTOfDVUoMWGrPgo0VxWvo+CN/MjzOBbwLwSYXOhL7U4IsXbtHGx/BDeYy2apG6iVHaMxYiVcURJqPPRGoK2imKtFPRU4pU5J2jKFYa7qYiMhbeZTVRZMwDKuNUtObBq2ADJbW4YyVVTVnwRttDyTb020rVoQA82UhJQxD9AoeoqoMXtZT8loP7cpqpWgH3FhoUdY7FoNERKuKVcGumTlF8Fkxm9FHRHYY74SglNRCsoqp9JNwoaKdkFyQ7qWrKgnM5zZQ0DYEkeIqqvRqcCjZQcnUkFCOuULUBDml7KOl9Dham6VQY1XBmI2U1sFRDVawETqygbL8GS9p+qtqHI7nKOCUt2Uggu4WqE0EkUxqjJBZGQuEYVTuQRFGEskWwsZgW3oatnGbKdsHWbqr06bARbKDszxBshc5TFSlEQtoeyvRJSGKyTtWZLCSykYrVSGoNLezTYG0FFd9pSEo7QgvrYakyTlnHMDgw/C+q4hWwUBqjzKiAI1W0EH0SirERKurh0G5aaM2FpKCVigshODS0nRYaAhDkNFNhTIdjLxq08CnMQiep2gwXttLKW3ggq5GqyyG4EGqjBX0GBh2ihdlw5WWq+jY/jUFTrlKxFy7to+xCGcwKzlDSOQwu5XdR9EM2RKGDFC2Ba8so2BKALK2OZqc0uKad4gPGGlhZqnPQ7RJ4UGJwQHwJrE3v5ICd8GQX79OrkUhxC++5ng9P8q+znz4PiQ39if3WwqN3eZdeBTsZO3hHWyY8ymwjqVchiZo4uQSevUnqVUhqzo3WdHiWfj7+Khx4ag5SsGgxVP8B5afAD5V2CgcAAAAASUVORK5CYII=') no-repeat;
    background-size: 40px 40px;
}
.nonesty{
  width:0xp;
  height:auto;
  padding:20px 10px;
}
.loading {
    width: 50px;
    height: 50px;
    margin: 0 auto 10px auto;
    display: block;
    overflow: hidden;
    position: relative;
    padding-top:10px
}
.loading span {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
    -webkit-animation: spinLoading 2s infinite linear;
    animation: spinLoading 2s infinite linear;
    -webkit-background-size: 40px 40px;
    background-size: 40px 40px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMABgn1p+xKKwL73dO/HBIO+J+HWU5FPyIZ8KR3XTnl4cqTbmYn6Nm1nJeMfmJSMc6rj3LFajrKQIEAAAJRSURBVFjD7dfZlqIwEAbgQjYFBAUFZBNxbfd2ut7/1aYlAuGkQcjVnDP9XWKCISl+S2il2sYy2e3XJnAZhjIS+pxr/hFLC4XjBmukbDfQl79E2hT6OmONPIaeVljXex8lrHPgrfF5JR0eVyCmWDd7e2oPsmvilDxtiDUTFdoJH1i4ec8LVxFpxgDahczgQ9MTCAKwvAVS1s9L5g0rn1AYhIZxYpfzhbS9kN/UwJfRUSi/PsjLqrYIdr07P79oZbr4PXuxp2rAJXd02089GRfrjZ3zpfYaRGRE1F53utkcEZP87WQO1UGaNIRG2fcdRg/msrnrXPeubbvAUkT6zHhEZSV8DIBLfJefNZ+eh8BLvaydeAD/J0/dWMAvMhJRvp184GNKSOhX4CFU76G26TVxZtszof4WST1KyJLyGRbssSJ60JlNptiwrCdnV5b2emzY1n99uvJf82TQkeJ2bx7+kBlGLcu0N9XE5oeogCpjKYMeZulikT43zRmVQSJAHwNVHZDF6GQ7TtxBYjqr+zTbwK9/Qhx+2jP+WB/f85JK5+8CVFG8H+enRSoorfV3TBCTI71Opi9c+i1BFpAxAVP2G5nusRpdijEX5pNunXnZTR6YHwc6XKFR0DjGnWDp1KEfDZndvVVtcUyFZzxXh/RZvUJYG7MZNWE7HOGhTUaiMadXmsfxLgZWRM5hVHU4wuFVGRGdx1kQZD8f9HWVavpd+eFfj+xBN5ZvstFNtpWHucVCADyshCotLnuquLnMR1XzzeeL9L+7K/ByJW2rH8fQ7C8vcqaK+hvWxAAAAABJRU5ErkJggg==");
    background-position: center center;
    background-repeat: no-repeat;
}
@-webkit-keyframes spinLoading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spinLoading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.noticesty{
    width: 100%;
    height:auto;
    top: 0;
    left: 0;
    margin-left: 0px;
    margin-top:0px;
    padding:10px 0;
}
.onlysurebtn{
    border: 0px!important;
    width: 400px!important;
    color: #0BB20C;
}

</style>
