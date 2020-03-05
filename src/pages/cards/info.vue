<template>
  <div>
    <transition-group name="bounce" tag="div">
      <div v-for="item in items" :key="item" class="list-item">
        {{ item }}
      </div>
    </transition-group>
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
    <label for="checkbox">{{ toggle }}</label>
    <input type="radio" v-model="pick" value="one">
    <label for="radio">one</label>
    <input type="radio" v-model="pick" value="two">
    <label for="radio">two</label>
    <div>{{pick}}</div>
    <input v-model.number="age" type="number">
    <input v-model.lazy="msg" >
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["123", "23213", "23131"],
      toggle: true,
      pick:'',
      age:0,
      msg:''
    };
  }
};
</script>

<style lang="stylus" scoped>
.bounce-enter-active
  animation landIn .5s ease-in
@keyframes landIn
  from
    opacity 0
    transform translateY(100px)
  to
    opacity 1
    transform translateY(0)
</style>
