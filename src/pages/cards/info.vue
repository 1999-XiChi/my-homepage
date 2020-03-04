<template>
  <div>
    <transition-group
      name="bounce"
      tag='div'
    >
      <div v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items: ['123','23213','23131']
    }
  },

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