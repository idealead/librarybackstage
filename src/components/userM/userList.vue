<template>
  <div class="userList">
    <a-list itemLayout="horizontal" :dataSource="listData" size="small">
      <a-list-item slot="renderItem" slot-scope="item" class="listItem">
        <div slot="actions" class="btnIcon">
          <a-tooltip>
            <template slot="title">
              <span>修改用户角色</span>
            </template>
            <a-icon
              type="edit"
              class="editIcon icon"
              @click="setUserRoleF(item.user_id,item.role,item.name)"
            />
          </a-tooltip>
        </div>
        <div>
          <span class="extra">性别：{{item.sex}}</span>
          <span class="extra">部门：{{item.department}}</span>
          <span v-if="item.role==='consumer'" class="extra">角色：普通用户</span>
          <span v-else-if="item.role==='administrator'" class="extra">角色：管理员</span>
          <span v-else-if="item.role==='checker'" class="extra">角色：审核员</span>
          <span v-else class="extra">角色：超级管理员</span>
        </div>
        <a-list-item-meta :description="`id:${item.user_id}`">
          <p slot="title" style="margin:0">{{item.name}}</p>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-modal
      :title="setTitle"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      okText="修改"
      cancelText="取消"
    >
      <a-radio-group v-model="defaultRole" buttonStyle="solid">
        <a-radio-button value="consumer">普通用户</a-radio-button>
        <a-radio-button value="checker">审核员</a-radio-button>
        <a-radio-button value="administrator">管理员</a-radio-button>
        <a-radio-button value="supervisor">超级管理员</a-radio-button>
      </a-radio-group>
      <div class="roleTips">
        <p>普通用户：查看、下载、上传素材，设置素材标签</p>
        <p>下列角色都包含普通用户权限</p>
        <p>审核员：审核素材</p>
        <p>管理员：用户管理、标签管理、素材管理</p>
        <p>超级管理员：所有权限</p>
      </div>
    </a-modal>
    <a-pagination
      v-model="userListPage"
      :total="total"
      :pageSize="15"
      class="page"
      @change="changePage"
    />
  </div>
</template>
<style lang="less" scoped>
.userList {
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
.btnIcon {
  display: flex;
  align-items: center;
}
.editIcon {
  font-size: 1.3rem;
  color: #1890ff;
  margin-right: 5px;
}
.roleTips {
  padding: 24px 0 0 0;
  p {
    margin: 0;
  }
  p:nth-child(2) {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'userList',
  computed: {
    ...mapState({
      API_STATE: state => state.API_STATE
    })
  },
  data() {
    return {
      userListPage: 1, // 页码
      total: 0,
      listData: [], // 用户列表数组
      visible: false, // 弹窗显示
      confirmLoading: false, // 提交loading
      defaultRole: 'consumer', // 角色value值
      setTitle: '' // 修改角色标题 姓名 设置角色
    }
  },
  created() {
    const me = this
    me.getUserListF()
  },
  methods: {
    getUserListF: function() {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          cur_page: me.userListPage
        },
        url: me.API_STATE.getUserList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.userList)
            me.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    setUserRoleF(id, role, name) {
      // 打开弹窗方法
      const me = this
      me.$set(me, 'defaultRole', role)
      me.setTitle = `${name} 设置角色`
      me.visible = true
    },
    handleOk(e) {
      // 提交修改角色方法
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
    },
    changePage(page) {
      this.userListPage = page
    }
  },
  components: {}
}
</script>
