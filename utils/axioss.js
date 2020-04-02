const Base_URL = 'http://localhost:3000/api/'

//创建一个axioss函数
export const axioss = ({
  url, method = "GET", data = {}, tip = '正在加载中..'
}) => {
  //它返回的是一个promise对象
  return new Promise((resolve, reject) => {
    //显示提示框
    wx.showLoading({
      title: tip,
    })
    //如果取到token,就附加请求头上
    const header = {}
    const token = wx.getStorageSync('token')
    if (token) {
      header.Authorization = token
    }
    wx.request({
      url: Base_URL + url,
      method,
      data,
      header,
      success(res) {
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