import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import DataStore from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  DataStore,
})

export default store