// pages/testDemo4/index.js
// 微信小程序中连接蓝牙设备，蓝牙设备写入流程
// 1、检测当前使用设备（如自己的手机）是否支持蓝牙/蓝牙开启状态
// wx:openBluetoothAdapter({})
// 2、如蓝牙已开启状态，检查蓝牙适配器的状态
// wx.getBluetoothAdapterState({})
// 3、添加监听蓝牙适配器状态变化
// wx.onBluetoothAdapterStateChange({})
// 4、搜索附近蓝牙设备
// wx.startBluetoothDevicesDiscovery({})
// 5、监听搜索的到设备
// wx.onBluetoothDeviceFound({})
// 遍历设备列表找到和macAddr（看自己家的蓝牙装置的物理地址）匹配的设备的deviceId
// 6、连接想要连接的切匹配成功的设备
// wx.createBLEConnection({})
// 7、获取连接成功的设备的设备服务servicesID
// wx.getBLEDeviceServices({})
// 8、获取设备特征id
// wx.getBLEDeviceCharacteristics({})
// 9、向设备写入指令
// wx.writeBLECharacteristicValue({})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',  //'RFstar_BA43'
    // name
    // RFstar_BA43
    // mac地址
    // 8C:F6:81:D2:BA:43 
    // 服务的 uuid 
    // 6E400001-B5A3-F393-E0A9-E50E24DCCA9E
    //写数据 uuid
    // 6e400002-b5a3-f393-e0a9-e50e24dcca9e
    // 通知的uuid
    // 6e400003-b5a3-f393-e0a9-e50e24dcca9e
    rssi:'',
    deviceId:'',
    services:'',
    propertiesuuId:"",//监听值
    writeId:"",//写入值
    uuid:"",
    buffer:"",
    readvalue:"",
    devices:[],
    chs:[],     //特性
    isConnected:false
 },


stringToBytes(str) {
  var array = new Uint8Array(str.length);
  for (var i = 0, l = str.length; i < l; i++) {
    array[i] = str.charCodeAt(i);
  }
  console.log(array);
  return array.buffer;
},
hextoString: function (hex) {
  var arr = hex.split("")
  var out = ""
  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
    var charValue = String.fromCharCode(tmp);
    out += charValue
  }
  return out
},
ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
},
light1on(){
  var that=this
  var buffer = that.stringToBytes("light1on")
  wx.writeBLECharacteristicValue({
    deviceId:that.data.deviceId,
    serviceId:that.data.serviceId,
    characteristicId:that.data.characteristicId,
    value: buffer,
  })
},

// 初始化蓝牙
 initBlue:function(){
  var that = this;
  //再次点击 开始按钮，先将devices列表中的元素清空
  // if(that.data.devices.length>0){that.setData({devices:[]})}
  //先释放蓝牙的资源
  // wx.closeBluetoothAdapter({
  //   success (res) {
  //     console.log(res)
  //   }
  // }
  // ),
  console.log('searchBle')
  // 打开适配器
  wx.openBluetoothAdapter({//调用微信小程序api 打开蓝牙适配器接口
    success: function (res) {
      console.log(res)
      wx.showToast({
        title: '初始化成功',
        icon: 'success',
        duration: 1000
      })
      that.findBlue();//2.0
    },
    fail: function (res) {//如果手机上的蓝牙没有打开，可以提醒用户
      wx.showToast({
        title: '请开启蓝牙',
        icon: 'none',
        duration: 1000
      })
    }
  })
},

// 搜索蓝牙
findBlue(){
  var that = this
  //开始搜索蓝牙
  wx.startBluetoothDevicesDiscovery({
    // allowDuplicatesKey 为设置是否重复上报搜索到的设备
    allowDuplicatesKey: false,
    interval: 10,
    success: function (res) {
      console.log("正在搜索设备",res)
      wx.showLoading({
        title: '正在搜索设备',
      })
      // 设置 "正在搜索设备" 出现的时间
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)      
      that.getBlue()//3.0
    }
  })
},


