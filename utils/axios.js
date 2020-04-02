//创建基地址
const BASEURL = 'http://localhost:3000/api/'
//导入app.js
const app = getApp()

//创建一个获取地址promise函数
export const axios = ({ url, method = "GET", data, tip = '数据加载中...', isNeedAuth = true }) => {
  return new Promise((resolve, reject) => {
    //显示提示框
    wx.showLoading({
      title: tip,
    })

    // 处理请求头
    const header = {}
    if (isNeedAuth) { // 是否需要授权
      if (app.globalData.token) {
        //如果app里面有token,就直接加载请求头里
        header.Authorization = app.globalData.token
      } else {
        //如果app里面没有token,就获取token加在请求头里,把token存到app中
        const token = wx.getStorageSync('token')
        header.Authorization = token
        app.globalData.token = token
      }
    }
    wx.request({
      url: `${BASEURL}${url}`,
      data,
      method,
      header,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        //最后隐藏提示框
        wx.hideLoading()
      }
    })
  })
}