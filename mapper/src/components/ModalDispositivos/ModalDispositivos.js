import React, { useState } from 'react';

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

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

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

function modalDispositivos (props) {

    const [open, setOpen] = useState(false);
    const [filterConnection, setFilterConnection] = useState([]);
    const [searchConnection, setSearchConnect] = useState('')
    const classes = useStyles();
    
    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} arial-label="close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Selecione um Tipo de Conexão
                    </Typography>
                </Toolbar>
            </AppBar>
    
            <FormControl className={(classes.form)} >
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
                {props.filterConnection.map(connection => (
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
    );
}

export default ModalDispositivos;
