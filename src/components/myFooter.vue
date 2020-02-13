<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="info">
        <div>HEELO!</div>
        <div>Nice to meet you, my friends!</div>
      </div>
      <div class="links">
        <div>Links</div>
        <ul>
          <li>xichi's blog</li>
          <li>NJUPT Movie Club</li>
          <li>...</li>
        </ul>
      </div>
      <div class="contact-us">
        <div>Contact Us</div>
        <ul>
          <li>github</li>
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
    padding 10px 50px
    height 100%
    transform translateY(100px)
    background-color rgba(#002c3e, 0.8)
    transition all .3s linear
</style>
