<template>
  <div class="avatar" :style="{background: randomColor()}">{{name}}</div>
</template>
<script>
export default {
  name: 'DefaultAvatar',
  props: {
    name: {
      type: String,
      validator (value) {
        return value.length === 2
      }
    }
  },
  methods: {
    randomColor () {
      return `rgba(${Math.random() * 255},${Math.random() *
        255},${Math.random() * 255},.5)`
    }
  }
}
</script>
<style lang="scss" scoped>
    @import './index.scss'
</style>
