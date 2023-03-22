// 获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 前台判断用的就是这个
    isHide: true
  },

  //点击事件
  login(){
    var _this=this;
    wx.getUserProfile({
      desc: 'desc',
      success: (res)=>{
        var userInfo = res.userInfo;
        console.log('用户用户：' + res.userInfo);
        wx.login({
          success:function(e){
            //请求成功后获取你的code值
            var code=e.code;
            console.log('当前code：' + code);
            wx.request({
              //请求后台
              url: 'http://local.campus.com/?s=App.Weixin.WxappLogin',
              //传code、nickName、log
              data: {code:code,userInfo:userInfo},
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              success: function(arr){
                //登录成功后的逻辑
              }
            })
          }
        })
      },
      fail:(res)=>{
        //点击拒绝后弹框提示
        wx.showToast({
          title: '授权登录失败',
          icon: 'error'
        })
      }
    })
  }
})