<template>
  <div class="tagList">
    <a-button type="primary" class="btn" @click="addTagF">新增标签</a-button>
    <a-list itemLayout="horizontal" :dataSource="listData" size="small">
      <a-list-item slot="renderItem" slot-scope="item" class="listItem">
        <div slot="actions" class="btnIcon">
          <a-tooltip>
            <template slot="title">查看图片列表</template>
            <a-icon type="picture" class="pictureIcon icon" @click="showImgF(item.id,item.name)" />
          </a-tooltip>
          <a-tooltip>
            <template slot="title">修改标签</template>
            <a-icon
              type="edit"
              class="editIcon icon"
              @click="editTagF(item.id,item.name,item.classify)"
            />
          </a-tooltip>
          <a-tooltip>
            <template slot="title">删除标签</template>
            <a-icon type="delete" class="deleteIcon icon" @click="deleteTagF(item.id,item.name)" />
          </a-tooltip>
        </div>
        <div>
          <span class="extra">使用次数：{{item.used}}%</span>
          <span class="extra">图片数量：{{item.number}}</span>
          <span class="extra">所属分类：{{item.classify.name}}</span>
        </div>
        <a-list-item-meta :description="`id:${item.id}`">
          <p slot="title" style="margin:0;min-width:200px">{{item.name}}</p>
          <!-- <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />-->
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-pagination
      v-model="tagListPage"
      :total="total"
      :pageSize="15"
      class="page"
      @change="changePage"
    />
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
      <p v-if="aModal==='delete'">确定要删除此标签吗？</p>
      <div v-else-if="aModal==='revise' || aModal === 'new'">
        <div class="reviseList">
          <span>名称:</span>
          <a-input v-model="tagName" />
        </div>
        <div class="reviseList">
          <span>分类:</span>
          <a-select v-model="classifyName" @change="handleChange" class="classifySelect">
            <a-select-option
              v-for="item in classifyListData"
              :value="item.id"
              :key="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
    <a-drawer
      :title="setTitle"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="drawerVisible"
      :width="drawerWidth"
    >
      <div class="imgDrawer">
        <div class="imgList">
          <a-card hoverable v-for="(item,index) in imgList.left" :key="index" class="imgItem">
            <img alt="example" :src="item.url" slot="cover" />
            <a-card-meta :title="item.name"></a-card-meta>
          </a-card>
        </div>
        <div class="imgList">
          <a-card hoverable v-for="(item,index) in imgList.right" :key="index" class="imgItem">
            <img alt="example" :src="item.url" slot="cover" />
            <a-card-meta :title="item.name"></a-card-meta>
          </a-card>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<style lang="less" scoped>
.tagList {
  width: 100%;
  max-height: 100%;
  padding-bottom: 80px;
  margin: 0;
  overflow-y: scroll;
  .btn {
    margin: 24px;
  }
}
.extra {
  width: 200px;
  display: inline-block;
  line-height: 100%;
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
.classifySelect {
  width: 100%;
}
.reviseList {
  display: flex;
  margin: 10px 0;
  span {
    min-width: 50px;
  }
}
.imgDrawer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.imgList {
  @imgWidth: 240px;
  @mobileWidth: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .imgItem {
    width: 240px;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 768px) {
    .imgItem {
      width: @mobileWidth;
    }
  }
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'tagList',
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
      tagListPage: 1, // 列表页数
      total: 0,
      setTitle: '', // 弹窗标题
      visible: false, // 弹窗可见
      confirmLoading: false, // 提交loading
      okText: '', // 弹窗确认按钮文字
      okType: '',
      tagName: '',
      aModal: 'delete', // delete为删除标签弹窗，revise为修改标签弹窗
      classifyListData: [], // 标签分类列表数据
      classifyName: '',
      classifyId: '',
      drawerVisible: false, // 标签图片弹窗
      imgList: {
        letf: [],
        right: []
      }, // 标签下的图片列表
      myTag: 'myTag' // 新建标签的名称
    }
  },
  created() {
    const me = this
    me.getTagListF()
    me.getClassifyListF()
      .then(res => {
        if (res.data.code === 200) {
          me.$set(me, 'classifyListData', [
            {
              id: '',
              name: '无',
              parent_id: '',
              childrens: []
            },
            ...res.data.data.classifyList
          ])
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    getTagListF: function() {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          user_id: '',
          is_all: true
        },
        url: me.API_STATE.getTagList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.tagList)
            me.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    changePage: function(page) {
      console.log(page)
      this.tagListPage = page
    },
    deleteTagF: function(id, name) {
      const me = this
      me.aModal = 'delete'
      me.okText = '删除'
      me.okType = 'danger'
      me.setTitle = `${name}标签`
      me.visible = true
    },
    editTagF: function(id, name, classify) {
      const me = this
      me.aModal = 'revise'
      me.okText = '确定'
      me.okType = 'primary'
      me.setTitle = `${name}标签`
      me.tagName = name
      me.classifyName = classify.name
      me.classifyId = classify.id
      me.visible = true
    },
    addTagF() {
      // 新增标签方法
      this.aModal = 'new'
      this.okText = '确定'
      this.okType = 'primary'
      this.setTitle = '新增标签'
      this.tagName = 'myTag'
      this.classifyName = '无'
      this.classifyId = ''
      this.visible = true
    },
    getClassifyListF() {
      const me = this
      let p = me.$axios({
        methods: 'get',
        url: me.API_STATE.getClassifyList
      })
      return p
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
    },
    handleChange(v) {
      // 选择分类改变
      this.classifyId = v
    },
    showImgF(id, name) {
      // 打开标签下的图片列表
      const me = this
      me.setTitle = `${name}标签图片`
      me.drawerVisible = true
      me.getTagImgListF(id)
    },
    getTagImgListF(id) {
      // 获取标签下的图片列表
      const me = this
      me.$axios({
        methods: 'get',
        data: {
          id: id
        },
        url: me.API_STATE.getTagImgList
      })
        .then(res => {
          if (res.data.code === 200) {
            let list = res.data.data.imgList
            if (me.isMobile || list.length < 2) {
              me.$set(me.imgList, 'left', list)
            } else {
              let middle = Math.ceil(list.length / 2)
              me.$set(me.imgList, 'left', list.slice(0, middle))
              me.$set(me.imgList, 'right', list.slice(middle))
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onClose() {
      const me = this
      me.$set(me.imgList, 'left', [])
      me.$set(me.imgList, 'right', [])
      this.drawerVisible = false
    }
  },
  components: {}
}
</script>
