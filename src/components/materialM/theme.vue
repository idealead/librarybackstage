<template>
  <div class="themeList">
    <a-button type="primary" class="btn" @click="addThemeF">新增主题</a-button>
    <a-list itemLayout="horizontal" :dataSource="listData" size="small">
      <a-list-item slot="renderItem" slot-scope="item" class="listItem">
        <div slot="actions" class="btnIcon">
          <a-tooltip>
            <template slot="title">修改主题</template>
            <a-icon type="edit" class="editIcon icon" @click="editThemeF(item.id,item.name)" />
          </a-tooltip>
          <a-tooltip>
            <template slot="title">删除主题</template>
            <a-icon type="delete" class="deleteIcon icon" @click="deleteThemeF(item.id,item.name)" />
          </a-tooltip>
        </div>
        <a-list-item-meta>
          <p slot="title" style="margin:0;min-width:200px">
            <a-tag color="blue" class="themeName">{{item.name}}</a-tag>
            <span class="themeId">id：{{item.id}}</span>
          </p>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-modal
      :title="setTitle"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :okText="okText"
      :okType="okType"
      cancelText="取消"
    >
      <p v-if="aModal==='delete'">确定要删除此主题吗？</p>
      <div v-else-if="aModal==='revise' || aModal === 'new'">
        <a-input addonBefore="名称" v-model="myTheme" />
      </div>
    </a-modal>
  </div>
</template>
<style lang="less" scoped>
.themeList {
  width: 100%;
  max-height: 100%;
  padding-bottom: 80px;
  margin: 0;
  overflow-y: scroll;
  .btn {
    margin: 24px;
  }
}
.ant-list-item-meta {
  margin-bottom: 0;
}
.btnIcon {
  display: flex;
  align-items: center;
  .icon {
    font-size: 1.3rem;
    margin-right: 25px;
  }
  .icon:last-of-type {
    margin-right: 5px;
  }
}
.deleteIcon {
  color: red;
}
.editIcon {
  color: #1890ff;
}
.themeId {
  position: absolute;
  left: 120px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'theme',
  computed: {
    ...mapState({
      API_STATE: state => state.API_STATE,
      navWidth: state => state.navWidth,
      isMobile: state => state.isMobile
    })
  },
  data() {
    return {
      listData: [], // 列表数据
      setTitle: '', // 弹窗标题
      visible: false, // 弹窗可见
      confirmLoading: false, // 提交loading
      okText: '', // 弹窗确认按钮文字
      okType: '',
      aModal: 'delete', // delete为删除标签弹窗，revise为修改标签弹窗，new为新增主题
      myTheme: 'myTheme' // 新建主题、或修改的名称
    }
  },
  created() {
    const me = this
    me.getThemeListF()
  },
  methods: {
    getThemeListF: function() {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          type: 'all'
        },
        url: me.API_STATE.getThemeList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.themeList)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteThemeF: function(id, name) {
      const me = this
      me.aModal = 'delete'
      me.okText = '删除'
      me.okType = 'danger'
      me.setTitle = `${name}主题`
      me.visible = true
    },
    editThemeF: function(id, name) {
      const me = this
      me.aModal = 'revise'
      me.okText = '确定'
      me.okType = 'primary'
      me.setTitle = `${name}主题`
      me.myTheme = name
      me.visible = true
    },
    addThemeF() {
      // 新增标签方法
      this.aModal = 'new'
      this.okText = '确定'
      this.okType = 'primary'
      this.setTitle = '新增主题'
      this.myTheme = 'myTheme'
      this.visible = true
    },
    handleOk(e) {
      // 提交修改标签、删除、新增方法
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      // 取消弹窗方法
      console.log('Clicked cancel button')
      this.visible = false
    }
  },
  components: {}
}
</script>
