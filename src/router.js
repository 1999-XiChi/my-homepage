import VueRouter from "vue-router"

const index = r => require.ensure([], () => r(require("@/pages/index.vue")), "index")
const home = r => require.ensure([], () => r(require("@/pages/cards/home.vue")), "home")
const work = r => require.ensure([], () => r(require("@/pages/cards/work.vue")), "work")
const info = r => require.ensure([], () => r(require("@/pages/cards/info.vue")), "info")
const more = r => require.ensure([], () => r(require("@/pages/cards/more.vue")), "more")

var router = new VueRouter({
  routes: [
    {
      path: "/", redirect: "/home",component: index, children: [
        {
          path: "home", component: home
        }, {
          path: "work", component: work
        }, {
          path: "info", component: info
        }, {
          path: "more", component: more
        }
      ]
    }
  ]
})
export default router