//  监听发现附近的蓝牙设备
getBlue(){
  var that = this
  // 获取在蓝牙模块生效期间所有已发现的蓝牙设备
  // wx.getBluetoothDevices({
  //   success: function(res) {
  //     console.log(res)
  //     res.devices.forEach(device=>{
  //       if(!device.name && !device.localName){
  //         return
  //       }
  //       console.log("发现的蓝牙设备",device)
  //       that.data.devices.push(device)
  //       that.setData({devices:that.data.devices})
  //     })
   // 监听发现附近的蓝牙设备
  wx.onBluetoothDeviceFound((res) => {
    
    res.devices.forEach(device => {
      if (!device.name && !device.localName) { return }
      console.log("发现的蓝牙设备", device)
      that.data.devices.push(device)
      that.setData({ devices: that.data.devices })
    })

  })

      // for (var i = 0; i < res.devices.length; i++){
　　　//that.data.inputValue：表示的是需要连接的蓝牙设备ID，简单点来说就是我想要连接这个蓝牙设备，所以我去遍历我搜索到的蓝牙设备中是否有这个ID
        // if (res.devices[i].name == that.data.inputValue || res.devices[i].localName == that.data.inputValue){
        // if (res.devices[i].name == 'RFstar_BA43' || res.devices[i].localName == 'RFstar_BA43'){          
        //   that.setData({
        //     deviceId: res.devices[i].deviceId,
        //     uuid:res.devices[i].advertisServiceUUIDs,
        //     rssi:res.devices[i].RSSI,
        //     inputValue:res.devices[i].name

        //   })
        //   that.data.deviceId=res.devices[i].deviceId;
        //   that.connetBlue(res.devices[i].deviceId);//4.0
        //   return;
        // }
      // }
    // },
    // fail: function(){
    //   console.log("搜索蓝牙设备失败")
    // }
  // }),
},

