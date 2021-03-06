import React from 'react';
import { Box, Typography ,Button} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListchapter, selectListchapter,getdatachapter, selectDataChapter,getNameBook,selectNameBook,selectIsloading,resetdata} from './editchapSlice';
import { useEffect, useState,} from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import bookapi from '../../api/bookapi';
import { history } from '../../utils';
const useStyle = makeStyles((theme)=>({
    toggleButton:{
        margin:"2rem 0"
    },
     btn:{
         display:'flex',
         justifyContent:'center'
     }
 }))

 export function Editchap(props){
     const classes= useStyle();
     const {idbook} = useParams()
    
      //get Listbook
    const dispatch= useDispatch()
    useEffect(()=>{
        if(idbook){
            dispatch(getListchapter(idbook))
        }else{
            console.log("err getListchapter")
        }
         
    },[dispatch])
    // getnamebook
    useEffect(()=>{
        if(idbook){
            dispatch(getNameBook(idbook))
        }
        
    },[idbook])
    const [value, setValue] = useState(0);
  let datagetchapter= {
    idbook:idbook,
    chapter:value
}


  useEffect(()=>{
      
      if(value!=0){
        dispatch(getdatachapter(datagetchapter))
      }else{
          setContent("")
          setHeading("")
          dispatch(resetdata())
      }
    
},[value])

const listChapter = useSelector(selectListchapter)
const dataChapter = useSelector(selectDataChapter)
const namebook= useSelector(selectNameBook)
const loading= useSelector(selectIsloading)
const [content,setContent]=useState(null)
const [heading,setHeading]=useState(null)

const HandleChange = (event) => {
    setValue(event.target.value);
  };
const HandleChangeValueContent=(e)=>{
    setContent(e.target.value)
}
const HandleChangeValueNamebook=(e)=>{
   
    setHeading(e.target.value)
}
  useEffect(()=>{
    if(dataChapter.content){
       setContent(dataChapter.content)
    }
},[dataChapter.content])
    useEffect(()=>{
        if(dataChapter.chaptername){
        setHeading(dataChapter.chaptername)
        }
    },[dataChapter.chaptername])


/*
    const renderlistchapter=(listChapter)=>{
        
        if(listChapter){
            listChapter.map((item,index)=>{
                console.log(item)
                return(
                  <MenuItem value={item.chapternumber}  key={index} >Ch????ng{item.chapternumber}: {item.chaptername}</MenuItem>
                )
            })
        }
    }
*/
     const renderSelectChapter=()=>{
        if(listChapter){
           
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
                            <MenuItem value={0}>Th??m Ch????ng</MenuItem>
                            {listChapter.map((item,index)=>{
                            return(
                                <MenuItem value={item.chapternumber}  key={index} >Ch????ng{item.chapternumber}: {item.chaptername}</MenuItem>
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
        // s???a l???i c??i n??y
        if(!loading , namebook ){

            return(
                
                <>  
                   <Typography variant='subtitle1'> Date Update: {dataChapter.dateupdated} </Typography>
                    
                    <TextareaAutosize
                        
                        maxRows={3}
                        aria-label="maximum height"
                        placeholder="T??n ch????ng"
                        defaultValue={heading}
                        style={{ width: "100%",padding:10,fontSize:"1rem", fontFamily:"Roboto"}}
                        onChange={HandleChangeValueNamebook}
                    />
                    <TextareaAutosize
                        
                        maxRows={18}
                        aria-label="maximum height"
                        placeholder="N???i dung"
                        defaultValue={content}
                        style={{ width: "100%",padding:10,fontSize:"1rem", fontFamily:"Roboto"}}
                        onChange={HandleChangeValueContent}
                    />
                    <Box className={classes.btn}>
                        {renderButton(content)}
                    </Box>
                        
                        
                </>
              
            )
        }else{
            return(
                <LinearProgress />
            )
        }
    }
    
    const renderButton=(content)=>{
        
        if(dataChapter.content){
            return(
                <Button align="center" variant="contained" onClick={handleUpdate} color="primary">C???p nh???t</Button>
            )
           
        }else{
            return(
                <Button align="center" variant="contained" onClick={handleAdd} color="primary">th??m m???i</Button>
            )
        }
    }
    const handleUpdate=async()=>{
        let datares={
            idbook:idbook,
            data:{
                chapter:dataChapter.chapternumber,
                chaptername:heading,
                content:content
            }
        }
       
       await bookapi.updatechapter(datares)
       history.push("/bookdetail/"+idbook)
    }
    const handleAdd=()=>{
        let datarequest={
            idbook:idbook,
            data:{
                
                chaptername:heading,
                content:content
            }
        }
       bookapi.writechap(datarequest)
       history.push("/bookdetail/"+idbook)
    }
    return(
        <Box>
            <Box>
                {namebook?<Typography align="center" variant="h4" >{namebook}</Typography>: <LinearProgress />}
            </Box>
            <Box className={classes.toggleButton}>
                 {renderSelectChapter}
            </Box>
             
            <Box className={classes.content}>
            <Typography variant='subtitle1'> Date Update: {dataChapter.dateupdated} </Typography>
                    
                    <TextareaAutosize
                        
                        maxRows={3}
                        aria-label="maximum height"
                        placeholder="T??n ch????ng"
                        defaultValue={heading}
                        style={{ width: "100%",padding:10,fontSize:"1rem", fontFamily:"Roboto"}}
                        onChange={HandleChangeValueNamebook}
                    />
                    <TextareaAutosize
                        
                        maxRows={18}
                        aria-label="maximum height"
                        placeholder="N???i dung"
                        defaultValue={content}
                        style={{ width: "100%",padding:10,fontSize:"1rem", fontFamily:"Roboto"}}
                        onChange={HandleChangeValueContent}
                    />
                    <Box className={classes.btn}>
                        {renderButton(content)}
                    </Box>
            </Box>
        </Box>
    )
 }