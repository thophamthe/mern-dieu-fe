import { Box, makeStyles, Typography, } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { useSelector } from 'react-redux';
import { loguot, selectdatauser } from '../../features/Login/Loginslice';
import { formatIMG } from '../../utils/formatIMG';
import React from 'react';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { Listbook } from '../../features/book/Listbook';
import { Readbook } from '../../features/read/Readbook';
import { Account } from '../../features/acount/Acount';
import { Bookdetail } from '../../features/bookdetail/Bookdetail';
import { Createbook } from '../../features/createbook/CreateBook';
import { Editchap } from '../../features/editchapter/Editchap';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const useStyle= makeStyles((theme)=>({
    root:{
        display:'grid',
        gridTemplateColumns:'13rem 1fr',
        gridTemplateRows:'auto 1fr',
        gridTemplateAreas:'"header header" "main main"'
    },
    header:{
        gridArea:'header',
        display:'grid',
        gridTemplateColumns:'1fr auto',
        padding:theme.spacing(0,1),
        backgroundColor:'#EE82EE'
    },
    name:{
        fontSize:theme.spacing(3),
        color:'white',
        width:'auto',
        textTransform:'none'

    },
    tab:{
        float:'right',
        display:'flex',
        textDecoration:'none',
        minWidth:theme.spacing(20),
        width:'auto',
    },
    menuitem:{
        width:'auto',
        minWidth:theme.spacing(15),
       
    },
    navlink:{
        textDecoration:'none',
        color:'black',
        '&.active>div':{
            backgroundColor:'#EE82EE',
        }
    },
    sidebar:{
        gridArea:'sidebar',
        padding:theme.spacing(0.5,0.5),
        
    },
    main:{
        gridArea:'main',
        padding:theme.spacing(2,2),
        
    },
    listmenu:{
        display:'flex',
        justifyContent:'center'
    },
    logo:{
        textDecoration:'none',
        color:'white',
    }
}))

 export function HomePage(props){
    const dispatch= useDispatch()
     const handlelogout=()=>{
        setAnchorEl(null);
         dispatch(loguot())
     }
    const user= useSelector(selectdatauser)
    const classes = useStyle()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return(
        <Box className={classes.root}>
            
            <Box className={classes.header}>
                <Typography className={classes.name}>
                    <NavLink className={classes.logo} to="/book"> <ImportContactsIcon fontSize="large"/> product demo </NavLink>
                   

                </Typography>
                <Button className={classes.tab}  onClick={handleClick}>
                        <Avatar alt="Remy Sharp" src={ formatIMG(user.urlimg)}/>  &nbsp;
                        <Typography className={classes.name}>{user.fullname}</Typography>

                </Button>
                <Box className={classes.listitem}>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                   
                    align="center"
                >
                    <MenuItem className={classes.menuitem}  onClick={handleClose}><Link style={{textDecoration:'none',color:'black'}}  to="/account">Tài khoản</Link></MenuItem>
                    <MenuItem className={classes.menuitem}  onClick={handlelogout}>Đăng xuất</MenuItem>
                </Menu>
                </Box>
                
               
            </Box>
            <Box className={classes.main}>
                <Switch>
                    <Route path="/book">
                        <Listbook/>
                    </Route>
                    <Route path="/readbook/:idbook">
                        <Readbook/>
                    </Route>
                    <Route path="/account">
                        <Account/>
                    </Route>
                    <Route path="/bookdetail/:idbook" exact>
                        <Bookdetail/>
                    </Route>
                    <Route path="/createbook">
                        <Createbook/>
                    </Route>
                    <Route path="/editchap/:idbook">
                        <Editchap/>
                    </Route>
                </Switch>
            </Box>
        </Box>
    )
 }