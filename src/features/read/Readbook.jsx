import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListchapter, selectListchapter,getdatachapter, selectDataChapter,getNameBook,selectNameBook, selectIsloading} from './readbookSlice';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles= makeStyles((theme)=>({
    root:{},
    toggleButton:{
        margin:"2rem 0"
    }
}))
 export function Readbook(props){
     const idBookPram = useParams()
     let idbook = idBookPram.idbook

     //get Listbook
    const dispatch= useDispatch()
    useEffect(()=>{
         dispatch(getListchapter(idbook))
    },[dispatch])
    // getnamebook
    useEffect(()=>{
        dispatch(getNameBook(idbook))
    },[idbook])
   


    const listChapter = useSelector(selectListchapter)
    const dataChapter = useSelector(selectDataChapter)
    const namebook= useSelector(selectNameBook)
    const loading=useSelector(selectIsloading)

  const classes = useStyles()


  const [value, setValue] = useState(1);
  let datagetchapter= {
    idbook:idbook,
    chapter:value
}
  const HandleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(()=>{

    dispatch(getdatachapter(datagetchapter))
},[dispatch,value])


const renderSelectChapter=()=>{
    if(listChapter!=null){
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel  id="demo-simple-select-label">Chapter</InputLabel>
                    <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Chapter"
                        onChange={HandleChange}
                    >
                         {listChapter.map((item,index)=>{
                        return(
                            <MenuItem value={item.chapternumber}  key={index} >Chương{item.chapternumber}: {item.chaptername}</MenuItem>
                        )
                         })}
                    </Select>
                </FormControl>
            </>
        )
    }else{
        return (
            <LinearProgress />
        )
    }
}

const renderDataChapter=()=>{
    if(!loading){
        return(
            <>  
                <Typography variant='subtitle1'> Date Update: {dataChapter.dateupdated} </Typography>
                <Typography variant="h5"  sx={{ textAlign: 'center',fontWeight: 'light',fontStyle: 'normal' }}> {dataChapter.content}  </Typography>
            </>
        )
    }else{
        return(
            <LinearProgress />
        )
    }
}
    return(
        <Box className={classes.root}>
            <Box>
                {namebook?<Typography align="center" variant="h4" >{namebook}</Typography>: <LinearProgress />}
            </Box>
            <Box className={classes.toggleButton}>
                 {renderSelectChapter}
            </Box>
             
            <Box className={classes.content}>
                {renderDataChapter}
            </Box>
        </Box>
    )
 }