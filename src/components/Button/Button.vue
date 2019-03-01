<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="[
      'ch-button',
      type ? `ch-button-${type}` : '',
      size ? `ch-button-${size}` : '',
      {
        'is-disabled': disabled
      }
    ]"
    >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './index.scss';
</style>
