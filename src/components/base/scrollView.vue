<template>
  <div class="scroll-wrap" :style="{ width: width, height: height }">
    <div class="scroll-container" ref="container">
      <div class="scroll-content" ref="content">
        <slot></slot>
      </div>
    </div>
    <div class="scroll-bar" ref="bar" :style="scrollbarStyle"></div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "60%",
    },
    height: {
      type: String,
      default: "80%",
    },
    scrollbarStyle: Object,
  },
  methods: {
    moveScrollBar() {
      const container = this.$refs.container;
      const content = this.$refs.content;
      const bar = this.$refs.bar;
      const rate = container.clientHeight / content.scrollHeight;
      const barHeight = rate * container.clientHeight;
      if (rate < 1) {
        //需要出现滚动条,并计算滚动条的高度
        bar.style.display = "block";
        bar.style.height = barHeight + "px";
      } else {
        //不需要出现滚动条
        bar.style.display = "none";
      }
      container.addEventListener("scroll", (e) => {
        bar.style.top = e.target.scrollTop * rate + "px";
      });
    },
  },
  updated() {
    this.moveScrollBar();
  },
  mounted() {
    this.moveScrollBar();
  },
};
</script>

<style lang="stylus" scoped>
.scroll-wrap
  overflow hidden
  margin 0 auto
  position relative
  .scroll-bar
    position absolute
    top 0
    right 0
    border-radius 5px
    width 5px
    height 30%
    background-color rgba(255,255,255,.6)
  .scroll-container
    width calc(100% + 18px) /* 挡住原生scrollbar */
    height 100%
    overflow auto
    .scroll-content
      width 100%
      margin-left -9px
</style>
