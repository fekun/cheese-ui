<template>
  <div class="vue-carousel" @mouseenter="hoverFn" @mouseleave="hoverFn">
    <div
      class="imgs-container"
      :style="{
        width: `${len * 100}%`,
        transform:`translate(-${activeIndex * 100 / len}%)`,
        transition : isResetIndex ? '': `transform ${transitionInterval / 1000}s`
      }">
      <a
        class="img-item"
        v-for="(img, index) in imgsComputed"
        :key="index"
        :style="{
          width: `${100 / len}%`,
          backgroundImage: `url(${img.src})`
        }"
        :href="img.href ? img.href : false"
      ></a>
    </div>
    <div class="prev" @click="switchFn" onselectstart="return false">&lt;</div>
    <div class="next" @click="switchFn" onselectstart="return false">&gt;</div>
    <ul class="dots" @click="activeDotFn">
      <li
        class="dot"
        v-for="(n, index) in (len-2)"
        :key="index"
        :data-dot-index="n"
        :class="{
          'active-dot': activeIndex===n || (activeIndex===(len-1) && n===1) || (activeIndex===0 && n===5)
        }"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    imgs: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  mounted () {
    this.startInterval() // 启动自动轮播
  },
  data () {
    return {
      activeIndex: 1, // ==2== 当前显示第一张
      timer: null, // 自动播放的定时器
      isTransitioning: false, // 是否处于过度动画执行期间
      transitionInterval: 500, // 过渡动画时长
      isResetIndex: false // 是否为瞬间重置定位，在watch中初始化，重定位会取消transition动画
    }
  },
  computed: {
    // ==1== 为了无缝滚动，在传进来的imgs数组首部增加末尾元素，在尾部追加首元素
    imgsComputed () {
      let firstImg = this.imgs[0]
      let lastImg = this.imgs[this.imgs.length - 1]
      return [lastImg].concat(this.imgs, [firstImg])
    },
    len () {
      return this.imgsComputed.length
    }
  },
  methods: {
    activeDotFn (e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        let index = parseInt(e.target.getAttribute('data-dot-index'))
        this.activeIndex = index
      }
    },
    switchFn (e) {
      if (this.isTransitioning) return // 动画过渡中不可以进行切换
      // ==4== 对activeIndex进行操作
      e.target.className.indexOf('next') !== -1
        ? this.activeIndex++
        : this.activeIndex--
    },
    startInterval () {
      // 启动自动轮播函数
      this.timer = setInterval(() => {
        // ==4== 对activeIndex进行操作
        this.activeIndex++
      }, this.interval)
    },
    hoverFn (e) {
      // 鼠标移入暂停轮播，移出恢复轮播
      if (e.type === 'mouseenter') {
        if (this.timer) clearInterval(this.timer)
      } else {
        this.startInterval()
      }
    }
  },
  watch: {
    activeIndex (newActiveIndex, oldActiveIndex) {
      console.log(newActiveIndex, oldActiveIndex)
      // ==5== 监听activeIndex的变化，当activeIndex到达边界的时候进行复位
      // if(是轮播图从最后一张切换到第一张 || 是轮播图从第一张切换到最后一张) 是属于瞬间归位，直接return，不执行以后所有函数
      if (
        (newActiveIndex === 1 && oldActiveIndex === this.len - 1) ||
        (oldActiveIndex === 0 && newActiveIndex === this.len - 2)
      ) {
        this.isResetIndex = true
        return
      }
      this.isResetIndex = false
      this.isTransitioning = true // 为true时表示正在进行transition过渡中，不可以进行切换轮播
      setTimeout(() => {
        // 瞬间归位需要取消transition过渡
        // 以下两种情况是瞬间归位时activeIndex变化
        if (this.activeIndex === 0) {
          this.activeIndex = this.len - 2
        } else if (this.activeIndex === this.len - 1) {
          this.activeIndex = 1
        }
        this.isTransitioning = false // 为false时表示transition过渡结束，可以进行切换轮播
      }, this.transitionInterval)
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "./index.scss";
</style>
