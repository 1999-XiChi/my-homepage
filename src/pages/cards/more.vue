<template>
  <div class="work">
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
      workCards: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      swiperOption: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween:
          (document.documentElement.clientWidth || document.body.clientWidth) <=
          767
            ? 20
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
  align-items center
  justify-content center
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
@media screen and (max-width:767px)
  .work
    width 90%
    padding-top 50px
    .swiper-container
      padding-right 20px
      padding-bottom 20px
        .swiper-slide
          height 180px
          .workCard
            width 100%
</style>
