<template>
  <div class="auditsList">
    <div class="actionBar">
      <a-radio-group @change="onChange" v-model="auditsType" class="radio">
        <a-radio-button value="wait">待审核</a-radio-button>
        <a-radio-button value="pass">已通过</a-radio-button>
        <a-radio-button value="reject">已拒绝</a-radio-button>
      </a-radio-group>
      <div class="allChange">
        <a-switch @change="allChange" v-model="allSelect" />
        <span>&nbsp;全选</span>
      </div>
      <div class="action">
        <a-button type="danger" class="btn" :disabled="disReject" @click="rejectF">拒绝</a-button>
        <a-button type="primary" class="btn" :disabled="disPass" @click="passF">通过</a-button>
      </div>
      <a-modal
        :title="setTitle"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        okText="确定"
        okType="'pramary'"
        cancelText="取消"
        :width="600"
      >
        <div v-if="aModal === 'pass'" class="passList">
          <a-list itemLayout="horizontal" :dataSource="passList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="`作者：${item.user_name}`">
                <span slot="title">{{item.name}}</span>
                <a-avatar slot="avatar" :src="item.url" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div v-if="aModal === 'reject'" class="rejectList">
          <a-list itemLayout="horizontal" :dataSource="rejectList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="`作者：${item.user_name}`">
                <span slot="title">{{item.name}}</span>
                <a-avatar slot="avatar" :src="item.url" />
              </a-list-item-meta>
              <a-textarea
                placeholder="Autosize height with minimum and maximum number of lines"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="item.reason"
              />
            </a-list-item>
          </a-list>
        </div>
      </a-modal>
    </div>
    <div class="list">
      <a-list itemLayout="vertical" size="large" :dataSource="listData">
        <div slot="footer">
          <!-- <b>ant design vue</b> footer part -->
        </div>
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
          <img slot="extra" alt="img" class="img" :src="item.url" />
          <a-list-item-meta>
            <p slot="title" class="title">
              <a-switch size="small" v-model="item.select" @change="select" />
              &nbsp;{{item.name}}
            </p>
          </a-list-item-meta>
          <div style="background-color: #f0f2f5; padding: 6px 12px;">
            <a-row :gutter="24">
              <a-col :xl="{span:2}" :md="{span:4}" class="col">
                <a-card title="id" :bordered="false">
                  <p>{{item.id}}</p>
                </a-card>
              </a-col>
              <a-col :xl="{span:4}" :md="{span:8}" class="col">
                <a-card title="作者" :bordered="false">
                  <p>{{item.user_name}}</p>
                </a-card>
              </a-col>
              <a-col :xl="{span:6}" :md="{span:12}" class="col">
                <a-card title="上传日期" :bordered="false">
                  <p>{{item.create_time}}</p>
                </a-card>
              </a-col>
              <a-col :xl="{span:6}" :md="{span:12}" class="col">
                <a-card title="素材大小" :bordered="false">
                  <p>{{item.file_size}}kb</p>
                </a-card>
              </a-col>
              <a-col :xl="{span:6}" :md="{span:12}" class="col">
                <a-card title="素材类型" :bordered="false">
                  <p>{{item.type==='drawing'?'图形':'图片'}}</p>
                </a-card>
              </a-col>
              <!-- <a-col :span="18" class="col">
                <a-card title="版权信息" :bordered="false">
                  <p v-if="item.is_original==='yes'">原创素材</p>
                  <p v-else-if="item.is_original==='no'&&item.copyright==='unknow'">未知版权信息</p>
                  <p v-else>
                    <span style="margin-right:20px">版权主体：{{item.copyright_name}}</span>
                    来源链接：{{item.copyright_url}}
                  </p>
                </a-card>
              </a-col>-->
            </a-row>
          </div>
        </a-list-item>
      </a-list>
      <a-pagination
        v-model="auditsListPage"
        :total="total"
        :pageSize="15"
        class="page"
        @change="changePage"
      />
    </div>
  </div>
