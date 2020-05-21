<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/common.css";
export default {
  name: "App",
  mounted() {
    /* Plan A:
      IOS/Android 都可以解决OS端上下滑动的橡皮筋特效
      但有一个问题：“在有需要滑动的容器中滑动，body也会有橡皮筋特效”
      查询网络后，暂无更好的解决方案
    */
    document.body.addEventListener(
      "touchmove",
      function(e) {
        if (!hasParent(e.target, "scroll-container")) {
          e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }
      },
      {
        passive: false,
      }
    );
    function hasParent(element, parentClass) {
      let ele = element;
      while (!(ele.tagName === "BODY")) {
        if (ele.className === parentClass) {
          return true;
        }
        ele = ele.parentNode;
      }
      return false;
    }
  },
};
</script>

<style>
/* Plan B:
 能够解决IOS端上下滑动的橡皮筋特效,但安卓端不可 
 这段代码也需要，因为可以在IOS端避免上面的问题：“在有需要滑动的容器中滑动，body也会有橡皮筋特效”
*/
body,
html {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent; /*取消移动端点击闪烁*/
  touch-action: manipulation; /* 解决安卓移动端click事件有300ms延迟 */
  -ms-touch-action: manipulation;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>
