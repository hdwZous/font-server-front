<template>
  <el-menu theme="dark" class="el-menu-demo header" mode="horizontal" id="headerBar">
    <el-row class="">
      <el-col :span="6" class="headerName"><span class="quan"></span>数据中心</el-col>
      <el-col :span="4" >
        <div style="display:inline-block;">
            <span>欢迎</span>
            <span class="line"></span>
            <span style="padding-right:20px;">产品经理</span>
        </div>
        <span class="accountBg"></span>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link userName">
                {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" ref="dropDown" :class="{mains: isMain}">
              <el-dropdown-item command="change">修改密码</el-dropdown-item>
              <el-dropdown-item command="out" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>     
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
  import {requestLogout} from '../../api/api'
  export default {
    data () {
      return {
        isMain:false
      }
    },
    computed:{
        user:function(){
            return sessionStorage.getItem('user');
        }
    },
    methods:{
        handleCommand(command){
            if (command == 'out') {
                requestLogout().then(res => {
                    if (res.code == 0) {
                        this.$router.push({path:"/login"});
                    }
                })            
            }else {

            }
        }
    },
    mounted(){
        let that = this;
        this.$bus.on('toHeader',function(val){
          if (val == 'main-index') {
            that.isMain = true;
          }else {
            that.isMain = false;
          };
        });

        //读取sessionStorage中的toPath参数，判断用户刷新时，具体页面位置
        var toPath = sessionStorage.getItem('toPath');
        if (toPath == 'main-index') {
          that.isMain = true;
        }else {
          that.isMain = false;
        };
    }
  }
</script>

<style scope>
  #headerBar{
    height: 64px;
    padding:0;
    background: #21283B;
    background-image: url('../../assets/img/headerlogo.png');
    background-size: 40px 39px;
    background-position: 46px 14px;
    background-repeat: no-repeat;
    min-width: 1440px;
  }

  .headerName{
    margin: 23px 0 0 96px;
    font-size: 22px;
    color: #FFFFFF;
    
  }

  .headerName .quan{
    display:inline-block;
    width:5px;
    height:5px;
    border-radius:50%;
    background:#fff;
    margin-right:10px;
    transform:translateY(-100%);
  }

  .line{
    display:inline-block;
    width:10px;
    height:1px;
    background:#fff;
    margin-left:10px;
    margin-right:5px;
    transform:translateY(-500%);
  }

  #headerBar .el-col-4{
    min-width: 290px;
    float: right;
    height:64px;
    font-size: 16px;
  }

  #headerBar .el-col-4 .userName{
    display: inline-block;
    height: 21px;
    padding:22px 0 21px 0;
    color: #fff;
    font-size: 16px;
  }

  #headerBar .el-icon-arrow-down{
    font-size: 12px !important;
  }

  .accountBg{
    display:inline-block;
    width:18px;
    height:18px;
    background:url('../../assets/img/account.png') 0 0/18px 18px no-repeat;
    transform:translateY(20%);
  }

  .userName .el-icon-arrow-down {
    background:url('../../assets/img/triangle.png') 0 0/9px 5px no-repeat;
    width:9px;
    height:7px;
  }

  .userName .el-icon-arrow-down:before{
    content:'';
  }

  .el-dropdown-menu{
    padding-left:15px;
    padding-right:15px;
    border-radius: 4px; 
    color:#3F3F3F;
    letter-spacing: 0.89px;
  }

  .el-dropdown-menu__item--divided {
    border-top:1px dashed #979797;
  }

  .el-dropdown-menu.mains {
    background-color: rgba(30,40,59,.6);
    color: #FFFFFF;
    border:0px;
  }
  .el-dropdown-menu.mains .el-dropdown-menu__item--divided{
    border-top-color:#F9F9F9;
  }

  .el-dropdown-menu.mains .el-dropdown-menu__item--divided:before {
    background-color: rgb(30,40,59);
    height: 0px;
    margin-top: 6px;
  }


</style>

