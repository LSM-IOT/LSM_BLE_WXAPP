// pages/testDemo9/index.js
Page({
  data: {
      latitude: 0, //首次加载维度
      longitude: 0, //首次加载的经度
      mapName: "", //选点的位置
  },
  moveToLocation() {
      let that = this;//防止this指向问题
      wx.chooseLocation({
          success: function (res) {
              console.log(res.name);
              //赋值给data中的mapName
              that.setData({
                  mapName: res.name
              })
          },
          //错误信息
          fail: function () {
              console.log(err);
          }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})