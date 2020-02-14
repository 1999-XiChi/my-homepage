<template>
  <div id="musicPlayer">
    <audio
      :src="currentSong"
      autoplay
      ref="audio"
      @ended="nextsong()"
      crossOrigin="anonymous"
    ></audio>
    <!-- crossOrigin='anonymous' 支持跨域  -->
    <div class="mp3btn paused" @click="playMusic" ref="mp3btn"></div>
    <canvas id="canvas" ref="canvas"></canvas>
    <div class="nav">
      <div class="pre" @click="playPreSong"></div>
      <div class="name">{{ songs[currentIndex].name }}</div>
      <div class="next" @click="playNextSong"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [
        {
          id: 0,
          author: "中島美嘉 ",
          name: "僕が死のうと思ったのは",
          src:
            "http://music.xichi.xyz/homepage/中島美嘉 - 僕が死のうと思ったのは.mp3"
        },
        {
          id: 1,
          author: "Eagles",
          name: "Hotel California",
          src: "http://music.xichi.xyz/homepage/Eagles - Hotel California.mp3"
        },
        {
          id: 2,
          author: "Taylor Swift",
          name: "Blank Space",
          src: "http://music.xichi.xyz/homepage/Taylor Swift - Blank Space.mp3"
        },
        {
          id: 3,
          author: "Kendrick Lamar",
          name: "DNA",
          src: "http://music.xichi.xyz/homepage/Kendrick Lamar - DNA.mp3"
        },
         {
          id: 4,
          author: "P!nk",
          name: "Try",
          src: "http://music.xichi.xyz/homepage/P!nk - Try.mp3"
        }
      ],
      currentSong:
        "http://music.xichi.xyz/homepage/中島美嘉 - 僕が死のうと思ったのは.mp3",
      currentIndex: 0,
      audioState: false
    };
  },
  methods: {
    nextsong() {
      this.currentIndex = ++this.currentIndex % this.songs.length;
      this.currentSong = this.songs[this.currentIndex].src;
    },
    playPreSong() {
      this.currentIndex--;
      if (this.currentIndex === -1) this.currentIndex = this.songs.length - 1;
      this.currentSong = this.songs[this.currentIndex].src;
      let mp3btn = this.$refs.mp3btn;
      mp3btn.classList.add("running");
      mp3btn.classList.remove("paused");
      this.$options.methods.audioVisualization.bind(this)();
    },
    playNextSong() {
      this.currentIndex = ++this.currentIndex % this.songs.length;
      this.currentSong = this.songs[this.currentIndex].src;
      let mp3btn = this.$refs.mp3btn;
      mp3btn.classList.add("running");
      mp3btn.classList.remove("paused");
      this.$options.methods.audioVisualization.bind(this)();
    },
    playMusic() {
      let audio = this.$refs.audio;
      let mp3btn = this.$refs.mp3btn;
      if (audio.paused) {
        audio.play();
        mp3btn.classList.add("running");
        mp3btn.classList.remove("paused");
      } else {
        audio.pause();
        mp3btn.classList.add("paused");
        mp3btn.classList.remove("running");
      }
      this.$options.methods.audioVisualization.bind(this)();
    },
    audioVisualization() {
      var audio = this.$refs.audio;
      //part1: 画布
      var canvas = this.$refs.canvas;
      var context = canvas.getContext("2d");

      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;

      //part2: 音频
      //audio.load();

      //part3: 分析器
      var AudCtx = new AudioContext(); //音频内容
      var src = AudCtx.createMediaElementSource(audio);
      var analyser = AudCtx.createAnalyser();

      src.connect(analyser);
      analyser.connect(AudCtx.destination);
      analyser.fftSize = 128; //快速傅里叶变换, 必须为2的N次方

      var bufferLength = analyser.frequencyBinCount; // = fftSize * 0.5

      //part4: 变量
      var barWidth = WIDTH / bufferLength - 1; //间隔1px
      var barHeight;

      var dataArray = new Uint8Array(bufferLength); //8位无符号定长数组 */

      //part5: 动态监听
      function renderFrame() {
        requestAnimationFrame(renderFrame); //方法renderFrame托管到定时器，无限循环调度，频率<16.6ms/次

        context.fillStyle = "transparent"; //黑色背景
        context.clearRect(0, 0, WIDTH, HEIGHT);
        context.fillRect(0, 0, WIDTH, HEIGHT); //画布拓展全屏,动态调整

        analyser.getByteFrequencyData(dataArray); //获取当前时刻的音频数据

        //part6: 绘画声压条
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
          var data = dataArray[i]; //int,0~255

          var percentV = data / 255; //纵向比例
          var percentH = i / bufferLength; //横向比例

          barHeight = HEIGHT * percentV;

          //gbk,0~255
          var r = 100 * percentH; //值越小越红
          var g = 200;
          var b = 255 * percentV; //值越大越蓝

          context.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.5)";
          context.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 1; //间隔1px
        }
      }
      renderFrame();

      //part7: 播放声音
      //audio.play();
    }
  },
  watch: {
    audioState: function() {
      if (this.audioState) this.audioVisualization();
      return !this.$refs.audio.paused;
    }
  },
  mounted() {
    window.onload = () => {
      var audio = this.$refs.audio;
      let mp3btn = this.$refs.mp3btn;
      if (!audio.paused) {
        mp3btn.classList.add("running");
        mp3btn.classList.remove("paused");
        this.audioVisualization();
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
#musicPlayer
  .mp3btn
    position absolute
    top 20px
    right 20px
    width 30px
    height 30px
    background-image url('http://njupt.xichi.xyz/icon/music.png')
    background-size 100% 100%
    animation rotate 2s linear infinite
    transition all 2s ease-in
  .chooseBox
    font-size 12px
  #canvas
    width 50%
    height 150px
    margin 0 auto
    margin-top 20px
  .nav
    width 50%
    margin 0 auto
    font .5rem POWER-SELL
    display flex
    justify-content space-between
    align-items center
    .pre, .next
      width 1.5rem
      height 0.5rem
      cursor pointer
    .pre
      background-image url("http://njupt.xichi.xyz/icons/previous.png")
      background-size 100% 100%
    .next
      background-image url("http://njupt.xichi.xyz/icons/next.png")
      background-size 100% 100%
@keyframes rotate {
  from{
    transform:rotate(0);
  }
  to{
    transform:rotate(360deg);
  }
}
.paused
  background-image url('http://njupt.xichi.xyz/icon/stopmusic.png') !important
  animation-play-state paused !important
.running
  animation-play-state running !important
@media screen and (max-width: 767px)
  #musicPlayer
    #canvas
      width 90%
    .nav
      width 90%
</style>
