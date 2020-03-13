<template>
  <div class="musicPlayer">
    <audio
      :src="currentSong"
      autoplay
      ref="audio"
      @ended="nextsong()"
      crossOrigin="anonymous"
    ></audio>
    <!-- crossOrigin='anonymous' 支持跨域  -->
    <div class="mp3btn-wrap">
      <div class="mp3btn paused" @click="playMusic" ref="mp3btn"></div>
      <div class="music-list-wrap">
        <div class="header">今日推荐歌单 ∨</div>
        <ul class="music-list">
          <li v-for="(item, i) in songList" :key="i" :class="[{ active: i === currentSongListIndex }, 'songList']" @click="getSongs(i)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <canvas id="canvas" ref="canvas"></canvas>
    <div class="nav">
      <div class="pre" @click="playPreSong">←</div>
      <div class="name">
        {{ songs[currentIndex].name
        }}<span class="author">--{{ songs[currentIndex].author }}</span>
      </div>
      <div class="next" @click="playNextSong">→</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visualize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      songList: [],
      songs: [],
      currentSong: "",
      currentIndex: 0,
      currentSongListId: "",
      currentSongListIndex: 0,
      audioState: false
    };
  },
  computed: {},
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

      // 修复canvas在高分屏下模糊的问题
      // window.devicePixelRatio = css的像素 / 屏幕的物理像素
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      context.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );

      var WIDTH = canvas.clientWidth;
      var HEIGHT = canvas.clientHeight;

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

        context.fillStyle = "transparent"; //透明背景
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
    },
    async getSongList() {
      const { data: songListData } = await this.$http.get(
        "http://api.xichi.xyz:3000/personalized?limit=10"
      );
      songListData.result.forEach(item => {
        let itemInfo = {};
        itemInfo["id"] = item["id"];
        itemInfo["name"] = item["name"];
        this.songList.push(itemInfo);
      });
      this.currentSongListId = this.songList[0]["id"];
      this.$options.methods.getSongs.bind(this)(0);
    },
    async getSongs(i){
      this.currentSongListIndex = i;
      const { data: songsData } = await this.$http.get(
        "http://api.xichi.xyz:3000/playlist/detail?id=" + this.songList[i]["id"]
      );
      this.songs = [];
      songsData.playlist.tracks.forEach(async item => {
        let songInfo = {};
        songInfo["id"] = item["id"];
        songInfo["name"] = item["name"];
        songInfo["author"] = item["ar"][0]["name"];
        let { data: checkSongsData } = await this.$http.get(
          "http://api.xichi.xyz:3000/check/music?id=" + item["id"]
        );
        if (checkSongsData.success) {
          let { data: songsData } = await this.$http.get(
            "http://api.xichi.xyz:3000/song/url?id=" + item["id"]
          );
          songInfo["src"] = songsData.data[0].url;
          this.songs.push(songInfo);
          this.currentSong = songInfo["src"];
        }
      });
    }
  },
  mounted() {
    window.onload = () => {
      var audio = this.$refs.audio;
      let mp3btn = this.$refs.mp3btn;
      if (!audio.paused) {
        mp3btn.classList.add("running");
        mp3btn.classList.remove("paused");
        this.$options.methods.audioVisualization.bind(this)();
      }
    };
    this.getSongList();
  }
};
</script>

<style lang="stylus" scoped>
.musicPlayer
  .mp3btn-wrap
    position absolute
    top 20px
    right 20px
    width 40px
    height 40px
    .mp3btn
      float right
      width 30px
      height 30px
      background-image url('http://njupt.xichi.xyz/icon/music.png')
      background-size 100% 100%
      cursor pointer
      animation rotate 2s linear infinite
      transition all 1s ease-in
    .songList, .header
      display none
    &:hover
      .music-list-wrap
        position absolute
        top 20%
        right calc(100% + 5px)
        width 150px
        height 200px
        padding 10px
        border-radius 10px
        background-color rgba(0,0,0,.5)
        &:before
          content ""
          position absolute
          top 10px
          right -15px
          border solid 5px transparent
          border-left solid 10px rgba(0,0,0,.5)
        .music-list
          overflow hidden
          display flex
          flex-direction column
          .active
            color rgba(255,255,255,0.9)
            animation 5s wordsLoop linear infinite normal
          .songList
            display inline-block
            color rgba(255,255,255,0.8)
            text-align left
            font-size 12px
            line-height 18px
            white-space nowrap
            &:hover
              animation 5s wordsLoop linear infinite normal
        .header
          display block
          margin-bottom 5px
          font-size 13px
          font-weight bold
          text-align left
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
      font-size 1rem
      color #fff
      cursor pointer
    .author
      padding-left 1rem
      font-size .3rem
@keyframes rotate {
  from{
    transform:rotate(0);
  }
  to{
    transform:rotate(360deg);
  }
}
@keyframes wordsLoop {
    0% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

.paused
  background-image url('http://njupt.xichi.xyz/icon/stopmusic.png') !important
  animation-play-state paused !important
.running
  animation-play-state running !important
@media screen and (max-width: 767px)
  .musicPlayer
    #canvas
      height 50px
      width 90%
    .nav
      width 90%
</style>
