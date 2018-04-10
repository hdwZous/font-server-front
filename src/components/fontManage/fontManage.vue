<template>
  <div id="fontManage">
    <div style="background:#fff;padding:15px 0 0 25px">
      <el-breadcrumb>
        <el-breadcrumb-item class="breadnav" >字体管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="addFont">
        <el-button type="primary" @click="addFontLink">新增字体</el-button>
      </div>
      <el-row class="toolbar">
        <el-col :span="18">
          <span class="select-option">字体来源 :</span>
          <el-select v-model="form.font.originType"  @change="filter" style="margin-left:5px;" class="select">
            <el-option label="全部" value=""></el-option>
            <el-option label="手迹造字" value="0"></el-option>
            <el-option label="方正电子" value="1"></el-option>
            <el-option label="精修制作" value="2"></el-option>
            <el-option label="设计字体" value="3"></el-option>
            <el-option label="字稿收集" value="4"></el-option>
          </el-select>
          <span class="select-option left">字体级别 :</span>
          <el-select v-model="form.font.level" @change="filter" style="margin-left:5px;" class="select">
            <el-option label="全部" value=""></el-option>
            <el-option label="体验一" value="0"></el-option>
            <el-option label="体验二" value="1"></el-option>
            <el-option label="体验三" value="2"></el-option>
            <el-option label="初级" value="3"></el-option>
            <el-option label="中级" value="4"></el-option>
            <el-option label="高级" value="5"></el-option>
          </el-select>
          <span class="select-option left">字体压缩 :</span>
          <el-select v-model="form.font.compress" @change="filter" style="margin-left:5px;" class="select">
            <el-option label="全部" value=""></el-option>
            <el-option label="普通" value="0"></el-option>
            <el-option label="压缩" value="1"></el-option>
          </el-select>
          <span class="select-option left">字体颜色 :</span>
          <el-select v-model="form.font.color" @change="filter" style="margin-left:5px;" class="select">
            <el-option label="全部" value=""></el-option>
            <el-option label="常规" value="0"></el-option>
            <el-option label="彩色" value="1"></el-option>
          </el-select>
          <span class="select-option left">字体方式 :</span>
          <el-select v-model="form.font.craftsmanshipType" @change="filter" style="margin-left:5px;" class="select">
            <el-option label="全部" value=""></el-option>
            <el-option label="全自动" value="0"></el-option>
            <el-option label="人工" value="1"></el-option>
          </el-select>
          <span class="select-option left">字体编码 :</span>
          <el-select v-model="form.font.characterEncoding" @change="filter" style="margin-left:5px;" class="select">
            <el-option label="全部" value=""></el-option>
            <el-option label="简体" value="0"></el-option>
            <el-option label="繁体" value="1"></el-option>
            <el-option label="GBK" value="2"></el-option>
            <el-option label="GB18030" value="3"></el-option>
            <el-option label="BIG5" value="4"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" style="float:right">
          <el-input
            placeholder="名称/作者/ID/家族名称"
            v-model="form.font.search"
            class='search'
            @keyup.enter.native="search">
          </el-input>
          <el-button type="primary" @click="search" class="searchButton">搜索</el-button>
          <el-button type="text" @click="reset" class="resetButton">重置</el-button>
        </el-col>
        <el-col :span="24" style="margin-top:15px;">
            <span class="select-option">字体粗细 :</span>
            <el-select v-model="form.font.bold" @change="filter" style="margin-left:5px;" class="select">
              <el-option label="全部" value=""></el-option>
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
            <span class="select-option left">使用方式 :</span>
            <el-select v-model="form.font.useType" @change="filter" style="margin-left:5px;" class="select">
              <el-option label="全部" value=""></el-option>
              <el-option label="私有" value="1"></el-option>
              <el-option label="公有" value="0"></el-option>
            </el-select>
            <span class="select-option left">质检状态 :</span>
            <el-select v-model="form.font.checkStatus" @change="filter" style="margin-left:5px;" class="select">
              <el-option label="全部" value=""></el-option>
              <el-option label="未质检" value="0"></el-option>
              <el-option label="质检合格" value="1"></el-option>
            </el-select>
            <div style="display:inline-block;">
              <span class="select-option left">创建时间 :</span>
              <div class="date">
                  <el-date-picker
                    v-model="form.font.start"
                    type="date"
                    placeholder="开始日期"
                    @change="checkDate"
                    style="width:125px;height:25px;">
                  </el-date-picker>
                  <span style="font-size:14px;margin:0 10px;">至</span>
                  <el-date-picker
                    v-model="form.font.end"
                    type="date"
                    placeholder="结束日期"
                    @change="checkDate"
                    style="width:125px;height:25px;">
                  </el-date-picker>
              </div>    
            </div>
        </el-col>
      </el-row>
    </div>
    <font-table :fontList="fontList" @showPic="showFontPic" @download="downFontRes" style="margin-top:60px;"></font-table>
    <div style="float:right;text-align:right;padding-bottom:30px;width:800px;margin-right:50px;" >
      <el-select v-model="form.pageSize" @change="filter('size')" style="margin-left:10px;width:75px;height:35px;">
          <el-option label="20" value="20"></el-option>
          <el-option label="50" value="50"></el-option>
          <el-option label="100" value="100"></el-option>
      </el-select>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="form.page"
                     :page-size="tableNum"
                     layout="prev, pager, next, total, jumper"
                     :total="total"
                     style="width:400px;float:right">
      </el-pagination>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" style="background:rgba(0,0,0,0);">
      <a :href="smallpicZip">字体图片包下载</a>
      <a :href="ttfFile">TTF文件下载</a>
    </el-dialog>
    <el-dialog title="" :visible.sync="imgVisible" style="background:rgba(0,0,0,0);" class="imgDialog">
      <img :src="bigPicUrl" style="width:auto;height:auto;max-height:100%;max-width:100%;"/>
    </el-dialog>
  </div>
