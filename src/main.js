import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import comm from "@/plugins/comm";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);


Vue.config.productionTip = false
Vue.prototype.$comm = comm;
Vue.prototype.$copy2Clipboard= function(s){

  this.$copyText(s).then(res=>{
    this.$store.dispatch("sendNotification",{
      msg:"拷贝成功",
      type:0
    })
  }).catch(err=>{
    this.$store.dispatch("sendNotification",{
      msg:"拷贝失败",
      type:1
    })
  })

}


new Vue({
  router,
  store,
  vuetify,
  // comm,
  render: h => h(App),
  mounted() {
    // window.onbeforeunload = function (e) {
    //   alert("before unload")
    //   return "unloading"
    // }
    window.addEventListener('beforeunload', e=>{
        alert("aa")
      return "aa"
    })
  },
  destroyed() {
    // window.onbeforeunload = null;
    window.removeEventListener('beforeunload')
  }
}).$mount('#app')
