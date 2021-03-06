import { Box, Button, makeStyles, Typography ,Modal, LinearProgress} from '@material-ui/core';
import {  useDispatch, useSelector } from 'react-redux';
import { useEffect,useState,useCallback} from 'react';
import { getdatabookforuser, selectdatauser, selectlistbook,selectLoading,updateuser,topup } from '../Login/Loginslice';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import { TextField } from '@material-ui/core';
import { formatIMG } from '../../utils/formatIMG';

import userapi from '../../api/userapi'
import { SlideItemBook } from '../../component/common/SlideItemBook';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Createbook } from '../createbook/CreateBook';
import PaymentIcon from '@mui/icons-material/Payment';
import BookIcon from '@mui/icons-material/Book';
const useStyle =  makeStyles((theme)=>({
    root:{
        display:'grid',
        gridTemplateColumns:'12rem 1fr',
        gridTemplateRows:'12rem 10rem ',
        gridTemplateAreas:'"avatar profile" "book book" ',
        
    },
    avatar:{
        gridArea:'avatar',
        display:'flex',
        justifyContent:'center',
        overflow:'hidden',
        '&>img':{
            width:'12rem',
            height:'12rem'
        }
    },
    profile:{
        gridArea:'profile',
        padding:theme.spacing(1,1),
        display:'grid',
        gridTemplateColumns:'10rem 1fr 10rem',
        gridTemplateRows:'auto',
        gridTemplateAreas:'"variable value" ',
        backgroundColor: theme.palette.background.paper,
    },
    variable:{
        gridArea:'variable',
        backgroundColor: theme.palette.background.paper,
    },
    value:{
        gridArea:'value',
    },
    
    
    styletext:{
        fontSize:theme.spacing(2.5)
    },
    btnedit:{
        width:'10rem',
        height:'2rem',
    
        marginBottom:'2px',
        borderRadius:'5px',
        
    },
    book:{
        gridArea:'book',
        fontSize:'2rem',
       
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleinput:{
        marginBottom:theme.spacing(3),
        fontSize:theme.spacing(3)
    },
    formupdate:{
        
        width:'30rem',
        backgroundColor:'white',
        padding: theme.spacing(1,2),
        borderRadius:'0.5rem',
        display:'flex',
        justifyContent:'center',
        flexFlow:'column nowrap'
    },
    heading:{
        fontSize:theme.spacing(3),
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(1)
    }
}))


 export function Account(props){
    const dispatch= useDispatch();
     const classes= useStyle(); 
     const user=useSelector(selectdatauser)
     const listbook =useSelector(selectlistbook)
     const loading = useSelector(selectLoading)
     const [open, setOpen] = React.useState(false);
     
     useEffect(()=>{
        dispatch(getdatabookforuser())
     },[dispatch])
  const handleOpenEP = () => {
    setOpen(true);
  };

  const handleCloseEP = () => {
      setOpen(false);
   
  };
  const [openEB, setOpenEB] = useState(false);

    const handleOpenEB = () => {
      setOpenEB(true);
    };
  
    const handleCloseEB = () => {
      setOpenEB(false);
    };
    const [openPay, setOpenPay] = React.useState(false);

  const handleOpenPay = () => {
    setOpenPay(true);
  };

  const handleClosePay = () => {
    setOpenPay(false);
  };
  let name = React.createRef(null);
  let from = React.createRef(null);
  let gmail = React.createRef(null);
  let phone = React.createRef(null);
  let urlimg = useState(null);
  let pay = React.createRef(null);
  const HandleUpdate=()=>{
      // ????n gi???n l?? update n??n k c???n saga g???i lu??n api
     
    setOpen(false);
    var formData = new FormData()
    let newName= `${user.username + Date.now()+''}.jpg`
    formData.append("fullname", name.current.value);
    formData.append("from",from.current.value);
    formData.append("gmail", gmail.current.value);
    formData.append("phonenumber", phone.current.value);
    formData.append("urlimg",urlimg.current.files[0],newName);
    
  
    let dataupdateSilce={
        fullname:name.current.value,
        from:from.current.value,
        gmail:gmail.current.value,
        phonenumber: phone.current.value,
        urlimg: `avata/${newName}`
      }
      console.log(dataupdateSilce.urlimg)
    userapi.updateuer(formData).then((res)=>{
        
        
          dispatch(updateuser(dataupdateSilce))
       
    }).catch(function (error) {

         
    })
    
}
const handleSubmitPay=()=>{

    userapi.topup({money:pay.current.value}).then((res)=>{
        let newMoney= Number(user.price)+Number(pay.current.value)
        dispatch(topup(newMoney))
        setOpenPay(false);
    }).catch(function (error) {
        alert("l???i n???p ti???n")
         
    })
}

  const formupdate = (
    <form className={classes.formupdate} encType="multipart/form-data" method="post">
                <Typography variant="h5" align="center" >S???a th??ng tin</Typography>
            <TextField inputRef={name} defaultValue={user.fullname} className={classes.styleinput} label="H??? T??n"/>
            <TextField inputRef={from} defaultValue={user.from} className={classes.styleinput} label="?????a ch???" />
            <TextField inputRef={gmail} defaultValue={user.gmail} className={classes.styleinput} label="Gmail"  />
            <TextField inputRef={phone} defaultValue={user.phonenumber} className={classes.styleinput} label="S??? ??i???n tho???i" />
            <Box style={{display: "flex"}}>
                <Typography>???nh ?????i di???n</Typography>
                <input
                    accept="image/*"
                    type="file"
                    ref={urlimg}
                />
                
            </Box>
            <Button onClick={HandleUpdate} sx={{ width: 1/4 }}   color="primary" size='large'>
                C???p nh???t
            </Button>
     </form>
  );
  const renderDatabook=(listbook)=>{
      if(loading){
         
         return(
            <LinearProgress/>
         )
      }else{
          return(
            <Box className={classes.book}>
            <Typography className={classes.heading} variant="h4"  component="h2">S??ch ???? vi???t</Typography>
                <SlideItemBook data={listbook.bookforsale}/>
            <Typography className={classes.heading} variant="h4"  component="h2">S??ch ???? mua</Typography>
                <SlideItemBook data={listbook.purchasedbook}/>
            </Box>
          )
      }
  }
  const shopImg=useCallback(
      (url) => {
         return  <img alt="img" src={formatIMG(url)} />
      },
      [user.urlimg]
  )
  const showAccount=()=>{
      if(user,listbook){
          
          return (
            <Box className={classes.root} >
            <Box className={classes.avatar} >
               { shopImg(user.urlimg)}
            </Box>
          <Box className={classes.profile}>
              <Box className={classes.variable} >
                  <Typography className={classes.styletext}  component="h5">H??? T??n</Typography>
                  <Typography  className={classes.styletext} component="h5">?????a ch???</Typography>
                  <Typography  className={classes.styletext} component="h5">Gmail</Typography>
                  <Typography  className={classes.styletext} component="h5">S??? ??i???n tho???i</Typography>
                  <Typography  className={classes.styletext} component="h5">S??? ti???n</Typography>
              </Box>
              <Box className={classes.value}>
              <Typography  className={classes.styletext} component="h5">{user.fullname}</Typography>
                  <Typography  className={classes.styletext} component="h5">{user.from}</Typography>
                  <Typography  className={classes.styletext} component="h5">{user.gmail}</Typography>
                  <Typography  className={classes.styletext} component="h5">{user.phonenumber}</Typography>
                  <Typography  className={classes.styletext} component="h5">{user.price}VN??</Typography>
              </Box>
              <Box>
              <Button color="primary" variant="outlined" className={classes.btnedit}  onClick={handleOpenEP}>  <PersonIcon /> Edit profile</Button>
              <Modal
               className={classes.modal}
                  open={open}
                  onClose={handleCloseEP}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
              >
                  {formupdate}
              </Modal>
              <Button color="primary" variant="outlined" className={classes.btnedit}  onClick={handleOpenEB}>  <BookIcon /> Write Book</Button>
              <Dialog open={openEB} onClose={handleCloseEB}>
                    <DialogContent>
                        <Createbook/>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEB}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Button color="primary" variant="outlined" className={classes.btnedit}  onClick={handleOpenPay}>  <PaymentIcon /> Pay</Button>
                <Dialog open={openPay} onClose={handleClosePay}>
                    <DialogTitle>N???p ti???n</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                       Xin nh???p s??? ti???n c???n n???p, ????n v??? VN??
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pay"
                        label="S??? ti???n - VN??"
                        type="number"
                        fullWidth
                        variant="standard"
                        inputRef={pay}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClosePay}>Cancel</Button>
                    <Button onClick={handleSubmitPay}>Thanh to??n</Button>
                    </DialogActions>
                </Dialog>

            </Box>
              
             
          </Box>
          
                 {renderDatabook(listbook)}
        </Box>
        )
      } else{
          return(
              <Box>
                  b???n ch??a ????ng nh???p
              </Box>
          )
      }
  }
    return(
        <Box>
             {showAccount}
        </Box>
       
    )
 }