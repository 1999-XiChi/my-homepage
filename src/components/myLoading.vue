<template>
  <div class="loading-wrap">
    <div class="circle">
      <P>西池</P>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.loading-wrap
  position fixed
  top 0
  left 0
  background-color #fff
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  z-index 900
  .circle
    display flex
    align-items center
    justify-content center
    width 100px
    height 100px
    border-radius 50%
    background linear-gradient(#e66465, #9198e5)
    color #fff
    P
      font-size 20px
      letter-spacing 1em
      padding-left 1em
</style>
