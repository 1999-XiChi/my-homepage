<template>
  <div class="info">
    <scroll-view
      class="info-board"
      :width="mobileAgent ? '90%' : '70%'"
      :height="mobileAgent ? '80%' : '80%'"
      :scrollbarStyle="{ backgroundColor: 'rgba(15, 76, 129, 0.8)' }"
    >
      <template v-slot>
        <div class="info-intro">
          <div class="title">
            <img
              src="http://njupt.xichi.xyz/homepage/icon/light_bulb.png"
              width="35"
              height="35"
              style="vertical-align: sub;margin-right:10px;"
            />
            你好呀~
          </div>
          <div class="subtitle">
            我是一名就读于南京邮电大学的大三学生，计科专业。我正在学习前端的漫漫之路上，虽然很菜，但对技术与设计永远拥有最真挚的热情！
          </div>
        </div>
        <div class="info-content">
          <div class="info-card">
            <img
              class="info-icon"
              src="http://njupt.xichi.xyz/homepage/icon/frontend.png"
            />
            <div class="title">前端开发者</div>
            <div class="detail">
              目前比较熟悉的前端技术栈是Vue、React和NodeJs，现在正在学习TypeScript中！大前端就是坠吊的！用最简单的逻辑，能够体会到从UI到后端到运维的全部乐趣（不是
            </div>
          </div>
          <div class="info-card">
            <img
              class="info-icon"
              src="http://njupt.xichi.xyz/homepage/icon/painting.png"
            />
            <div class="title">渣渣画手</div>
            <div class="detail">
              赛璐璐上色流派。至今仍在搞原创的原因是，同人实在画不像啊，不然本冷cp爱好者一定在割大腿肉的路上。
            </div>
          </div>
          <div class="info-card">
            <img
              class="info-icon"
              src="http://njupt.xichi.xyz/homepage/icon/video.png"
            />
            <div class="title">电影游戏爱好者</div>
            <div class="detail">
              特长是宅。平时爱好就是看电影和打打单机游戏，偏爱探索度高的开放世界游戏（没错，塞尔达天下第一！！）
            </div>
          </div>
        </div>
        <div class="separated-bar">绘画作品</div>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/IMG_0049.JPG" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img
                src="http://njupt.xichi.xyz/blog/QQ图片20200406201436.jpg"
                alt=""
              />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/blog/祈祷.jpg" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/blog/吸血鬼.jpg" alt="" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/blog/海底世界.jpg" alt="" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/IMG_0334.JPG" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/blog/IMG_0321.JPG" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="swiper-zoom-container">
              <img src="http://njupt.xichi.xyz/blog/期末报告单.png" />
            </div>
          </swiper-slide>
          <div
            class="swiper-pagination swiper-pagination-white"
            slot="pagination"
          ></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </template>
    </scroll-view>
  </div>
</template>

<script>
import scrollView from "_c/base/scrollView";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    scrollView,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      mobileAgent: false,
      swiperOption: {
        zoom: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  mounted() {
    this.mobileAgent = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
  },
};
</script>

<style lang="stylus" scoped>
.info
  height 100vh
  display flex
  align-items center
  .info-board
    background-color rgba(255,255,255,.8)
    border-radius 5px
    font-size 15px
    .info-intro
      margin 0 auto
      margin-top 50px
      width 50%
      .title
        color #2c3e50
        font-weight bold
        font-size 30px
      .subtitle
        margin-top 20px
        font-size 15px
        text-align left
        text-indent 2em
    .info-content
      margin-top 50px
      padding 20px 0
      display flex
      justify-content space-around
      .info-card
        width 25%
        padding 10px 20px
        border-radius 5px
        .info-icon
          width auto
          height 100px
        .title
          font-size 20px
          line-height 50px
          color #3C4858
          font-weight bold
        .detail
          color #666
          text-align left
          text-indent 2em
    .separated-bar
      margin-top 50px
      line-height 80px
      font-size 20px
      color #3C4858
      font-weight bold
@media screen and (max-width 787px)
  .info
    .info-board
      margin-top 50px
      .info-content
        flex-direction column
        .info-card
          width 80%
          margin 0 auto
          margin-bottom 20px
</style>

<style lang="stylus" scoped>
.swiper {
  margin: 20px auto;
  height: 400px;
  width: 80%;
  display: flex;
  justify-content: center;

  .swiper-slide {
    background-color: rgba(255,255,255,.5);
  }
}
</style>
