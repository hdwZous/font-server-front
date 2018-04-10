<template>
  <div>
    <el-breadcrumb separator=">>" class="breadnav">
      <el-breadcrumb-item :to="{path:'/main/fontManage'}">字体管理</el-breadcrumb-item>
      <el-breadcrumb-item>
        <small>{{navTitle}}</small>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <font-form :fontId="fontId"></font-form>
  </div>
</template>
<script>
  import fontForm from 'components/fontManage/form'
  export default {
    computed: {
      fontId: function () {
        return this.$route.params.fontId
      },
      navTitle: function () {
        if (this.fontId == "new") {
          return "新增字体";
        } else {
          return "编辑字体";
        }
      }
    },
    components: {
      fontForm
    }
  }
</script>
