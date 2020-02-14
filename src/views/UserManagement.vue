<template>
  <div class="userM">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="power">
        <a-icon type="user" />用户列表
      </a-menu-item>
      <a-menu-item key="records">
        <a-icon type="table" />用户记录
      </a-menu-item>
    </a-menu>
    <userList v-if="current[0]=== 'power' " />
    <recordList v-if="current[0]==='records'" />
  </div>
</template>
<style lang="less" scoped>
.userM {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
<script>
export default {
  name: 'userM',
  data() {
    return {
      current: ['power']
    }
  },
  created() {},
  methods: {},
  components: {
    userList: () => import('@/components/userM/userList.vue'),
    recordList: () => import('@/components/userM/recordList.vue')
  }
}
</script>
