// pages/testDemo1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mydata:"",
    mydatalist:[]
  },

  handleInput(params){
    // console.log(params.detail.value)
    this.setData({
      mydata:params.detail.value
    })
  },
  handleAdd(params){
    // console.log(params)
    // console.log("mydata:",this.data.mydata)
    // 将输入框中输入的数据添加到列表中
    this.setData({
      mydatalist:[...this.data.mydatalist,this.data.mydata]
    })
    //添加完毕后将 输入框中的内容清空
    this.setData({
      mydata:""
    })
  },

  handleDel(params){
    // 从index=0开始删除 每次一个
    // this.data.mydatalist.splice(0,1)
    //根据对应的index删除
    // console.log("del",params.target.dataset.myid)
    this.data.mydatalist.splice(params.target.dataset.myid,1)
    this.setData({
      mydatalist:this.data.mydatalist
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