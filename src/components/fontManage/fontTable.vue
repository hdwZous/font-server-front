<template>
  <div class="fontTable">
    <el-table
      ref="multipleTable"
      :data="fontList"
      tooltip-effect="dark"
      style="width:100%;">
      <el-table-column
        prop="fontId"
        label="ID"
        align="center">
      </el-table-column>

      <el-table-column
        prop="pic"
        label="字体展示图"
        align="center">
        <template scope="scope">
          <img :src="scope.row.pic" alt="" style="width:100px;height:50px;margin:10px 0;" @click="showPics(scope.row.pic)" v-if="scope.row.pic">
        </template>    
      </el-table-column>

      <el-table-column
        prop="smallpic"
        label="字体小图"
        align="center">
        <template scope="scope">
          <img :src="scope.row.fontSmallUrl" alt="" style="width:100px;height:50px;margin:10px 0;" @click="showPics(scope.row.fontSmallUrl)" v-if="scope.row.fontSmallUrl">
          <div class="pic-preview" @click="getPics(scope.row.fontId)" v-else></div>
        </template>    
      </el-table-column>

      <el-table-column
        prop="name"
        label="字体名称"
        align="center">
      </el-table-column>

      <el-table-column
        prop="signName"
        label="签约字体名"
        align="center">
      </el-table-column>

      <el-table-column
        prop="fontFamilyName"
        label="所属字体家族"
        align="center">
      </el-table-column>

      <el-table-column
        prop="authorName"
        label="字体作者"
        align="center">
        <template scope="scope">
            <el-button type="text" @click="authorLink(scope.row.endUserId)">{{scope.row.authorName}}</el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="checkStatus"
        label="质检状态"
        align="center">
        <template scope="scope">
          <span v-if="scope.row.checkStatus==0">未质检</span>
          <span v-else>质检合格</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center">
        <template scope="scope">
          <el-button @click="downResource(scope.row)"
                     type="default"
                     size="small"
                     class="putaway">
            下载资源
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center">
        <template scope="scope">
          <el-button
            @click="detailLink(scope.row)"
            type="text"
            size="small"
            class="detail">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getsmallPic} from '../../api/api'
  export default {
    data() {
      return {
        fontIds: "",
        multipleSelection: [],
        onlineSelection: [],
        offlineSelection: [],
        ttfUrl:""
      }
    },
    props: ['fontList'],
    methods: {
      //传入id，跳转到详情页
      detailLink(row) {
        //传递字体家族名称
        this.$bus.emit('toDetail',row.fontFamilyName)
        this.$router.push({path: '/main/fontManage/fontDetail/' + row.fontId});
      },
      showPics(url){
          //触发自定义方法，传递字体图片信息到父组件
          this.$emit("showPic",url);   
      },
      getPics(id){
          var params = {
              fontId:id
          };
          getsmallPic(params).then(res => {
              if (res.code == 0) {
                  this.$emit("showPic",res.data);   
              }else {
                  this.$message.error(res.msg);
              }
          })
      },
      //点击下载资源，获取字体id，传递到父组件
      downResource(row) {
          this.$emit('download',row.fontId);
      },
      //跳转到作者详情
      authorLink(id) {
          this.$router.push({path:'/main/authorManage/' + id});
      }
    }
  }
</script>

<style>
  .fontTable .putaway{
    width:65px;
    height: 26px;
    border-color: #4DAEF1;
    color:#4DAEF1;
  }

  .fontTable .putaway:hover{
    background:#4DAEF1;
    border-color:#4DAEF1;
    color:#fff;
  }

  .fontTable .putaway:focus{
    border-color: #4DAEF1;
  }

  .fontTable .all-up-down{
    margin-top:30px;
  }

  .all-up-down .allUp,.all-up-down .allDown{
    width:80px;
    height: 28px;
    border-color: #4DAEF1;
    color:#4DAEF1;
    line-height: 28px;
    text-align: center;
    padding:0;
  }

  .all-up-down .allUp:hover{
    background: #4DAEF1;
    color:#fff;
  }

  .all-up-down .allDown{
    border-color: #F49256;
    color:#F49256;
    margin-left:26px;
  }

  .all-up-down .allDown:hover{
    background:#F49256;
    color:#fff;
    border-color: #F49256;
  }

  .all-up-down .el-button.is-disabled{
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
  }

  .all-up-down .el-button--text.is-disabled{
    background-color: transparent;
  }

  .fontTable .detail,.all-up-down .el-button--text{
    color:#4DAEF1;
    font-size:14px;
  }

  .fontTable .detail:hover,.all-up-down .el-button--text:hover{
    color:#1C8DDC;
  }

  .all-up-down .el-button--text.is-disabled:hover{
    color:#bfcbd9;
  }

  .pic-preview {
    width:60px;
    height:60px;
    margin:10px auto;
    background-image:url('../../assets/img/preview.png');
    background-position:0 0;
    background-repeat:no-repeat;
    background-size:60px 60px;
    border:1px solid #e3e3e3;
    border-radius:4px;
  }

  .pic-preview:hover{
    background-image:url('../../assets/img/preview1.png');
  }
</style>


