const state = {
  instances: []
}

const mutations = {
  ADD_INSTANCE (state, payload) {
    state.instances.push(payload)
  },

  REMOVE_INSTANCE (state) {

  }
}

export default {
  state,
  mutations
}
