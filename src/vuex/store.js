import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    user: 'hello world',
    fontList: [],
    selectedTags:[],//字体选中的标签
    isHandleTag:false,//标签是否编辑状态
    developerList:[],
    updateForm:{},
    buyList:{data1:'',data2:''},
    downList:{data1:'',data2:''}
  },
  mutations:{
    resolveData(state,data) {
      //创造一个长度为24，值都为0的初始数组
      let tempArr = [];
      for (var i=0; i<24; i++) {
          tempArr.push(0);
      }
      
      for (let i=0; i<data[0].length; i++) {
          //判断startDate字段，为tempArr相应位置赋值
          tempArr[parseInt(data[0][i].startDate)] = data[0][i].num;
      }
      //判断参数2，将数据写入相应的数据对象中，下传给图表
      switch(data[1]) {
          case 'tb':
              Vue.set(state.buyList,'data1',tempArr);
              break;
          case 'yb':
              Vue.set(state.buyList,'data2',tempArr);
              break;
          case 'td':
              Vue.set(state.downList,'data1',tempArr);
              break;
          case 'yd':
              Vue.set(state.downList,'data2',tempArr);
              break;
          default:
              break;
      }
    }
  }
})

export default store
