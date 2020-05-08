import Vue from "vue"
import App from "./App.vue"

import VueRouter from "vue-router"
import router from "./router.js"
import axios from "axios"
import moment from "moment"; //导入模块

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.prototype.$http= axios

//日期处理
moment.locale("zh-cn"); 
Vue.prototype.$moment = moment;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app")
