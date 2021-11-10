
import { Box, makeStyles,Typography} from '@material-ui/core';
import { formatIMG } from '../../utils/formatIMG';
import { Link} from 'react-router-dom';
import { Itembook } from './Itembook';
const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:"flex-start"
  }
}));

 export function SlideItemBook(props){
   let  data = props.data||[]
const showItem=()=>{
 
  if(data[0]){
    return(
      <Box className={classes.root} >
          {data.map((item,index)=>{
            return(
              <Itembook data={item} key={index}/>
             )
          })}
        </Box>
    )
  } else{
    return(
      <Typography>Hiện đang trống</Typography>
    )
  }
}
  const classes = useStyles();
    return(
        <Box>
          {showItem}
        </Box>
    )
 }