import { Box, Button, CircularProgress, Modal, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getdatabook, selectdatabook, selectLoading } from './bookdetailSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState,useCallback } from 'react';
import { formatIMG } from '../../utils/formatIMG';
import bookapi from '../../api/bookapi';
import { selectdatauser,afterbuy } from '../Login/Loginslice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Updatebook } from '../updatebook/Updatebook';

const useStyles= makeStyles((theme)=>({
    root:{
        display:'grid',
        gridTemplateColumns:'12rem 1fr',
        gridTemplateRows:'18rem auto ',
        gridTemplateAreas:'"image content" "description description"'
    },
    image:{
        gridArea:'image',
        display:'flex',
        justifyContent:'center',
        
        overflow:'hidden',
        '&>img':{
           
            objectFit: 'cover',
        }
    },
    content:{
        backgroundColor: theme.palette.background.paper,
        gridArea:'content',
        padding:theme.spacing(1,1),
        display:'grid',
        gridTemplateColumns:'12rem 1fr',
        gridTemplateRows:'14rem auto',
        gridTemplateAreas:'"variable value" "listbutton listbutton" ',
    },
    styletext:{
        fontSize:theme.spacing(2.5),
        marginBottom:theme.spacing(1),
        paddingLeft:theme.spacing(2),
        maxWidth: '55rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',

    },
    variable:{
        gridArea:'variable',
        backgroundColor: theme.palette.background.paper,
    },
    value:{
        gridArea:'value',
    },
    description:{
        backgroundColor: theme.palette.background.paper,
        gridArea:'description',
        margin:theme.spacing(3,0),
        padding:theme.spacing(1,1),
        maxHeight:theme.spacing(50),
        overflow:'scroll',
        overflowX:'hidden',
        '&::-webkit-scrollbar':{
            width: '5px'
        },
        '&::-webkit-scrollbar-track':{
            boxShadow:  'inset 0 0 6px grey',
            borderRadius: '2rem',
        },
        '&::-webkit-scrollbar-thumb':{
            backgroundColor: '#EE82EE',
            borderRadius:'2rem'
        }
    },
    textdes:{
        fontSize:theme.spacing(4),
        padding:theme.spacing(1,1)
    },
    listbutton:{
        marginTop:theme.spacing(2),
        height:theme.spacing(5),
        gridArea:"listbutton",
        display:'flex'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notification:{
        display:'grid',
        gridTemplateRows:'auto 2rem',
        gridTemplateAreas:'"contentNotific" "buttonNotific"',
        width:'30rem',
        height:'auto',
        backgroundColor:'white',
        padding: theme.spacing(1.5,2),
        borderRadius:'0.5rem',
      
    },
    buttonNotific:{
        gridArea:'buttonNotific'
    },
    stylebutton:{
        width:"8rem",
        height:"2.5rem",
        textDecoration:"none",
        float:'right',
        marginLeft:theme.spacing(2)
    }
}))
 export function Bookdetail(props){
    
    const classes = useStyles()
    const {idbook}= useParams();
    const databook= useSelector(selectdatabook)
    const loading= useSelector(selectLoading)
    const priceForUser = useSelector(selectdatauser).price
    let result = priceForUser - databook.pricebook;
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(getdatabook(idbook))
    },[dispatch])
    // nó cảnh báo bảo bỏ [] đi, mà bỏ có mà nó dispatch liên tục à, thêm dispatch vào thì nó ngáo, đoạn này bất đắc dĩ :(
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleCheck = () => {
        setOpen(!open);
        bookapi.checkReadbook(databook.idbook).then(res=>{
            if(res.result){
               
                history.push("/readbook/"+databook.idbook)

            }
            else{
                handleOpenBuy(); 
            }

        })

    };

    const [openBuy, setOpenBuy] =useState(false);
    const handleOpenBuy = () => {
      setOpenBuy(true);
    };
  
    const handleCloseBuy = () => {
      setOpenBuy(false);
      setOpen(false);
    };
    const [openEB, setOpenEB] = useState(false);

    const handleClickOpenEB = () => {
      setOpenEB(true);
    };
  
    const handleCloseEB = () => {
      setOpenEB(false);
    };
    const HandleBuy=()=>{
        // đơn giản là update nên k cần saga gọi luôn api
      setOpen(false);
      if(result>=0){
          bookapi.buybook(databook.idbook).then(res =>{
              if(res.result){
                handleClose();
               // buy book trừ tiền
               dispatch(afterbuy(databook.pricebook))
               history.push(`/readbook/${databook.idbook}?chapter=1`)
               //bug k truyền query được, dù search rồi
              }else{
                  //lỗi mua sách
              }
          })
      }else{
          alert("bạn không đủ tiền")
      }
      
  
    }

    const pay=()=> {
        
        if(result>=0){
            return result.toString() + "VNĐ"
        }else return "bạn không đủ tiền"
    } 
    const notification = (
      <form className={classes.notification} encType="multipart/form-data" method="post">
             <Box className={classes.contentNotific}>
                 <Typography variant="h5" color='secondary' align='center'>Bạn muốn mua sách này ?</Typography>
                 <Typography variant='subtitle1' color='primary' >Thanh toán</Typography>
                 <Typography variant='subtitle2' color='primary' >
                     {priceForUser} - {databook.pricebook} = {pay()}
                 </Typography>
                
             </Box>
             <Box className={classes.buttonNotific}>
             <Button onClick={HandleBuy} className={classes.stylebutton} color="primary"   variant="outlined"  >
                  Mua
              </Button>
              <Button onClick={handleCloseBuy} className={classes.stylebutton} color="secondary"    >
                  Thoát
              </Button>
             </Box>
              
       </form>
    );

    const showbookdetail=()=>{
        // chán lắm cái đoạn này, reponsive lỗi nếu tên sách quá dài
        if(!loading){
            let status = null
            if(databook.chaptertotal>databook.chapternumber){
                status="Đang cập nhật"
            }else{
                status="Đã hoàn thành"
            }
            return(
                <Box className={classes.root}>
                   <Box className={classes.image}>
                    <img alt="img" src={formatIMG(databook.urlimg)} />
                   </Box>
                   <Box className={classes.content}>    

                        <Box className={classes.variable} >
                        <Typography className={classes.styletext}  component="h5">Tên sách</Typography>
                        <Typography  className={classes.styletext} component="h5">Trạng thái</Typography>
                        <Typography  className={classes.styletext} component="h5">Số chương</Typography>
                        <Typography  className={classes.styletext} component="h5">Tổng số chương</Typography>
                        <Typography  className={classes.styletext} component="h5">Giá tiền</Typography>
                    </Box>
                    <Box className={classes.value}>
                    <Typography  className={classes.styletext} component="h5">{databook.namebook}</Typography>
                        <Typography  className={classes.styletext} component="h5">{status}</Typography>
                        <Typography  className={classes.styletext} component="h5">{databook.chapternumber}</Typography>
                        <Typography  className={classes.styletext} component="h5">{databook.chaptertotal}</Typography>
                        <Typography  className={classes.styletext} component="h5">{databook.pricebook}VNĐ</Typography>
                    </Box>
                    <Box className={classes.listbutton}>
                        <Button className={classes.stylebutton} variant="outlined" color="secondary" onClick={handleCheck} >
                             Đọc sách &nbsp;
                             {open && <CircularProgress size={15} color="secondary" />}
                        </Button> 
                        &nbsp;
                        {databook.status?<Link to={"/editchap/"+databook.idbook}><Button className={classes.stylebutton} variant="outlined" color="primary">Edit Chap &nbsp;</Button></Link>:null}
                        {databook.status?<Button className={classes.stylebutton} onClick={handleClickOpenEB} variant="outlined" color="primary">Edit Book &nbsp;</Button>:null}
                        <Dialog open={openEB} onClose={handleClose}>
                            <DialogTitle>Cập nhật sách</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                {databook.namebook}
                            </DialogContentText>
                                <Updatebook databook={databook}/>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleCloseEB}>Cancel</Button>
                            
                            </DialogActions>
                        </Dialog>
                        <Modal
                        className={classes.modal}
                            open={openBuy}
                            onClose={handleCloseBuy}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {notification}
                        </Modal>
                       
                    </Box>
                   </Box>
                   <Box className={classes.description}>
                       <Typography className={classes.textdes}>Mô Tả</Typography>
                       <Typography>
                           {databook.description}
                       </Typography>
                   </Box>
                </Box>
            )
        }else{
            return(
                <>
                    <LinearProgress/>
                   
                </>
                
            )
        }
    }
    return(
        <Box >
             {showbookdetail}
        </Box>
    )
 }