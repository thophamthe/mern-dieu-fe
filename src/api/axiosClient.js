import axios from "axios"
const axiosClient= axios.create({
    baseURL:"https://mern-dieu-be-production.up.railway.app//api",
    headers:{
        "Content-type": "application/json; charset=UTF-8",
        "token": localStorage.getItem('token')
    }
});


// lần đầu req nội dung token chưa được lấy
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
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
