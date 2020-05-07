<template>
  <div class="more">
    <scroll-view
      class="message-board"
      :scrollbarStyle="{ backgroundColor: 'rgba(15, 76, 129, 0.8)' }"
    >
      <template v-slot>
        <div class="message-content">
          <div class="header">欢迎给我留言~</div>
          <div class="new_message">
            <div :style="{
              display: 'flex',
              flexDirection: 'column'
            }">
              <input type="text" placeholder="Your Name" />
              <textarea rows="5" cols="50" placeholder="Your Message">
              </textarea>
              <div>
                <span>还能输入140个字</span>
                <input type="submit" value="发表留言">
              </div>
            </div>
          </div>
          <div class="message-list-title">
            <span>留言墙</span>
          </div>
          <div class="message-list">
            <div class="message-card"></div>
            <div class="message-card"></div>
            <div class="message-card"></div>
            <div class="message-card"></div>
          </div>
        </div>
      </template>
    </scroll-view>
  </div>
</template>

<script>
import scrollView from "_c/base/scrollView";
export default {
  components: {
    scrollView,
  },
  data() {
    return {
      messageList: [],
    };
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
      .message-list-title
        background-color #d4dee1
        height 40px
        > span 
          float left
          margin 10px 10px 0 10px
          padding 0 20px
          line-height 30px
          background-color #ffffff
          border-radius 10px 10px 0 0
      .message-list
        .message-card
          height 150px
          border-bottom 1px dashed #999
    .box
      height 500px
</style>
