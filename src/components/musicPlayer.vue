<template>
  <div class="musicPlayer">
    <audio
      :src="currentSong"
      preload
      ref="audio"
      class="audio"
      @ended="playNextSong()"
      crossOrigin="anonymous"
    ></audio>
    <!-- crossOrigin='anonymous' 支持跨域  -->
    <div class="mp3btn-wrap">
      <div class="mp3btn paused" @click="playMusic" ref="mp3btn"></div>
      <div class="music-list-wrap">
        <div class="header">今日推荐歌单 ∨</div>
        <ul class="music-list">
          <li
            v-for="(item, i) in songList"
            :key="i"
            :class="[{ active: i === currentSongListIndex }, 'songList']"
            @click="getSongs(i)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="visitor-song-list" @click="getVistorSongs">
          <img
            src="http://njupt.xichi.xyz/homepage/icon/vistor-like.png"
            width="15"
            height="15"
            style="vertical-align:middle;"
          />
          访客最爱歌单
        </div>
      </div>
    </div>
    <canvas id="canvas" ref="canvas"></canvas>
    <div class="nav">
      <div class="pre" @click="playPreSong">←</div>
      <div class="name">
        <div class="top">{{ songs[currentIndex].name }}</div>
        <div class="back">
          <div class="author">{{ songs[currentIndex].author }}</div>
          <div class="like" @click="toggleSongLike()">
            <img
              class="like-icon"
              v-show="isLike"
              src="http://njupt.xichi.xyz/homepage/icon/like.png"
            />
            <img
              class="like-icon"
              v-show="!isLike"
              src="http://njupt.xichi.xyz/homepage/icon/unlike.png"
            />
          </div>
        </div>
      </div>
      <div class="next" @click="playNextSong">→</div>
      <div class="volume-wrap" ref="volumeWrap" @click="changeVolume">
        <img
          class="volume-icon"
          :src="
            volume !== 0
              ? 'http://njupt.xichi.xyz/homepage/icon/volume.png'
              : 'http://njupt.xichi.xyz/homepage/icon/volumeN.png'
          "
          @click.stop="mute"
        />
        <div class="volume" ref="volume">
          <div class="circle" ref="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongList, addSong } from "../api/index";
