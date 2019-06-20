import Vue from 'vue'
import Vuex from 'vuex'
import location from './modules/location'
import chain from './modules/chain'
import layout from './modules/layout'
import homePage from './modules/home_page'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    location,
    chain,
    layout,
    homePage
  }
})
