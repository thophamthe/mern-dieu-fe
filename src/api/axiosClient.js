import axios from "axios"
import { checkTimeOut } from "../utils/checkToken";
import userapi from "./userapi";
const axiosClient= axios.create({
    baseURL:"http://localhost:4000/api",// https://mern-dieu-be-production.up.railway.app/api
    headers:{
        "Content-type": "application/json; charset=UTF-8",
        "token": localStorage.getItem('token'),
        "refreshtoken": localStorage.getItem('refreshtoken')
    }
});


// lần đầu req nội dung token chưa được lấy
axiosClient.interceptors.request.use( async function (config) {
    // Do something before request is sent
    if(checkTimeOut()< 1000){
      console.log(checkTimeOut())
      let res= await userapi.newtoken();
      if(res){
        await localStorage.setItem('token', res.token)
        await localStorage.setItem('refreshtoken', res.refreshtoken)
 
      }   
    }
    return config;
  }, function (error) {

    return Promise.reject(error);
  });

axiosClient.interceptors.response.use(function (response) {

    return response.data;
  }, function (error) {

    return Promise.reject(error);
  });

export default axiosClient
