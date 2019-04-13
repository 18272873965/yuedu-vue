import axios from 'axios'
import router from '@/router/router'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:3000/api';
// axios.defaults.baseURL = 'http://localhost:3000/api'


// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
    // 获取localStorage中的token如果有则添加，如果没有则不添加
    const token = localStorage.getItem('token')
    token ? config.headers.common['Authorization'] = "Bearer " + token : null
    return config
  }, (err) => {
    return Promise.reject(err)
  })

// 添加一个响应拦截器
axios.interceptors.response.use((res) => {
    // console.log(res)
    if (res.data.res_code === 401) {
      // 跳转到登录页
      router.push('/login')
    }
    // 对响应数据做点什么
    return res;
  }, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 再重新将设置好的axios作为模块导出
export default axios
