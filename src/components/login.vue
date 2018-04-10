<template>
  <div class="login">
    <div class="topBg"></div>
    <div class="bottomBg"></div>
    <el-form :model="loginForm" ref="loginForm" class="login-container" @keyup.enter.native="handleSubmit">
      <div class="form-context">
          <div>
              <img src="../assets/img/logo.png" style="width:62px;vertical-align:bottom;"><span class="topDescription">方正手迹数据管理中心</span>
          </div>
          <div style="margin-top:64px;">
              <el-form-item class="inputContext">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名称" @focus="judgef('tel')" @blur="judgeb('tel')"></el-input>
              </el-form-item>
              <div class="form-item-error">{{userErrorContext}}</div>
             
              <el-form-item class="inputContext ">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入登录密码" @focus="judgef('pas')" @blur="judgeb('pas')"></el-input>
              </el-form-item>
              <div class="form-item-error">{{pswErrorContext}}</div>
              
              <div style="height:44px">
                <el-form-item class="ver-code">
                  <el-input type="text" v-model="loginForm.captcha" auto-complete="off" placeholder="请输入验证码" @focus="judgef('code')" @blur="judgeb('code')"></el-input>
                </el-form-item>
                <el-form-item prop="codeUrl" class="imgCode">
                  <img :src="baseRequest" alt="" @click='replaceSrc' style="cursor:pointer" ref="imgCode">
                </el-form-item>
              </div>
              <div class="form-item-error">{{codeErrorContext}}</div>
              
              <el-button type="primary" @click.native.prevent="handleSubmit"  class="loginon">登录</el-button>
          </div>
      </div>
    </el-form>    
  </div>
</template>

<script>
  import {requestLogin} from "../api/api"
  
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          username: '',
          password: '',
          captcha:''
        },
        checked: true,
        userErrorContext: '',
        pswErrorContext: '',
        codeErrorContext:'',
        baseRequest:''
      };
    },
    created(){
        if (process.env.NODE_ENV === 'development') {
            this.baseRequest = 'api/login/captcha.jpg';
        }else {
            this.baseRequest = '/login/captcha.jpg'
        }
    },
    methods: {
      handleSubmit(ev) {
          this.logining = true;
          var blooen = true;
          if (this.loginForm.username == '') {
              this.userErrorContext = '请输入用户名';
              blooen = false;
          }
          if (this.loginForm.password == '') {
              this.pswErrorContext = '请输入密码';
              blooen = false;
          }
          if (this.loginForm.captcha == '') {
              this.codeErrorContext = '请输入验证码';
              blooen = false;
          }
          if (this.loginForm.username != '' && this.loginForm.password != '' && this.loginForm.captcha != '') {
              blooen = true;
          }
          if (!blooen) {
              return false;
          }else {
              requestLogin(this.loginForm).then(res => {
                  if (res.code == 0) {
                      this.logining = false;
                      sessionStorage.setItem('user', this.loginForm.username);
                      sessionStorage.setItem('token',res.data.token);
                      this.$router.push({path:'main'});
                  }else {
                      this.codeErrorContext = res.msg;
                      this.$refs.imgCode.setAttribute('src',this.baseRequest + '?' + new Date().getTime());
                      return false;
                  }
              });
          }
      },
      replaceSrc(){
         this.$refs.imgCode.setAttribute('src',this.baseRequest + '?' + new Date().getTime());
      },
      judgef(type) {
          if (this.logining == false) {
              this.userErrorContext = '';
              this.pswErrorContext = '';
              this.codeErrorContext = '';
          }else {
              switch (type) {
                  case 'tel' :               
                      this.userErrorContext = '';
                      break;
                  case 'pas' : 
                      this.pswErrorContext = '';
                      break;
                  case 'code':
                      this.codeErrorContext = '';
                      break;
                  default : 
                      break;
              };
          }
      },
      judgeb(type) {
          if (this.logining == false) {
              this.userErrorContext = '';
              this.pswErrorContext = '';
              this.codeErrorContext = '';
          }else {
              if (this.loginForm.username == '') {
                  this.userErrorContext = '请输入用户名';
              }
              if (this.loginForm.password == '') {
                  this.pswErrorContext = '请输入密码';
              }
              if (this.loginForm.captcha == '') {
                  this.codeErrorContext = '请输入验证码';
              }
          }
      }
    }
  }

</script>

<style slot-scoped>

  .login{
      width:100%;
      height:inherit;
      position: relative;
  }

  .login .topBg{
      height: 41.66%;
      width: 100%;
      box-sizing: border-box;
      background:#5693E4;
      border-bottom: 1px solid #D9DDE0;
      background-image:url('../assets/img/center.png'),url('../assets/img/righttop.png');
      background-size:425px 263px,377px 206px;
      background-position:10% bottom,right top;
      background-repeat:no-repeat;
  }

  .login .bottomBg{
      height: 58.33%;
      width: 100%;
      background: #F8F9FC;
      background-image:url('../assets/img/left.png'),url('../assets/img/rightbottom.png');
      background-size:170px 343px,482px 216px;
      background-position:left 50%,94% top;
      background-repeat:no-repeat;
  }

  .login-container {
      width: 480px;
      box-sizing: border-box;
      border: 1px solid #E3E3E3;
      border-radius: 4px;
      padding:45px 0;
      background: #FFFFFF;
      position: absolute;
      z-index: 999;
      top:17.5%;
      left: 0;
      right: 0;
      margin:auto;  
  }

  .login-container .form-context {
      width: 360px;
      margin: 0 auto;
  }

  .form-context .topDescription{
      margin-left: 10px;
      font-size: 28px;
      color: #333333;
      letter-spacing: 0.5px;
      font-family: "AdobeHeitiStd-Regular";
  }

  .login-container .inputContext{
      width:100%;
      background: #FFFFFF;
      border-radius: 4px;
      margin-bottom:0;
  }

  .login-container .inputContext .el-input__inner,.ver-code .el-input__inner{
      height:43px;
      padding-left:15px;
  }

  .form-item-error{
      color: #F26B59;
      letter-spacing: 0.86px;
      font-size: 12px;
      line-height: 12px;
      text-align: left;
      margin-top:8px;
      margin-bottom: 35px;
      box-sizing:border-box;
      padding-left:16px;
      background:url('../assets/img/error.png') left top/12px 12px no-repeat;
  }

  .login-container .ver-code{
      width:230px;
      float: left;
      margin-bottom: 0;
  }

  .login-container .imgCode{
      float: left;
      width:115px;
      margin-bottom: 0;
  }

  .login-container .imgCode .el-form-item__content{
      line-height:0;
  }

  .login-container .imgCode img{
      width:100%;
      height:44px;
      margin-left:15px;
      border-radius: 4px;
  }

  .login-container .loginon{
      width:100%;
      height: 45px;
      background: #5092EA;
      border-radius: 4px;
      margin-top:35px;
      border-color: transparent;
  }

  .login-container .loginon:hover{
      background:#3D7FD8;
  }

  .login-container .loginon span{
      font-size: 18px;
      color: #FFFFFF;
      letter-spacing: 1px;
  }

  .login .el-input__inner {
      border:1px solid  #CFCFCF;
      padding-top:0;
      padding-bottom: 0;
}

</style>
