<template>
  <div class="font_detail">
    <el-breadcrumb separator=">>">
      <el-breadcrumb-item class="breadnav" :to="{path:'/main/fontManage'}">字体管理</el-breadcrumb-item>
      <el-breadcrumb-item class="breadnav">
        <small>{{font.name}}</small>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-top:30px;">
        <el-col :span="4" style="float:right">
            <el-button type="danger" @click="deleteFont" class="delete">删除</el-button>
            <el-button type="primary" @click="editLink">编辑</el-button>
        </el-col>
    </el-row>
  
    <el-row>
      <el-col :span="20">
        <el-form label-width="120px" label-position="left">
          <el-form-item label="字体名称">
            <p>{{font.name}}</p>
          </el-form-item>
          <el-form-item label="签约字体名">
            <p>{{font.signName}}</p>
          </el-form-item>
          <el-form-item label="所属字体家族">
            <p>{{font.fontFamilyName}}</p>
          </el-form-item>
          <el-form-item label="字体图片包">
            <p><a :href="smallpicZip" v-if="smallpicZip != ''" class="fontFile">{{zipName}}</a></p>
          </el-form-item>
          <el-form-item label="字体文件">
            <p v-if="fontVersion.length > 1">
                <span class="fontFile" style="cursor:text">{{ttfName}}</span>
                <el-button type="primary" @click="exportTTF(fontVersion)" style="margin-left:10px;">下载TTF</el-button>
            </p>
            <p v-else>
                <el-button type="text" @click="exportTTF(fontVersion)">{{ttfName}}</el-button>
            </p>
          </el-form-item>
          <el-form-item label="字体作者">
            <p>{{font.authorName}}</p>
          </el-form-item>
          <el-form-item label="联系方式">
            <p>
              <span>{{font.mobile}}</span>
              <span style="margin-left:20px;" v-if="font.mobile != ''">{{font.email}}</span>
              <span v-else>{{font.email}}</span>
            </p>
          </el-form-item>
          <el-form-item label="字体来源"> 
            <p v-if="font.originType==0">手迹造字</p>
            <p v-if="font.originType==1">方正电子</p>
            <p v-if="font.originType==2">精修制作</p>
            <p v-if="font.originType==3">设计字体</p>
            <p v-if="font.originType==4">字稿收集</p>
          </el-form-item>
          <el-form-item label="字体属性">
            <p class="fontType">
              <span>级别 :</span>
              <el-select v-model="font.level" class="select" disabled>
                <el-option label="体验一" value="0"></el-option>
                <el-option label="体验二" value="1"></el-option>
                <el-option label="体验三" value="2"></el-option>
                <el-option label="初级" value="3"></el-option>
                <el-option label="中级" value="4"></el-option>
                <el-option label="高级" value="5"></el-option>
              </el-select>
            </p>
            <p class="fontType">
              <span>压缩 :</span>
              <el-select v-model="font.compress" class="select" disabled>
                <el-option label="普通" value="0"></el-option>
                <el-option label="压缩" value="1"></el-option>
              </el-select>
            </p>
            <p class="fontType">
              <span>颜色 :</span>
              <el-select v-model="font.color" class="select" disabled>
                <el-option label="常规" value="0"></el-option>
                <el-option label="彩色" value="1"></el-option>
              </el-select>
            </p>
            <p class="fontType">
              <span>方式 :</span>
              <el-select v-model="font.craftsmanshipType" class="select" disabled>
                <el-option label="全自动" value="0"></el-option>
                <el-option label="人工" value="1"></el-option>
              </el-select>
            </p>
            <p class="fontType">
              <span>编码 :</span>
              <el-select v-model="font.characterEncoding" class="select" disabled>
                <el-option label="简体" value="0"></el-option>
                <el-option label="繁体" value="1"></el-option>
                <el-option label="GBK" value="2"></el-option>
                <el-option label="GB18030" value="3"></el-option>
                <el-option label="BIG5" value="4"></el-option>
              </el-select>
            </p>
            <p class="fontType">
              <span>粗细 :</span>
              <el-select v-model="font.bold" class="select" disabled>
                <el-option label="默认" value="0"></el-option>
                <el-option label="超细" value="1"></el-option>
                <el-option label="纤" value="2"></el-option>
                <el-option label="细" value="3"></el-option>
                <el-option label="准" value="4"></el-option>
                <el-option label="中" value="5"></el-option>
                <el-option label="中粗" value="6"></el-option>
                <el-option label="粗" value="7"></el-option>
                <el-option label="大" value="8"></el-option>
                <el-option label="特" value="9"></el-option>
              </el-select>
            </p>
          </el-form-item>
          <el-form-item label="使用方式">
            <el-radio-group v-model="font.useType" disabled>
              <el-radio :label="0">公有</el-radio>
              <el-radio :label="1">私有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="字体样张图" class="pic">
            <a href="javascripe:void(0);" v-for="(pic,index) in font.pics" :key="index" @click="viewBigpic(pic)" v-if="pic.picType == 0">
                <img :src="pic.picFilePath" style="width:100px;height:100px;">
                <p><span>{{pic.picName}}(</span><span>{{pic.width}}*{{pic.longth}})</span></p>
            </a>
          </el-form-item>
          <el-form-item label="质检状态">
            <el-radio-group v-model="font.checkStatus" disabled>
              <el-radio :label="0">未质检</el-radio>
              <el-radio :label="1">质检合格</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="imgVisible" style="background:rgba(0,0,0,0);" class="imgDialog">
      <img :src="bigPicUrl" style="width:auto;height:auto;max-height:100%;max-width:100%;"/>
    </el-dialog>
    <el-dialog :visible.sync="deleteVisible" style="background:rgba(0,0,0,0);" :title="titleContext">
      <p style="text-align:center;">删除该{{titleP}}将影响字体资源在前端展示！</p>
      <div slot="footer" class="dialog-footer" style="height:36px;">
        <el-button @click="deleteVisible = false" style="float:left;">取 消</el-button>
        <el-button type="primary" @click="authSubmit" style="float:right;">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="ttfVisible" style="background:rgba(0,0,0,0);" class="ttfDialog">
        <version-table :versionsList="fontVersion"></version-table>
    </el-dialog>
  </div>
