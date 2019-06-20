const state = {
  locations: [],
  isActived: false,
  barIndex: -1
}

const mutations = {
  setLoaction (state, routeArr) {
    if (!Array.isArray(routeArr)) {
      state.locations.push({ //默认主页
        title: '主页', url: '/'
      })
    } else {
      state.locations = [...routeArr]
    }
  },
  setStatus (state, status) {
    state.isActived = status || false
  },
  setBarIndex (state, index) {
    state.barIndex = index
  }
}

const actions = {
  changeLocation ({commit}, routeArr) {
    commit('setLoaction', routeArr)
  }, 
  changeStatus ({commit}, status) {
    commit('setStatus', status)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}