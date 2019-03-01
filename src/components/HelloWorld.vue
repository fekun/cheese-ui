<template>
  <div>
    <h3>按钮</h3>
    <Button type="text" disabled>不可亵渎的按钮</Button>
    <h3>分页</h3>
    <Page :total="100" :current="1" :size="10" @pageChange="pageChange" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