</template>
<script>
  import fontTable from 'components/fontManage/fontTable'
  import {getFontList} from '../../api/api'
  import {getFontResource} from '../../api/api'

  export default {
    data: function () {
      return {
        fontPic: [],     //存储当前点击字体的图片的所有信息
        total: 0,        //当前数据库总共数据条数
        fontList: [],    //字体列表 根据页码、状态等进行动态显示
        form: {
            font: {
                "originType": '',
                "level": "",
                "compress": '',
                "color": '',
                "craftsmanshipType": '',
                "search": '',
                "characterEncoding": '',
                "bold": '',
                "useType": '',
                "checkStatus": '',
                "start": '',
                "end":''
            },
            page: 1,
            pageSize: 20
        },
        tableNum : 20,
        dialogVisible: false,
        imgVisible:false,
        bigPicUrl:'',
        //资源路径
        smallpicZip: '',
        ttfFile: '',
        //字体家族名称
        fontFamilyName: '',
        notNextTick:true,
        swiperOption:{
          autoplay: 3000,
          //初始化时的slide的索引
          initialSlide:0,
          direction : 'horizontal',
          autoplayDisableOnInteraction:false,
          // loop:true,
          observer:true,
          observeParents:true,
          grabCursor : true,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next'
          // scrollbar:'.swiper-scrollbar',
        }
      }
    },
    created() {
      if (sessionStorage.getItem('form')) {
          this.form = JSON.parse(sessionStorage.getItem('form'));
      }
      this.getFont(this.form);
    },
    methods: {
      //跳转到新增字体页面
      addFontLink() {
        this.$router.push({path: '/main/fontManage/updateFont/new'})
      },
      //点击搜索框获取信息
      search() {
        this.form.page = 1;
        this.getFont(this.form);
        sessionStorage.setItem('form',JSON.stringify(this.form));
      },
      //点击分页器，更改页面值
      handleCurrentChange(val) {
        this.form.page = val;
        this.getFont(this.form);
        sessionStorage.setItem('form',JSON.stringify(this.form));
      },
      //过滤状态
      filter(type){
        this.form.page = 1;
        if (type == 'size') {
            switch (this.form.pageSize) {
                case '20': 
                    this.tableNum = 20;
                    this.form.pageSize = 20;
                    break;
                case '50':
                    this.tableNum = 50;
                    this.form.pageSize = 50;
                    break;
                case '100': 
                    this.tableNum = 100;
                    this.form.pageSize = 100;
                    break;
                default:
                    break;
            }
        }
        this.getFont(this.form);
        sessionStorage.setItem('form',JSON.stringify(this.form));
      },
      //获取字体列表信息
      getFont(params){
        getFontList(params).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.fontList = res.data.list;
            this.total = res.data.total;
          }else if (res.code == 401) {
            this.$router.push({path:"/login"});
          }
          
        });
      },
      showFontPic(data){
        //监听到fontTable组件传递的信息
        this.bigPicUrl=data;
        if (data) {
          this.imgVisible = true;
        }    
      },
      //检查日期值的变化
      checkDate(val){
          if(this.form.font.start != '' && this.form.font.end != '') {
            if (this.form.font.start > this.form.font.end) {
              this.$message.error("开始日期应小于结束日期");
              this.form.font.start = '';
              this.form.font.end = '';
              return;
            }else {
              
              if (typeof this.form.font.start == 'object' && typeof this.form.font.end == 'number') {
                var ms = this.form.font.end - Date.parse(this.form.font.start);
              }else if (typeof this.form.font.start == 'number' && typeof this.form.font.end == 'object') {
                var ms = Date.parse(this.form.font.end) - this.form.font.start;
              }else {
                var ms = Date.parse(this.form.font.end) - Date.parse(this.form.font.start);
              };
              if (ms > 365*24*60*60*1000) {
                this.$message.error("限查询一年以内的数据");
                this.form.font.start = '';
                this.form.font.end = '';
                return;
              }else {
                if (typeof this.form.font.start == 'object') {
                  this.form.font.start = Date.parse(this.form.font.start);
                };
                if (typeof this.form.font.end == 'object') {
                  this.form.font.end.setHours(23,59);
                  this.form.font.end = Date.parse(this.form.font.end);
                };                                              
                this.getFont(this.form);
                sessionStorage.setItem('form',JSON.stringify(this.form));
              }
            }
          }
      },
      reset(){
          //重置所有搜索条件
          this.form.font = {
              "originType": '',
              "level": '',
              "compress": '',
              "color": '',
              "craftsmanshipType": '',
              "search": '',
              "characterEncoding": '',
              "bold": '',
              "useType": '',
              "checkStatus": '',
              "start": '',
              "end":''
          };
          this.form.page = 1;
          this.form.pageSize = 20;
          this.getFont(this.form);
          sessionStorage.setItem('form',JSON.stringify(this.form));
      },
      //下载字体资源
      downFontRes(data){
          var params = {
              fontId : data
          }
          //调用接口，判断字体资源，是否只有ttf，或图片包、ttf共存
          getFontResource(params).then(res => {
              //如果只有ttf，直接下载
              if (res.code == 0) {
                if (res.data.smallpicZipfilePath == undefined) {
                    window.open(res.data.ttf);
                }else {
                    //跳出弹窗
                    this.dialogVisible = true;
                    this.smallpicZip = res.data.smallpicZipfilePath;
                    this.ttfFile = res.data.ttf;
                };
              }else if (res.code == 401){
                  this.$router.push({path:"/login"});
              };
          });
      }
    },
    components: {
      fontTable
    }
  }
