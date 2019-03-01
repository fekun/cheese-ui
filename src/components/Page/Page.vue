<template>
  <div class="page-container">
    <Button type="text" size="mini"
      :disabled="isPrevDisabled"
      :class="['prev', {'is-disabled': isPrevDisabled}]"
      @click="prevClick">«</Button>
    <ul>
      <template v-if="count <= 7">
        <li v-for="i in count" :key="i"
        :class="{active: activeId === i}"
        @click="pageClick(i)">{{i}}</li>
      </template>
      <template v-if="count > 7">
        <template v-if="currPage <= 4">
          <li v-for="i in 6" :key="i"
          :class="{active: activeId === i}"
          @click="pageClick(i)">{{i}}</li>
          <li>...</li>
          <li :class="{active: activeId === count}" @click="pageClick(count)">{{count}}</li>
        </template>
        <template v-if="currPage > 4 && currPage <= count - 4">
          <li :class="{active: activeId === 1}" @click="pageClick(1)">1</li>
          <li>...</li>
          <li v-for="i in [currPage-2, currPage-1, currPage, currPage+1, currPage+2]" :key="i"
          :class="{active: activeId === i}"
          @click="pageClick(i)">{{i}}</li>
          <li>...</li>
          <li :class="{active: activeId === count}" @click="pageClick(count)">{{count}}</li>
        </template>
        <template v-if="currPage > count - 4">
          <li :class="{active: activeId === 1}" @click="pageClick(1)">{{1}}</li>
          <li>...</li>
          <li v-for="i in [count-5, count-4, count-3, count-2, count-1, count]" :key="i"
          :class="{active: activeId === i}"
          @click="pageClick(i)">{{i}}</li>
        </template>
      </template>
    </ul>
    <Button type="text" size="mini"
      :disabled="isNextDisabled"
      :class="['next', {'is-disabled': isNextDisabled}]"
      @click="nextClick">»</Button>
  </div>
</template>

<script>
import Button from 'components/Button/Button'

export default {
  name: 'Page',
  props: {
    maxVisibleBtns: {
      type: Number,
      require: false,
      default: 7
    },
    current: {
      type: Number,
      require: false,
      default: 1
    },
    total: {
      type: Number,
      require: true,
      default: 0
    },
    size: {
      type: Number,
      require: false,
      default: 10
    }
  },
  data () {
    return {
      activeId: 1,
      currPage: this.current
    }
  },
  components: {
    Button
  },
  computed: {
    count () {
      return Math.ceil(this.total / this.size)
    },
    isPrevDisabled () {
      return this.currPage === 1
    },
    isNextDisabled () {
      return this.currPage === this.count
    }
  },
  methods: {
    prevClick () {
      let pageNum = this.currPage - 1 <= 0 ? 1 : --this.currPage
      this.activeId = pageNum
      this.$emit('pageChange', pageNum)
    },
    nextClick () {
      let pageNum = this.currPage + 1 > this.count ? this.count : ++this.currPage
      this.activeId = pageNum
      this.$emit('pageChange', pageNum)
    },
    pageClick (pageNum) {
      if (pageNum === this.currPage) return
      this.currPage = this.activeId = pageNum
      this.$emit('pageChange', pageNum)
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './index.scss';
</style>
