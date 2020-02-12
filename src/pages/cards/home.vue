<template>
  <div class="home">
    <div class="main-focus">
      <div class="title">Xichi's Homepage</div>
      <div class="subtitle">欢迎来到西池的个人站点~</div>
      <div class="info">
        <li>我是南京邮电大学的一名大二学生，计科专业。</li>
        <li>我正在学习前端的漫漫之路上，虽然很菜，但对技术与设计永远拥有最真挚的热情。</li>
        <li>欢迎来找我玩耍,一起交流技术哦~</li>
      </div>
      <music-player></music-player>
    </div>
  </div>
</template>

<script>
import musicPlayer from "_c/musicPlayer";
export default {
  data(){
    return{

    }
  },
  components:{
    musicPlayer
  }
};
</script>

<style lang="stylus" scoped>
.home
  .main-focus
    margin-top 200px
    padding 10px
    font-size 50px
    color #fff
    .subtitle
      font-size 20px
    .info
      width 40%
      margin 0 auto
      padding-top 20px
      line-height 30px
      font-size 16px
      text-align left
</style>
