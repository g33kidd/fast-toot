const state = {
  instances: []
}

const mutations = {
  ADD_INSTANCE (state, payload) {
    state.instances.push(payload)
  },

  RECEIVE_INSTANCES (state, payload) {
    state.instances = payload
  },

  RECEIVE_TOOTS (state, payload) {

  }
}

export default {
  state,
  mutations
}
