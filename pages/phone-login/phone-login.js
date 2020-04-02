// pages/phone-login/phone-login.js
import { axioss } from '../../utils/axioss.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '17704051019',
    vcode: '',
    codeText: '获取验证码',
    count: 10,
    isTrue: true, //验证码判断
    timer: null //计时器

  },
  //更改手机号
  changeValue({ detail: { value }, target: { dataset: { name } } }) { // 取到detail里面的value,取到target里面的detaset里面的name
    //属性名表达式用data-name定义的,属性名变动name的值也会自动变化
    this.setData({ [name]: value })
  },

  //获取验证码的点击事件
  get_vcode() {
    //[判断是否验证码正在倒计时]
    if (this.data.isTrue) {
      //  console.log(this.data.phone);
      var pattern = /0?(13|14|15|18|17)[0-9]{9}/; //手机号正则
      //如果手机号验证正确就执行下面的
      if (pattern.test(this.data.phone)) {
        //wx的提示消息
        // wx.showToast({
        //   title: '正在发送验证码', //显示内容
        //   icon: 'none', //是否显示图标
        //   // duration: 500 //提示的延迟时长
        // })
      } else {
        //wx的提示消息
        wx.showToast({
          title: '手机号格式错误', //显示内容
          icon: 'none', //是否显示图标
          // duration: 500 //提示的延迟时长
        })
        return
      }
      // 倒计时
      this.setData({
        isTrue: false,
        codeText: this.data.count
      })
      //开启一个定时器,每一秒钟执行一次, 如果count等于 0 ,定时器关闭
      this.data.timer = setInterval(() => {
        //每秒时间--
        this.data.count--
        if (this.data.count > 0) {
          //修改获取验证码文字为倒计时数字
          this.setData({
            codeText: this.data.count
          })
        } else {
          //如果倒计时结束,清空计时器
          clearInterval(this.data.timer)
          //把count更改为10方便下次使用
          this.data.count = 10
          //更改为true下次才会执行
          this.setData({
            isTrue: true,
            codeText: '获取验证码'
          })
        }
      }, 1000)

      //获取验证码
      wx.request({
        url: 'http://localhost:3000/api/user/vcode', //仅为示例，并非真实的接口地址
        data: {
          phone: this.data.phone
        },
        success({ data }) {
          // console.log(data)
          if (data.status == 0) {

            wx.showToast({
              title: '' + data.vcode, //显示内容
              icon: 'none', //是否显示图标
              // duration: 500 //提示的延迟时长
            })

          } else {

            wx.showToast({
              title: '服务器内部错误', //显示内容
              icon: 'none', //是否显示图标
              // duration: 500 //提示的延迟时长
            })
          }

        }
      })
    } else {
      //如果已经发送
      wx.showToast({
        title: '正在发送,请注意查收', //显示内容
        icon: 'none', //是否显示图标
        // duration: 500 //提示的延迟时长
      })

    }
  },
  //登录事件
  phoneLogin() {
// console.log(axioss);

    axioss({
      url: 'user/login', method: 'POST', tip: '登录中....',  data: {
        phone: this.data.phone,
        vcode: this.data.vcode
      }
    }).then(res => {
      console.log(res);
      
      if (res.data.status == 0) {
        wx.showToast({
          title: res.data.message, //显示内容
          icon: 'none', //是否显示图标
          // duration: 500 //提示的延迟时长
        })
        wx.setStorageSync("token", res.data.token)
        //wx的路由跳转到tabBar方法
        wx.switchTab({
          url: '/pages/home/home'
        })
      }
    })
    // wx.request({
    //   url: 'http://localhost:3000/api/user/login',
    //   method: 'POST',
    //   data: {
    //     phone: this.data.phone,
    //     vcode: this.data.vcode
    //   },
    //   success({ data }) {
    //     console.log(data)
    //     if (data.status == 0) {
    //       wx.showToast({
    //         title: data.message, //显示内容
    //         icon: 'none', //是否显示图标
    //         // duration: 500 //提示的延迟时长
    //       })
    //       wx.setStorageSync("token", data.token)
    //       //wx的路由跳转到tabBar方法
    //       wx.switchTab({
    //         url: '/pages/home/home'
    //       })
    //     }

    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})