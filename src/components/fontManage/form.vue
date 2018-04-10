<template>
  <div style="margin-top:30px;" id="font-form">
    <el-row>
      <el-col :span="24">
        <el-form ref="fontForm" :model="fontForm" label-width="120px" label-position="left" :rules="rules" id="formContent">
          <el-form-item label="字体名称" prop="name">
            <p v-if="fontForm.originType == 0 && fontId != 'new'">{{fontForm.name}}</p>
            <el-input v-else :span="6" v-model="fontForm.name" style="width:390px;height:35px;" placeholder="请输入字体名称"></el-input>
          </el-form-item>
          <el-form-item label="签约字体名" prop="signName">
            <el-input :span="6" v-model="fontForm.signName" style="width:390px;height:35px;" placeholder="请输入字体名称"></el-input>
          </el-form-item>
          <el-form-item label="所属字体家族">
            <el-autocomplete
              v-model="fontForm.fontFamilyName"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              icon="search"
              style="width:390px;height:35px;">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="字体图片包" prop="smallpicZipfilePath" name="file">
            <span class="file_name" v-if="picFileName == ''">未选择任何文件</span>
            <span class="file_name" v-else-if="picFileName != '' && fontId == 'new'" style="margin-right:35px;">{{picFileName}}</span>
            <span class="file_name download" v-else style="margin-right:35px;" @click="extortZip">{{picFileName}}</span>
            <div v-if="fontId == 'new' || (fontForm.originType != 0 && fontId != 'new')">
              <el-upload
                class="upload-file"
                :action="actionZip"
                :headers="headers"
                :on-success="handleFileSuccess"
                :before-upload="beforeFileUpload"
                :limit="1"
                ref="fileUpload">
                <el-button size="small" type="primary" v-if="fontId == 'new'">选择文件</el-button>
                <el-button size="small" type="primary" v-else="fontForm.originType != 0 && fontId != 'new'">更新</el-button>
              </el-upload>
            </div>
            <el-input v-model="fontForm.smallpicZipfilePath" style="display:none;"></el-input>
          </el-form-item>
          <el-form-item label="字体文件" name="file" style="position:relative;">
            <div v-if="fontId == 'new'">
              <span class="file_name" v-if="ttfFileName == ''">未选择任何文件</span>
              <span class="file_name" v-else-if="ttfFileName != '' && fontId == 'new'" style="margin-right:35px;">{{ttfFileName}}</span>
              <el-upload
                class="upload-ttf"
                :action="actionTtf"
                :headers="headers"
                :on-success="handlettfSuccess"
                :before-upload="beforettfUpload"
                :limit="1"
                ref="ttfUpload">
                <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
              <div style="position:absolute;top:0;left:300px;">
                <el-form-item style="display:inline-block;">
                  <span>V</span>
                  <el-input v-model="fontForm.versions[0].versionName" style="width:300px;" @blur="checkVersions"></el-input>
                </el-form-item>
                <el-form-item style="display:inline-block;">
                  <el-input v-model="fontForm.versions[0].upgradeReason" style="width:300px;margin-left:35px;"></el-input>       
                </el-form-item>        
              </div>
            </div>
            <div v-else-if="fontForm.originType != 0 && fontId != 'new'" v-for="(item,index) in upVersion" :key="index" style="position:relative;margin-top:10px;">
              <span class="file_name" v-if="item.ttfFileName == ''">未选择任何文件</span>
              <span class="file_name" v-else-if="item.ttfFileName != '' && fontId != 'new'" style="margin-right:35px;">{{item.ttfFileName}}</span>
              <el-upload
                class="upload-ttf"
                :action="actionTtf"
                :headers="headers"
                :on-success="handlettfSuccess"
                :before-upload="beforettfUpload"
                :limit="1"
                :ref="index">
                <el-button size="small" type="primary" @click="getNum(index)">选择文件</el-button>
              </el-upload>
              <div style="position:absolute;top:0;left:270px;">
                <el-button size="small" type="primary" @click="updateVersion(item,index)">更新</el-button>
                <el-form-item style="display:inline-block;">
                  <span>V</span>
                  <el-input v-model="item.versionName" style="width:300px;" @blur="checkVersions"></el-input>
                </el-form-item>
                <el-form-item style="display:inline-block;">
                  <el-input v-model="item.upgradeReason" style="width:300px;margin-left:35px;"></el-input>       
                </el-form-item>        
              </div>
            </div>
            <div v-else>
              <p v-if="fontForm.versions.length > 1">
                <span class="fontFile" style="cursor:text">{{upVersion[0].ttfFileName}}</span>
                <el-button type="primary" @click="exportTTF(fontForm.versions)" style="margin-left:10px;">下载TTF</el-button>
              </p>
              <p v-else>
                  <el-button type="text" @click="exportTTF(fontForm.versions)">{{upVersion[0].ttfFileName}}</el-button>
              </p>
            </div>
            <el-button size="small" type="primary" @click="ttfVisible = true" v-if="fontId != 'new' && fontForm.originType != 0">查看历史版本</el-button>
            <el-button size="small" type="primary" v-if="fontId != 'new' && fontForm.originType != 0" @click="addNewVersion">+增加新版本</el-button>
          </el-form-item>
          <el-form-item label="字体作者" prop="authorName">
            <p v-if="fontForm.originType == 0 && fontId != 'new'">{{fontForm.authorName}}</p>
            <el-input v-else :span="6" v-model="fontForm.authorName" style="width:390px;height:35px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile">
            <p v-if="fontForm.originType == 0 && fontId != 'new'">
              <span>{{fontForm.mobile}}</span>
              <span style="margin-left:20px;" v-if="fontForm.mobile != ''">{{fontForm.email}}</span>
              <span v-else>{{fontForm.email}}</span>
            </p>
            <div v-else>
              <el-input v-model="fontForm.mobile" style="width:280px;height:35px;" placeholder="请输入作者手机号"></el-input>
              <span style="margin:0 15px;">或</span>
              <div style="position:relative;display:inline-block;">
                <el-input 
                    v-model="fontForm.email"
                    @change="emailValue" 
                    style="width:280px;height:35px;" 
                    placeholder="请输入作者邮箱">
                </el-input>
                <transition name="fade">
                  <div class="emailList" v-if="emailList.length !=0">
                    <li v-for="(item,index) in emailList" :key="index" @click="handleSelect(item)">{{item}}</li>
                  </div>
                </transition>
              </div>
              <span style="margin-left:10px;">若无联系方式可不填</span>
            </div>
          </el-form-item>
          <el-form-item label="字体来源" prop="originType">
            <span v-if="fontForm.originType == 0 && fontId != 'new'">手迹造字</span>
            <el-select v-else v-model="fontForm.originType" placeholder="--请选择--" style="width:120px;height:28px;">
              <el-option label="方正电子" value="1"></el-option>
              <el-option label="精修制作" value="2"></el-option>
              <el-option label="设计字体" value="3"></el-option>
              <el-option label="字稿收集" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体属性">
            <span style="font-size:16px;color:#333;">级别 :</span>
            <el-select v-model="fontForm.level" style="margin-left:10px;width:100px;" class="select" :disabled="disabledTrue">
              <el-option label="体验一" value="0"></el-option>
              <el-option label="体验二" value="1"></el-option>
              <el-option label="体验三" value="2"></el-option>
              <el-option label="初级" value="3"></el-option>
              <el-option label="中级" value="4"></el-option>
              <el-option label="高级" value="5"></el-option>
            </el-select>
            <span style="margin-left:36px;font-size:16px;color:#333;">压缩 :</span>
            <el-select v-model="fontForm.compress" style="margin-left:10px;width:100px;" class="select" :disabled="disabledTrue">
              <el-option label="普通" value="0"></el-option>
              <el-option label="压缩" value="1"></el-option>
            </el-select>
            <span style="margin-left:36px;font-size:16px;color:#333;">颜色 :</span>
            <el-select v-model="fontForm.color" style="margin-left:10px;width:100px;" class="select" :disabled="disabledTrue">
              <el-option label="常规" value="0"></el-option>
              <el-option label="彩色" value="1"></el-option>
            </el-select>
            <span style="margin-left:36px;font-size:16px;color:#333;">方式 :</span>
            <el-select v-model="fontForm.craftsmanshipType"  style="margin-left:10px;width:100px;" class="select" :disabled="disabledTrue">
              <el-option label="全自动" value="0"></el-option>
              <el-option label="人工" value="1"></el-option>
            </el-select>
            <span style="margin-left:36px;font-size:16px;color:#333;">编码 :</span>
            <el-select v-model="fontForm.characterEncoding"  style="margin-left:10px;width:100px;" class="select" :disabled="disabledTrue">
              <el-option label="简体" value="0"></el-option>
              <el-option label="繁体" value="1"></el-option>
              <el-option label="GBK" value="2"></el-option>
              <el-option label="GB18030" value="3"></el-option>
              <el-option label="BIG5" value="4"></el-option>
            </el-select>
            <span style="margin-left:36px;font-size:16px;color:#333;">粗细 :</span>
            <el-select v-model="fontForm.bold"  style="margin-left:10px;width:100px;" class="select" :disabled="disabledTrue">
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
          </el-form-item>
          <el-form-item label="使用方式" prop="useType">
            <el-radio-group v-model="fontForm.useType" :disabled="disabledTrue">
              <el-radio :label="0">公有</el-radio>
              <el-radio :label="1">私有</el-radio>
            </el-radio-group>
          </el-form-item>

          <div style="padding-top:30px;" id="addImg">            
            <el-form-item label="字体样张图">
              <form action="" id="demoForm">
                <a class="img_wrap" v-if="img.picFilePath" v-for="(img,index) in demoPic" :key="index" style="position:relative;">
                  <span class="close_icon" @click="deleteDemoImg(index)"></span>
                  <img :src="img.picFilePath" class="img" @click="viewBigpic(img)">
                  <p class="picContext">
                    <span>{{img.picName}}(<span>{{img.width}}*{{img.longth}})</span></span>
                  </p>
                </a>
                <a href="javascript:;" class="img_file">
                  <input id="demo" type="file" name="file" @change="uploadDemo"/>
                </a>
              </form>
            </el-form-item>
          </div>
          <el-form-item label="质检状态" prop="checkStatus">
            <el-radio-group v-model="fontForm.checkStatus">
              <el-radio :label="0">未质检</el-radio>
              <el-radio :label="1">质检合格</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin:30px 0 40px;">
            <p style="text-align:center" class="cancelAndcomp">
              <el-button type="primary" @click="submit">完成</el-button>
            </p>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="imgVisible" style="background:rgba(0,0,0,0);" class="imgDialog">
      <img :src="bigPicUrl" style="width:auto;height:auto;max-height:100%;max-width:100%;"/>
    </el-dialog>
    <el-dialog :visible.sync="ttfVisible" style="background:rgba(0,0,0,0);" class="ttfDialog">
        <version-table :versionsList="fontVersion"></version-table>
    </el-dialog>
  </div>
