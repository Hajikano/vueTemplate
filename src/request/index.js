import axios from "axios";

const request = axios.create({
    // baseURL: '',
    baseURL: "/api",
    timeout: 10000,
});

// myAxios.interceptors.request.use();

// myAxios.interceptors.response.use();

export { request };
