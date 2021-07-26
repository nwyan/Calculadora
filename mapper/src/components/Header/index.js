import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import { Home, DeviceHub, Dashboard, GraphicEq, Map, PlusOne, Phone, Close, Search } from '@material-ui/icons'

import {
    makeStyles,
    Toolbar,
    Drawer,
    useTheme,
    AppBar,
    IconButton,
    Typography,
    Divider,
    ListItemIcon,
    ListItemText,
    List,
    ListItem,
    Avatar,
    Dialog,
    TextField,
    Slide,
    FormControl,
    InputAdornment,
    Menu,
    MenuItem

} from '@material-ui/core'
import './styles.css';
import LogoIBTI from '../../assets/Logo-IBTI.png';
import { FaUserCircle } from 'react-icons/fa'
import { Dropdown, Form, Button } from 'react-bootstrap';
import { Icon } from 'leaflet';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        zIndex: 5
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#262626'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    menuButtom: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,

    },
    title: {
        flexGrow: 1
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        justifyContent: 'flex-end',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2)
    },
    rouded: {
        color: '#000',
        backgroundColor: '#FFF'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header () {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [typeConexao, setTypeConexao] = useState([
        { id: "0", img: '', name: 'EveryNet', navigation: '/cadastroEverynet' },
        { id: "1", img: '', name: 'MQTT', navigation: '/cadastroMqtt' },
        { id: "2", img: '', name: 'HTT', navigation: '#' },
        { id: "3", img: '', name: 'LOKA', navigation: '#' },
    ]);
    const [filterConnection, setFilterConnection] = useState([]);
    const [searchConnection, setSearchConnect] = useState('');
    const [anchorEl, setAnchoEl] = useState(null);
    const [auth, setAuth] = useState(true)
    const openMenu = Boolean(anchorEl)
    
    useEffect(() => {

        setFilterConnection(
            typeConexao.filter(coutry => {
                return coutry.name.toLowerCase().includes(searchConnection.toLowerCase())
            })
        )
    }, [searchConnection])
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const handleClickOpen = () => {
        setOpenDialog(true)
        setOpen(false)
    }
    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleMenu = (event) => {
        setAnchoEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchoEl(null)
    }
    return (
        <div onClickCapture={handleCloseMenu} className={classes.root}>
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        onClick={handleDrawerOpen}
                        edge='start'
                        className={clsx(classes.menuButtom, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar alt="Remy Sharp" src={LogoIBTI} className={classes.large} />
                    <Typography variant="h6" className={classes.title} noWrap>
                        IBTI-Plataforma
                   </Typography>
                    {
                        auth && (
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >

                                <Avatar variant="rouded" className={classes.rouded}>AS</Avatar>
                                <Menu
                                    id="menu-appbar"
                                    open={openMenu}
                                    onClose={handleCloseMenu}
                                    keepMounted
                                    anchorEl={anchorEl}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    <MenuItem onClick={handleCloseMenu}>Setting</MenuItem>
                                    <MenuItem >Sair</MenuItem>
                                </Menu>
                            </IconButton>
                        )
                    }


                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{ paper: classes.drawerPaper }}
               
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link onClick={() => setOpen(false)} to="/" style={{ textDecoration: 'none', color: '#131313' }}>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>

                    <ListItem button onClick={handleClickOpen}>
                        <ListItemIcon><PlusOne /></ListItemIcon>
                        <ListItemText>Cadastrar dispositivo</ListItemText>
                    </ListItem>

                    <Link onClick={() => setOpen(false)} to="/dispositivos-cadastrados" style={{ textDecoration: 'none', color: '#131313' }}>
                        <ListItem button>
                            <ListItemIcon><DeviceHub /></ListItemIcon>
                            <ListItemText>Dispositivos Cadastrados</ListItemText>
                        </ListItem>
                    </Link>
                    <Link onClick={() => setOpen(false)} to="/dashboard" style={{ textDecoration: 'none', color: '#131313' }}>
                        <ListItem button>
                            <ListItemIcon><Dashboard /></ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </ListItem>
                    </Link>
                    <Link onClick={() => setOpen(false)} to="/graphic" style={{ textDecoration: 'none', color: '#131313' }}>
                        <ListItem button>
                            <ListItemIcon><GraphicEq /></ListItemIcon>
                            <ListItemText>Gráfico</ListItemText>
                        </ListItem>
                    </Link>
                    <Link onClick={() => setOpen(false)} to="/mapa" style={{ textDecoration: 'none', color: '#131313' }}>
                        <ListItem button>
                            <ListItemIcon><Map /></ListItemIcon>
                            <ListItemText>Localização do Dispositivo</ListItemText>
                        </ListItem>
                    </Link>
                    <Link onClick={() => setOpen(false)} to="/mqtt" style={{ textDecoration: 'none', color: '#131313' }}>
                        <ListItem button>
                            <ListItemIcon><Phone /></ListItemIcon>
                            <ListItemText>Teste Mqtt</ListItemText>
                        </ListItem>
                    </Link>
                </List>

            </Drawer>
            <Dialog fullScreen open={openDialog} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} arial-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Selecionar o Tipo de Conexão
                        </Typography>
                    </Toolbar>
                </AppBar>
                <FormControl className={(classes.form)}>
                    <TextField
                        style={{ marginTop: 85, width: 320 }}
                        label="Pesquisar Conexão"
                        variant="outlined"
                        onChange={e => setSearchConnect(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }} />
                </FormControl>

                <List>
                    {filterConnection.map(connection => (
                        <>
                            <Link onClick={handleClose} to={connection.navigation} style={{ color: '#131313', textDecoration: 'none' }}>
                                <ListItem button >
                                    <ListItemText primary={connection.name} />
                                </ListItem>
                            </Link>
                            <Divider />
                        </>
                    ))}
                </List>
            </Dialog>
            <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
                <div className={classes.drawerHeader} />

            </main>

        </div>

    )
}