</template>
<style lang="less">
.auditsList {
  .ant-card-head-title {
    padding: 8px 0 !important;
  }
  .ant-card-body {
    padding: 8px !important;
    p {
      margin-bottom: 0 !important;
    }
  }
  .ant-card-head {
    padding: 0 8px !important;
    min-height: auto !important;
  }
  .ant-list-item-meta-title {
    margin-bottom: 0 !important;
  }
  @media screen and (max-width: 900px) {
    .ant-list-item-extra-wrap {
      flex-direction: column;
    }
  }
  .col {
    padding: 6px 12px !important;
  }
}
</style>
<style lang="less" scoped>
.auditsList {
  width: 100%;
  max-height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.img {
  width: 170px;
  height: 170px;
  object-fit: contain;
}
.title {
  margin: 0;
}
.tag {
  color: #1890ff;
}
.appstore {
  color: #52c41a;
}
.actionBar {
  width: 100%;
  display: flex;
  padding: 24px;
  align-items: center;
  flex-shrink: 0;
}
.list {
  flex-shrink: 1;
  overflow-y: scroll;
  padding-bottom: 80px;
}
.allChange {
  margin-left: 50px;
}
.action {
  flex-grow: 1;
  .btn {
    float: right;
    margin-left: 25px;
  }
  overflow: hidden;
}
.passList,
.rejectList {
  overflow-y: scroll;
  max-height: 60vh;
  .ant-avatar-image {
    width: 50px !important;
    height: 50px !important;
  }
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'auditsList',
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
      auditsListPage: 1, // 列表页数
      total: 0,
      visible: false, // 通过、拒绝弹窗控制
      confirmLoading: false,
      setTitle: '',
      aModal: 'pass', // pass为设置通过，reject为拒绝
      auditsType: 'wait',
      disReject: false,
      disPass: false,
      passList: [],
      rejectList: [],
      allSelect: false // 全选开关
    }
  },
  created() {
    const me = this
    me.getAuditsListF()
  },
  methods: {
    getAuditsListF: function() {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          cur_page: me.auditsListPage,
          audits: me.auditsType
        },
        url: me.API_STATE.getAuditsList
      })
        .then(res => {
          if (res.data.code === 200) {
            let list = res.data.data.materialList
            for (let i = 0; i < list.length; i++) {
              list[i].select = false
            }
            me.allSelect = false
            me.$set(me, 'listData', list)
            // 处理list,加上select
            me.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleOk(e) {
      // 提交修改标签、主题方法
      const me = this
      if (me.aModal === 'pass') {
        me.passSubmit()
      } else {
      }
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    passSubmit() {
      const me = this
      let idList = []
      for (let item of me.passList) {
        idList.push(item.id)
      }
      console.log(idList)
      me.auditsListPage = 1
      me.getAuditsListF()
    },
    handleCancel() {
      this.visible = false
    },
    allChange(checked) {
      const me = this
      for (let i = 0; i < me.listData.length; i++) {
        me.listData[i].select = checked
      }
    },
    onChange(checked) {
      // 选择通过状态按钮
      this.auditsListPage = 1
      if (this.auditsType === 'pass') {
        this.disPass = true
        this.disReject = false
      } else if (this.auditsType === 'reject') {
        this.disReject = true
        this.disPass = false
      } else {
        this.disPass = false
        this.disReject = false
      }
      this.$nextTick(() => {
        this.getAuditsListF()
      })
    },
    select() {
      console.log(this.listData)
    },
    getSubmitList() {
      const me = this
      let list = []
      for (let item of me.listData) {
        if (item.select) {
          list.push({
            id: item.id,
            name: item.name,
            url: item.url,
            user_name: item.user_name,
            reason: ''
          })
        }
      }
      return list
    },
    passF() {
      // 判断列表中有没有勾选，有则弹窗进入最后确认，没有则提示
      const me = this
      let passList = me.getSubmitList()
      if (passList.length > 0) {
        // 弹窗进入确认
        me.passList = passList
        me.aModal = 'pass'
        me.setTitle = '对以下列表通过审核'
        me.visible = true
      } else {
        me.$message.info('请先勾选审核条目')
      }
    },
    rejectF() {
      const me = this
      let rejectList = me.getSubmitList()
      if (rejectList.length > 0) {
        me.rejectList = rejectList
        me.aModal = 'reject'
        me.setTitle = '对以下列表拒绝审核'
        me.visible = true
      } else {
        me.$message.info('请先勾选审核条目')
      }
    },
    changePage(e) {
      console.log(e)
    }
  },
  components: {}
}
</script>
