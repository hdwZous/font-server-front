<template>
    <el-table
      :data="versionsList"
      style="width:100%;height:300px;overflow:auto;">
      <el-table-column
        prop="versionName"
        label="版本号">
        <template scope="scope">
            <span>V{{scope.row.versionName}}</span>
        </template>   
      </el-table-column>
      <el-table-column
        prop="sReason"
        label="备注和更新内容">
        <template scope="scope">
            <p :title="scope.row.upgradeReason">{{scope.row.sReason}}</p>
        </template>   
      </el-table-column>
      <el-table-column
        prop="sSize"
        label="文件大小">   
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template scope="scope">
          <el-button @click="downResource(scope.row)"
                     type="default"
                     size="small"
                     class="down">
            下载资源
          </el-button>
        </template>   
      </el-table-column>

    </el-table>
</template>
<script>
  import {getFontResource} from '../../api/api'
  export default {
    data() {
      return {
        
      };
    },
    props: ['versionsList'],
    created() {
        this.versionsList.forEach((item => {
            if (item.upgradeReason != null) {
                if (item.upgradeReason.length > 10) {
                    item.sReason = item.upgradeReason.substr(0,10) + '...';
                }else {
                    item.sReason = item.upgradeReason;
                }
            };
            item.sSize = (item.ttfFileSize / 1024 / 1024).toFixed(2) + 'M';
        }))
    },
    methods: {
        downResource(row){
            //请求下载ttf
            var params = {
                fontId: row.fontId,
                versionId: row.fontVersionId
            };
            getFontResource(params).then(res => {
                window.location.href = res.data.ttf;
            });
        }
    }
  }
</script>
<style>
  
</style>
