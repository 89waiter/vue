const user = {
    state: {
        roles: [],
    },
    mutations: {
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        GetUserInfo({ commit }) {
            // axios 请求 response.data  == [] roles    调试错误 经常删除了首页路由 但是还是地址栏访问首页 所以空白！！！建议一直留着首页
            let roles = [
                {
                    id: 1,
                    title: '首页',
                    children: [
                        {
                            id: 5,
                            title: '首页'
                        }
                    ]
                },
                {
                    id: 2,
                    title: '分类管理',
                    children: [
                        {
                            id: 6,
                            title: '分类列表'
                        }
                    ]
                },
                {
                    id: 3,
                    title: '文章管理',
                    children: [
                        {
                            id: 7,
                            title: '文章列表'
                        }
                    ]
                },
                {
                    id: 4,
                    title: '系统管理',
                    children: [
                        {
                            id: 8,
                            title: '账户',
                            children: [
                                {
                                    id: 10,
                                    title: '头像管理'
                                },
                                {
                                    id: 11,
                                    title: '账户中心'
                                }
                            ]
                        },
                        {
                            id: 9,
                            title: '退出账户'
                        }
                    ]
                }
            ]
            commit('SET_ROLES', roles)
        },
    }
}
export default user