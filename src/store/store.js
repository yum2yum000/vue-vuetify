import Vue from 'vue'
import Vuex from 'vuex'
import * as  product from './modules/product.js'
import * as  notification from './modules/notification.js'

Vue.use(Vuex)
export default new Vuex.Store({
        modules:{
           product,notification
        }
    })