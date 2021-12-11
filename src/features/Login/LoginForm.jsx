import { Box, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';

import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createRef} from 'react';
import { useDispatch } from 'react-redux';
import { login} from './Loginslice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react';
import userapi from '../../api/userapi';
const useStyle = makeStyles((theme)=>({
    root:{
        display: 'flex',
        justifyContent:'center',
        marginTop:theme.spacing(10)
    },
    title:{
        marginBottom:theme.spacing(2),
        textAlign:'center',
        fontSize:theme.spacing(3)
    },
    forminput:{
        marginTop:theme.spacing(1),
        width:theme.spacing(50),
    },
    form:{
        padding:theme.spacing(3),
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        flexFlow:'column nowrap',
        borderRadius:theme.spacing(2)
    },
    icon:{
        fontSize:theme.spacing(5)
    },
    listlink: {
        marginTop:theme.spacing(1),
        display:'flex',
        justifyContent:'center',
        flexFlow:'row nowrap'
    },
    formupdate:{
        
        width:'30rem',
        backgroundColor:'white',
        padding: theme.spacing(1,1),
        borderRadius:'0.5rem',
        display:'flex',
        justifyContent:'center',
        flexFlow:'column nowrap'
    },
    styleinput:{
        marginBottom:theme.spacing(2),
        fontSize:theme.spacing(3)
    },
    texterror:{
        color:"red",
        margin:"2px 0px",
        fontSize:"12px",
        paddingLeft:theme.spacing(1)
    },
    styleinputsubmit:{
        marginTop:theme.spacing(1),
        width:"100%",

    }
}))
const schema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập username")
      .max(50, "username tối đa 50 ký tự"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(4, "mật khẩu tối thiểu ký tự")
  });
 export function LoginForm(props){
     const classes = useStyle();
     const dispatch= useDispatch()
     const onLoginSubmit=(data)=>{
         const user= {
             username: data.username,
             password: data.password
         }
         if(user.username, user.password){
             console.log(user)
            dispatch(login(user))
         }
      
       
     }
     const [open, setOpen] = useState(false);
     const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm({ resolver: yupResolver(schema)});
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    let usernameSM = React.createRef(null);// trong form tạo mới người dùng, khác cái kia login
    let passwordSM = React.createRef(null);
    let name = React.createRef(null);
    let from = React.createRef(null);
    let gmail = React.createRef(null);
    let phone = React.createRef(null);
    let urlimg = React.createRef(null);
    const handleNewuser=()=>{
        
    var formData = new FormData()
    let newName= usernameSM.current.value+Date.now()+".jpg"
    formData.append("username", usernameSM.current.value);
    formData.append("password", passwordSM.current.value);
    formData.append("fullname", name.current.value);
    formData.append("from",from.current.value);
    formData.append("gmail", gmail.current.value);
    formData.append("phonenumber", phone.current.value);
    formData.append("urlimg",urlimg.current.files[0],newName);

    userapi.newuser(formData).then((res)=>{
        if(res.success){
            alert(res.msg)
            setOpen(false);
        }else{
            alert(res.msg)
        }
    }).catch(function (error) {

         
    })
    }
 
    return(
        <Box   className= {classes.root}>
           <Paper className={classes.form}  elevation={3}>
               <form onSubmit={handleSubmit(onLoginSubmit)}>
               <Typography className={classes.title}>Đăng nhập</Typography>
               <Box>
               <TextField className={classes.forminput} autoFocus {...register("username")} label="Tài khoản" variant="outlined" />
               </Box>
               {errors.username?<Typography className={classes.texterror}>{errors.username.message}</Typography>:<Typography></Typography>}
               <Box>
               <TextField className={classes.forminput} type={'password'} {...register("password")} label="Mật khẩu" variant="outlined" />
               </Box>
              
               {errors.password?<Typography className={classes.texterror}>{errors.password.message}</Typography>:<Typography></Typography>}
               <Button className={classes.styleinputsubmit} variant="contained" color="primary" type="submit" onClick={onLoginSubmit}>login</Button>
               </form>
               
               <Box className={classes.listlink}>
                     <Button  color="primary" onClick={handleOpen}>Bạn chưa có tài khoản</Button>
                    <Dialog open={open} onClose={handleClose}>
                    <DialogTitle variant="h5" align="center">Tạo tài khoản</DialogTitle>
                    <DialogContent>
                    <DialogContentText align="center">
                       Xin hãy điền đầy đủ thông tin
                    </DialogContentText>
                    <form className={classes.formupdate} encType="multipart/form-data" method="post">
                        <TextField inputRef={usernameSM} autoFocus variant="outlined"  className={classes.styleinput} label="Tài khoản"/>
                        <TextField inputRef={passwordSM} variant="outlined" type={'password'} className={classes.styleinput} label="Mật khẩu"/>
                        <TextField inputRef={name} variant="outlined"  className={classes.styleinput} label="Họ Tên"/>
                        <TextField inputRef={from} variant="outlined" className={classes.styleinput} label="Địa chỉ" />
                        <TextField inputRef={gmail} variant="outlined" className={classes.styleinput} label="Gmail"  />
                        <TextField inputRef={phone} variant="outlined" className={classes.styleinput} label="Số điện thoại" />
                        <Box style={{display: "flex"}}>
                            <Typography>Ảnh đại diện</Typography>
                            <input
                                accept="image/*"
                                type="file"
                                ref={urlimg}
                            />
                            
                        </Box>
                        
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleNewuser} >Hoàn thành</Button>
                    </DialogActions>
                </Dialog>
               </Box>
           </Paper>
        </Box>
    )
 }