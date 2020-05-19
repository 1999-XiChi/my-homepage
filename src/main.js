import Vue from "vue"
import App from "./App.vue"

import VueRouter from "vue-router"
import router from "./router.js"
import axios from "axios"
import moment from "moment"; 
import fastclick from "fastclick";

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.prototype.$http= axios

//日期处理
moment.locale("zh-cn"); 
Vue.prototype.$moment = moment;

//message组件
import Message from "@/components/message/message.js"
Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App),
  mounted(){
    fastclick.attach(document.body); // 加载完毕调用,解决移动端300ms延迟
  }
}).$mount("#app")
