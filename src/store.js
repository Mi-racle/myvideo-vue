import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  files: [],
}

const mutations = {
  updateFiles(state, files) {
    state.files = files
  }
}

const getters = {
  getFiles(state) {
    return state.files
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters
})
