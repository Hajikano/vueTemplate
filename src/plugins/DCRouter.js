import { $public } from "@/public";

function DCRouter(router) {
    this.vueRouter = router; //vue router
    this.stack = []; // 路由栈
    this.map = new Object(); // 路由表 记录路由的索引
    this.state = false;
}

function DCRoute(path, method) {
    if (path !== undefined && method !== undefined) {
        this.path = path; // 路径
        this.method = method; // 路由初始化方式
        this.routeID = `${path}_${$public.getRandomStr(5)}`; // 路由ID
    } else {
        throw "Params is not defined";
    }
}

// 获取栈顶路由
function getTopRoute() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
}
DCRouter.prototype.getTopRoute = getTopRoute;

// 路由初始化
function init(path) {
    const newRoute = new DCRoute(path, "push");
    this.map[newRoute.routeID] = this.stack.length;
    this.stack.push(newRoute);
}
DCRouter.prototype.init = init;

// 路由初始化
function stateToggle(state = null) {
    this.state = typeof state === 'boolean' ? !this.state : state;
}
DCRouter.prototype.stateToggle = stateToggle;

// 路由入栈
function push(path, onComplete, onAbort) {
    const newRoute = new DCRoute(path, "push");
    this.map[newRoute.routeID] = this.stack.length;
    this.stack.push(newRoute);
    this.stateToggle(true);
    this.vueRouter.replace(path, onComplete, onAbort);
}
DCRouter.prototype.push = push;

// 替换栈顶路由
function replace(path, onComplete, onAbort) {
    let popRoute = this.stack.pop();
    delete this.map[popRoute.routeID];
    const newRoute = new DCRoute(path, "replace");
    this.map[newRoute.routeID] = this.stack.length;
    this.stack.push(newRoute);
    this.stateToggle(true);
    this.vueRouter.replace(path, onComplete, onAbort);
}
DCRouter.prototype.replace = replace;

// 删除给定ID的路由
function deleteRouteByRouteID(routeID) {
    const index = this.map[routeID];
    this.stack.splice(index, 1);
    for (let i of Object.getOwnPropertyNames(this.map)) {
        if (this.map[i] > index) {
            this.map[i]--;
        }
    }
    delete this.map[routeID];
}
DCRouter.prototype.deleteRouteByRouteID = deleteRouteByRouteID;

// 路由出栈
function pop(onComplete, onAbort) {
    let popRoute = this.stack.pop();
    delete this.map[popRoute.routeID];
    this.stateToggle(true);
    console.log(123);
    this.vueRouter.replace(this.getTopRoute().path, onComplete, onAbort);
}
DCRouter.prototype.pop = pop;

export { DCRouter, DCRoute };
