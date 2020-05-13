<template>
  <ul id="sideNav" ref="sideNav">
    <li
      class="tab"
      v-for="(item, index) in nav"
      :key="index"
      @click="clickFn(index)"
    >
      <span>{{ item.title }} </span>
      <transition name="fade">
        <img
          v-show="currentIndex == index"
          :src="item.icon"
          alt=""
          class="icon"
        />
      </transition>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      nav: [
        {
          id: 0,
          title: "Home",
          icon: "http://njupt.xichi.xyz/homepage/icon/music.png",
          url: "/home"
        },
        {
          id: 1,
          title: "Work",
          icon: "http://njupt.xichi.xyz/homepage/icon/computer.png",
          url: "/work"
        },
        {
          id: 2,
          title: "Info",
          icon: "http://njupt.xichi.xyz/homepage/icon/work.png",
          url: "/info"
        },
        {
          id: 3,
          title: "More",
          icon: "http://njupt.xichi.xyz/homepage/icon/more_fill.png",
          url: "/more"
        }
      ]
    };
  },
  methods: {
    clickFn(index) {
      this.currentIndex = index;
      this.$router.push(this.nav[index].url);
      let sideNav = this.$refs.sideNav;
      sideNav.children.forEach(item => {
        item.className = "tab";
      });
      sideNav.children[index].classList.add("active");
      sideNav.style.setProperty("--active-index", index);
    }
  },
  mounted() {
    let currentUrl = this.$route.path;
    this.currentIndex = this.nav.find(el => el.url === currentUrl).id || 0;
    let sideNav = this.$refs.sideNav;
    sideNav.children[this.currentIndex].classList.add("active");
    sideNav.style.setProperty("--active-index", this.currentIndex);
  }
};
</script>

<style lang="stylus" scoped>
#sideNav
  --active-index 0
  position absolute
  top 50%
  left 0
  padding 0
  margin 0
  transform translateY(-60%)
  font .5rem POWER-SELL
  color rgba(255,255,255,0.3)
  cursor pointer
  .tab
    margin 25px 0
    padding 10px 25px 10px 50px
    line-height 32px
    display flex
    align-items center
    .icon
      padding 5px 0 0 20px
      height .5rem
      width auto
    &::after
      position absolute
      content ""
      top 0
      left 0
      z-index -1
      height 52px
      width 100%
      border-radius 0 50px 50px 0
      background-color rgba(#916dd5,.8)
      transform translateY(calc(25px + 77px*var(--active-index)))
      transition .5s ease
  .tab:hover, .active
    color rgba(255,255,255,0.8)

.fade-enter-active
    transition all .5s ease-in .2s
.fade-enter
    opacity 0

@media screen and (max-width: 767px)
  #sideNav
    position absolute
    top 20px
    left 50%
    transform translateX(-50%)
    display flex
    .tab
      font-size 22px
      padding 0 20px
      .icon
        display none
      &::after
        display none
</style>
