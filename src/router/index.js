import Vue from "vue";
import Router from "vue-router";
import { DCRouter } from "@/plugins/DCRouter";
import { store } from "@/store";
Vue.use(Router);

const routerMap = [
    {
        path: "/login",
        name: "login",
        meta: {
            isAuth: false,
        },
        component: () => import(`@/pages/login`),
    },
    {
        path: "/home",
        name: "home",
        meta: {
            isAuth: true,
        },
        component: () => import(`@/pages/home`),
    },
];

const router = new Router({
    routes: routerMap,
});

router.beforeEach((to, from, next) => {
    const { token } = store.state;
    if (to.meta.isAuth && token === null) {
        // 未登陆且需拦截
        router.replace("/login");
    } else {
        // 已登陆或无需拦截
        if (to.path === "/") {
            router.replace("/login");
        } else {
            if (iDCRouter.stack.length > 1 && to.path === iDCRouter.stack[iDCRouter.stack.length - 2].path) {
                // 浏览器后退一级
                iDCRouter.pop(true);
            } else {
                iDCRouter.push(to.path, true);
            }
        }
    }
    next();
});

export const iDCRouter = new DCRouter(router);

//重写Router的push,replace方法
//使得定位到同一路由时不报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch((err) => err);
};