import React,{useState} from 'react'
import './styles.css';
import DoneIcon from '@material-ui/icons/Done'; //ícones
import CloseIcon from '@material-ui/icons/Close';
import mqttIcon from './icon-mqtt.png'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import {   
    Container,
    Grid,
    Typography,
    TextField,
    FormControlLabel,
    FormGroup,
    Switch,
    MenuItem,
    Button,
    IconButton,
    Paper,
    Tooltip,
    Snackbar,
} from '@material-ui/core';
import { Add, ArrowBack } from '@material-ui/icons';
import {withStyles, makeStyles} from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import api from '../../Connections/api';

const useStylesGrid = makeStyles((theme) => ({  
    root: {
      flexGrow: 1,
    },
    title: {
        marginLeft: '15px',
        color: 'rgb(85, 85, 85)',
        textTransform: 'inherit',
        fontSize: '1.3rem',
        fontWeight: '600',
        // fontFamily: "'Open Sans', sans-serif",
        opacity: '1',
        cursor: 'unset',
    },
    paperHeader: {
        padding: theme.spacing(2),
        textAlign: 'left',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    //   color: theme.palette.text.secondary,
    },
    formfield: {
        marginBottom: '10px',
    },       
    btnConfirm: {
        margin: '8px',
        backgroundColor: 'green',
        padding: '8px',       
        borderRadius: '5px',
        color: 'white',
        '&:hover': {
            backgroundColor: 'darkgreen',
            color: 'white',
        },
    },
   
    btnCancel: {       
        backgroundColor: '#aaa',
        padding: '10px 8px',
        borderRadius: '5px',
        color: 'white',
        '&:hover': {
            backgroundColor: '#888',
            color: 'white',
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const useStylesComunicacao = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    title: {
        color: 'rgb(85, 85, 85)',
        textTransform: 'uppercase',
        fontSize: '0.875em',
        fontWeight: '400',
        opacity: '1',
        cursor: 'inherit',
    },
    content: {
        fontFamily: "monospace",
        color: 'rgb(85, 85, 85)',
        textTransform: 'inherit',
        fontSize: '1rem',
        fontWeight: '600',
        opacity: '1',
        cursor: 'unset',       
    },
    command: {
        fontFamily: "monospace",
        fontWeight: '100',
        backgroundColor: '#eee',
        padding: '7px',
        borderRadius: '5px'
    }
}))
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.black,
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

export default function CadastroMqtt () {

    const [nameDevice, setNameDevice] = useState('');
    const [dispositivoEUI, setDispositivoEUI] = useState('');
    const topico = 'ibti/username/'+dispositivoEUI
    const [appKey, setAppKey] = useState(null);
    const [cadastro, setCadastro] = useState()
    const [checkActivation, setCheckActivation] = useState(false);
    const cadastroMQTT = useSelector((state) => state.devicesState.cadastroMQTT);
    // const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    // const dadosTypes = useSelector((state) => state.devicesState.dadosType);
    //const devices = useSelector((state) => state.devicesState.devices);
    
    /////////////// Message /////////////////////
    const [openMessage, setOpenMessage] = React.useState(false);
    
    const showMessage = () => {
        setOpenMessage(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
   
        setOpenMessage(false);
    };
    /////////////////////////////////////////////
    
    console.log(`
        Topico: ${topico}
        appkey: ${appKey}
        checkActivation: ${checkActivation}
    `)
    
    const [open, setOpen] = React.useState(false);
    const showLoading = () => {
        setOpen(true);
    };
    
    const closeLoading = () => {
        setOpen(false);
    };
    
    async function Cadastro() {
        showLoading()
        console.log("Função Cadastro")
        if (checkActivation === false) {
            setAppKey(null)
        }
        const data = {
            name: nameDevice,
            dev_eui: dispositivoEUI,
        }
        const user = localStorage.getItem('user')
        await api.post('/devices?user='+user+'&dev_type=mqtt', data)
            .then((res) => {
                closeLoading() //fecha o círculo de loading
                if(res.data == ''){
                    console.log("Erro ao cadastrar")
                    showMessage()
                }
                //React irá pra abrir a rota dos dispositivos-cadastrados
                console.log(`Data response: ${res.data}`)
                window.location.href = "/dispositivos-cadastrados"   //Posteriomente mensagem de sucesso será enviada para essa view
    
            })
            .catch((err) => {
                closeLoading() //fecha o círculo de loading
                console.log(err)
                showMessage()
            })
        setCadastro(data)
    }
    
    // console.log(selectType)
    const classes = useStylesGrid();
    const comunicacao = useStylesComunicacao();
    
    return (
        <>
            <div>               
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <Container fluid style={{marginTop: '5px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paperHeader}>  
                        <img src={mqttIcon} alt="mqtt logo" width="70"></img>                       
                        <span className={classes.title}>Cadastro - Dispositivo MQTT</span>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {/* {
                            checkActivation === false
                                ? */}
                            <FormGroup >
                                <TextField
                                        className={classes.formfield}
                                        value={nameDevice}
                                        onChange={(e) => setNameDevice(e.target.value)}
                                        id="filled-Nome"
                                        label="Nome"
                                        helperText="Nome para o dispositivo"
                                        variant="filled"
                                    />
                                <TextField
                                        className={classes.formfield}
                                        value={dispositivoEUI}
                                        onChange={(e) => setDispositivoEUI(e.target.value)}
                                        id="filled-devEUI"
                                        label="EUI"
                                        helperText="Dispositivo EUI"
                                        variant="filled"
                                    />
                            </FormGroup>
                            {/* :
                                <FormGroup >                                  
                                    <TextField label="Nome do Dispositivo" variant="outlined" value={nameDevice} onChange={(e) => setNameDevice(e.target.value)} />                               
                                    <TextField label="Dispositivo EUI" variant="outlined" value={dispositivoEUI} onChange={(e) => setDispositivoEUI(e.target.value)} />                               
                                </FormGroup>
                        } */}
                            <LightTooltip  title="Cadastrar" aria-label="cadastrar" placement="left-start">
                            <IconButton variant="contained" onClick={Cadastro} className={classes.btnConfirm}>
                                <DoneIcon/>
                            </IconButton>
                        </LightTooltip >
    
                            <LightTooltip  title="Cancelar" aria-label="cancelar" placement="right-end">
                            <Link to='dispositivos-cadastrados' className={classes.btnCancel} >
                                <CloseIcon/>
                            </Link>                          
                        </LightTooltip>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paperHeader}>
                            <strong>Comunicação com o dispositivo</strong>
                            <hr/>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={comunicacao.title}>
                                    NOME DE USUÁRIO
                                </Typography>
                                    <Typography className={comunicacao.content}>
                                    username
                                </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={comunicacao.title}>
                                    Senha (key)
                                </Typography>
                                    <Typography className={comunicacao.content}>
                                    'senha gerada ao criar usuário'
                                </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography className={comunicacao.title}>
                                    DEVICE EUI
                                </Typography>
                                    <Typography className={comunicacao.content}>
                                    {dispositivoEUI ? dispositivoEUI : '{vazio}' }
                                </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography className={comunicacao.title}>
                                    TÓPICO
                                </Typography>
                                    <Typography className={comunicacao.content}>
                                    ibti/username/{dispositivoEUI}
                                </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={comunicacao.title}>
                                    MQTT URI
                                </Typography>
                                    <Typography className={comunicacao.content}>
                                    mqtt.ibti.network
                                </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={comunicacao.title}>
                                    MOSQUITTO
                                </Typography>
                                    <Typography className={comunicacao.command}>
                                    mosquitto_pub -h 'mqtt.proiot.network' -p '1883' -u 'username' -t 'proiot/username/{dispositivoEUI}/tx' -m 'payload'///
                                </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                        Erro ao cadastrar dispostivo!
                    </Alert>
                    </Snackbar>
                </div>
            </Container>
        </>
    )
}
