import React, { useContext, useState } from 'react';
import {
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    Avatar
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import {AuthContext}  from '../../../components/Context/contextAuth';
import LogoIBTI from '../../../assets/Logo-IBTI.png';

const useStyle = makeStyles((theme) => ({

    paper: {
        margin: '1% 30%',
        padding: '12%',
        borderRadius: 20,
        height: '67%'
    },
    areaInput: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    textLogin: {
        marginTop: '-60%',
        marginBottom: '20%',
        textAlign: 'center',
    },
    input: {
        width: '200%',
        marginBottom: '10%'
    },
    btnAccessArea: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        margin: '1% 20%',
        marginTop: '10%'

    },
    largeAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    }
}))

const ButtonAccess = withStyles(() => ({
    root: {
        color: '#FFF',
        background: '#262626',
        '&:hover': {
            backgroundColor: '#777777',
        },
        width: '100%',
        borderRadius: 20,
        marginBottom: '5%'

    }
}))(Button)

export default function Cadastro () {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [enterprise, setEnterprise] = useState('');
    const classes = useStyle();
    const { cadastro } = useContext(AuthContext)
    
    async function handleCadastrar() {
        cadastro(email, password, name, enterprise, lastName)
        console.log(email)
    }
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.largeAvatar} src={LogoIBTI} />
                    <Typography variant="h5">IBTI - Plataforma-IoT</Typography>
                </div>
                <Paper className={classes.paper} elevation={3}>
                    <div className={classes.areaInput}>
                        <Typography className={classes.textLogin} variant="h4">Cadastro</Typography>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} type="text" className={classes.input} variant="outlined" label="Nome" />
                        <TextField value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className={classes.input} variant="outlined" label="Sobrenome" />
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)}  className={classes.input} variant="outlined" label="E-mail" />
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" className={classes.input} variant="outlined" label="Senha" />
                        <TextField value={enterprise} onChange={(e) => setEnterprise(e.target.value)} type="text" className={classes.input} variant="outlined" label="Empresa" />
                    </div>
                    <div className={classes.btnAccessArea}>
                        <ButtonAccess onClick={handleCadastrar}>Cadastrar</ButtonAccess>
                        Já tem uma conta<Link to="/"><Typography>Acesse</Typography></Link>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}
