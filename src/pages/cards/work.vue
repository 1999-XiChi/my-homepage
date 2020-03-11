<template>
  <div class="work">
    <div class="landInText">
      Here are my works, hoping you'll love them ~
    </div>
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(card, index) in workCards" :key="index">
        <work-card class="workCard">
          {{ card }}
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
    swiperSlide
  },
  data() {
    return {
      workCards: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
          clickable: true
        }
      }
    };
  },
  methods: {},
  mounted() {}
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
</style>
