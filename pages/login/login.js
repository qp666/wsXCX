// pages/login/login.js
Page({
  //调用方法来登录,e就是点击登录后的值
  getUserInfo(e) {
    // console.log(e);
    //如果是点取消的话,值就是getUserInfo:fail auth deny ,就直接return 不执行下面的代码
    if (e.detail.errMsg === "getUserInfo:fail auth deny") return

    //点确定的话就会从这里开始
    //获取头像与用户名
    const { nickName: nickname, avatarUrl: avatar } = e.detail.userInfo;
    console.log(nickname, avatar);

    //发送登录请求获取code
    wx.login({
      //获取code
      success({ code }) {
        //获取到code 开始发送网络请求来登录
        // console.log('123');
        wx.request({
          url: 'http://localhost:3000/api/user/wxlogin', //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            code,
            nickname,
            avatar
          },
          success({ data }) {
            console.log(data)
            //wx的提示消息
            wx.showToast({
              title: data.message, //显示内容
              icon: 'none', //是否显示图标
              // duration: 500 //提示的延迟时长
            })
            //如果=0,代表登录成功
            if (data.status == 0) {
              //wx的存数据到本地方法
              wx.setStorageSync("token", data.token)

              //wx的路由跳转到tabBar方法
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }

          },
        })

      },
      //登录失败触发
      fail: err => {
        console.log('获取code失败');

      }
    })
  },
  //跳转到手机登录
  goPhoneLogin() {
    wx.navigateTo({
      url: '/pages/phone-login/phone-login'
    })
  }
})