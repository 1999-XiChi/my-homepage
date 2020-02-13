<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/common.css";
export default {
  name: "App"
};
</script>

<style>
body {
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
