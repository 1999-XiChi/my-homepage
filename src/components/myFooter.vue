<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="info">
        <div class="title">HELLO!</div>
        <div id="busuanzi_container_site_pv" class="pv">
          本站总访问量<span id="busuanzi_value_site_pv"></span>次
        </div>
        <div id="busuanzi_container_site_uv" class="uv">
           本站访客数<span id="busuanzi_value_site_uv"></span>人次
        </div>
        <div class="record"><a href="http://www.beian.miit.gov.cn">浙ICP备19042074号-1</a></div>
        <img src="../assets/miku.png" alt="" />
      </div>
      <div class="links">
        <div class="title">Links</div>
        <ul>
          <li @click="clickFn('https://1999-xichi.github.io/')">
            XiChi's Blog
          </li>
          <li @click="clickFn('http://www.xichi.xyz/test/')">
            NJUPT Movie Club
          </li>
          <li @click="clickFn('http://api.xichi.xyz')">
            XiChi's API
          </li>
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
      max-width 40%
      .pv, .uv
        font-size 12px
        color rgba(255,255,255,0.5)
      .record a
        color #ef632b
      img
        display block
        margin 0 auto
        width auto
        height 1rem
@media screen and (max-width: 767px)
  .footer-wrap
    .footer
      transform translateY(0)
      padding 10px 10px
      .info
        img
          width 40px
          height auto
</style>
