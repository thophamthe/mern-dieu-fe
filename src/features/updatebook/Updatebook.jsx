import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { TextField } from '@material-ui/core';
import bookapi from '../../api/bookapi';

import { useSelector ,useDispatch} from 'react-redux';
import { selectusername } from '../Login/Loginslice';
import { updatebook } from '../bookdetail/bookdetailSlice';
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
export function Updatebook(props){

    const classes = useStyle();
    const databook= props.databook
    const dispatch= useDispatch();
    console.log(databook)

    let namebook = React.createRef(null);
  let pricebook = React.createRef(null);
  let chaptertotal = React.createRef(null);
  let description = React.createRef(null);
  let urlimg = React.createRef(null);
  const username= useSelector(selectusername)
    
const HandleSubmit=()=>{
    var formData = new FormData()
    let newName= `${username + Date.now()+''}.jpg`
    formData.append("namebook", namebook.current.value);
    formData.append("pricebook",Number(pricebook.current.value));
    formData.append("chaptertotal", Number(chaptertotal.current.value));
    formData.append("description", description.current.value,);
    formData.append("urlimg",urlimg.current.files[0],newName);
   console.log(newName)
    let dataupdateSilce={
        idbook:databook.idbook,
        namebook:namebook.current.value,
        pricebook:Number(pricebook.current.value),
        chapternumber:databook.chapternumber,
        chaptertotal: Number(chaptertotal.current.value),
        description:description.current.value,
        urlimg: `book/${newName}`
      }
    bookapi.updatebook(formData,databook.idbook).then((res)=>{
        
          dispatch(updatebook(dataupdateSilce))
       
    }).catch(function (error) {

        console.log(error);
    })
    
}
//ủa, có mỗi feature đơn giản thì cần gì slice với saga nhỉ :v
//hồi hộp quá, xem mấy lỗi
    return(
        <Box className= {classes.root} >
            <form className={classes.formCreate} encType="multipart/form-data" method="post">
            <TextField fullWidth  inputRef={namebook} defaultValue={databook.namebook} label="Outlined" variant="outlined"  className={classes.styleinput} label="Tên sách"/>
            <TextField fullWidth inputRef={pricebook} defaultValue={databook.pricebook} className={classes.styleinput}   label="Outlined" variant="outlined" label="Giá sách" />
            <TextField  fullWidth inputRef={chaptertotal} defaultValue={databook.chaptertotal} className={classes.styleinput}  label="Outlined" variant="outlined" label="Tổng số chương"  />
            <TextField fullWidth  inputRef={description} defaultValue={databook.description} className={classes.styleinput}  label="Outlined" variant="outlined" label="Mô tả"  />
            <Box className={classes.styleuploadfile}>
                <Typography>Ảnh bìa sách</Typography>
                <input
                    accept="image/*"
                    type="file"
                    ref={urlimg}

                />
                
            </Box>
            <Button fullWidth align="center" onClick={HandleSubmit}   variant="contained" color="primary" >
                 Cập nhật
            </Button>
            </form>
        </Box>
    )
}