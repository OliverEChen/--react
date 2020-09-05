import myAxios from './myAxios'
// import jsonp from 'jsonp'
// import {message} from 'antd'
import {BASE_URL} from '../config/index'

export const reqLogin = (username,password) => myAxios.post(`${BASE_URL}/login`,{username,password})
// 获取商品列表
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/manage/category/list`)
// 获取天气信息
export const reqWeather = ()=> {
  // return new Promise((resolve,reject)=>{ 
  //   jsonp(`http://v.juhe.cn/weather/index?cityname=${CITY}&dtype=&format=&key=${WHEATHER_AK}`,{timeout:2000},(err,data)=>{
  //     if(err){
  //       // message.error('请求接口失败')
  //       console.log(err);
  //       return new Promise(()=>{})
  //     }else{
  //       console.log(data);
  //       // const {city,temperature,weather,wind} = data.result.today
  //       // console.log(city,temperature,weather,wind);
  //       // let weatherObj = {city,temperature,weather,wind}
  //       // resolve(weatherObj)
  //     }
  //   })
  // })
}
//新增商品的分类
export const reqAddCategory = ({categoryName}) => myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更新商品分类
export const reqUpdateCategory = ({categoryName,categoryId}) => myAxios.post(`${BASE_URL}/manage/category/update`,{categoryName,categoryId})
//请求商品分页列表
export const reqProductList = (pageNum,pageSize)=> myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//请求更新商品在售状态
export const reqUpdateProdStatus = (productId,status) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})
//搜索商品
export const reqsearchProduct = (pageNum,pageSize,searchType,keyword) => myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyword}})
//获取商品详细信息
export const reqProductById = (productId)=> myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
//根据图片唯一名删除图片
export const reqDeletePicture = (name) => myAxios.post(`${BASE_URL}/manage/img/delete`,{name})
//请求添加商品
export const reqAddProduct = (productObj) => myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})
//更新商品
export const reqUpdateProduct = (productObj) => myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj})
//请求角色列表
export const reqRoleList = ()=> myAxios.get(`${BASE_URL}/manage/role/list`)
//请求添加角色列表
export const reqAddRole = ({roleName})=> myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})
//请求设置角色权限
export const reqAuthRole = (roleObj)=> myAxios.post(`${BASE_URL}/manage/role/update`,{...roleObj,auth_time:Date.now()})
//请求添加用户
export const reqAddUser = (addUserObj)=> myAxios.post(`${BASE_URL}/manage/user/add`,{...addUserObj,auth_time:Date.now()})
//请求更新用户
export const reqUpdateUser = (updateUserObj)=> myAxios.post(`${BASE_URL}/manage/user/update`,{...updateUserObj,auth_time:Date.now()})
// 请求用户列表
export const reqUserList = ()=> myAxios.get(`${BASE_URL}/manage/user/list`)
// 请求删除用户
export const reqDeleteUser = (userId)=> myAxios.post(`${BASE_URL}/manage/user/delete`,{userId})





