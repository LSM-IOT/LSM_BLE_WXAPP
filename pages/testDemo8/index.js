

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //
  },

//js部分示例代码
//跳转到非tabBar页面  
gotoPage(options) {
  wx.navigateTo({
        url: '/pages/testDemo1/index',//要跳转到的页面路径
})  
},

})