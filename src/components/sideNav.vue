<template>
  <ul id="sideNav" ref="sideNav">
    <li class="tab" v-for="(item, index) in nav" :key="index" @click="clickFn(index)">{{ item.title }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { title: "Home", icon: "", url:"/home" },
        { title: "Work", icon: "", url:"/work" },
        { title: "Info", icon: "", url:"/info" },
        { title: "More", icon: "", url:"/more" }
      ]
    };
  },
  methods: {
    clickFn(index){
      this.$router.push(this.nav[index].url);
      let sideNav = this.$refs.sideNav;
      sideNav.children.forEach(item =>{item.className = "tab";})
      sideNav.children[index].classList.add("active");
    }
  },
  mounted(){
    let sideNav = this.$refs.sideNav;
    sideNav.children[0].classList.add("active");
  }
};
</script>

<style lang="stylus" scoped>
#sideNav
  position absolute
  top 50%
  left 0
  padding 1rem
  transform translateY(-60%)
  font .5rem POWER-SELL
  line-height 2rem
  color rgba(255,255,255,0.3)
  cursor pointer
  .tab:hover, .active
    color rgba(255,255,255,0.8)
@media screen and (max-width: 767px)
  #sideNav
    position absolute
    top 20px
    left 50%
    transform translateX(-50%)
    display flex
    .tab
      font-size 16px
      padding-right 25px
</style>
