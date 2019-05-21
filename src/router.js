import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Index.vue'
Vue.use(Router)

export const constantRouterMap = [
  {
      path: '/login',
      component: () => import('./views/login/LoginContainer.vue'),
      hidden: true,
      meta: {
          background: 'active'
      }
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})


export const asyncRouterMap = [
  {
      path: '',
      component: Layout,
      redirect: 'dashboard',
      meta: {
          title: '首页',
          icon: 'fa fa-dashboard'
      },
      children: [
          {
              path: 'dashboard',
              component: () => import('./views/dashboard/Index.vue'),
              meta: {
                  title: '首页'
              },
          }
      ]
      
  },
  {
      path: '/cate',
      component: Layout,
      redirect: '/cate/list',
      meta: {
          title: '分类管理',
          icon: 'fa fa-server'
      },
      children: [
          {
              path: 'list',
              component: () => import('./views/cate/List.vue'),
              meta: {
                  title: '分类列表'
              },
          }
      ]
  },
  {
      path: '/article',
      component: Layout,
      redirect: '/article/list',
      meta: {
          title: '文章管理',
          icon: 'fa fa-file-text'
      },
      children: [
          {
              path: 'list',
              component: () => import('./views/article/List.vue'),
              meta: {
                  title: '文章列表'
              },
          }
      ]
  },
  {
      path: '/system',
      component: Layout,
      redirect: '/system/account/add',
      meta: {
          title: '系统管理',
          icon: 'fa fa-cog'
      },
      children: [
          {
              path: 'account',
              component: () => import('./views/system/account/Index.vue'),   //这个作为父组件 只要带有children 其component 需要为父组件
              meta: {
                  title: '账户'
              },
              children: [
                  {
                      path: 'manage',
                      component: () => import('./views/system/account/Manage.vue'),
                      meta: {
                          title: '头像管理'
                      }
                  },{
                      path: 'center',
                      component: () => import('./views/system/account/Center.vue'),
                      meta: {
                          title: '账户中心'
                      }
                  }
              ]
          },
          {
              path: 'exit',
              component: () => import('./views/system/Exit.vue'),
              meta: {
                  title: '退出账户'
              }
          }
      ]
  }
]
