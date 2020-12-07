function DCRouter(router) {
    this.vueRouter = router; //vue router
    this.stack = []; // histories stack
    this.map = new Object(); // histories set
}

function DCRoute(path, method) {
    if (path !== undefined && method !== undefined) {
        this.path = path; // 路径
        this.method = method; // 路由初始化方式
    } else {
        throw "Params is not defined";
    }
}

// 获取栈顶路由
function getTopRoute() {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
}
DCRouter.prototype.getTopRoute = getTopRoute;

// 路由入栈
function push(path, isAuto = false, onComplete, onAbort) {
    if (this.map[path] !== undefined) {
        this.deleteRouteByIndex(path);
        this.push(path, true);
    } else {
        this.map[path] = this.stack.length;
        this.stack.push(new DCRoute(path, "push"));
        if (!isAuto) {
            this.vueRouter.push(path, onComplete, onAbort);
        }
    }
}
DCRouter.prototype.push = push;

// 替换栈顶路由
function replace(path, isAuto = false, onComplete, onAbort) {
    if (this.map[path] !== undefined) {
        this.deleteRouteByIndex(path);
        this.replace(path, true);
    } else {
        this.stack.pop();
        this.stack.push(new DCRoute(path, "replace"));
        if (!isAuto) {
            this.vueRouter.replace(path, onComplete, onAbort);
        }
    }
}
DCRouter.prototype.replace = replace;

// 删除给定路径的路由
function deleteRouteByIndex(path) {
    const index = this.map[path];
    this.stack.splice(index, 1);
    for (let i of Object.getOwnPropertyNames(this.map)) {
        if (this.map[i] > index) {
            this.map[i]--;
        }
    }
    delete this.map[path];
}
DCRouter.prototype.deleteRouteByIndex = deleteRouteByIndex;

// 路由出栈
function pop(isAuto = false) {
    let popRoute = this.stack.pop();
    delete this.map[popRoute.path];
    if(!isAuto){
        this.vueRouter.back();
    }
}
DCRouter.prototype.pop = pop;

export { DCRouter, DCRoute };
