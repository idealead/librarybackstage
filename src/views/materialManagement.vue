<template>
  <div class="materialM">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="material">
        <a-icon type="picture" />素材列表
      </a-menu-item>
      <a-menu-item key="copyright">
        <a-icon type="copyright" />版权管理
      </a-menu-item>
      <a-menu-item key="theme">
        <a-icon type="appstore" />主题管理
      </a-menu-item>
    </a-menu>
    <materialList v-if="current[0]=== 'material' " />
    <copyright v-else-if="current[0]=== 'copyright'" />
    <theme v-else-if="current[0]==='theme'" />
  </div>
</template>
<style lang="less" scoped>
.materialM {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
<script>
export default {
  name: 'materialM',
  data() {
    return {
      current: ['material']
    }
  },
  created() {},
  methods: {},
  components: {
    materialList: () => import('@/components/materialM/materialList.vue'),
    copyright: () => import('@/components/materialM/copyright.vue'),
    theme: () => import('@/components/materialM/theme.vue')
  }
}
</script>
