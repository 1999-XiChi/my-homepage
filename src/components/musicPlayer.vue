<template>
  <div id="okk">
    <audio
      :src="currentSong"
      autoplay
      @ended="nextsong()"
    ></audio>
    <ul>
      <li
        class="chooseBox"
        v-for="(item, index) in songs"
        @click="clickHandle(index)"
        :key="index"
      >
        <p>歌手:{{ item.name }}==== 歌名:{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [
        {
          id: 1,
          name: "中島美嘉 ",
          title: "僕が死のうと思ったのは",
          src:
            "http://music.xichi.xyz/homepage/中島美嘉 - 僕が死のうと思ったのは.mp3"
        },
        {
          id: 2,
          name: "Eagles",
          title: "Hotel California",
          src: "http://music.xichi.xyz/homepage/Eagles - Hotel California.mp3"
        },
        {
          id: 3,
          name: "Taylor Swift",
          title: "Blank Space",
          src: "http://music.xichi.xyz/homepage/Taylor Swift - Blank Space.mp3"
        }
      ],
      currentSong:
        "http://music.xichi.xyz/homepage/中島美嘉 - 僕が死のうと思ったのは.mp3",
      currentIndex: 0
    };
  },
  methods: {
    clickHandle: function(index) {
      console.log(this);
      // console.log(this.songs[index])
      this.currentSong = this.songs[index].src;
      this.currentIndex = index; //参数为index时
      // this.currentSong = item.src;   //参数为item时
    },
    nextsong: function() {
      // alert(111);
      // alert(this.currentIndex);
      console.log(this.songs.length);
      console.log(this.currentIndex);
      if (this.currentIndex == this.songs.length - 1) {
        this.currentIndex = -1;
      }
      this.currentIndex++;
      console.log(this.currentIndex);
      this.currentSong = this.songs[this.currentIndex].src;
    }
  }
};
</script>

<style lang="stylus" scoped>
.chooseBox
  font-size 12px
</style>
