<template>
    <div class="main">
      <v-header></v-header>   
      <v-sidebar></v-sidebar>
      <div class="content-wrapper main_content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>      
    </div>
</template>

<script>
  import vHeader from './common/header'
  import vSidebar from './common/sidebar'
  export default {
    name: 'app',
    components:{
      vHeader,
      vSidebar
    }
  }
</script>
