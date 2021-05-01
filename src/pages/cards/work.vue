<template>
  <div class="work">
    <div class="landInText">
      Here are my works, hoping you'll love them ~
    </div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(work, index) in workCards" :key="index">
        <work-card class="workCard">
          <template v-slot>
            <div class="info">{{ work.info }}</div>
            <img class="img" :src="work.img" @click="clickFn(work.url)" />
          </template>
          <template v-slot:github>
            <div class="github-wrap">
              <div
                class="github-item"
                v-for="(item, index) in work.github"
                :key="index"
              >
                <img
                  style="display:block;"
                  src="http://njupt.xichi.xyz/homepage/work/icon/github.png"
                  class="github-icon"
                  @click="clickFn(item.url)"
                />
                <div style="font-size:12px;color:#666;">{{ item.info }}</div>
              </div>
            </div>
          </template>
        </work-card>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import workCard from "_c/work/workCard";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    workCard,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      workCards: [
        {
          img: "http://njupt.xichi.xyz/blog/blog.xichi.xyz.png",
          url: "http://blog.xichi.xyz/",
          info: "我的博客",
          github: [
            {
              info: "front",
              url: "https://github.com/1999-XiChi/1999-XiChi.github.io",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/NJUPTMovieClub.png",
          url: "http://xichi.xyz/test/",
          info: "南邮影协主页",
          github: [
            {
              info: "front",
              url: "https://github.com/1999-XiChi/NJUPT-Movie-Club-frontend",
            },
            {
              info: "back",
              url: "https://github.com/1999-XiChi/NJUPT-Movie-Club-backend",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/calculator-app.png",
          url: "https://github.com/1999-XiChi/calculator-app/releases",
          info: "全能计算器APP",
          github: [
            {
              info: "github",
              url: "https://github.com/1999-XiChi/calculator-app",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/xichi-demo.png",
          url: "http://demo.xichi.xyz",
          info: "xichi's demo",
          github: [
            {
              info: "react",
              url: "https://github.com/1999-XiChi/react-demos",
            },
            {
              info: "webpack",
              url: "https://github.com/1999-XiChi/webpack-boilerplate",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/huffman.png",
          url: "http://xichi.xyz/huffman",
          info: "在线哈夫曼加密&解密",
          github: [
            {
              info: "huffman",
              url: "https://github.com/1999-XiChi/Huffman-Encryption-Webpage",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/xichi%27s%20api.png",
          url: "http://api.xichi.xyz/",
          info: "xichi's api",
          github: [
            {
              info: "demo",
              url: "https://github.com/1999-XiChi/The-first-meeting-Node.js",
            },
            {
              info: "libaray",
              url: "https://github.com/1999-XiChi/Library-Management-demo",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/thegirl.png",
          url: "http://www.xichi.xyz/thegirl/",
          info: "《文学少女》宣传页",
          github: [
            {
              info: "front",
              url: "https://github.com/1999-XiChi/SummerCode",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/managemall.png",
          url: "http://www.xichi.xyz/manage-mall/",
          info: "仿移动营业厅的管理后台",
          github: [
            {
              info: "front",
              url: "https://github.com/1999-XiChi/HelloWorld",
            },
          ],
        },
        {
          img: "http://njupt.xichi.xyz/homepage/work/japanclub.png",
          url: "http://xichi.xyz/japanclub/",
          info: "南邮日语俱乐部主页",
          github: [
            {
              info: "front",
              url: "https://github.com/1999-XiChi/HelloWorld",
            },
          ],
        },
      ],
      swiperOption: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerGroup: 2,
        spaceBetween:
          (document.documentElement.clientWidth || document.body.clientWidth) <=
          767
            ? 60
            : 55,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  methods: {
    clickFn(url) {
      window.open(url, "_blank");
    },
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
.work
  margin 0 auto
  width 70%
  height 100vh
  padding-top 20px
  display flex
  flex-direction column
  align-items center
  justify-content center
  .landInText
    margin 20px auto
    font .8rem POWER-SELL
    opacity 0.8
    color #fff
  .swiper-container
    width 100%
    height auto !important
    padding-right 50px
    padding-bottom 50px
    margin-left auto
    margin-right auto
    .swiper-slide
      width 100%
      height 200px
      .workCard
        margin 0 auto
        width 80%
        height 100%
        position relative
        .info
          position absolute
          bottom 20%
          left 50%
          transform translate(-50%, 0)
          font-size 18px
          z-index 201
          color #fff
          text-shadow 5px 2px 6px #000
        .img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          border-radius 10px
          z-index 200
          cursor pointer
        .github-wrap
          position absolute
          top 10px
          right 5px
          .github-item
            margin-bottom 15px
            .github-icon
              width 35px
              height 35px
              cursor pointer
    .swiper-pagination-bullets
      bottom 0
@media screen and (max-width:767px)
  .work
    width 90%
    padding-top 0
    .swiper-container
      padding-right 20px
      padding-bottom 20px
      .swiper-slide
        height 150px
        .workCard
          width 100%
          height 100%
          .github-wrap
            position absolute
            top 5px
            right 5px
            .github-item
              .github-icon
                width 20px
                height 20px
</style>
