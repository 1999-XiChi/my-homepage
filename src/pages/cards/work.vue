<template>
  <div class="work">
    <div class="landInText">
      Here are my works, hoping you'll love them ~
    </div>
    <div class="workSquare">
      <work-card
        v-for="(workCard, i) in currentCards"
        :key="i"
        class="workCard"
      >
        {{ workCard }}
      </work-card>
      <div class="up-down">
        <div class="up" ref="up" @click="prePage">▲</div>
        <div class="down" ref="down" @click="nextPage">▼</div>
      </div>
    </div>
  </div>
</template>

<script>
import workCard from "_c/work/workCard";
export default {
  components: {
    workCard
  },
  data() {
    return {
      pageIndex: 0,
      pageCardsCount: 4,
      currentCards: [],
      workCards: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    };
  },
  computed: {
    pageCount: function() {
      return Math.ceil(this.workCards.length / this.pageCardsCount);
    }
  },
  watch: {
    pageIndex: function(newIndex) {
      if (newIndex === 0) this.$refs.up.style.opacity = ".5";
      else if (newIndex === this.pageCount-1) this.$refs.down.style.opacity = ".5";
      else{
        this.$refs.up.style.opacity = "1";
        this.$refs.down.style.opacity = "1";
      }
    }
  },
  methods: {
    prePage() {
      if (--this.pageIndex === -1) {
        this.pageIndex = 0;
        return;
      }
      this.pageIndex %= this.pageCount;
      const begin = this.pageIndex * this.pageCardsCount;
      const stop = begin + this.pageCardsCount;
      this.currentCards = this.workCards.slice(begin, stop);
    },
    nextPage() {
      if (++this.pageIndex === this.pageCount) {
        this.pageIndex = this.pageCount - 1;
        return;
      }
      this.pageIndex %= this.pageCount;
      const begin = this.pageIndex * this.pageCardsCount;
      const stop = begin + this.pageCardsCount;
      this.currentCards = this.workCards.slice(begin, stop);
    }
  },
  mounted() {
    this.currentCards = this.workCards.slice(0, 4);
    this.$refs.up.style.opacity = ".5";
  }
};
</script>

<style lang="stylus" scoped>
@font-face
  font-family POWER-SELL
  src url('http://njupt.xichi.xyz/fonts/POWER SELL.ttf')
.work
  height 100vh
  display flex
  align-items center
  justify-content center
  flex-direction column
  .landInText
    font .8rem POWER-SELL
    opacity 0.8
    color #fff
  .workSquare
    position relative
    width 70%
    height 70%
    display flex
    flex-direction row
    justify-content space-around
    align-items space-around
    flex-wrap wrap
    .workCard
      width 33%
      height 200px
      margin 20px
      border-radius 10px
      background-color #fff
    .up-down
      position absolute
      bottom 0
      right 0
      color #fff
      font-size 30px
      cursor pointer
</style>