</template>
<script>
  import {getFontFamily, uploadImage, addFont, checkName, getFontDetail, getFontResource, addFontVersion, updateFontVersion, updateFontDetail} from '../../api/api'
  import versionTable from '../fontManage/versionsTable'
  import Vue from 'vue'
  export default {
    data() {
      //自定义表单验证规则
      var ckeckName = (rule, value, callback) => {
          if (!value) {
              callback(new Error('字体名称不能为空'));
          }else if (value.length > 10) {
              callback(new Error('字体名称不得超过10个字'));
          }else {
              var regex = /[\u4E00-\u9FA5]/ ,
                  blooen = true;
              for (var i=0; i<value.length; i++) {
                  if (!regex.test(value[i])) {
                      blooen = false;
                      break;
                  };
              }
              if (!blooen) {
                  callback(new Error('字体名称只能为中文'))
              }else {       
                   callback();                    
              };        
          };
      };
      var checkSignName = (rule, value, callback) => {
          if (value != undefined && value.length > 10) {
              callback(new Error('签约字体名称不得超过10个字'));
          }else {
              callback();
          }
      };
      var checkTel = (rule, value, callback) => {
          if (value) {
              var regex = /^(13[0-9]|14[579]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
              if (!regex.test(value)) {
                  callback(new Error('手机号格式错误'));
              }else {
                  callback();
              }
          }else {
              callback();
          }
      };
      var checkFileName = (rule, value, callback) => {
          if (!value) {
              callback(new Error('字体图片包不能为空'));
          }else {      
              callback();
          }
      };
      var checkTTf = (rule, value, callback) => {
          // if (!value) {
          //     callback(new Error('字体图片包不能为空'));
          // }else {      
          //     callback();
          // }
      };
      return {
        dialogImageUrl: '',
        fontForm: {},
        restaurants: [],  //搜索家族名称的本地资源
        emailList: [],
        rules: {
          name: [
            {required:true, validator: ckeckName, trigger: 'blur'}
          ],
          signName : [
            {validator: checkSignName, trigger: 'blur'}
          ],
          smallpicZipfilePath: [
            {required:true,validator: checkFileName, trigger: 'change'}
          ],
          versions: [
            {required: true, validator: checkTTf, trigger: 'change'},
          ],
          authorName: [
            {required: true, message: '请输入字体作者', trigger: 'blur'},
          ],
          mobile: [
            {validator: checkTel, trigger:'blur'}
          ],
          originType: [
            {required: true, message: '请选择字体来源', trigger: 'change'}
          ],
          useType: [
            {required: true},
          ],
          checkStatus: [
            {required: true}
          ]
        },
        ttfFileName: "",//ttf文件名称
        picFileName:'', //图片包文件名称
        email:['@163.com','@126.com','@yahoo.com','@qq.com','@sina.com','@gmail.com','@hotmail.com','@foxmail.com'],
        imgVisible:false,
        ttfVisible:false,
        bigPicUrl:'',
        demoPic:[],
        //历史字体版本信息
        fontVersion:[],
        //适用于更新字体详情的存储版本信息数组
        upVersion:[],
        nIndex:'',
        //判断当前环境为线上/开发 替换请求地址
        actionZip:'',
        actionTtf:'',
        headers:{
          token:''
        },
        disabledTrue:false
      }
    },
    props: ['fontId'],
    created(){
      this.upVersion = [];   //初始化
      if (this.fontId != "new") {
        this.getFontInfo(this.fontId);
      } else {
        this.fontForm = {
          name: '',
          signName: '',
          fontFamilyName: '',
          smallpicZipfilePath:'',
          versions:[{
            ttfFilePath:'',
            upgradeReason:'',
            versionName:''
          }],
          authorName: '',
          mobile: '',
          email: '',
          originType: '',
          level:'3',
          compress:'0',
          color: '0',
          craftsmanshipType: '1',
          characterEncoding: '0',
          bold: '0',
          useType: 0,
          checkStatus:0,
          pics: [],
        }
      };

      //获取所有家族名称与id
      getFontFamily().then(res => {
          for (var i in res.data) {
              this.restaurants.push({
                  value: res.data[i],
                  id: i
              });
          }
      });

      //判断当前环境为开发/生产
      if (process.env.NODE_ENV === 'development') {
          this.actionZip = 'api/file/uploadFile';
          this.actionTtf = 'api/file/uploadTtf'
      }else {
          this.actionZip = '/file/uploadFile';
          this.actionTtf = '/file/uploadTtf'
      };

      //获取token
      this.headers.token = sessionStorage.getItem('token');
    },
    methods: {
      //下载字体图片包
      extortZip() {
        var params = {
            fontId: this.fontForm.fontId
        };
        getFontResource(params).then(res => {
          //如果存在图片包
          if (res.code == 0) {
              window.location.href = res.data.smallpicZipfilePath;
          };
        });
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
          };
      },
      //获取字体信息详情
      getFontInfo(id){
        getFontDetail({fontId: id}).then(response => {
          if (response.code == 0) {
            this.demoPic = [];
            this.fontForm = response.data;
            //转换字体属性值为字符串类型，以便多选菜单识别
            this.fontForm.level = this.fontForm.level + '';
            this.fontForm.originType = this.fontForm.originType + '';
            this.fontForm.compress = this.fontForm.compress + '';
            this.fontForm.craftsmanshipType = this.fontForm.craftsmanshipType + '';
            this.fontForm.characterEncoding = this.fontForm.characterEncoding + '';
            this.fontForm.bold = this.fontForm.bold + '';
            this.fontForm.color = this.fontForm.color + '';
            // this.picFileName = this.fontForm.name + '.zip';
            // this.ttfFileName = this.fontForm.name + '.ttf';
            this.fontVersion = response.data.versions;
            this.picFileName = this.getResourceName(this.fontForm.smallpicZipfilePath);
            this.ttfFileName = this.getResourceName(this.fontVersion[this.fontVersion.length-1].ttfFilePath);
            response.data.pics.forEach(item => {
                if (item.picType == 0) {
                    this.demoPic.push(item);
                }
            });

            //获取图片的名字
            this.demoPic.forEach(item => {
                var str = item.picFilePath.substr(item.picFilePath.lastIndexOf('/') + 1);
                item.picName = str.substring(0,str.indexOf('_')) + str.substr(str.length-4).toLowerCase();
            });

            //在upVersion中存储版本号中最新的版本信息
            this.upVersion.push(response.data.versions[response.data.versions.length - 1]);
            this.upVersion[0].ttfFileName = this.ttfFileName;
            
            if (this.fontForm.originType == 0) {
                this.disabledTrue = true;
            };
          }
        })
      },
      //提交新增字体
      submit() {
        this.$refs.fontForm.validate((valid) => {
          //如果表单基本内容都已填写
          // var regex = /^[0-9a-zA-z]+((@163.com)|(@126.com)|(@qq.com)|(@yahoo.com)|(@sina.com)|(@gmail.com)|(@hotmail.com)|(@foxmail.com))$/;
          var regex = /[A-Za-z1-9]+([-_.]?[A-Za-z\d]+)*@([A-Za-z\d]+[-.])[A-Za-z\d]{2,5}/;
          if (valid) {
            if (this.fontForm.email) {
                if (!regex.test(this.fontForm.email)) {
                    this.$message.error('邮箱格式错误');
                    return;
                };
            };
            if (this.fontId != 'new') {            
              this.fontForm.versions.splice(this.fontForm.versions.length-1,1)
              this.fontForm.versions = this.fontForm.versions.concat(this.upVersion)         
              updateFontDetail(this.fontForm).then((response) => {
                if (response.code == 0) {
                  this.$router.push({path: '/main/fontManage'})
                }
              })
            }else {
              addFont(this.fontForm).then((response) => {
                if (response.code == 0) {
                  console.log(response);
                  this.$router.push({path: '/main/fontManage'})
                } else if (response.code == 500) {
                  this.$message.error(response.msg);
                }
              })
            }
          }
        });
      },
      //上传zip图片包
      beforeFileUpload(file){
          this.$refs.fileUpload.$el.setAttribute('class','upload-file');
          var fileType = file.name.substring(file.name.length - 3),
              fileSize = file.size / 1024 / 1024;
          if (fileType.toLowerCase() != 'zip') {
              this.$message.error('字体图片包格式错误');
              return false;
          }else if (fileSize > 150) {
              this.$message.error('上传的文件大于150MB,超过上限');
              return false;
          }
      },
      handleFileSuccess(res, file){
          if (res.code == 0) {
              this.picFileName = file.name;
              this.fontForm.smallpicZipfilePath = res.data.uri;
              this.$refs.fileUpload.$el.setAttribute('class','upload-file success');
          } else {
              this.$message.error('上传失败');
            }
      },
      //上传ttf文件
      beforettfUpload(file){
          // this.$refs[this.nIndex].$el.setAttribute('class','upload-ttf');
          console.log(this.nIndex);
          var fileType = file.name.substring(file.name.length - 3),
              fileSize = file.size / 1024 / 1024;
          if (fileType.toLowerCase() != 'ttf') {
              this.$message.error('字体文件格式错误');
              return false;
          }else if (fileSize > 50) {
              this.$message.error('上传的文件大于50MB,超过上限');
              return false;
          }
      },
      handlettfSuccess(res, file){
          if (res.code == 0) {
              if (this.fontId == 'new') {
                  this.ttfFileName = file.name;
                  this.fontForm.versions[0].ttfFilePath = res.data.uri;
                  this.fontForm.versions[0].ttfFileSize = res.data.size;              
              }else {
                  // Vue.set(this.upVersion[this.nIndex],'ttfFileName',file.name);
                  this.upVersion[this.nIndex].ttfFileName = file.name;
                  this.upVersion[this.nIndex].ttfFilePath = res.data.uri;
                  this.upVersion[this.nIndex].ttfFileSize = res.data.size;
                  this.$forceUpdate();
              }
              // this.$refs[this.nIndex].$el.setAttribute('class','upload-ttf success');
          } else {
              this.$message.error('上传失败');
          }
      },
      getNum(index) {
          this.nIndex = index;
      },
      //更新版本
      updateVersion(item,index) {
          var params = item;
          if (index == 0) {
              updateFontVersion(params).then(res => {
                  if (res.code != 0) {
                      this.$message.error(res.msg);
                  };
              });
          }else {
              addFontVersion(params).then(res => {
                  if (res.code != 0) {
                      this.$message.error(res.msg);
                  };
              });
          };
      },
      //增加新版本
      addNewVersion() {
          this.upVersion.push({
              ttfFilePath:'',
              upgradeReason:'',
              versionName:'',
              ttfFileName:'',
              ttfFileSize: '',
              fontId:this.fontId
          })
      },
      //上传样张图片
      uploadDemo(e){
        var inputForm = document.getElementById("demoForm");
        var formData = new FormData(inputForm);
        var fileName = e.target.files[0].name;
        var fileType = e.target.files[0].name.substring(e.target.files[0].name.length - 3); 
        var longth = '',width = '';
        //获取图片的宽高
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(theFile) {
        　　var image = new Image();
            image.src = theFile.target.result;
            image.onload = function() {
              width = this.width;
              longth = this.height;
          };
        };
        inputForm.reset();    
        if (fileType == 'jpg' || fileType == 'png') {//校验文件格式
            uploadImage(formData).then((response) => {
              if (response.code == 0) {            
                this.fontForm.pics.push({
                  picType: "0",
                  picFilePath: response.data.uri,
                  longth:longth,
                  width:width
                });
                this.demoPic.push({
                  picType: "0",
                  picFilePath: response.data.url,
                  longth:longth,
                  width:width,
                  picName:fileName
                })
              } else {
                this.$message.error('上传失败');
                return;
              }
            })
        }else {
            this.$message.error("字体样张图格式错误");
            return;
        }   
      },
      deleteDemoImg(index){
        this.fontForm.pics.splice(index, 1);
        this.demoPic.splice(index,1);
      },

      //搜索家族名称的方法
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = [];
        if (queryString) {
            results = restaurants.filter(this.createFilter(queryString));
            if (results.length > 5) {
                results = results.slice(0,5);
            };
            if (results.length == 0) {
                results = [{value:'未找到搜索结果'}];
            };
        };
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      //自动弹出邮箱后缀
      emailValue() {
          //输入邮箱时，往emaillist里插入值（输入框值+后缀）
          this.emailList = [];
          if (!this.checkEmail(this.fontForm.email) && this.fontForm.email != '') {
              this.email.forEach(item => {
                  var str = this.fontForm.email + item;
                  this.emailList.push(str);
              });
          }else {
              var emailBefore = this.fontForm.email.split('@')[0],
                  emailAfter = '@' + this.fontForm.email.split('@')[1];
              this.email.forEach(item => {
                  if (item.indexOf(emailAfter) != -1) {
                      var str = emailBefore + item;;
                      this.emailList.push(str);
                  }
              });
          }         
      },
      handleSelect(value) {
          this.fontForm.email = value;
          this.emailList = [];
      },
      //检查输入框中输入的字符是否包含@
      checkEmail(value) {
          if (value.indexOf('@') != -1) {
              return true;
          }else {
              return false;
          }
      },
      //检查版本号
      checkVersions(){
          var value = this.fontForm.versions[0].versionName;
          if (!value) {
              this.$message.error('版本号不能为空');
          }else {
              if (value.length > 5) {
                  this.$message.error('版本号最多5个字符');
              }else {
                  var blooen = true;
                  for (var i=0; i<value.length; i++) {
                      if (!/\d/.test(value[0])) {
                          blooen = false;
                          break;
                      }
                      if (value[i] == '.' && value[i+1] == '.' && i < 4) {
                          blooen = false;
                          break;
                      }
                  }
                  if (!blooen) {
                    this.$message.error('版本号格式错误')
                  } 
              }
          }
      },
      //展示大图
      viewBigpic(pic) {
          this.imgVisible = true;
          this.bigPicUrl = pic.picFilePath;
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
    components: {
      versionTable
    }
  }
</script>
<style scope>
  .file {
    position: relative;
    display: inline-block;
    width:64px;
    height:20px;
    border: 1px solid #4DAEF1;
    border-radius: 4px 3px 3px 3px;
    text-align: center;
    overflow: hidden;
    color: #4DAEF1;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    float: left;
    font-size: 12px;
    margin-top:5px;
  }

  .file:hover{
    background:#4DAEF1;
    color:#fff;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .file_name {
    float: left;
    display: inline-block;
    line-height: 30px;
    margin-right: 10px;
  }

  .file_name.download {
    color:#4DAEF1;
    cursor: pointer;
  }

  .file_name.download:hover{
    color:#1C8DDC;
  }

  .tip {
    float: left;
    display: inline-block;
    line-height: 30px;
    margin-left: 10px;
    color: #97a8be;
  }

  /* upload上传控件 */
  .upload-file, .upload-ttf {
      width: 300px;
  }

  .upload-file.success .el-upload-list,.upload-ttf.success .el-upload-list{
      display: none;
  }

  .ttf-error{
    position: absolute;
    top:100%;
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    left:0;
  }

  .img_file {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    background:#F3F3F3 url('../../assets/img/add3.png') 0 center/100% auto no-repeat;
  }

  .img_file:hover{
    background:#F3F3F3 url('../../assets/img/add4.png') 0 center/100% auto no-repeat;
  }

  /* .img_wrap+.img_file{
    margin-left:65px;
  } */

  .img_file input {
    width:100px;
    height:100px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }

  .close_icon {
    position: absolute;
    display: block;
    width: 22px;
    height: 22px;
    background:url('../../assets/img/closeg.png') 0 center/100% auto no-repeat;
    right: -20px;
    top: -20px;
    cursor: pointer;
    border-radius: 50%;
  }

  #addImg .el-form-item__label{
    width:80px;
    height: 21px;
    line-height: 21px;
    font-size: 16px;
    color: #6E6E6E;
    padding:0;
    margin-top:35px;
  }

  #addImg .img_wrap{
    position: relative;
    display: inline-block;
    width:100px;
    height: 100px;
    /* border:1px solid #f3f3f3; */
    border-radius: 10px;
    margin-right: 65px;
  }

  .img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  #formContent .el-form-item__label{
    font-size: 16px;
    padding-left:12px;
  }

  #formContent .el-form-item.is-required .el-form-item__label{
    padding-left:0;
  }

  .goOrfinish .el-button--primary{
    width:150px;
    height: 34px;
    background:#fff;
    border-color:#4DAEF1;
    color:#4DAEF1;
  }

  .goOrfinish .el-button--primary:hover{
    background:#4DAEF1;
    color:#fff;
  }

  .goOrfinish .el-button--text{
    color:#4DAEF1;
  }

  .goOrfinish .el-button--text:hover{
    color:#1C8DDC;
  }

  #formContent .font-tag{
    border: 1px solid #4daef1;
    color:#4DAEF1;
    background-color:transparent;
  }

  .cancelAndcomp .el-button--default,.cancelAndcomp .el-button--primary{
    width:90px;
    height:34px;
    border-color:#4DAEF1;
    color:#4DAEF1;
  }

  .cancelAndcomp .el-button--default:hover{
    border-color:#4DAEF1;
    background:#4DAEF1;
    color:#fff;
  }

  .cancelAndcomp .el-button--primary{
    color:#fff;
    background: #4DAEF1;
  }

  .emailList{
      width: 280px;
      position: absolute;
      top:40px;
      right:0;
      transform-origin: center top 0px;
      z-index:9999;
      margin: 5px 0;
      box-shadow: 0 0 6px 0 rgba(0,0,0,.04), 0 2px 4px 0 rgba(0,0,0,.12);
      max-height: 300px;
      background-color: #fff;
      padding: 6px 0;
      border-radius: 2px;
      border: 1px solid #d1dbe5;
      box-sizing: border-box;
  }

  .emailList li{
      list-style: none;
      line-height: 36px;
      padding: 0 10px;
      margin: 0;
      cursor: pointer;
      color: #48576a;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .emailList li:hover{
        background: #e4e8f1;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .picContext{
        position:absolute;
        width:100px;
        height:100px;
        text-align:center;
    }

    #font-form .el-dialog--small {
        width: 600px;
        height: 500px;
    }

    #font-form .el-dialog__header {
        display: none;
    }

    #font-form .ttfDialog .el-dialog--small{
        width: 600px;
    }

</style>
