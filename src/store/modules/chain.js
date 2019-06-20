const state = {
  isSuctionTop: false,
  isConfirm: false
}

const mutations = {
  changeScrollBarStatus (state, flag) {
    state.isSuctionTop = flag
  },
  setConfirm (state, flag) {
    state.isConfirm = flag
  }
}

export default {
  namespaced: true,
  state,
  mutations
}