</template>
<script>
  import {getFontDetail,delFont,getFontResource} from '../../api/api'
  import versionTable from '../fontManage/versionsTable'
  export default {
    data() {
      return {
        fontId: this.$route.params.fontId,
        smallpicZip: '',
        font: {},
        imgVisible:false,
        deleteVisible:false,
        bigPicUrl: '',
        titleContext: '',
        titleP:'',
        ttfVisible: false,
        //字体版本信息
        fontVersion:'',
        zipName:'',
        ttfName:''
      }
    },
    created() {
      var params = {
        fontId: this.fontId
      };
      //获取字体图片包资源
      getFontResource(params).then(res => {
          //如果存在图片包
          if (res.data.smallpicZipfilePath) {
              this.smallpicZip = res.data.smallpicZipfilePath;
          };
      });
      //获取详情页的相关信息
      getFontDetail(params).then(response => {
        console.log(response)
        if (response.code == 0) {
          //当前字体的相关信息
          this.font = response.data;
          this.font.level = this.font.level + '';
          this.font.compress = this.font.compress + '';
          this.font.color = this.font.color + '';
          this.font.craftsmanshipType = this.font.craftsmanshipType + '';
          this.font.characterEncoding = this.font.characterEncoding + '';
          this.font.bold = this.font.bold + '';

          this.fontVersion = response.data.versions;

          //获取图片的名字
          response.data.pics.forEach(item => {
              item.picName = this.getResourceName(item.picFilePath);
          });

          this.zipName = this.getResourceName(this.font.smallpicZipfilePath);
          this.ttfName = this.getResourceName(this.fontVersion[this.fontVersion.length-1].ttfFilePath);
        }
      })
    },
    methods: {
      editLink: function () {
        this.$router.push({path: "/main/fontManage/updateFont/" + this.fontId});
      },
      exportTTF(versions){
          if (versions.length > 1) {
              this.ttfVisible = true;
          }else {
              //请求下载ttf
              var params = {
                  fontId: versions[0].fontId,
                  versionId: versions[0].fontVersionId
              };
              getFontResource(params).then(res => {
                  window.location.href = res.data.ttf;
              });
          }
      },
      deleteFont(){
          if (this.font.originType == 0) {
              this.$message.error('手迹造字的字体不允许删除')
          }else {
              this.titleContext = '确认删除字体《' + this.font.name + '》？';
              this.titleP = '字体';       
              this.deleteVisible = true;
          }       
      },
      //展示大图
      viewBigpic(pic) {
          this.imgVisible = true;
          this.bigPicUrl = pic.picFilePath;
      },
      //确定删除字体
      authSubmit(){
          var params = {
              fontId: Number(this.fontId)
          }
          delFont(params).then(res => {
              if (res.code == 0) {
                  this.$router.push({path:'/main/fontManage'});
              }else {
                  this.$message.error(res.msg);
              }
          });
      },
      //封装获取资源名字的函数
      getResourceName(path){
          var str = path.substr(path.lastIndexOf('/') + 1);
          if (str.indexOf('_') != -1) {
              str = str.substring(0,str.indexOf('_')) + str.substr(str.length-4).toLowerCase();
          }else {
              str = str.substring(0,str.length-4) + str.substr(str.length-4).toLowerCase();
          }
          return str;
      }
    },
    components:{
      versionTable
    }
  }
</script>

<style slot-scope>
  .font_detail .pic a {
      display: inline-block;
      width: 150px;
      height: 120px;
      text-align: center;
      margin-right: 30px;
      text-decoration: none;
      color: #000;
  }
  .font_img{
    width:100px;
    height:100px;
    border-radius: 10px;
    margin-right:20px;
  }

  .font_detail .imgDialog .el-dialog--small{
      display: inline-block;
      width: 600px;
      height: 500px;;
  }

  .font_detail .ttfDialog .el-dialog--small{
      width: 600px;
  }

  .font_detail .imgDialog .el-dialog__header,.font_detail .ttfDialog .el-dialog__header{
      display: none;
  }

  .font_detail .el-button--primary{
    width:90px;
    height: 34px;
    border-color:#4DAEF1;
    color:#4DAEF1;
    background:#fff;
  }

  .font_detail .delete{
    border-color:red;
  }

  .font_detail .el-button--primary:hover{
    background: #4DAEF1;
    color:#fff;
  }

  .font_detail .el-form-item__label{
    font-size: 16px;
    color:#333;
  }

  .font_detail .el-button--mini{
    border: 1px solid #4daef1;
    color: #4DAEF1;
    background-color: transparent;
  }

  .font_detail .el-button--mini:hover{
    border: 1px solid #4daef1;
    color: #4DAEF1;
    background-color: transparent;
    cursor: text;
  }

  .font_detail .pic .el-form-item__label{
    margin-top:25px;
  }

  .font_detail .fontFile{
    color:#4DAEF1;
    cursor: pointer;
    text-decoration: none;
  }

  .font_detail .fontFile:hover{
    color:#1C8DDC;
  }

  .font_detail .select{
      margin-left:5px;
      width: 50%;
  }

  .font_detail .fontType{
      width:16.3%;
      display:inline-block;
  }

  .font_detail .fontType span{
      font-size:16px;
      color:#333;
  }
</style>
