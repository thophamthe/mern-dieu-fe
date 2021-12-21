import axios from "axios"
import { checkTimeOut } from "../utils/checkToken";
import userapi from "./userapi";

import jwt from 'jsonwebtoken';
const axiosClient= axios.create({
    baseURL:" https://mern-dieu-be-production.up.railway.app/api",// https://mern-dieu-be-production.up.railway.app/api
    headers:{
        "Content-type": "application/json; charset=UTF-8",
        "token": localStorage.getItem('token'),
        "refreshtoken": localStorage.getItem('refreshtoken')
    }
});


// lần đầu req nội dung token chưa được lấy
axiosClient.interceptors.request.use(  function (config) {
    // Do something before request is sent
    /*
    let time = checkTimeOut()| 0;
    if(time< 1000){
      console.log(checkTimeOut())
      let res=  userapi.newtoken();
      if(res){
          console.log("đã check token")
         localStorage.setItem('token', res.token)
         localStorage.setItem('refreshtoken', res.refreshtoken)
 
      }   
    }*/
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
