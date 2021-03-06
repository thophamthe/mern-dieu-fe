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
    // n?? c???nh b??o b???o b??? [] ??i, m?? b??? c?? m?? n?? dispatch li??n t???c ??, th??m dispatch v??o th?? n?? ng??o, ??o???n n??y b???t ?????c d?? :(
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
        // ????n gi???n l?? update n??n k c???n saga g???i lu??n api
      setOpen(false);
      if(result>=0){
          bookapi.buybook(databook.idbook).then(res =>{
              if(res.result){
                handleClose();
               // buy book tr??? ti???n
               dispatch(afterbuy(databook.pricebook))
               history.push(`/readbook/${databook.idbook}?chapter=1`)
               //bug k truy???n query ???????c, d?? search r???i
              }else{
                  //l???i mua s??ch
              }
          })
      }else{
          alert("b???n kh??ng ????? ti???n")
      }
      
  
    }

    const pay=()=> {
        
        if(result>=0){
            return result.toString() + "VN??"
        }else return "b???n kh??ng ????? ti???n"
    } 
    const notification = (
      <form className={classes.notification} encType="multipart/form-data" method="post">
             <Box className={classes.contentNotific}>
                 <Typography variant="h5" color='secondary' align='center'>B???n mu???n mua s??ch n??y ?</Typography>
                 <Typography variant='subtitle1' color='primary' >Thanh to??n</Typography>
                 <Typography variant='subtitle2' color='primary' >
                     {priceForUser} - {databook.pricebook} = {pay()}
                 </Typography>
                
             </Box>
             <Box className={classes.buttonNotific}>
             <Button onClick={HandleBuy} className={classes.stylebutton} color="primary"   variant="outlined"  >
                  Mua
              </Button>
              <Button onClick={handleCloseBuy} className={classes.stylebutton} color="secondary"    >
                  Tho??t
              </Button>
             </Box>
              
       </form>
    );

    const showbookdetail=()=>{
        // ch??n l???m c??i ??o???n n??y, reponsive l???i n???u t??n s??ch qu?? d??i
        if(!loading){
            let status = null
            if(databook.chaptertotal>databook.chapternumber){
                status="??ang c???p nh???t"
            }else{
                status="???? ho??n th??nh"
            }
            return(
                <Box className={classes.root}>
                   <Box className={classes.image}>
                    <img alt="img" src={formatIMG(databook.urlimg)} />
                   </Box>
                   <Box className={classes.content}>    

                        <Box className={classes.variable} >
                        <Typography className={classes.styletext}  component="h5">T??n s??ch</Typography>
                        <Typography  className={classes.styletext} component="h5">Tr???ng th??i</Typography>
                        <Typography  className={classes.styletext} component="h5">S??? ch????ng</Typography>
                        <Typography  className={classes.styletext} component="h5">T???ng s??? ch????ng</Typography>
                        <Typography  className={classes.styletext} component="h5">Gi?? ti???n</Typography>
                    </Box>
                    <Box className={classes.value}>
                    <Typography  className={classes.styletext} component="h5">{databook.namebook}</Typography>
                        <Typography  className={classes.styletext} component="h5">{status}</Typography>
                        <Typography  className={classes.styletext} component="h5">{databook.chapternumber}</Typography>
                        <Typography  className={classes.styletext} component="h5">{databook.chaptertotal}</Typography>
                        <Typography  className={classes.styletext} component="h5">{databook.pricebook}VN??</Typography>
                    </Box>
                    <Box className={classes.listbutton}>
                        <Button className={classes.stylebutton} variant="outlined" color="secondary" onClick={handleCheck} >
                             ?????c s??ch &nbsp;
                             {open && <CircularProgress size={15} color="secondary" />}
                        </Button> 
                        &nbsp;
                        {databook.status?<Link to={"/editchap/"+databook.idbook}><Button className={classes.stylebutton} variant="outlined" color="primary">Edit Chap &nbsp;</Button></Link>:null}
                        {databook.status?<Button className={classes.stylebutton} onClick={handleClickOpenEB} variant="outlined" color="primary">Edit Book &nbsp;</Button>:null}
                        <Dialog open={openEB} onClose={handleClose}>
                            <DialogTitle>C???p nh???t s??ch</DialogTitle>
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
                       <Typography className={classes.textdes}>M?? T???</Typography>
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