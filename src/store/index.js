import Vue from 'vue'
import Vuex from 'vuex'

import moduleModule from './moduleModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      moduleModule: moduleModule
    }
})