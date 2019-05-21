const tags = {
    state: {
        visitedViews: [],
    },
    mutations: {
        ADD_VISITED_VIEW: (state, view) => {
            if (state.visitedViews.some(v => v.path === view.path)) return
            state.visitedViews.push(
                Object.assign({},view,{
                    title: view.meta.title
                })
            )
        },
        DEL_VISITED_VIEW: (state, view) => {
            for (var i = 0; i < state.visitedViews.length; i ++) {
                if (state.visitedViews[i].path == view.path) {
                    state.visitedViews.splice(i, 1)
                }
            }
        }
    },
    actions: {
        addView( {commit}, view ) {
            commit('ADD_VISITED_VIEW',view)
        },
        delView( {commit}, view ) {
            commit('DEL_VISITED_VIEW', view)
        }
    }
}
export default tags