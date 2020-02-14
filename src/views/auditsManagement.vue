<template>
  <div class="auditsM">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="1">
        <a-icon type="ordered-list" />审核列表
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="frown" />拒绝模板
      </a-menu-item>
    </a-menu>
    <auditsList v-if="current[0] === '1'" />
  </div>
</template>
<style lang="less" scoped>
.auditsM {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
<script>
export default {
  name: 'auditsM',
  data() {
    return {
      current: ['1']
    }
  },
  components: {
    auditsList: () => import('@/components/auditsM/auditsList.vue')
  }
}
</script>