</script>
<style slot-scope>

  .swiper-container{
    height:310px;
  }

  .swiper-container .swiper-slide{
    text-align: center;
    height: 310px;
  }

  .swiper-pagination .swiper-pagination-bullet{
    width:30px;
    height:2px;
    border-radius: 0;
  }

  .swiper-container .swiper-button-prev,.swiper-container .swiper-button-next {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(31,45,61,.11);
    background-position:40% center;
  }

  .swiper-container .swiper-button-next{
    background-position:60% center;
  }

  .swiper-container .swiper-button-prev{
    background-image: url('../../assets/img/back.svg');
  }

  .swiper-container .swiper-button-next{
    background-image: url('../../assets/img/more.svg');
  }

  .swiper-container .swiper-button-prev:hover,.swiper-container .swiper-button-next:hover{
    background-color: rgba(31,45,61,.23);
  }

  .addFont{
    padding:20px 0 20px 0;
    height:40px;
  }

  .addFont .el-button{
    width:120px;
    height: 100%;
    box-sizing: border-box;
    padding:10px 15px 10px 40px;
    font-size: 16px;
    background: #5092EA url('../../assets/img/add.png') 16px 9px/18px 18px no-repeat !important;
    border-color:transparent;
  }

  .addFont .el-button:hover{
    background:#3D7FD8 url('../../assets/img/add.png') 16px 9px/18px 18px no-repeat !important;
  }

  #fontManage .el-dialog--small{
    width:750px;
    height:440px;
  }

  #fontManage .el-carousel__container{
    margin-top:20px;
  }

  #fontManage .el-dialog__header{
    background: #fff;
    height:20px;
    line-height: 20px;
  }

  #fontManage .imgDialog .el-dialog--small{
    height:480px;
  }

  #fontManage .imgDialog .el-dialog__header{
    display: none;
  }

  /* 日期控件 */
  .date{
    display: inline-block;
  }

  .data .el-input__inner{
    height: 25px;
    width: 125px;
    font-size: 12px;
  }

  .search.el-input{
      width: 65%;
  }

  .search .el-input__inner {
    border-color:#E3E3E3;
    background-color: #F6F8F9;
    padding-left:20px;
    border-radius:4px 0 0 4px;
  }

  .search .el-input__inner:focus{
    border-color:#5092EA;
  }

  .searchButton.el-button{
    background-color: #5092EA;
    width:80px;
    margin-left:-5px;
    border-radius:0px;
    font-size:16px;
    height:36px;
    border-color:transparent;
    transform: translateY(1.5px);
    background-image:url('../../assets/img/search.png');
    background-size:14px 14px;
    background-position:13px 11px;
    background-repeat:no-repeat;
  }

  .searchButton.el-button:hover{
    background-color: #3D7FD8;
  }

  .searchButton.el-button span {
    margin-left:15px;
  }

  .resetButton.el-button{
    font-size: 16px;
    color: #5092EA;
  }

  .resetButton.el-button:hover{
    color: #3D7FD8;
  }
</style>
