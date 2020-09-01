import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
import {BASE_URL,TYPE} from '../config/index'

export const reqLogin = (username,password) => myAxios.post(`${BASE_URL}/login`,{username,password})
// 获取商品列表
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/manage/category/list`)
// 获取天气信息
export const reqWeather = ()=> {
  // return new Promise((resolve,reject)=>{
    // http://v.juhe.cn/weather/index?cityname=${CITY}&dtype=&format=&key=${WHEATHER_AK}
    jsonp(`https://v1.alapi.cn/api/shici?${TYPE}`,{timeout:2000},(err,data)=>{
      if(err){
        message.error('请求接口失败')
        console.log(err);
        return new Promise(()=>{})
      }else{
        console.log(data);
        // const {city,temperature,weather,wind} = data.result.today
        // console.log(city,temperature,weather,wind);
        // let weatherObj = {city,temperature,weather,wind}
        // resolve(weatherObj)
      }
    })
  // })
}

