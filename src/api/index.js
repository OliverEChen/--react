import myAxios from './myAxios'
import {BASE_URL} from '../config/index'

export const reqLogin = (username,password) => myAxios.post(`${BASE_URL}/login`,{username,password})
