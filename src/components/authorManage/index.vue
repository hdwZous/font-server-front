<template>
  <div class="authorM">
    <el-breadcrumb>
      <el-breadcrumb-item class="breadnav">作者管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="toolbar" style="margin-top:30px;">
      <el-col :span="7" style="float:right;">
        <el-input
          placeholder="ID/来源方ID/作者名称/字体名"
          v-model="inputSearch"
          class="search"
          style="width:80%;">
        </el-input>
        <el-button type="primary" @click="handleIconClick">搜索</el-button>
      </el-col>
    </el-row>
    <developer-table style="margin-top:30px;" :developer="endUserList" @showFont="showFontName"></developer-table>
    <div style="float:right;text-align:right;padding-bottom:30px;width:800px;margin-right:50px;">
      <el-select v-model="form.pageSize" @change="filter" style="margin-left:10px;width:75px;height:35px;">
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
    <el-dialog title="字体" :visible.sync="dialogVisible" style="background:rgba(0,0,0,0);">
        <el-tag
            v-for="(tag,index) in aFlist"
            :key="index"
            type="primary">
            {{tag.name}}
        </el-tag>
    </el-dialog>
  </div>
</template>
<script>
  import developerTable from 'components/authorManage/developerTable'
  import {getEndUser} from '../../api/api'
  export default {
    data() {
      return {
        total: 0,
        form: {
          search:'',
          page: 1,
          pageSize: 20
        },
        endUserList:[],
        tableNum:20,
        aFlist:[],
        dialogVisible:false,
        inputSearch:''
      }
    },
    created(){
      if (this.$route.params.fontId != 'new') {
          this.form.search = this.$route.params.fontId;
      }
      this.developerInit(this.form);
    },
    methods: {
      developerInit(params){
        getEndUser(params).then((res) => {
          //计算字体名的长度是否大于十个字符
          res.data.list.forEach(item => {
            var str = '';
            if (item.fontNames) {
              item.fontNames.forEach(list => {
                  str += list.name + '、' ;
              });
              str = str.substr(0,str.length-1);
              if (str.length > 10) {
                  str = str.substr(0,10) + '...';
              };
            }             
            item.fontStrings = str;
          });
          
          this.endUserList = res.data.list;
          this.total = res.data.total;
        });
      },
      handleIconClick() {
        this.form.search = this.inputSearch;
        this.form.page = 1;
        this.developerInit(this.form);
      },
      handleCurrentChange(val) {
        this.form.page = val;
        this.developerInit(this.form);
      },
      filter(){
        this.form.page = 1;
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
        this.developerInit(this.form);
      },
      showFontName(data){
          this.dialogVisible = true;
          this.aFlist = data;
      }
    },
    components: {
      developerTable
    }
  }
</script>

<style>
    .authorM .el-tag--primary {
        font-size: 14px;
        color: #6e6e6e;
        background-color: #f6f6f6;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .authorM .el-dialog__body {
        overflow: auto;
        height: 245px;
    }
</style>

