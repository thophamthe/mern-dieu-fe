
import { Box, makeStyles} from '@material-ui/core';
import { formatIMG } from '../../utils/formatIMG';
import { Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const useStyles = makeStyles((theme) => ({
  root: {
     
    width:theme.spacing(20),
    height:theme.spacing(32),
    margin:theme.spacing(0,2,1,0),

  },
  item:{
    position:'absolute',
    display:'flex',
    justifyContent:'center',
    width:theme.spacing(20),
    height:theme.spacing(32),
    overflow:'hidden',
    '&.hover>.item':{
      border:'1px soild red'
    },
   '& img':{
     
   }
  },
  
}));

 export function Itembook(props){
const showItem=()=>{
  if(props.data.idbook){
    return(
      <Box className={classes.root} >
          
          <Link to={"/bookdetail/"+props.data.idbook}>
            <Box className={classes.item} >
                <img src={formatIMG(props.data.urlimg)} alt={props.data.namebook} />
            </Box>
            <Box className={classes.tab}>
            </Box>
          </Link>
        </Box>
    )
  } else{
    return(
      <CircularProgress />
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