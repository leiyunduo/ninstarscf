const state = {
  selfInfo: {},
  connectionInfo: {},
  avatar: '',
  selfName: {},
  selfAppraisal: {},
  msgCount: ''
}

const mutations = {
  setSelfInfo (state, Info) {
    state.selfInfo = Info
  },
  setSelfName (state, Info) {
    state.selfName = Info
  },
  setConnectionInfo (state, info) {
    state.connectionInfo = info
  },
  setAvatar (state, _url) {
    state.avatar = _url
  },
  setSelfAppraisal (state, info) {
    state.selfAppraisal = info
  },
  setMsgCount (state, count) {
    state.msgCount = count
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
