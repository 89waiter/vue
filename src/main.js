import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Vuex from 'vuex'

Vue.use(Vuex)

import './assets/css/main.css'
import './assets/css/font-awesome.min.css'
import permission from './store/permission'
import user from './store/user'
import tags from './store/tags'


import {fetch, post, postForm, postImg} from './utils/RequestUtil'
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$postForm = postForm
Vue.prototype.$postImg = postImg

var store = new Vuex.Store({
    modules: {
        permission,
        user,
        tags
    }
})
router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.path == '/login') {
        document.getElementsByTagName("body")[0].className = 'active'
    }else {
        document.getElementsByTagName("body")[0].className = ''
    }

    if(localStorage.getItem('username')) {
        if(to.path == '/login') {
            document.getElementsByTagName("body")[0].className = ''
            next({path: '/dashboard'})
        }else{
            if(store.state.user.roles.length === 0) {
                store.dispatch('GetUserInfo').then(() => {
                    const roles = store.state.user.roles
                    store.dispatch('GenerateRoutes',roles).then(() => {
                        router.addRoutes(store.state.permission.addRouters)
                        next(to.path)
                    })
                })
            }else {
                next()
            }
        }

    }else {
        if(to.path=='/login') {
            document.getElementsByTagName("body")[0].className = 'active'
            next()
        }else{
            document.getElementsByTagName("body")[0].className = 'active'
            next({
                path:"/login"
                // query: {redirect: to.fullPath}//将目的路由地址存入login的query中 https://www.cnblogs.com/goloving/p/9147975.html 参考此处
            })
        }
    }
    
    
})
router.afterEach(() => {
    
    // finish
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
