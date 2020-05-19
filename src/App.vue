<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/common.css";
export default {
  name: "App",
};
</script>

<style>
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
