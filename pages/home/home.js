// pages/home/home.js
import { axioss } from '../../utils/axioss.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LBT: [],
    KCSJ: [],
    HotVideo: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    //发送接口获取轮播图数据
    this.getLBT()
    //获取课程
    this.getKCSJ()
    this.getHotVideo()


  },
  // 获取轮播图数据
  async getLBT() {
    const res = await axioss({ url: 'home/swipers' })
    if (res.data.status == 0) {
      this.setData({
        LBT: res.data.message
      })
    }
  },
  // 获取推荐课程数据
  async getKCSJ() {
    const res = await axioss({ url: 'home/course' })
    if (res.data.status == 0) {
      this.setData({
        KCSJ: res.data.message
      })
    }

  },
  // 获取推荐课程数据
  async getHotVideo() {
    const res = await axioss({ url: 'home/video' })
    if (res.data.status == 0) {
      this.setData({
        HotVideo: res.data.message
      })
    }

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