//连接
connetBlue(e){                    
  var that = this;
  // console.log(e.currentTarget.dataset.deviceId)
  that.setData({
    deviceId:e.currentTarget.dataset.deviceId
  })
  wx.createBLEConnection({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: e.currentTarget.dataset.deviceId,//设备id(mac)
    success: function (res) {
      wx.showToast({
        title: '连接成功',
        icon: 'fails',
        duration: 1000
      })
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log('连接蓝牙成功之后关闭蓝牙搜索');
        }
      })
      that.getServiceId()//5.0
    }
  })
},


  // 连接上需要的蓝牙设备之后，获取这个蓝牙设备的服务uuid
  getServiceId(){
    var that = this
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: that.data.deviceId,
      success: function (res) {
        console.log("所有服务:",res)
        // 0: {uuid: "0000180A-0000-1000-8000-00805F9B34FB", isPrimary: true}
        // 1: {uuid: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E", isPrimary: true}
        // 2: {uuid: "1D14D6EE-FD63-4FA1-BFA4-8F47B42119F0", isPrimary: true}
        // 3: {uuid: "00001801-0000-1000-8000-00805F9B34FB", isPrimary: true}
        // 4: {uuid: "00001800-0000-1000-8000-00805F9B34FB", isPrimary: true}        
        var item = res.services[2];
        that.setData({
          services: item.uuid
        })
        that.getCharacteId(that.data.deviceId,that.data.services[2])//6.0
      },
      fail(err){
        console.log(err);
      }
    })
  },

  // 获取蓝牙设备某个服务中所有特征值
  // indicate和notify两者一个为true即可用
  getCharacteId(deviceId,services){
    wx.getBLEDeviceCharacteristics({
      deviceId, // 搜索到设备的 deviceId
      services, // 上一步中找到的某个服务
      success: (res) => {
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.write) { // 该特征值可写
            // 本示例是向蓝牙设备发送一个 0x00 的 16 进制数据
            // 实际使用时，应根据具体设备协议发送数据
            let buffer = new ArrayBuffer(1)
            let dataView = new DataView(buffer)
            dataView.setUint8(0, 0)
            wx.writeBLECharacteristicValue({
              deviceId,
              services,
              characteristicId: item.uuid,
              value: buffer,
            })
          }
          if (item.properties.read) { // 改特征值可读
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.notify || item.properties.indicate) {
            // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      }
    })
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((result) => {
      // 使用完成后在合适的时机断开连接和关闭蓝牙适配器
      wx.closeBLEConnection({
        deviceId,
      })
      wx.closeBluetoothAdapter({})
    })
  },  
    
  //   var that = this 
  //   wx.getBLEDeviceCharacteristics({
  //     // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  //     deviceId:that.data.deviceId,
  //     // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
  //     serviceId:that.data.services,

  //     success: function (res) {
  //       // console.log(res)
  //       for (var i = 0; i < res.characteristics.length; i++) {//  获取2个特性值  ，写 读
  //         var item = res.characteristics[i];
  //         if(item.properties.indicate||item.properties.notify){
  //           that.setData({
  //             propertiesuuId: item.uuid,
  //           })
  //           that.startNotice(that.data.propertiesuuId)//7.0
  //         }
  //         if (item.properties.write == true){
  //           that.setData({
  //             writeId: item.uuid//用来写入的值
  //           })
  //         }
  //       }
  //     },
  //     fail(err){
  //       console.log("getBLEDeviceCharacteristics",err);
  //     }
  //   })
  // },


// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。
// 必须设备的特征值支持 notify 或者 indicate 才可以成功调用
  startNotice(uuid){
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: that.data.deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: that.data.services,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: that.data.propertiesuuId,  //第一步 开启监听 notityid  第二步发送指令 write
      success (res){
        console.log(res,'启用低功能蓝牙监听成功');
        // 监听获取数据
        // ArrayBuffer转16进制字符串示例
        function ab2hex(buffer) {
          let hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function(bit) {
              return ('00' + bit.toString(16)).slice(-2)
            }
          )
          return hexArr.join('');
        }
        
        // 16进制转中文字符串
        function hexCharCodeToStr(hexCharCodeStr) {
          　　var trimedStr = hexCharCodeStr.trim();
          　　var rawStr = 
          　　trimedStr.substr(0,2).toLowerCase() === "0x"
          　　? 
          　　trimedStr.substr(2) 
          　　: 
          　　trimedStr;
          　　var len = rawStr.length;
          　　if(len % 2 !== 0) {
          　　　　alert("Illegal Format ASCII Code!");
          　　　　return "";
          　　}
          　　var curCharCode;
          　　var resultStr = [];
          　　for(var i = 0; i < len;i = i + 2) {
          　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
          　　　　resultStr.push(String.fromCharCode(curCharCode));
          　　}
          　　return resultStr.join("");
          }
        wx.onBLECharacteristicValueChange((res)=>{
  console.log("16进制转成中文字符串哦",(ab2hex(res.value)));
             var newvalue=ab2hex(res.value);
             console.log("aaaaaaa",newvalue);//38
             var bb=newvalue.slice(0,2);//le
             console.log(bb,"要我转成2进制呦",parseInt('bb',16).toString(2))
             var heightya= parseInt(newvalue.slice(2,6),16);//转成10进制
             var highpressure=parseInt(heightya/256);//除以256获取高压
             console.log("高压",heightya,newvalue.slice(2,6));
             console.log("高压最终值",highpressure);
             that.setData({
              highpressure:highpressure,
             })
             that.data.highpressure=highpressure;


             
             var lowya=parseInt(newvalue.slice(6,10),16);//转成10进制
             var lowpressure=parseInt(lowya/256);//除以256获取低压
             console.log("低压",lowya,newvalue.slice(6,10));
             console.log("低压最终值",lowpressure);
             that.setData({
              lowpressure:lowpressure,
             })
             that.data.lowpressure=lowpressure;


             var mb=newvalue.slice(28,32);//截取脉搏
             console.log("脉搏",mb);
             var num1=mb.slice(0,2);//截取脉搏前两位
             var num2=mb.slice(2,4);//截取脉搏后两位
             var allnum="";
             if(num1>num2){   //判断前两位与后两位，低位在前
             allnum=parseInt((num2+num1),16);//拼接好的脉搏转成10进制
             that.setData({
              pulse:allnum,
             })
             that.data.pulse=allnum;
             }else if(num1<num2){
               allnum=parseInt((num1+num2),16);
               that.setData({
                pulse:allnum,
               })
               that.data.pulse=allnum;
             }
        })
      },
      fail(err){
        console.log(err)
      }

})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    wx.startPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 页面初次渲染完成后每个1s进行刷新
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