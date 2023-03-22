Page({
  data:{
    info:" ",
  },
  GetInfo(){
    var that = this
    wx.scanCode({
      onlyFromCamera: false, //设置为可以使用本机图片
      scanType:['barCode','datamatrix','pdf417','qrCode'], //可以扫描的类型
        //成功后
      success:function(res){
        //console.log(res.result)
        that.info = res.result
        console.log(that.info)
        that.setData({
          info:res.result
        })
      }
    })
  }
})
