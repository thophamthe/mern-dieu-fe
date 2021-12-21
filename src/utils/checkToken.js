import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const key= "$2a$10$rxYA4Ec/eVWFNrUuzOI1COxNeUt0D9Hdq5LVwlrJR7pls7fvTUGYe"
//k hiểu sao nó lỗi config dotenv , k đọc được, k nên làm thế này nhưng đây là hạ sách, test 
export const checkTimeOut= async()=>{
    try{
        await jwt.verify(localStorage.getItem("token"),key,(err,doc)=>{
      
          //  console.log(process.env.ACCESS_TOKEN)
              if(err) throw err
              let time = doc.exp *1000 -  Date.now()
              console.log(time)
              return time
          })
    }
    catch (err){

    }
}