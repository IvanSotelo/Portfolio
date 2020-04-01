const state = {
  isLoading: true
}

const mutations = {
  SET_PRELOAD_STATE: state => { state.isLoading = !state.isLoading }
}

const actions = {
  setPreloadState ({ commit }) {
    commit('SET_PRELOAD_STATE')
  }
}

const getters = {
  isLoading: state => state.isLoading
}

export default {
  state,
  mutations,
  actions,
  getters
}
