<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="info">
        <div class="title">HEELO!</div>
        <div>Nice to meet you, my friends!</div>
        <img src="../assets/miku.png" alt="">
      </div>
      <div class="links">
        <div class="title">Links</div>
        <ul>
          <li @click="clickFn('https://1999-xichi.github.io/')">xichi's blog</li>
          <li @click="clickFn('http://www.xichi.xyz/test/')">NJUPT Movie Club</li>
          <li>...</li>
        </ul>
      </div>
      <div class="contact-us">
        <div class="title">Contact Us</div>
        <ul>
          <li @click="clickFn('https://github.com/1999-XiChi')">github</li>
          <li>email</li>
          <li>QQ</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    clickFn(url) {
      window.open(url, "_blank");
    }
  },
  mounted() {
  }
};
</script>

<style lang="stylus" scoped>
.footer-wrap
  position absolute
  bottom 0
  width 100vw
  height 100px
  color #fff
  font-size 12px
  animation slideUp 1s ease
  &:hover .footer
    transform translateY(0)
  .footer
    display flex
    justify-content space-between
    padding 10px 5rem
    height 100%
    transform translateY(100px)
    background-color rgba(#002c3e, 0.8)
    transition all .3s linear
    ul
      margin 5px 0 0 0
      padding-left 0
      > li
        line-height 20px
        cursor pointer
        &:hover
          color rgba(255,255,255,0.5)
    .title
      font-weight bold
    .info
      img
        width 1.5rem
        height 1.2rem
@media screen and (max-width: 767px)
  .footer-wrap
    .footer
      transform translateY(0)
      padding 10px 10px
</style>
