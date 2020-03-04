<template>
  <div class="bg-wrap">
    <div class="bg">
      <div class="copyright" @click="clickFn('https://unsplash.com/')">
        Photo by Alex Machado on Unsplash
      </div>
      <side-nav></side-nav>
      <transition name="cards" mode="out-in">
        <router-view></router-view>      
      </transition>
    </div>
  </div>
</template>

<script>
import sideNav from "_c/sideNav";

export default {
  components: {
    sideNav
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
@font-face
  font-family POWER-SELL
  src url('http://njupt.xichi.xyz/fonts/POWER SELL.ttf')
@font-face
  font-family A61
  src url('http://njupt.xichi.xyz/fonts/A61华康娃娃体.ttf')
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
    background-color rgba(0,0,0,0.1)
    .copyright
      position absolute
      top 20px
      left 10px
      font-size 12px
      color rgba(255,255,255,0.5)
      cursor pointer
      &:hover
        color rgba(255,255,255,0.8)
.cards-enter-active, .cards-leave-active
  transition all .5s ease-in
.cards-enter
  opacity 0
  transform translateX(10%)
.cards-leave-to
  opacity 0
  transform translateX(-10%)
.cards-enter-to,.cards-leave
  opacity 1
  transform translateX(0)
@keyframes clear {
  0%{
    filter:blur(10px);
  }
  100%{
    filter:blur(1px);
  }
}
</style>
