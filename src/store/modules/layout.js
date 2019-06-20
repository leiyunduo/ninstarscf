import {LAYOUT_TYPE} from '@/store/mutation-types'

const state = {
  layout_type: '',
  isSigned: false
}

const mutations = {
  byFull (state) {
    state.layout_type = LAYOUT_TYPE.Full
  },
  byIframe (state) {
    state.layout_type = LAYOUT_TYPE.Iframe
  },
  changeSigned (state, sign) {
    state.isSigned = sign
  }
}

export default {
  namespaced: true,
  state,
  mutations
}