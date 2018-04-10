<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <el-button @click="aaa">默认按钮</el-button>
    <el-button type="primary" @click="load">主要按钮</el-button>
    <el-button type="text" >文字按钮</el-button>
    <a href="../../test.html">eeee</a>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      load: function () {
        this.$http({url: '/api/font/fontList', method: 'post', api: true}).then(function (res) {
          console.log(res);
        })
      },
      aaa:function(){
        axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=your_api_key").then(response => {console.log(response)})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
