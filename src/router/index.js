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
        path: "/",
        name: "index",
        meta: {
            isAuth: true,
        },
        component: () => import(`@/pages/index`),
    },
    {
        path: "/404",
        name: "404",
        meta: {
            isAuth: false,
        },
        component: () => import(`@/pages/404`),
    },
];

const router = new Router({
    routes: routerMap,
});

const iDCRouter = new DCRouter(router);
export { iDCRouter };

router.beforeEach((to, from, next) => {
    const { token } = store.state;
    if (iDCRouter.state) {
        // 应用内跳转
        iDCRouter.stateToggle(false);
        if (to.name === null) {
            if (from.name === "404") {
                next(false);
            } else {
                iDCRouter.push("/404");
            }
        } else {
            if (to.meta.isAuth && token === null) {
                iDCRouter.push("/login");
            } else {
                next();
            }
        }
    } else {
        // 浏览器跳转
        if (iDCRouter.getTopRoute() === null) {
            if (to.meta.isAuth && token === null) {
                iDCRouter.push("/login");
            } else {
                if (to.name !== null) {
                    iDCRouter.push(to.path);
                } else {
                    iDCRouter.push("/");
                }
            }
        } else if (to.name === null) {
            if (from.name === "404") {
                next(false);
            } else {
                iDCRouter.push("/404");
            }
        } else {
            next(false);
        }
    }
});

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
