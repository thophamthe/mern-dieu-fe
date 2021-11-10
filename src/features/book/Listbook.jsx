import { Box, TextField } from '@material-ui/core';
import { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListbook, selectListbook, selectPagination,selectLoading } from './listbookSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Itembook } from '../../component/common/Itembook';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({
    listbook: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      
      transition:'all 0.5s ease-in-out',
    },
    imageList: {
      width: 500,
      height: 450,
    },
    pagination:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center',
      paddingBottom:theme.spacing(1)
    },
    bg:{
      backgroundColor: 'white'
    }
  }));
  
 export function Listbook(props){
    const classes = useStyles();
    const [page,setPage]=useState(1)
    const [query,setQuery]=useState("")
    let search={
      page:page,
      query:query
    }
    const handleChange = (event, value) => {
      setPage(value);
    };
  const handleChangeSearch=(event)=>{
    setQuery(event.target.value)
  }
    const dispatch= useDispatch();
     useEffect(()=>{
        dispatch(getListbook(search))
     },[dispatch,page,query])
     const getbook = useSelector(selectListbook);
     const pagin = useSelector(selectPagination)
     const loading=  useSelector(selectLoading)
     let totalpage = Math.ceil(pagin.totalDocument / pagin.limit      )
     const renderListbook=(getbook)=>{
       if(loading){
         return(
          <LinearProgress />
         )
       }else{
         return(
          <Box className={classes.listbook}>
          {getbook.map((item,index)=>{
             return(
              <Itembook data={item} key={index}/>
             )
             
           })}
          </Box>
         )
       }
     }
     const loadbook=()=>{
        if(getbook){
            return(
              <Box  className={classes.root}>
                 <TextField fullWidth size="small" margin="dense" onChange={handleChangeSearch} id="outlined-basic" label="Tìm kiếm" variant="outlined" />
               <Box className={classes.pagination} >
               <Stack  spacing={2}>
                <Pagination page={page} count={totalpage} onChange={handleChange} color="primary"   />
              </Stack>
               </Box>
               {renderListbook(getbook)}
              </Box>
            )
            
        }else{
            return(
              <LinearProgress />
            )
        }
    }
    return(
       <Box className={classes.bg}>
         
         {loadbook}
       </Box>
       
    )
 }