<template>
  <div class="bg-wrap" ref="bg">
    <my-loading v-if="loaded"></my-loading>
    <div class="bg">
      <div class="copyright" @click="clickFn('https://unsplash.com/')">
        Photo by Alex Machado on Unsplash
      </div>
      <side-nav></side-nav>
      <keep-alive>
        <transition name="cards" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import sideNav from "_c/sideNav";
import myLoading from "_c/myLoading";

export default {
  components: {
    sideNav,
    myLoading
  },
  data() {
    return {
      loaded: true
    };
  },
  methods: {
    clickFn(url) {
      window.open(url, "_blank");
    },
    async loadSource() {
      //资源预加载
     let source = new Array(new Image(), new Image(), new Image());
      source[0].src = "http://njupt.xichi.xyz/fontspider/A61.ttf";
      source[1].src = "http://njupt.xichi.xyz/fontspider/POWER%20SELL.ttf";
      source[2].src = "http://njupt.xichi.xyz/homepage/bg.jpg";
      source[2].onload = () => {
        this.$refs.bg.style.backgroundImage =
          "url('http://njupt.xichi.xyz/homepage/bg.jpg')";
        this.loaded = false;
        this.$refs.bg.classList.add("clear");
      };
     setTimeout(()=>{
        this.loaded = false;
      },3000)
    }
  },
  mounted() {
    this.loadSource();
  }
};
</script>

<style lang="stylus">
@font-face
  font-family POWER-SELL
  src url('http://njupt.xichi.xyz/fontsipder/POWER%20SELL.ttf')
@font-face
  font-family A61
  src url('http://njupt.xichi.xyz/fontsipder/A61.ttf')
</style>
<style lang="stylus" scoped>
.bg-wrap
  position relative
  width 100vw
  height 100vh
  overflow hidden
  background-color #3085a3
  background-position center center
  background-size cover
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

.clear
  animation clear 1s ease-in
@keyframes clear {
  0%{
    filter:blur(10px);
  }
  100%{
    filter:blur(1px);
  }
}
</style>
