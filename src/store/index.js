import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//创建VueX对象
const store = new Vuex.Store({
    state: {
        account: null,
        token: null,
        todoURL: null,
    },
    mutations: {
        edit(state, payload) {
            payload = payload.payload;
            state[payload.prop] = payload.data;
        },
    },
});

export { store };
