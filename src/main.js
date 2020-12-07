import Vue from "vue";
import App from "./App.vue";

import { iDCRouter } from "./router";
Vue.prototype.$iDCRouter = iDCRouter;
import { store } from "./store";

import { $public } from "./public";
Vue.prototype.$public = $public;

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router: iDCRouter.vueRouter,
    store: store,
}).$mount("#app");
