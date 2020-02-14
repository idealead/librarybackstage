<template>
  <div class="classify">
    <div class="treeBlock">
      <p class="title">分类树形图：</p>
      <div class="treeNode">
        <a-tree
          class="draggable-tree"
          draggable
          :selectedKeys="[thisclassify.id]"
          :defaultExpandAll="true"
          @dragenter="onDragEnter"
          @drop="onDrop"
          :treeData="gData"
          @select="onSelect"
          v-if="load"
        />
      </div>
      <div class="btnBlock">
        <p>拖动节点可更改树形图</p>
        <a-button type="primary" class="btn" @click="addClassifyF">新增分类</a-button>
        <a-button class="btn" @click="upDateClassifyF">更新结构</a-button>
      </div>
    </div>
    <div class="classifyDetail">
      <p class="title">分类详情：</p>
      <a-card :title="`${thisclassify.name}--所属标签`">
        <a-card-grid style="textAlign:'center'" v-for="item in thisTagList" :key="item.id">
          <a-tag color="blue">{{item.name}}</a-tag>
        </a-card-grid>
      </a-card>
      <div class="classifyBtn">
        <a-button type="danger" class="btn" @click="deleteClassifyF">删除分类</a-button>
        <a-button type="primary" class="btn" @click="reviseClassifyF">修改名称</a-button>
      </div>
    </div>
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
      <div class="addModal" v-if="modalType === 1||modalType === 2">
        <a-input addonBefore="名称" defaultValue="myclassify" v-model="myclassify" />
      </div>
      <p v-if="modalType===0">确定要删除此标签吗？</p>
    </a-modal>
  </div>
