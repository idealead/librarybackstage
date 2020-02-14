<template>
  <div class="materialList">
    <a-list itemLayout="vertical" size="large" :dataSource="listData">
      <div slot="footer">
        <!-- <b>ant design vue</b> footer part -->
      </div>
      <a-list-item slot="renderItem" slot-scope="item" key="item.id">
        <template slot="actions" v-for=" type in actions">
          <a-tooltip :key="type">
            <template slot="title">{{type==='tag'?'标签':'主题'}}</template>
            <span>
              <a-icon
                :type="type"
                style="margin-right: 8px;font-size:1.3rem"
                :class="type"
                @click="showModal(type,{theme:item.theme,tag:item.tag},item.type)"
              />
            </span>
          </a-tooltip>
        </template>
        <img slot="extra" alt="img" class="img" :src="item.url" />
        <a-list-item-meta>
          <p slot="title" class="title">{{item.name}}</p>
        </a-list-item-meta>
        <div style="background-color: #f0f2f5; padding: 6px 12px;">
          <a-row :gutter="24">
            <a-col :xl="{span:6}" :md="{span:12}" class="col">
              <a-card title="id" :bordered="false">
                <p>{{item.id}}</p>
              </a-card>
            </a-col>
            <a-col :xl="{span:6}" :md="{span:12}" class="col">
              <a-card title="作者" :bordered="false">
                <p>{{item.user_name}}</p>
              </a-card>
            </a-col>
            <a-col :xl="{span:6}" :md="{span:12}" class="col">
              <a-card title="作者所属团队" :bordered="false">
                <p>card content</p>
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
              <a-card title="素材尺寸" :bordered="false">
                <p>{{item.size_width}}*{{item.size_height}}</p>
              </a-card>
            </a-col>
            <a-col :xl="{span:6}" :md="{span:12}" class="col">
              <a-card title="素材格式" :bordered="false">
                <p>{{item.format==='else'?'其他':item.format}}</p>
              </a-card>
            </a-col>
            <a-col :xl="{span:6}" :md="{span:12}" class="col">
              <a-card title="素材类型" :bordered="false">
                <p>{{item.type==='drawing'?'图形':'图片'}}</p>
              </a-card>
            </a-col>
            <a-col :span="24" class="col">
              <a-card title="版权信息" :bordered="false">
                <p v-if="item.is_original==='yes'">原创素材</p>
                <p v-else-if="item.is_original==='no'&&item.copyright==='unknow'">未知版权信息</p>
                <p v-else>
                  <span style="margin-right:20px">版权主体：{{item.copyright_name}}</span>
                  来源链接：{{item.copyright_url}}
                </p>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-list-item>
    </a-list>
    <a-modal
      :title="setTitle"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      okText="更新"
      okType="'pramary'"
      cancelText="取消"
      :width="600"
    >
      <a-select
        mode="multiple"
        v-model="defaultValue"
        labelInValue
        style="width: 100%"
        @change="handleChange"
        placeholder="Please select"
      >
        <a-select-option v-for="item in selectList" :key="item.key">{{item.label}}</a-select-option>
      </a-select>
    </a-modal>
    <a-pagination
      v-model="materialListPage"
      :total="total"
      :pageSize="15"
      class="page"
      @change="changePage"
    />
  </div>
</template>
<style lang="less">
.materialList {
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
.materialList {
  width: 100%;
  max-height: 100%;
  padding-bottom: 80px;
  margin: 0;
  overflow-y: scroll;
}
.img {
  width: 242px;
  height: 242px;
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
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'materialList',
  computed: {
    ...mapState({
      API_STATE: state => state.API_STATE,
      navWidth: state => state.navWidth,
      isMobile: state => state.isMobile
    }),
    drawerWidth() {
      let width = 600
      if (document.body.offsetWidth <= 700) {
        width = document.body.offsetWidth - this.navWidth
      }
      return width
    }
  },
  data() {
    return {
      listData: [], // 列表数据
      materialListPage: 1, // 列表页数
      total: 0,
      actions: ['tag', 'appstore'],
      visible: false, // 标签、主题管理弹窗控制
      confirmLoading: false,
      setTitle: '设置标签',
      aModal: 'tag', // tag为设置标签，theme为设置主题
      tagList: [
        {
          id: 21,
          name: '标签1'
        },
        {
          id: 22,
          name: '标签2'
        },
        {
          id: 23,
          name: '标签3'
        },
        {
          id: 24,
          name: '标签4'
        },
        {
          id: 25,
          name: '标签5'
        },
        {
          id: 26,
          name: '标签6'
        }
      ],
      drawingThemeList: [], // 图形主题列表
      pictureThemeList: [], // 图片主题列表
      defaultValue: [], // 素材自身标签和主题默认显示
      selectList: []
    }
  },
  created() {
    const me = this
    me.getMaterialListF()
    me.getTagListF()
    me.getThemeListF()
  },
  methods: {
    getMaterialListF: function() {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          cur_page: 1
        },
        url: me.API_STATE.getMaterialList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.materialList)
            me.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTagListF() {
      const me = this
      me.$axios({
        methods: 'get',
        url: me.API_STATE.getTagList,
        data: {
          id: '',
          cur_page: 0
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            // let tagList = res.data.data.tagList
            // // 处理tagList成key，label对象
            // me.$set(me, 'tagList', me.handleList(tagList))
          }
        })
        .catch(() => {
          me.$message.error('获取标签列表失败')
        })
    },
    getThemeListF() {
      const me = this
      me.$axios({
        methods: 'get',
        url: me.API_STATE.getThemeList,
        data: {
          tpye: 'drawing'
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'drawingThemeList', me.handleList(res.data.data.themeList))
          }
        })
        .catch(() => {
          me.$message.error('获取主题列表失败')
        })
      me.$axios({
        methods: 'get',
        url: me.API_STATE.getThemeList,
        data: {
          tpye: 'picture'
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'pictureThemeList', me.handleList(res.data.data.themeList))
          }
        })
        .catch(() => {
          me.$message.error('获取主题列表失败')
        })
    },
    handleList(list) {
      // 转化id，name对象为key，label
      let result = []
      for (let i = 0; i < list.length; i++) {
        result.push({ key: list[i].id, label: list[i].name })
      }
      return result
    },
    showModal(type, { theme, tag }, imgType) {
      const me = this
      me.aModal = type === 'tag' ? 'tag' : 'theme'
      if (type === 'tag') {
        me.setTitle = '设置标签'
        me.$set(me, 'defaultValue', me.handleList(tag))
        me.selectList = me.handleList(me.tagList)
      } else {
        me.setTitle = '设置主题'
        me.selectList = imgType === 'drawing' ? me.drawingThemeList : me.pictureThemeList
        me.$set(me, 'defaultValue', me.handleList(theme))
        console.log(me.selectList)
      }
      me.$nextTick(() => {
        me.visible = true
      })
    },
    handleChange(value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
    },
    handleOk(e) {
      // 提交修改标签、主题方法
      const me = this
      if (me.aModal === 'tag') {
      } else {
      }
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel() {
      const me = this
      this.visible = false
      me.$set(me, 'defaultValue', [])
    },
    changePage(e) {
      console.log(e)
    }
  },
  components: {}
}
</script>
