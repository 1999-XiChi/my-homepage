<template>
  <div class="card-wrap">
    <div class="card">
      <slot></slot>
    </div>
    <div class="card-bg-wrap"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  mounted() {
    
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
.card-wrap
  position relative
  .card
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color #fffdf9
    z-index 101
    border-radius 10px
  .card-bg-wrap
    position absolute
    top 10px
    left 15px
    width 100%
    height 100%
    background-color rgba(255,255,255,0.4)
    border-radius 10px
    transition all .3s linear
    z-index 100
  &:hover .card-bg-wrap
    width calc(100% + 20px)
    height calc(100% + 10px)
</style>