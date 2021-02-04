export const namespaced = true

export const state={
    notifications:[]
}

let nextId=1;
export const mutations = {
    PUSH(state,notification){
        state.notifications=[]
        state.notifications.push({
            ...notification,
            id:nextId++

        })
    }

}

export const actions = {
    add({ commit }, notification) {
        commit('PUSH', notification)
    },

}
