<template>
  <div class="more">
    <scroll-view
      class="message-board"
      :width="mobileAgent ? '80%' : '60%'"
      :height="mobileAgent ? '70%' : '80%'"
      :scrollbarStyle="{ backgroundColor: 'rgba(15, 76, 129, 0.8)' }"
    >
      <template v-slot>
        <div class="message-content">
          <div class="header">欢迎给我留言~</div>
          <div class="new_message">
            <div
              :style="{
                display: 'flex',
                flexDirection: 'column',
              }"
            >
              <div
                :style="{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }"
              >
                <input v-model="name" type="text" placeholder="Your Name" />
                <div class="avatar-box">
                  <img
                    v-for="(avatar, index) in defaultAvatars"
                    :src="avatar"
                    :key="index"
                    :style="{
                      opacity: index == currentAvatarIndex ? '1' : '.6',
                    }"
                    @click="changeAvatarIndex(index)"
                  />
                </div>
              </div>
              <textarea
                placeholder="Your Message"
                maxlength="140"
                v-model="message"
                :style="{ resize: 'none' }"
              />
              <div class="submit-btn" :style="{ width: '100%' }">
                <span class="count-tip"
                  >还能输入<span>{{ 140 - message.length }}</span
                  >个字</span
                >
                <input
                  class="preview"
                  type="button"
                  value="预览"
                  @click="togglePreview"
                />
                <input
                  class="submit"
                  type="submit"
                  value="发表留言"
                  @click="addMessage"
                />
              </div>
            </div>
          </div>
          <div class="message-list-title">
            <span>留言墙</span>
          </div>
          <div class="message-list">
            <div class="message-card" v-if="preview">
              <img
                class="avatar"
                :src="defaultAvatars[currentAvatarIndex]"
                alt=""
              />
              <div class="main">
                <div class="head">
                  <span class="name">{{ name }}</span>
                  <span class="time">{{ date }}</span>
                </div>
                <div
                  class="text"
                  style="word-break: break-all;white-space: pre-wrap;"
                >
                  {{ message }}
                </div>
                <div class="kodos">
                  <div class="like" @click="toggleLike">
                    {{ like ? "♥" : "♡" }}
                  </div>
                  <div class="reply">回复</div>
                </div>
              </div>
            </div>
            <div
              v-for="(message, index) in messageList"
              :key="index"
              class="message-card"
            >
              <img class="avatar" :src="message.avatar" alt="" />
              <div class="main">
                <div class="head">
                  <span class="name">{{ message.user }}</span>
                  <span class="time">{{ message.date }}</span>
                </div>
                <div
                  class="text"
                  style="word-break: break-all;white-space: pre-wrap;"
                >
                  {{ message.message }}
                </div>
                <div class="kodos">
                  <div class="like" @click="toggleLike">
                    {{ message.like ? "♥" : "♡" }}
                    {{ message.likes }}
                  </div>
                  <div class="reply">回复</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </scroll-view>
  </div>
</template>

<script>
import scrollView from "_c/base/scrollView";
import { getAllMessage, addMessage } from "../../api/index";
export default {
  components: {
    scrollView,
  },
  data() {
    return {
      mobileAgent: false,
      defaultAvatars: [
        "http://njupt.xichi.xyz/homepage/avatar/avatar_girl.png",
        "http://njupt.xichi.xyz/homepage/avatar/avatar_boy.png",
        "http://njupt.xichi.xyz/homepage/avatar/avatar9.jpg",
        "http://njupt.xichi.xyz/homepage/avatar/avatar8.jpg",
        "http://njupt.xichi.xyz/homepage/avatar/avatar5.jpg",
        "http://njupt.xichi.xyz/homepage/avatar/avatar4.jpg",
      ],
      currentAvatarIndex: 0,
      message: "",
      name: "",
      date: "",
      like: false,
      messageList: [],
      preview: false,
    };
  },
  methods: {
    changeAvatarIndex(index) {
      this.currentAvatarIndex = index;
    },
    toggleLike() {
      this.like = !this.like;
    },
    togglePreview() {
      this.preview = !this.preview;
    },
    async getAllMessage() {
      const { data: messageData } = await getAllMessage();
      if (messageData.statusCode === 200) {
        const { msg: messageArray } = messageData;
        const message = messageArray.map((message) => ({
          ...message,
          date: this.$moment(message.date).format("lll"),
        })).reverse();
        this.messageList = message;
      }
    },
    async addMessage() {
      const avatar = this.defaultAvatars[this.currentAvatarIndex];
      const date = new Date();
      const { data: result } = await addMessage(
        this.name,
        avatar,
        this.message,
        date
      );
      if (result.statusCode === 200) {
        this.preview = false;
      }
      this.$options.methods.getAllMessage.bind(this)(0);
    },
  },
  created() {
    this.getAllMessage();
  },
  mounted() {
    this.mobileAgent = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
    this.date = this.$moment(new Date()).format("lll");
  },
};
</script>

<style lang="stylus" scoped>
.more
  height 100vh
  display flex
  align-items center
  .message-board
    color #000
    font-size 15px
    border-radius 20px
    background-color rgba(255,255,255,.9)
    .message-content
      padding 10px 10%
      .header
        line-height 30px
      .new_message
        input[type=text], textarea
          outline none
          border 1px solid #999
          border-radius 5px
          padding 5px
          margin-bottom 10px
        input[type=text]
          width 100px
          height 20px
          margin-bottom 0
        textarea
          box-sizing border-box
          height 60px
          width 100%
        .avatar-box
          display flex
          margin 5px 10px
          >img
            width 50px
            height 50px
            margin 0 2px
          >img:hover
            opacity 1!important
        .submit-btn
          display flex
          justify-content flex-end
          .count-tip
            font-size 13px
            line-height 30px
            margin-right 5px
          >input
            height 30px
            color #fff
            border-radius 3px
            border-width 0
            margin 0
            outline none
            font-family KaiTi
            text-align center
            cursor pointer
            font-size 17px
          .preview
            width 50px
            background-color #ffab40
            margin-right 5px
          .submit
            width 100px
            background-color #009688
      .message-list-title
        background-color #d4dee1
        height 40px
        margin-top 10px
        > span
          float left
          margin 10px 10px 0 10px
          padding 0 20px
          line-height 30px
          background-color #ffffff
          border-radius 10px 10px 0 0
      .message-list
        margin-top 10px
        .message-card
          padding 10px 0
          min-height 100px
          border-bottom 1px dashed #999
          display flex
          justify-content flex-start
          align-items flex-start
          .avatar
            width 50px
            height 50px
          .main
            margin-left 10px
            .head
              display flex
              justify-content flex-start
              .name
                color #2C3E50
                font-weight bold
                font-size 15px
                line-height 20px
              .time
                margin-left 8px
                color #666
                font-size 12px
                line-height 20px
            .text
              min-height 50px
              text-align left
              color #2A2E2E
              margin 5px 0
            .kodos
              display flex
              justify-content flex-start
              .like
                color #e91e63
                font-size 20px
                cursor pointer
                line-height 20px
              .reply
                margin-left 5px
                color #999
                cursor pointer
                font-size 12px
                line-height 20px
    .box
      height 500px
@media screen and (max-width:787px)
  .more
    .message-board
      .message-content
        .new_message
          .avatar-box
            margin 5px 0
            >img
              width 30px
              height 30px
</style>
