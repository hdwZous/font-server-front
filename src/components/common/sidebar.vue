
<template>
  <div id="navLeft">
      <el-menu default-active="" router  class="el-menu-vertical-demo sidebar" theme="dark" @select="handleSelect">
        <el-menu-item index="/main/fontManage" class="menu-list font" style="margin-top:30px" ref="fontM">字体管理</el-menu-item>
        <el-menu-item index="/main/authorManage/new" class="menu-list author" ref="fontA">作者管理</el-menu-item>
    </el-menu>
  </div>
  
</template>

<script>

export default {
    data(){
        return {
            fontActive:{
                isBuy:false,
                isDown:false
            },
            blooen:false
        }
    },
    methods: {
        // handleOpen(){
        //     this.$router.push({path:'/main/dataManage'})
        // },
        // handleClose(){
        //     this.$router.push({path:'/main/dataManage'})
        //     this.fontActive = {
        //         isBuy:false,
        //         isDown:false
        //     }
        // },
        // stopBubb(){
            
        // },
        // toData(event){
        //     if (event.target.tagName == 'SPAN') {
        //         this.blooen = !this.blooen;
        //         if (this.blooen == true){
        //             this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data is-active')
        //         }else {
        //             this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data')
        //         }
        //         this.fontActive = {
        //             isBuy:false,
        //             isDown:false
        //         }
        //         this.$router.push({path:'/main/dataManage'})
        //     }
            
        // }
        handleSelect(key,keyPath){
            localStorage.removeItem('form');
        }
    },
    created(){
        
        // let that = this;
        // this.$bus.on('toSideBar',function(val){
        //     //通过判断val 确定当前跳转的页面
        //     if (val == 'fm') {
        //         that.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font is-active');
        //         that.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author');
        //         that.$refs.dataMage.setAttribute('class','el-menu-item menu-list data');
        //     }else if (val == 'fa') {
        //         that.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font');
        //         that.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author is-active');
        //         that.$refs.dataMage.setAttribute('class','el-menu-item menu-list data');
        //     }else {
        //         that.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font');
        //         that.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author');
        //         that.$refs.dataMage.setAttribute('class','el-menu-item menu-list data is-active');
        //         if (val == 'dm/buy') {
        //             that.fontActive = {
        //                 isBuy:true,
        //                 isDown:false
        //             }
        //         }else if (val == 'dm/down') {
        //             that.fontActive = {
        //                 isBuy:false,
        //                 isDown:true
        //             }
        //         }else {
        //             that.fontActive = {
        //                 isBuy:false,
        //                 isDown:false
        //             }
        //         }
        //     }
        // })
    },
    mounted(){
        //读取sessionStorage中的toPath参数，判断用户刷新时，具体页面位置
        // var toPath = sessionStorage.getItem('toPath');

        // switch (toPath) {
        //     case 'fontManage':
        //         this.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font is-active');
        //         this.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author');
        //         this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data');
        //         break;
        //     case 'fontAuthor':
        //         this.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font');
        //         this.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author is-active');
        //         this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data');
        //         break;
        //     case 'dataManage':
        //         this.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font');
        //         this.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author');
        //         this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data is-active');
        //         this.fontActive = {
        //             isBuy:false,
        //             isDown:false
        //         }
        //         break;
        //     case 'dataManage/buy':
        //         this.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font');
        //         this.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author');
        //         this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data is-active');
        //         this.fontActive = {
        //             isBuy:true,
        //             isDown:false
        //         }
        //         break;
        //     case 'dataManage/down':
        //         this.$refs.fontM.$el.setAttribute('class','el-menu-item menu-list font');
        //         this.$refs.fontA.$el.setAttribute('class','el-menu-item menu-list author');
        //         this.$refs.dataMage.setAttribute('class','el-menu-item menu-list data is-active');
        //         this.fontActive = {
        //             isBuy:false,
        //             isDown:true
        //         }
        //         break;
        //     default:
        //         break;
        // }
        
    },

    beforeDestory(){
        // this.$bus.off('toSideBar');
    }
}
</script>

<style>
    .el-menu-item.is-active {
        color: #bfcbd9;
    }

    #navLeft .menu-list{
        margin-top:40px;
        margin-left:34px;   
        box-sizing: border-box;
        height:24px;
        font-size: 18px;
        color:#FFFFFF;
        line-height: 24px;
        padding-left:25px !important;
        margin-left: 28px;
        /* transition: margin,padding 1s; */
    }

    #navLeft .font{
        background-image: url('../../assets/img/font.png'),url('../../assets/img/triangleRight.png');
        background-repeat:no-repeat;
        background-position:0 center,85% center;
        background-size:18px 18px,5px 9px;
    }

    #navLeft .author{
        background-image: url('../../assets/img/author.png'),url('../../assets/img/triangleRight.png');
        background-repeat:no-repeat;
        background-position:0 center,85% center;
        background-size:18px 18px,5px 9px;
    }

    /* 选中状态 */
    #navLeft .el-menu-item.is-active {
        color: #66B7FF;
    }

    #navLeft .font.is-active{
        background-image: url('../../assets/img/Group.png'),url('../../assets/img/triangleRight.png');
    }

    #navLeft .author.is-active{
        background-image: url('../../assets/img/author.png'),url('../../assets/img/triangleRight.png');
    }


    /* 侧边栏hover 背景去掉 */
    #navLeft .el-menu--dark .el-menu-item:hover{
        background-color: transparent;
    }

    #navLeft .el-menu-item:hover{
        background-color: transparent;
        color: #66B7FF
    }

    
    /* #navLeft .el-menu-item:hover{
        color: #66B7FF
    } */
</style>


