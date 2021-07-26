import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import ReactIcon from '../../assets/logo.svg';
import './styles.css';
import { getDate } from '../../utils/functions'
import { Link } from 'react-reducer-dom';
import {
    Container,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    TextField,
    FormControl,
    InputAdornment,
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Divider
} from '@material-ui/core';
import {
    Search,
    Edit,
    Delete,
    Add,
    LocationOn,
    Router,
    HelpOutline,
    Close
} from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery'; import ModalDispositivos from '../../components/ModalDispositivos/ModalDispositivos';

const useStyles = makeStyles((theme) => ({
    cards: {
        flexDirection: 'column',
        marginBottom: '20px',
        boxShadow: '3px 3px 4px 1px rgba(0,0,0,0.39)',
        borderRadius: '10px',
    },
    buttons: {
        borderRadius: '15px',
        width: '120px',
        height: '35px',
        padding: '10px'
    },
    cardsActions: {
        marginTop: '-5%',
        float: 'right',
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIput: {
        marginTop: '15px',
        borderRadius: 100,
        width: '45%',
        borderRadius: 100,
    },
    icons: {
        float: 'right',
        marginTop: '0.5%',
        marginRight: '1%',
    },

    appBar: {
        position: 'relative',
        backgroundColor: '#262626'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dispositivos () {

    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    
    const [filterConnection, setFilterConnection] = useState([]);
    const [searchConnection, setSearchConnect] = useState('');
    const [filterDevice, setFilterDevice] = useState('');
    const [filteredCountries, setFilteredCounries] = useState([]);
    const [open, setOpen] = useState(false).
    const [typeConexao, setTypeConexao] = useState([
        { id: "0", img: '', name: 'EveryNet', navigation: '/cadastroEverynet' },
        { id: "1", img: '', name: 'MQTT', navigation: '/cadastroMqtt' },
        { id: "2", img: '', name: 'HTT', navigation: '#' },
        { id: "3", img: '', name: 'LOKA', navigation: '#' },
    ]);
    
    useEffect(() => {
        setFilteredCouries(
            devices.filter(coutry => {
                return coutry.name.toLowerCase().includes(filterDevice.toLowerCase())
                || coutry.type.toLowerCase().includes(filterDevice.toLowerCase())
                || coutry.device.toLowerCase().includes(filterDevice.toLowerCase())
            })
        );
    
        setFilterConnection(
            typeConexao.filter(coutry => {
                return coutry.name.toLowerCase().includes(searchConnection.toLowerCase())
            })
        )
    }, [filterDevice, devices, searchConnection])
    
    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }
    
    const classes = useStyles();
    
    function foundIcon(typeDevice) {
        return typeDevice === "gps_dragino_v2" ||
            typeDevice === "android_gps" ? <LocationOn style={{ fontSize: 40, cursor: 'pointer' }} color="error" /> :
            typeDevice === "temp" ? <Router style={{ fontSize: 40, cursor: 'pointer' }} color="primary" /> : <HelpOutline style={{ fontSize: 40, cursor: 'pointer' }} />
    }

    function SelectionPcOrMobile() {
        const matches = useMediaQuery('(max-width: 660px)');
    
    }
    
    return (
        <Container fluid>
            {
                <div>
                    <FormControl className={(classes.form)} >
                        <TextField
                            className={(classes.textInput)}
                            label="Pesquisar Dispositivo"
                            variant="outlined"
                            onChange={e => setFilterDevice(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                )
                            }} />
                    </FormControl>
                </div>
            }
            {
                <div className="divAddButton">
                    <button onClick={handleClickOpen} className="bt btAdd"><Add style={{ margin: 'auto', color: 'white' }} /> Dispostivo</button>
                </div>
            }
            {
                filteredCountries.length && (filteredCountries.length > 0) ? filteredCountries.map((dev) => (
                    <Card className={classes.cards}>
                        <div className={classes.icons}> <Link to={"/dashboard"}>{ }{foundIcon(dev.type)}</Link> </div>
                        <CardContent style={{ padding: '15px 15px 0px 15px' }}>
                            <Typography className="dataDevices">
                                Nome do Dispositivo:
                                <Link to={{ pathname: "/dispositivos-cadastrados/descricao", state: dev }}>
                                    <span> {dev.name} </span>
                                </Link>
                            </Typography>
                            <Typography className="dataDevices" >
                                Status: <span>Ativado</span>
                            </Typography>
                            <Typography className="dataDevices">
                                Data de Ativação: <span>{dev.ts}</span>
                            </Typography>
                            <Typography className="dataDevices">
                                Tipo de Dispositivo: <span>{dev.type}</span>
                            </Typography>
                        </CardContent>
                        <CardActions className="cardBtn" style={{ padding: '10px' }} >
                            <button className="bt btOptions"> <Edit style={{ width: '15px' }} /></button>
                            <button className="bt btOptions"> <Delete style={{ width: '15px' }} /></button>
                        </CardActions>
                    </Card>
                )) :
                    <h1>Lista Vazia</h1>
            }
            {/*
            {
                <ModalDispositivos open={open} filterConnection={filterConnection}></ModalDispositivos>
            } */}
    
            <Dialog fullScreen open={open} onCLose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <ToolBar>
                       <IconButton edge="start" color="inherit" onClick={handleClose} arial-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Selecione um Tipo de Conexão
                        </Typography>
                    </ToolBar>
                </AppBar>
    
                <FormControl className={(classes.form)}>
                    <TextField
                        style={{ marginTop: 15, width: 320 }}
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
                            <Link to={connection.navigation} style={{ color: '#131313', textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary={connection.name} />
                                </ListItem>
                            </Link>
                            <Divider />
                        </>
                    ))}
                </List>
            </Dialog>
        </Container>
    )
}
