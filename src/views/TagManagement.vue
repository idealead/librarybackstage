<template>
  <div class="tagM">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="1">
        <a-icon type="tag" />标签列表
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="appstore" />标签分类管理
      </a-menu-item>
    </a-menu>
    <tagList v-if="current[0] === '1'"/>
    <classify v-else-if="current[0]=== '2'"/>
  </div>
</template>
<style lang="less" scoped>
.tagM {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
<script>
export default {
  name: 'tagM',
  data() {
    return {
      current: ['1']
    }
  },
  components: {
    tagList: () => import('@/components/tagM/tagList.vue'),
    classify: () => import('@/components/tagM/classify.vue')
  }
}
</script>
