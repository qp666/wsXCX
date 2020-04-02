// pages/search/search.js
import { axioss } from '../../utils/axioss.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],//搜索数组
    searchValue: '',
  },
  //输入框的回车事件
  async getCoursesData() {
    console.log('按回车');
    // console.log( this.data.searchValue);

    let res = await axioss({ url: 'course/search', data: { name: this.data.searchValue } })
    console.log(res);
    if (res.data.status == 0) {
      this.setData({
        courses: res.data.message
      })
    }


  },
  //输入事件
  changeValue(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail
    })
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