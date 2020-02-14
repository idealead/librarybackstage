<template>
  <div class="recordList">
    <a-input-search placeholder="输入用户id搜索" class="searchInput" @search="onSearch" />
    <a-list itemLayout="horizontal" :dataSource="listData" size="small">
      <a-list-item slot="renderItem" slot-scope="item" class="listItem">
        <div>
          <span class="extra">操作：{{item.action}}</span>
          <span class="extra">时间：{{item.time}}</span>
        </div>
        <a-list-item-meta :description="`id:${item.user_id}`">
          <p slot="title" style="margin:0">{{item.name}}</p>
          <!-- <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />-->
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-pagination
      v-model="recordListPage"
      :total="total"
      :pageSize="15"
      class="page"
      @change="changePage"
    />
  </div>
</template>
<style lang="less" scoped>
.recordList {
  width: 100%;
  max-height: 100%;
  padding-bottom: 80px;
  margin: 0;
  overflow-y: scroll;
}
.extra {
  min-width: 200px;
  display: inline-block;
  line-height: 100%;
}
.ant-list-item-meta {
  margin-bottom: 0;
}
.searchInput {
  width: 200px;
  margin: 24px;
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'recordList',
  computed: {
    ...mapState({
      API_STATE: state => state.API_STATE
    })
  },
  data() {
    return {
      listData: [],
      recordListPage: 1,
      total: 0
    }
  },
  created() {
    const me = this
    me.getRecordListF()
  },
  methods: {
    getRecordListF: function() {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          user_id: '',
          is_all: true
        },
        url: me.API_STATE.getRecordList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.recordList)
            me.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    changePage: function(page) {
      this.recordListPage = page
    }
  },
  components: {}
}
</script>
