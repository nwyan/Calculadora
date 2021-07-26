import React, { useState } from 'react';
import DoneIcon from '@material-ui/icons/Done'; //ícones
import CloseIcon from '@material-ui/icons/Close';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import './styles.css';

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
} from '@material-ui/core';
import { Add, ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import api from '../../Connections/api';
import everynetIcon from './icon-everynet.png'

const AdicionarTipoBtn = withStyles((theme) =>({
    root:{
        color:'#FFF',
        backgroundColor:'#18591C',
        '&:hover':{
            backgroundColor:'#5BA971'
        },
        padding: '5px 2px',
        margin: '10px',
    }
}))(Button)
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
}));
const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.black,
      color: 'white',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

export default function CadastroEvery () {

    const [nameDevice, setNameDevice] = useState('');
    const [dispositivoEUI, setDispositivoEUI] = useState('');
    const [aplicacaoEUI, setAplicacaoEUI] = useState('');
    //const [tags, setTags] = useState([]);
    const [netWorkSessionKey, setNetWorkSessionKey] = useState('');
    const [applicationSessionKey, setApplicationiSessionKey] = useState('');
    const [checkActivation, setCheckActivation] = useState(false);
    const [selectType, setSelectType] = useState('');
    const [deviceAddr, setDeviceAddr] = useState('');
    const [appKey, setAppKey] = useState(null);
    const [cadasto, setCadastro] = useState();
    const dispatch = useDispatch();
    
    //const cadastroEveryNet = useSelector((state) => state.devicesState.cadastroEvery);
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const dadosTypes = useSelector((state) => state.devicesState.dadosType);
    //const devices = useSelector((state) => state.devicesState.devices);
    
    
    console.log(cadasto)
    console.log(`CheckActivation: ${checkActivation}`)
    
    async function Cadastro() {
        if(checkActivation === false){
            setAppKey(null)
        }
        const data = {
            name: nameDevice,
            dev_addr: deviceAddr,
            dev_eui: dispositivoEUI,
            app_eui:aplicacaoEUI,
            //tags: tags,
            nwkskey: netWorkSessionKey,
            appskey: applicationSessionKey,
            activation: checkActivation === false ? 'ABP' : 'OTAA',
            type: selectType,
            app_key:appKey
        }
    
    const user = localStorage.getItem('user')
    console.log("Usuário: "+user)
    // /devices/delete?
            await api.post('/devices?user='+user+'&dev_type=everynet', data)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        setCadastro(data)
    }
    
    console.log(selectType)
    
    const classes = useStylesGrid();
    
    return (
        <Container fluid style={{marginTop: '5px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paperHeader}>  
                        <img src={everynetIcon} alt="everynet logo" width="70"></img>                       
                        <span className={classes.title}>Cadastro - Dispositivo Everynet</span>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <FormGroup >
                            <TextField className={classes.formfield} variant="filled" label="Nome do Dispositivo" value={nameDevice} onChange={(e) => setNameDevice(e.target.value)}  />
                            <TextField className={classes.formfield} variant="filled" label="Device Address" value={deviceAddr} onChange={(e) => setDeviceAddr(e.target.value)}  />
                            <TextField className={classes.formfield} variant="filled" label="Dispositivo EUI" value={dispositivoEUI} onChange={(e) => setDispositivoEUI(e.target.value)} />
                            <TextField className={classes.formfield} variant="filled" label="Aplicação EUI" value={aplicacaoEUI} onChange={(e) => setAplicacaoEUI(e.target.value)}  />
                            <TextField className={classes.formfield} variant="filled" label="Network Session Key" value={netWorkSessionKey} onChange={(e) => setNetWorkSessionKey(e.target.value)}  />
                            <TextField className={classes.formfield} variant="filled" label="Application Session Key" value={applicationSessionKey} onChange={(e) => setApplicationiSessionKey(e.target.value)}  />
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Switch color="primary" checked={checkActivation} onChange={(e) => setCheckActivation(e.target.checked)} />}
                                    label={checkActivation === true ? "Activation OTAA" : "Activation ABP"}
                                />
                                {
                                    checkActivation
                                    ?
                                        <TextField className={classes.formfield} variant="filled" label="Application Key" value={appKey} onChange={(e) => setAppKey(e.target.value)} />
                                    :
                                        ''
                                }
                            </FormGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Grid item xs={6}>
                                <TextField className={classes.formfield} variant="filled" label="Tipo" select onChange={(e) => setSelectType(e.target.value)} style={{width: '100%'}}>
                                    {
                                        dadosTypes.length && (dadosTypes.length > 0) ? dadosTypes.map((item) => (
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        )) :
                                            <MenuItem>Nenhum tipo cadastrado</MenuItem>
                                    }
                                </TextField>
                            </Grid>
                            <Link to="/cadastro/cadastrar-variaveis" target='_blank'>
                                <AdicionarTipoBtn variant="contained" color="primary"><Add/></AdicionarTipoBtn>
                            </Link>
                        </FormGroup>
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
            </Grid>
        </Container>
    )
}
