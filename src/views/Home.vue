<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <a-layout id="components-layout">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed" :width="navWidth">
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="navClick">
          <a-menu-item key="1" title="用户管理">
            <a-icon type="user" />
            <span>用户管理</span>
          </a-menu-item>
          <a-menu-item key="2" title="标签管理">
            <a-icon type="tag" />
            <span>标签管理</span>
          </a-menu-item>
          <a-menu-item key="3" title="素材管理">
            <a-icon type="picture" />
            <span>素材管理</span>
          </a-menu-item>
          <a-menu-item key="4" title="审核管理">
            <a-icon type="eye" />
            <span>审核管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header" style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
          <h3 class="viewTitle">{{viewTitle}}</h3>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <keep-alive>
            <userM v-if="navIndex === 1 && power.includes('userManagement')" />
            <tagM v-else-if="navIndex === 2 && power.includes('tagManagement')" />
            <materialM v-else-if="navIndex === 3 && power.includes('materialManagement')" />
            <auditsM v-else-if="navIndex === 4 && power.includes('auditsManagement')" />
            <p v-else>无权限</p>
          </keep-alive>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#components-layout {
  width: 100%;
  height: 100%;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
.header {
  display: flex;
}
.viewTitle {
  flex-grow: 1;
  text-align: center;
}
</style>
<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  created() {
    const me = this
    me.juegeTerminal()
  },
  computed: {
    ...mapState({
      power: state => state.power,
      viewTitle: state => state.viewTitle,
      isMobile: state => state.isMobile
    })
  },
  data() {
    return {
      navWidth: 200,
      navIndex: 1,
      collapsed: false
    }
  },
  watch: {
    collapsed(oldV, newV) {
      const me = this
      if (!newV) {
        me.navWidth = 80
      }
      me.juegeTerminal()
    }
  },
  methods: {
    ...mapActions(['viewTitleFunc', 'navWidthFunc']),
    navClick: function(itemObj) {
      // { item, key, keyPath }
      const me = this
      me.navIndex = parseInt(itemObj.key)
      me.viewTitleFunc(itemObj.item.title)
    },
    juegeTerminal() {
      const me = this
      if (me.isMobile) {
        me.navWidth = 150
      } else {
        me.navWidth = 200
      }
      me.navWidthFunc(me.navWidth)
    }
  },
  components: {
    userM: () => import('./UserManagement.vue'),
    tagM: () => import('./TagManagement.vue'),
    materialM: () => import('./materialManagement'),
    auditsM: () => import('./auditsManagement')
  }
}
</script>
