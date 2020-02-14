<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
// 公共css
.page {
  margin: 24px 24px 0 0 !important;
  float: right;
}
</style>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    const me = this
    me.juegeTerminal()
  },
  methods: {
    ...mapActions(['isMobileFunc']),
    juegeTerminal() {
      const me = this
      let isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
      if (isMobile) {
        me.isMobileFunc(true)
      } else {
        me.isMobileFunc(false)
      }
    }
  }
}
</script>
