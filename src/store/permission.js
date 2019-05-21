import { asyncRouterMap, constantRouterMap } from '../router.js'


function filterAsyncRouter(routes, roles) {
    var tmprole = []
    roles.forEach(function(item,v) {
        tmprole.push(item.title)
    })
    //console.log(tmprole)
    for(var i = routes.length-1; i >=0; i--) {
        var tmproute = routes[i]
        console.log(routes[i])
        if(tmprole.indexOf(tmproute.meta.title) > -1) {
            if(routes[i].children) {
                var tmprolechild = []
                roles.forEach(function(irole,vrole) {
                    if(irole.title == routes[i].meta.title) {
                        tmprolechild = irole.children
                    }
                })
                filterAsyncRouter(routes[i].children,tmprolechild)
            }
        }else{
            routes.splice(i,1)
        }
    }
    // routes.forEach(function(item,index) {
    //     // console.log(item,index)

    //     var tmproute = item
    //     if(tmprole.indexOf(tmproute.meta.title) > -1) {
    //         console.log(routes,index)
    //         // if(item.children) {
    //         //     filterAsyncRouter(item.children,roles[index].children)
    //         // }
    //     }else{
    //         console.log(routes,index,'else')
    //         //routes.splice(index,1)
    //     }
        
    // })
    return routes;
}


function checkHasRoles(item,roles) {
    // console.log(item,roles)
    if(!roles) {
        return false
    }
    if(roles.indexOf(item.meta.title) > 0) {    //只判断第一层 不管后面多级children
        return true
    }else{
        return false
    }
    // var flag = roles.some(function(i,v) {
    //     if(item.meta.title == i.title) {
    //         return true
    //     }else{
    //         return false
    //     }
    // })
    // return flag
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit}, roles) {
            let accessRouter = filterAsyncRouter(asyncRouterMap,roles)
            commit('SET_ROUTERS', accessRouter)
        }
    }
}
export default permission