import Vue from 'vue'
import Vuex from 'vuex'
import { api } from './apiFile/api.js'
Vue.use(Vuex)

let API_STATE = {
  state: api
}
export default new Vuex.Store({
  state: {
    viewTitle: '用户管理',
    power: ['userManagement', 'tagManagement', 'materialManagement', 'auditsManagement'],
    navWidth: 200,
    isMobile: false
  },
  mutations: {
    viewTitle: function (state, title) {
      state.viewTitle = title
    },
    navWidth: function (state, width) {
      state.navWidth = width
    },
    isMobile: function (state, tf) {
      state.isMobile = tf
    }
  },
  actions: {
    viewTitleFunc: function (context, title) {
      context.commit('viewTitle', title)
    },
    navWidthFunc: function (context, width) {
      context.commit('navWidth', width)
    },
    isMobileFunc: function (context, tf) {
      context.commit('isMobile', tf)
    }
  },
  modules: {
    API_STATE
  }
})
