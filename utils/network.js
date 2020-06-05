const host ="https://wldpvc.com/api/v2.1"
// 请求数据
function requestData(fenlei){
 return new Promise(function(resolve,reject){
   wx.request({
     url: host+'/ltzs',
     method:'POST',
     data:{
       fenlei
     },
     success(data){
       resolve(data)
     },
     fail(err){
       reject(err)
     }
   })
 })
}
// 发布
function uploadRelease (title,zb_dwfrl,zb_liu,zb_gwfrl,zb_hfen,zb_sf,zb_hfa,cpjs,kc,jg,guige,name,gydz,phone,cp_img,cphy_img){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host+"/fblt",
      method:'POST',
      data:{
        title,zb_dwfrl,zb_liu,zb_gwfrl,zb_hfen,zb_sf,zb_hfa,cpjs,kc,jg,guige,name,gydz,phone,cp_img,cphy_img
      },
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
// 发送验证
function sendverification(phone){
  return new Promise(function(resolve,reject){
    wx.request({
      url: "https://wldpvc.com/api/v1/fsyzm",
      method:'POST',
      data:{
        phone
      },
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
// 验证手机验证码
function phoneverification(code,phone,api_token,name){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host+"/sjyz",
      method:'POST',
      data:{
        code,phone,api_token,name
      },
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
// 节流
function throttle (func,deley){
  var timer =null;
  return function(){
    var that=this;
    var args=arguments;
    if(!timer){
      timer =setTimeout(function () {
        func.apply(that,args);
        timer=null;
      },deley)
    }
  }
}
// 详情页
function productDetail  (id){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host+'/xq',
      method:'POST',
      data:{
        id
      },
      success(data){
        resolve(data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
export{uploadRelease,phoneverification,sendverification,throttle,requestData,productDetail}