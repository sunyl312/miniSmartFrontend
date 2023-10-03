import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msgText:"",
    msgShow:false,
    msgType:0, // 0 ok ; 1; error
    globalColor:'#0c64b6',
    currentTab:0,
    cart:{
      gsa:{
      },
    },
    cartShow:false,
  },
  getters: {
  },
  mutations: {
    showMessageBar(state,payload){
      state.msgShow = false;
      state.msgText = payload.msg;
      state.msgType = payload.type;
      state.msgShow = true;
    },
    addOneBatchToCart(state,batch){
      if (batch.type=="gsa"){

        Vue.set(state.cart.gsa,batch.name, batch.data);
        // state.cart.gsa[batch.name] = batch.data;
        this.commit("showMessageBar",{msg:"添加数据集到数据中转站成功",type:0})
      }

    },
    deleteOneBatchFromGSACart(state,batchID){
      Vue.delete(state.cart.gsa,batchID)
        // delete state.cart.gsa[batchID];

    }

  },
  actions: {
    sendNotification(context,payload){
      context.commit("showMessageBar",payload);
    }
  },
  modules: {
  }
})
