import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { TextField } from '@material-ui/core';
import bookapi from '../../api/bookapi';
import { history } from '../../utils';
import { useSelector } from 'react-redux';
import { selectusername } from '../Login/Loginslice';
//nay đau đầu, mai style sau cái giao diện
const useStyle = makeStyles((theme)=>({
   styleinput:{
       marginTop:theme.spacing(2)
   },
   styleuploadfile:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    display:'flex'
   }
    
}))
export function Createbook(props){

    const classes = useStyle();

    


    let namebook = React.createRef(null);
  let pricebook = React.createRef(null);
  let chaptertotal = React.createRef(null);
  let description = React.createRef(null);
  let urlimg = React.createRef(null);
  const username= useSelector(selectusername)
  let str=username+Date.now()   
const HandleSubmit=()=>{
     
    const idbook=str;
    let newName= username+Date.now()+".jpg"
    var formData = new FormData()
    console.log(idbook)
    formData.append("idbook", idbook);
    formData.append("namebook", namebook.current.value);
    formData.append("pricebook",pricebook.current.value);
    formData.append("chaptertotal", chaptertotal.current.value);
    formData.append("description", description.current.value,);
    formData.append("urlimg",urlimg.current.files[0],newName);
    console.log(idbook)
    bookapi.createbook(formData).then((res)=>{
      if((res.result).toString()=="ok"){
        alert("bạn đã tạo sách thành công")
         history.push("/bookdetail/"+idbook)
      }else{
          // handleError
          // dùng react toastify
      }
       
    }).catch(function (error) {

        console.log(error);
    })
}
//ủa, có mỗi feature đơn giản thì cần gì slice với saga nhỉ :v
//hồi hộp quá, xem mấy lỗi
    return(
        <Box className= {classes.root} >
            <Typography variant="h4" align="center" component="h2">Thêm sách</Typography>
            <form className={classes.formCreate} encType="multipart/form-data" method="post">
            <TextField fullWidth  inputRef={namebook} label="Outlined" variant="outlined"  className={classes.styleinput} label="Tên sách"/>
            <TextField fullWidth inputRef={pricebook} className={classes.styleinput}   label="Outlined" variant="outlined" label="Giá sách" />
            <TextField  fullWidth inputRef={chaptertotal} className={classes.styleinput}  label="Outlined" variant="outlined" label="Tổng số chương"  />
            <TextField fullWidth  inputRef={description} className={classes.styleinput}  label="Outlined" variant="outlined" label="Mô tả"  />
            <Box className={classes.styleuploadfile}>
                <Typography>Ảnh bìa sách</Typography>
                <input
                    accept="image/*"
                    type="file"
                    ref={urlimg}

                />
                
            </Box>
            <Button fullWidth align="center" onClick={HandleSubmit}  variant="contained" color="primary" >
                Tạo
            </Button>
            </form>
        </Box>
    )
}