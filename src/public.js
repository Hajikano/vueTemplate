const $public = {
    name: "Vue Template",
    version: "v0.0.1a",

    //判断是否移动端
    _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    },

    getRandomStr(limit) {
        const charsets = "avcdefghijklmnopqrstuvwxyz1234567890";
        let randomStr = "";
        for (let i = 0; i < limit; i++) {
            let randomInt = Math.floor(Math.random() * (charsets.length - 1));
            randomStr += charsets[randomInt];
        }
        return randomStr;
    },
};

export { $public };
