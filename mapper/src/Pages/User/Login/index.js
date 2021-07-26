import React,{useState, useContext} from 'react';
import {
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    Avatar
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom';
import LogoIBTI from '../../../assets/Logo-IBTI.png';
import { AuthContext } from '../../../components/Context/contextAuth';

const useStyle = makeStyles((theme) => ({

    paper: {
        margin: '1% 30%',
        padding: '12%',
        borderRadius: 20,
        height:'55%'
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
        margin:'1% 20%',
        marginTop:'10%'

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
export default withRouter(Login)

function Login () {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('')
    
    const{logar} = useContext(AuthContext)
    
    async function handleLogin(){
        logar(email, password)
    }
    
    const classes = useStyle();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.largeAvatar} src={LogoIBTI} />
                    <Typography variant="h5">IBTI - Plataforma-IoT</Typography>
                </div>
                <Paper className={classes.paper} elevation={3}>
                    <div className={classes.areaInput}>
                        <Typography className={classes.textLogin} variant="h4">Login</Typography>
                         <TextField value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={classes.input} variant="outlined" label="Login" />
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" className={classes.input} variant="outlined" label="Senha" />
                    </div>
                    <div className={classes.btnAccessArea}>
                        <ButtonAccess onClick={handleLogin}>Acessar</ButtonAccess>
                        <Link to="/cadastro">
                            <Typography>Registre-se</Typography>
                        </Link>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}
