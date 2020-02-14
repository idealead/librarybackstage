<template>
  <div class="copyright">
    <div class="copyrightMain">
      <a-card
        :title="item.name"
        hoverable
        :bordered="false"
        v-for="item in copyrightList"
        :key="item.id"
        class="copyrightCard"
        :class="{select : item.select}"
        @click="showMList(item.id)"
      >
        <p class="number">素材数量：{{item.number}}<a-badge status="success" class="point" v-if="item.select"/></p>
      </a-card>
    </div>
    <a-divider orientation="left" style="min-height:1px"></a-divider>
    <div class="copyrightMList">
      <a-list itemLayout="vertical" size="large" :dataSource="listData">
        <div slot="footer">
          <!-- <b>ant design vue</b> footer part -->
        </div>
        <a-list-item slot="renderItem" slot-scope="item" key="item.id">
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
              <a-col :span="24" class="col">
                <a-card title="版权信息" :bordered="false">
                  <p>来源链接：{{item.copyright_url}}</p>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<style lang="less">
.copyrightMain {
  .ant-card-head-title {
    width: 170px;
  }
}
.copyrightMList,
.copyrightMain {
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
.copyright {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.copyrightMain {
  display: flex;
  width: 100%;
  overflow-x: scroll;
  background-color: #f0f2f5;
  padding: 12px 6px;
  min-height: 105px;
}
.copyrightCard {
  margin: 0 6px;
  text-align: center;
  box-shadow: 2px 2px 5px #d9d9d9;
  transition: 0.2s all;
}
.copyrightCard:last-of-type::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 100%;
  left: 100%;
  top: 0;
}
.copyrightMList {
  flex-grow: 1;
  padding-bottom: 80px;
  .img {
    width: 242px;
    height: 242px;
    object-fit: contain;
  }
  overflow-y: scroll;
}
.select {
  box-shadow: none;
  transform: scale(0.95);
}
.number{
  position: relative;
  .point{
    position: absolute;
    right:0px;
    top:0px
  }
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
    })
  },
  data() {
    return {
      copyrightList: [],
      listData: []
    }
  },
  created() {
    const me = this
    me.getCopyrightListF()
  },
  methods: {
    getCopyrightListF() {
      const me = this
      me.$axios({
        methods: 'get',
        url: me.API_STATE.getCopyrightList
      })
        .then(res => {
          if (res.data.code === 200) {
            let list = res.data.data.copyrightList
            let result = []
            // 处理数组，加上select，用于单选
            for (let i = 0; i < list.length; i++) {
              result.push({
                select: i === 0,
                id: list[i].id,
                name: list[i].name,
                number: list[i].number
              })
            }
            me.copyrightList = result
            // 默认展开第一个版权素材列表
            me.getCopyrightMListF(result[0].id)
          }
        })
        .catch(() => {
          me.$message.error('获取版权信息失败')
        })
    },
    showMList(id) {
      // 单选方法，展示版权下当图片列表方法
      const me = this
      me.radioF(id)
      me.getCopyrightMListF(id)
    },
    getCopyrightMListF(id) {
      const me = this
      me.$axios({
        headers: {},
        method: 'get',
        data: {
          cur_page: 0,
          copyright: id
        },
        url: me.API_STATE.getMaterialList
      })
        .then(res => {
          if (res.data.code === 200) {
            me.$set(me, 'listData', res.data.data.materialList)
          }
        })
        .catch(() => {
          me.$message.error('获取版权素材列表失败')
        })
    },
    radioF(id) {
      const me = this
      for (let i = 0; i < me.copyrightList.length; i++) {
        if (id === me.copyrightList[i].id) {
          me.$set(me.copyrightList[i], 'select', true)
        } else {
          me.$set(me.copyrightList[i], 'select', false)
        }
      }
    }
  },
  components: {}
}
</script>
