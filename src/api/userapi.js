
import axiosClient from "./axiosClient";

const userapi={
    newuser(datares){
        const url= '/user/newuser';
        return axiosClient.post(url,datares);
    },
    login(data){
        const url= '/auth/login';
        return axiosClient.post(url,data);
    },
    loginWtoken(){
        const url= '/auth/loginWtoken';
        return axiosClient.get(url);
    },
    getdatabookforuser(){
        const url='/user/getdatauser';
        return axiosClient.get(url)
    },
    updateuer(data){
        const url='/user/updateuser';
        
        return axiosClient.post(url,data);
    },
    topup(data){
        const url='/pay/topup';
        
        return axiosClient.post(url,data);
    },
    newtoken(){
        const url='/auth/newtoken';
        
        return axiosClient.get(url);
    }
}
export default userapi;