<template>
  <div>
    <h3>按钮</h3>
    <Button type="text" disabled>不可亵渎的按钮</Button>
    <h3>分页</h3>
    <Page :total="100" :current="1" :size="10" @pageChange="pageChange" />
    <h3>轮播图</h3>
    <Carousel :imgs="imgs" style="{height: '200px'}"></Carousel>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      imgs: [
        {
          href: 'http://cheesekun.top/img/avatar.gif',
          src: 'http://cheesekun.top/img/avatar.gif'
        },
        {
          href: 'http://cdn.aixifan.com/acfun-pc/2.5.15/img/logo.png',
          src: 'http://cdn.aixifan.com/acfun-pc/2.5.15/img/logo.png'
        },
        {
          src: 'https://cloud.githubusercontent.com/assets/7629661/20073135/4e3db2c2-a52b-11e6-85e1-661a8212045a.gif'
        }
      ]
    }
  },
  methods: {
    pageChange (i) {
      console.log(i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