</template>
<style lang="less" scoped>
@padding: 24px;
.classify {
  width: 100%;
  height: calc(100% - 48px);
  padding: 0px;
  margin: 0;
  display: flex;
  .title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
}
.treeBlock {
  width: 40%;
  height: 100%;
  padding: @padding;
  position: relative;
  .treeNode {
    max-height: calc(100% - 50px);
  }
}
.btnBlock {
  width: calc(100% - (2 * @padding));
  right: @padding;
  position: absolute;
  bottom: @padding;
  .btn {
    margin-left: @padding;
    float: right;
  }
  p {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }
  overflow: hidden;
}
.classifyDetail {
  width: 60%;
  padding: @padding;
}
.classifyBtn {
  margin-top: @padding;
  overflow: hidden;
  .btn {
    margin-left: @padding;
    float: right;
  }
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'classify',
  computed: {
    ...mapState({
      API_STATE: state => state.API_STATE
    })
  },
  data() {
    return {
      listData: [], // 分类数据数组
      listMap: null,
      gData: [],
      load: false,
      thisclassify: {}, // 初始显示的默认分类名称
      thisTagList: [], // 详情里标签数据数组
      setTitle: '新增分类',
      visible: false,
      modalType: 1, // 1为新增分类弹窗，2为修改分类弹窗，0为删除分类弹窗
      confirmLoading: false,
      myclassify: 'myclassify', // 新增分类,或者修改分类的名称,
      isPut: false,
      okText: '确定',
      okType: 'primary'
    }
  },
  created() {
    const me = this
    me.getClassifyListF()
  },
  methods: {
    getClassifyListF: function() {
      const me = this
      let one = false
      me.$axios({
        headers: {},
        method: 'get',
        url: me.API_STATE.getClassifyList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.classifyList)
            // listData用于毕竟修改后的树形结构与之前的哪些不同，然后提交修改请求，重新刷新接口,构造listMap用来对比
            me.listMap = new Map()
            for (let i = 0; i < me.listData.length; i++) {
              me.listMap.set(me.listData[i].id, me.listData[i])
            }
            me.gData = [
              {
                title: '活力',
                key: 1,
                children: [
                  {
                    title: '潮',
                    key: 2,
                    children: []
                  },
                  {
                    title: '色彩',
                    key: 3,
                    children: [
                      {
                        key: 5,
                        title: '蓝',
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                title: '保守',
                key: 4,
                children: []
              }
            ]
            me.load = true
            if (!one) {
              me.oneiInit()
              one = true
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    oneiInit() {
      // 初始化树形图数据，初始化显示节点详情
      const me = this
      if (me.listData.length > 0) {
        me.$set(me, 'thisclassify', me.listData[0])
        me.getClassifyTag(me.listData[0].id)
      }
    },
    getClassifyTag(id) {
      const me = this
      me.$axios({
        methods: 'get',
        data: {
          id: id
        },
        url: me.API_STATE.getClassifyTag
      })
        .then(res => {
          if (res.data.code === 200) {
            me.thisTagList = res.data.data.tagList
            console.log(me.thisTagList)
          }
        })
        .catch(() => {
          me.$message.error('出错了，请稍后再试')
        })
    },
    onDragEnter(info) {
      console.log(info)
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop(info) {
      console.log(info)
      const dropKey = info.node.eventKey
      const dragKey = info.dragNode.eventKey
      const dropPos = info.node.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      const data = [...this.gData]

      // Find dragObject
      let dragObj
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || []
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj)
        })
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || []
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj)
        })
      } else {
        let ar
        let i
        loop(data, dropKey, (item, index, arr) => {
          ar = arr
          i = index
        })
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj)
        } else {
          ar.splice(i + 1, 0, dragObj)
        }
      }
      this.gData = data
    },
    onSelect(value, node, extra) {
      const me = this
      me.$set(me, 'thisclassify', {
        id: value[0],
        name: node.node.title
      })
    },
    addClassifyF() {
      // 新增分类方法
      this.modalType = 1
      this.setTitle = '新增分类'
      this.okType = 'primary'
      this.okText = '确定'
      this.myclassify = 'myclassify'
      this.visible = true
    },
    deleteClassifyF() {
      // 删除分类方法
      this.modalType = 0
      this.setTitle = '删除分类'
      this.okType = 'danger'
      this.okText = '删除'
      this.visible = true
    },
    reviseClassifyF() {
      // 修改分类名称
      this.modalType = 2
      this.setTitle = '修改分类名称'
      this.okType = 'primary'
      this.okText = '确定'
      this.myclassify = this.thisclassify.name
      this.visible = true
    },
    handleOk(e) {
      const me = this
      if (me.modalType === 1) {
        // 新增分类
        let newNode = {
          title: me.myclassify,
          key: 111,
          children: []
        }
        me.gData.push(newNode)
        me.listMap.set(111, {
          id: 111,
          name: me.myclassify,
          parent_id: '',
          children: []
        })
      } else if (me.modalType === 0) {
        // 删除分类
      } else if (me.modalType === 2) {
        // 修改分类名称
      }
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel(e) {
      this.visible = false
    },
    upDateClassifyF() {
      // 获取treeData然后编译出classifyList,与listdata对比，改变的就加入提交数组
      const me = this
      if (!me.isPut) {
        me.isPut = true
        let newList = me.getNewListF(me.gData, '')
        let putList = []
        // 对比不同
        for (let i = 0; i < newList.length; i++) {
          let item = me.listMap.get(newList[i].id)
          let child = true
          // 判断children是否相同
          for (let k = 0; k < newList[i].children.length; k++) {
            if (!item.children.includes(newList[i].children[k])) {
              child = false
            }
          }
          if (item.children.length !== newList[i].children.length || newList[i].parent_id !== item.parent_id) {
            child = false
          }
          if (!child) {
            putList.push(newList[i])
          }
        }
        console.log(putList)
        setTimeout(() => {
          me.isPut = false
          me.$message.success('更新成功')
        }, 1000)
      } else {
        me.$message.info('正在提交，请不要重复更新')
      }
    },
    getNewListF(data, pid) {
      const me = this
      let list = []
      for (let i = 0; i < data.length; i++) {
        let item = {
          id: data[i].key,
          name: data[i].title,
          parent_id: pid,
          children: []
        }
        if (data[i].children.length > 0) {
          for (let k = 0; k < data[i].children.length; k++) {
            item.children.push(data[i].children[k].key)
          }
          list = [...list, ...me.getNewListF(data[i].children, item.id)]
        }
        list.push(item)
      }
      return list
    }
  },
  components: {}
}
</script>
