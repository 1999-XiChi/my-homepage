<template>
  <p
    class="Message"
    :style="{
      backgroundColor: typeColor,
    }"
  >
    {{ value }}
  </p>
</template>

<script>
export default {
  data() {
    return {
      value: "我是一个弹框",
      type: "Default",
    };
  },
  computed: {
    typeColor: function() {
      let bgColor;
      switch (this.type) {
      case "Default":
        bgColor = "#409EFF";
        break;
      case "Success":
        bgColor = "#67C23A";
        break;
      case "Warning":
        bgColor = "#E6A23C";
        break;
      case "Danger":
        bgColor = "#F56C6C";
        break;
      case "Info":
        bgColor = "#909399";
        break;
      default:
        bgColor = "#409EFF";
      }
      return bgColor;
    },
  },
};
</script>

<style lang="stylus" scoped>
.Message {
  position: fixed;
  bottom: 30px;
  width: 200px;
  color: #fff;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  animation: messageFade 2.1s 1;
}
/* 加个简单动画 */
@keyframes messageFade {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 80%, 0);
    transform: translate3d(-50%, 80%, 0);
  }
  16% {
    opacity: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }
  84% {
    opacity: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(-50%, 80%, 0);
    transform: translate3d(-50%, 80%, 0);
  }
}
</style>
