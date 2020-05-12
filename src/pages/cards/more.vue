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
            <div class="message-card preview-card" v-if="preview">
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
                  style="word-break: break-all;white-space: pre-line;"
                >
                  {{ message }}
                </div>
                <div class="kodos">
                  <div class="like" @click="toggleLike">
                    <img
                      class="like-icon"
                      :src="
                        like
                          ? 'http://njupt.xichi.xyz/homepage/icon/like.png'
                          : 'http://njupt.xichi.xyz/homepage/icon/unlike.png'
                      "
                    />
                    <span>{{ like === false ? "0" : "1" }}</span>
                  </div>
                  <div class="reply-wrap">
                    <div class="reply">回复</div>
                  </div>
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
                  style="word-break: break-all;white-space: pre-line;"
                >
                  {{ message.message }}
                </div>
                <div class="kodos">
                  <div class="like" @click="toggleMessageLike(message)">
                    <img
                      class="like-icon"
                      v-show="message.isLike"
                      src="http://njupt.xichi.xyz/homepage/icon/like.png"
                    />
                    <img
                      class="like-icon"
                      v-show="!message.isLike"
                      src="http://njupt.xichi.xyz/homepage/icon/unlike.png"
                    />
                    <span>{{ message.likes }}</span>
                  </div>
                  <div class="reply" @click="toggleReplyShown(message)">
                    <span>回复</span>
                    <img
                      class="down-icon"
                      src="http://njupt.xichi.xyz/homepage/icon/down.png"
                      alt=""
                    />
                  </div>
                </div>
                <transition name="reply-dropdown">
                  <div class="reply-dropdown" v-show="!message.replyHidden">
                    <div class="reply-box">
                      <input
                        v-model="replyName"
                        type="text"
                        placeholder="Your Name"
                      />
                      <textarea
                        placeholder="Your Message"
                        maxlength="140"
                        v-model="replyMessage"
                        :style="{ resize: 'none' }"
                      />
                      <div class="submit-btn" :style="{ width: '100%' }">
                        <span class="count-tip"
                          >还能输入<span>{{ 140 - replyMessage.length }}</span
                          >个字</span
                        >
                        <input
                          class="submit"
                          type="submit"
                          value="回复"
                          @click="replyTheMessage(message)"
                        />
                      </div>
                    </div>
                    <div class="subMessage-box" v-for="(msg, i) in message.subMessages" :key="i">
                      <div class="head">
                        <span class="name">{{ msg.name }}</span>
                        <span class="date">{{ msg.date }}</span>
                      </div>
                      <div class="message">
                       {{ msg.message }}
                      </div>
                    </div>
                  </div>
                </transition>
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
import {
  getAllMessage,
  addMessage,
  likeMessage,
  unlikeMessage,
  replyMessage
} from "../../api/index";
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
      replyMessage: "",
      replyName: "",
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
    toggleReplyShown(message) {
      const replyHidden = message.replyHidden;
      const id = message.id;
      this.messageList = this.messageList.map((item) =>
        id === item.id
          ? {
            ...item,
            replyHidden: !replyHidden
          }
          : item
      );
    },
    async toggleMessageLike(message) {
      const isLike = message.isLike;
      const id = message.id;
      const { data: result } = await (isLike
        ? unlikeMessage(id)
        : likeMessage(id));
      await this.$options.methods.getAllMessage.bind(this)();
      this.messageList = this.messageList.map((item) =>
        id === item.id
          ? {
            ...item,
            isLike: !isLike,
          }
          : item
      );
    },
    async getAllMessage() {
      const { data: messageData } = await getAllMessage();
      if (messageData.statusCode === 200) {
        const { msg: messageArray } = messageData;
        const message = messageArray
          .map((message) => ({
            ...message,
            id: message._id,
            date: this.$moment(message.date).format("lll"),
            subMessages: message.subMessages.map((subMessage)=>({
              ...subMessage,
              date: this.$moment(subMessage.date).format("lll")
            })),
            isLike: false,
            replyHidden: true,
          }))
          .reverse();
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
      this.$options.methods.getAllMessage.bind(this)();
    },
    async replyTheMessage(message){
      const id = message.id;
      const {data: result} = await replyMessage(
        id,
        {
          date: new Date(),
          name: this.replyName,
          message: this.replyMessage
        }
      )
      await this.$options.methods.getAllMessage.bind(this)();
      this.messageList = this.messageList.map((item) =>
        id === item.id
          ? {
            ...item,
            replyHidden: false
          }
          : item
      );
    }
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
      .new_message, .reply-box
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
          flex-wrap wrap
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
        .preview-card
          background-color rgba(#dbdbdb, .5)
        .message-card
          padding 10px 0
          min-height 100px
          border-bottom 1px dashed #999
          display flex
          justify-content flex-start
          align-items flex-start
          &:last-child
            border none
          .avatar
            width 50px
            height 50px
            flex-shrink 0
          .main
            width 100%
            margin-left 10px
            .head
              display flex
              justify-content flex-start
              flex-wrap wrap
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
                font-size 13px
                cursor pointer
                line-height 20px
                .like-icon
                  width 15px
                  height 15px
                  vertical-align text-top
                > span
                  margin-left 2px
              .reply
                margin-left 20px
                color #999
                cursor pointer
                font-size 12px
                line-height 20px
                .down-icon
                  width 10px
                  height 10px
                  vertical-align middle
                  margin-left 5px
            .reply-dropdown
              background-color rgba(219,219,219,0.5)
              padding 5px
              width 90%
              .reply-box
                input[type=text]
                  float left
                  margin-bottom 5px
              .subMessage-box
                border-bottom 1px dashed #999
                &:last-child
                  border none
                .head
                  display flex
                  justify-content flex-start
                  flex-wrap wrap
                  .name
                    color #2c3e50
                    font-weight bold
                    font-size 15px
                    line-height 20px
                  .date
                    margin-left 8px
                    color #666
                    font-size 12px
                    line-height 20px
                .message
                    min-height 50px
                    text-align left
                    color #2a2e2e
                    margin 5px 0
                    word-break break-all
                    white-space pre-line
@media screen and (max-width:787px)
  .more
    .message-board
      .message-content
        .new_message
          .avatar-box
            margin 5px 0
            >img
              width 30px
              height 30p
.reply-dropdown-enter-active, .reply-dropdown-leave-active
  transiton all 5s ease-in-out
.reply-dropdown-enter-to, .reply-dropdown-leave
  opacity 1
  height 100px
.reply-dropdown-enter,..reply-dropdown-leave-to
  opacity 0
  height 0
</style>
