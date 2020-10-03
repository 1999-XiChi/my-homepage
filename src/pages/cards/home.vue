<template>
  <div class="home">
    <div class="main-focus">
      <div class="title landInText">Xichi's Homepage</div>
      <div class="subtitle landInText">欢迎来到西池的个人主页~</div>
      <div class="info">
        <li>o 我是一名就读于南京邮电大学的大三学生，计科专业。</li>
        <li>
          o
          我正在学习前端的漫漫之路上，虽然很菜，但对技术与设计永远拥有最真挚的热情！
        </li>
        <li>o 欢迎来找我玩耍, 一起交流技术哦~</li>
      </div>
      <music-player></music-player>
    </div>

    <my-footer ref="footer"></my-footer>
  </div>
</template>

<script>
import musicPlayer from "_c/musicPlayer";
import myFooter from "_c/myFooter";

export default {
  data() {
    return {};
  },
  components: {
    musicPlayer,
    myFooter
  },
  methods: {
    slideUp() {
      const infoList = document.querySelectorAll(".info li");
      infoList.forEach(info => {
        //info.style.animationDelay = `${1 + i* 0.5}s`;
        //info.style.animation = "slide-up 1s ease-out both";
        info.classList.add("slide-up");
      });
    }
  },
  mounted() {
    window.onload = () => {
      this.slideUp();
    };
  }
};
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-direction column
  align-items center
  justify-content center
  height 100%
  width 100%
  .main-focus
    width 100%
    padding 10px
    color #fff
    .title
      font 1.5rem POWER-SELL
      letter-spacing 0.2em
    .subtitle
      font 0.7rem A61
      letter-spacing 0.2em
    .info
      width 50%
      margin 0 auto
      padding-top 20px
      font .5rem A61
      text-align left
      li
        line-height 30px
      for i in 1 2 3
        li:nth-child({i})
          animation-delay (i*0.25)s

.slide-up
  animation slide-up 1s ease-out both

@keyframes slide-up
  0%
    opacity 0
    transform translateY(50px)
  80%
    opacity 0.3
    transform translateY(-10px)
  100%
    opacity 1
    transform translateY(0)

@media screen and (max-width: 767px)
  .home
    .main-focus
      .info
        width 90%
        font 16px A61
</style>
