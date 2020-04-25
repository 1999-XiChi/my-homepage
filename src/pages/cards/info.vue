<template>
  <div class="info">
    <div class="left">
      <div class="landInText">
        <p>info about me</p>
        <p>西池：关于我的更多讯息~</p>
      </div>
      <div class="up-down">
        <div class="up" ref="up" @click="prePage">▲</div>
        <div class="down" ref="down" @click="nextPage">▼</div>
      </div>
    </div>
    <div class="infoSquare">
      <transition name="infoCards" tag="div" mode="out-in">
        <div class="main" :key="pageIndex">
          <div class="infoCard" v-for="(infoCard, i) in currentCards" :key="i">
            <div style="font-size:.6rem;color:#333;">{{ infoCard.info }}</div>
            <div style="font-size:.3rem;text-align:left;text-indent:2em;color:#666;">{{ infoCard.detail }}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 0,
      pageCardsCount: 2,
      currentCards: [],
      infoCards: [{
        info: "前端开发者",
        detail: "目前比较熟悉的前端技术栈是Vue和NodeJs，现在正在学习React和typescript，希望能不断加油吧！大前端就是坠吊的！用最简单的逻辑，能够体会到从UI到后端到运维的全部乐趣（不是"
      },{
        info: "画手",
        detail: "前老二次元。上色就像刷漆，你永远不知道下一笔是什么颜色（笑。至今仍在搞原创的原因是，同人实在画不像啊，不然本冷cp爱好者一定在割大腿肉的路上。"
      },{
        info: "捡垃圾大赛金奖得主",
        detail: "最大的爱好是磕cp，然而因为磕的cp总是过于冷门，不得不开始从垃圾中寻找快乐。每次打开procreate准备产粮时，发现自己画的实在是ooc，不得不改成原创。没错，人生就是这般悲伤QAQ"
      },{
        info: "梦想成为剪辑er",
        detail: "电脑太卡是我偷懒的借口orz\n本人唯一作品:BV17E411j7ZZ"
      }]
    };
  },
  computed: {
    pageCount: function() {
      return Math.ceil(this.infoCards.length / this.pageCardsCount);
    },
    pageCards: function() {
      let index = 0;
      let pageCards = new Array();
      do {
        let begin = index++ * this.pageCardsCount;
        let stop = begin + this.pageCardsCount;
        pageCards.push(this.infoCards.slice(begin, stop));
      } while (index < this.pageCount);
      return pageCards;
    }
  },
  watch: {
    pageIndex: function(newIndex) {
      if (newIndex === 0) {
        this.$refs.up.style.opacity = ".4";
        this.$refs.down.style.opacity = "1";
      } else if (newIndex === this.pageCount - 1) {
        this.$refs.up.style.opacity = "1";
        this.$refs.down.style.opacity = ".4";
      } else {
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
      this.currentCards = this.infoCards.slice(begin, stop);
    },
    nextPage() {
      if (++this.pageIndex === this.pageCount) {
        this.pageIndex = this.pageCount - 1;
        return;
      }
      this.pageIndex %= this.pageCount;
      const begin = this.pageIndex * this.pageCardsCount;
      const stop = begin + this.pageCardsCount;
      this.currentCards = this.infoCards.slice(begin, stop);
    }
  },
  mounted() {
    this.currentCards = this.infoCards.slice(0, this.pageCardsCount);
    this.$refs.up.style.opacity = ".4";
  }
};
</script>

<style lang="stylus" scoped>
.info
  width 70%
  margin 0 auto
  height 100vh
  display flex
  align-items center
  justify-content space-around
  .left
    width 30%
    display flex
    align-items center
    justify-content center
    .landInText
      font .8rem POWER-SELL
      opacity 0.8
      color #fff
      > p
        margin 5px
      P:nth-child(2)
        font .5rem A61
    .up-down
      margin-left 20px
      color #fff
      font-size 30px
      cursor pointer
      .up, .down
        box-shadow 0 0 5px 0 rgba(0,0,0,0.5)
  .infoSquare
    position relative
    width 60%
    height 70%
    .main
      width 100%
      height 100%
      display flex
      flex-direction column
      justify-content space-around
      align-items space-around
      flex-wrap wrap
      .infoCard
        height 40%
        border-radius 20px
        background-color #fff
        padding 20px 30px
.infoCards-enter-active, .infoCards-leave-active
  transition all .5s ease-in
.infoCards-enter,.infoCards-leave-to
  opacity 0.5
.infoCards-enter-to,.infoCards-leave
  opacity 1
@media screen and (max-width:787px)
  .info
    padding-top 30px
    width 90%
    .infoSquare
      box-sizing border-box
      padding 0 10px
      width 100%
      height 70%
      .main .workCard
        width 40%
        height 150px
        margin 10px
      .up-down
        bottom -40px
        font-size 20px
</style>
