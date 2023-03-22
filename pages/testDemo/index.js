// pages/testDemo/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myname:"further",
    myid:["1","2","3"],
    mylist:[1,2,3,4,5],
    idHidden:false,
  },

  handleTap1(){
    console.log("click handle1")

  },


  handleTap2(){
    console.log("click handle2")
  },

  handleTap3(){
    console.log("click handle3")
  },
    

  reviseMyname(){
    // this.data.myname="furthermore"
    console.log("click",this.data.myname)
    // 使用setData方法修改属性值
    this.setData({
      myname:"furthermore",
      idHidden:!this.data.idHidden
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