export default {
  data() {
    return {
      songList: [],
      songs: [],
      vistorSongList: [],
      volume: 0.7,
      lastVolume: 0.7,
      currentSong: "",
      currentIndex: 0,
      currentSongListId: "",
      currentSongListIndex: 0,
      audioState: false,
      firstEntry: true,
      isLike: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    mute() {
      let audio = this.$refs.audio;
      let volume = this.$refs.volume;
      let wholeVolume = this.$refs.volumeWrap;
      if (this.volume === 0) {
        this.volume = this.lastVolume;
        volume.style.width = this.lastVolume * wholeVolume.clientWidth + "px";
        audio.volume = this.volume;
      } else {
        this.lastVolume = this.volume;
        this.volume = 0;
        volume.style.width = "0px";
        audio.volume = this.volume;
      }
    },
    changeVolume(e) {
      let audio = this.$refs.audio;
      let volume = this.$refs.volume;
      let wholeVolume = this.$refs.volumeWrap;
      let width = e.offsetX;
      this.volume = width / wholeVolume.clientWidth;
      volume.style.width = width + "px";
      audio.volume = this.volume;
    },
    playPreSong() {
      this.currentIndex--;
      if (this.currentIndex === -1) this.currentIndex = this.songs.length - 1;
      this.currentSong = this.songs[this.currentIndex].src;
      this.$nextTick(function() {
        // DOM 更新了
        this.$options.methods.playMusic.bind(this)();
      });
    },
    playNextSong() {
      this.currentIndex = ++this.currentIndex % this.songs.length;
      this.currentSong = this.songs[this.currentIndex].src;
      this.$nextTick(function() {
        // DOM 更新了
        this.$options.methods.playMusic.bind(this)();
      });
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
      audio.volume = this.volume;
      this.isLike = false;
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
      songListData.result.forEach((item) => {
        let itemInfo = {};
        itemInfo["id"] = item["id"];
        itemInfo["name"] = item["name"];
        this.songList.push(itemInfo);
      });
      this.currentSongListId = this.songList[0]["id"];
      this.$options.methods.getSongs.bind(this)(0);
    },
    async getSongs(i) {
      this.currentSongListIndex = i;
      const { data: songsData } = await this.$http.get(
        "http://api.xichi.xyz:3000/playlist/detail?id=" + this.songList[i]["id"]
      );
      this.songs = [];
      let currentSongCheck = false;
      songsData.playlist.tracks.forEach(async (item) => {
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
          if (currentSongCheck === false) {
            this.currentSong = songInfo["src"];
            currentSongCheck = true;
          }
          this.songs.push(songInfo);
        }
      });
      if (this.firstEntry === true) {
        this.firstEntry = false;
      } else {
        this.$message({ type: "Default", value: "成功切换歌单" });
        setTimeout(() => {
          this.$refs.audio.play();
        }, 1000);
      }
    },
    async getVistorSongs() {
      const { data: vistorSongListData } = await getSongList();
      if (vistorSongListData.statusCode === 200) {
        const { msg: vistorSongList } = vistorSongListData;
        this.vistorSongList = vistorSongList;
        this.songs = vistorSongList.map((songMsg) => ({
          ...songMsg.song,
        }));
        this.currentSong = this.songs[0]["src"];
      }
      this.$message({ type: "Default", value: "成功切换歌单" });
      setTimeout(() => {
        this.$refs.audio.play();
      }, 1000);
    },
    async toggleSongLike(){
      this.isLike = !this.isLike;
      if(this.isLike === true){
        const song = this.songs[this.currentIndex];
        const date = new Date();
        const user = localStorage.getItem("Ip")
        const cityname = localStorage.getItem("cityname");
        const msg = `一位来自${cityname}的用户${user}在${this.$moment(date).format("lll")}喜欢了这首歌`
        const {data: result} = await addSong(
          song,
          date,
          user,
          msg
        );
        this.$message({value:result.success, type: "Success"});
      }
    }
  },
  created() {
    this.getSongList();
  },
  updated() {
    //console.log(this.$refs.circle, this.$refs, document.querySelector('.volume'));
  },
  mounted() {},
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
    .songList, .header, .visitor-song-list
      display none
    &:hover
      .music-list-wrap
        position absolute
        top 20%
        right calc(100% + 5px)
        width 150px
        height 220px
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
        .visitor-song-list
          display block
          margin-bottom 5px
          font-size 13px
          text-align left
          color #90caf9
  .chooseBox
    font-size 12px
  #canvas
    width 40%
    height 150px
    margin 0 auto
    margin-top 20px
    margin-left 50px
  .nav
    position relative
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
    .name
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      &:hover
        .top
          transform translate(-50%, -80%)
        .back
          opacity .8
          transform translate(-50%, 10px)
      .top
        position absolute
        transform translate(-50%, -50%)
        width max-content
        transition all .5s ease
      .back
        display flex
        align-items center
        position absolute
        transform translate(-50%, -50%)
        width max-content
        transition all .5s ease
        opacity 0
        .author
          height 15px
          line-height 15px
          font-size 15px
        .like
          position relative
          height 15px
          line-height 15px
          margin-left 5px
          .like-icon
            position absolute 
            top 0
            left 0
            width 15px
            height 15px
    .volume-wrap
      position absolute
      top 0
      left 50%
      transform translate(-50%, 0)
      height 5px
      width 150px
      background-color rgba(255,255,255,0.3)
      border-radius 1.5px
      .volume-icon
        position absolute
        top 50%
        left 0
        transform translate(-150%, -50%)
        width 15px
        height 15px
      .volume
        position relative
        height 100%
        width 70%
        background-color rgba(#0f4c81,0.5)
        border-radius 1.5px
        transition all .2s linear
        .circle
          position absolute
          top -50%
          right 0
          transform translate(50%, -1px)
          width 10px
          height 10px
          border 1px solid rgba(255,255,255,0.8)
          border-radius 50%
          background-color rgba(#0f4c81,0.8)
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
<style>
#dv {
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50%;
  position: absolute;
}
</style>
