<template>
  <div class="authorTab">
    <el-table
      ref="multipleTable"
      :data="developer"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="endUserId"
        label="ID"
        align="center"
        width="195px">
      </el-table-column>
      <el-table-column
        prop="zaoziUserId"
        label="来源方ID"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="作者名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center">
      </el-table-column>
      <el-table-column
        label="字体名"
        align="center">
        <template scope="scope">
            <p style="cursor:pointer" @click="showAuthorFont(scope.row.fontNames)">{{scope.row.fontStrings}}</p>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    props:['developer'],
    methods: {
        showAuthorFont(data) {
            this.$emit('showFont',data);
        }
    }
  }
</script>

<style slot-scope>
  .authorTab .el-button--text{
    color:#4DAEF1;
  }

  .authorTab .el-button--text:hover{
    color:#1C8DDC;
  }

</style>

