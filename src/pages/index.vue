<template>
  <div class="bg-wrap">
    <div class="bg">
      <div class="copyright" @click="clickFn('https://unsplash.com/')">
        Photo by Alex Machado on Unsplash
      </div>
      <side-nav></side-nav>
      <my-footer ref="footer"></my-footer>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideNav from "_c/sideNav";
import myFooter from "_c/myFooter";

export default {
  components: {
    sideNav,
    myFooter
  },
  data() {
    return {};
  },
  methods: {
    clickFn(url) {
      window.open(url, "_blank");
    }
  },
  mounted(){
  }
};
</script>

<style lang="stylus" scoped>
.bg-wrap
  position relative
  width 100vw
  height 100vh
  overflow hidden
  background url('http://njupt.xichi.xyz/homepage/bg.jpg') center center
  background-size cover
  animation clear 1s ease-in
  .bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color rgba(0,0,0,0.3)
    .copyright
      position absolute
      top 20px
      left 10px
      font 12px
      color rgba(255,255,255,0.5)
      cursor pointer
      &:hover
        color rgba(255,255,255,0.8)
@keyframes clear {
  0%{
    filter:blur(10px);
  }
  100%{
    filter:blur(1px);
  }
}
</style>
