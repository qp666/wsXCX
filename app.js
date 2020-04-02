//app.js
App({
  //页面只会执行一次的生命周期
  onLaunch: function () {
    // console.log('123');
    //从本地数据里取出token的值
    //如果不是第一次登录,token就有值
    if (wx.getStorageSync('token')) {
      //直接去首页
      // wx.reLaunch({
      //   url: '/pages/home/home'
      // })
    }

    //  if( wx.getStorage({
    //     key: 'token',
    //     success(res) {
    //       // console.log(res.data)

    //       if (res.data) {
    //         //  console.log('456');


    //       }
    //     }
    //   }))

  },
  globalData: {
    token: null
  }
})