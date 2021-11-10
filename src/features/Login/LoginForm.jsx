import { Box, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';
import { Link } from 'react-router-dom';
import { createRef} from 'react';
import { useDispatch } from 'react-redux';
import { login} from './Loginslice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect,useState} from 'react';
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
        marginBottom:theme.spacing(2),
        width:theme.spacing(50),
    },
    form:{
        padding:theme.spacing(3),
        display:'flex',
        justifyContent:'center',
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
}))
 export function LoginForm(props){
     const classes = useStyle();
     let username = createRef(null);
     let password= createRef(null)
     const dispatch= useDispatch()
     const handlesubmit=()=>{
         const user= {
             username: username.current.value,
             password: password.current.value
         }
       dispatch(login(user))
     }
     const [open, setOpen] = useState(false);

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
    const handleSubmit=()=>{
        
    var formData = new FormData()
    let newName= usernameSM.current.value+Date.now()+".jpg"
    formData.append("username", usernameSM.current.value);
    formData.append("password", passwordSM.current.value);
    formData.append("fullname", name.current.value);
    formData.append("from",from.current.value);
    formData.append("gmail", gmail.current.value);
    formData.append("phonenumber", phone.current.value);
    formData.append("urlimg",urlimg.current.files[0],newName);
    console.log(newName)
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
               <Typography className={classes.title}>Đăng nhập</Typography>
               <Box>
               <TextField className={classes.forminput} autoFocus inputRef={username} label="Tài khoản" variant="outlined" />
               </Box>
               <Box>
               <TextField className={classes.forminput} type={'password'} inputRef={password} label="Mật khẩu" variant="outlined" />
               </Box>
               
               <Button  variant="contained" color="primary" onClick={handlesubmit}>Login</Button>
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
                    <Button onClick={handleSubmit} >Hoàn thành</Button>
                    </DialogActions>
                </Dialog>
               </Box>
           </Paper>
        </Box>
    )
 }