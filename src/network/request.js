import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/h8",
    timeout: 5000,
  })

  instance.interceptors.request.use(config => {
    //console.log(config);
    // 比如config中的一些信息不符合服务器的请求
    // 比如每次发送网络请求时，都希望界面中显示一个请求的图标
    // 某些网络请求(比如登录)，需要携带一些信息
    return config
  }, err => {
    //console.log(err);
  })

  instance.interceptors.response.use(res => {
    console.log(res)
    return res
  }, err => {
    console.log(err);
  })

  //发送真正的网络请求
  return instance(config)
}
