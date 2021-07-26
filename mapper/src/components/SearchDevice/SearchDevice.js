import React from 'react';
import { FormControl, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { selecionarDevice } from '../../store/Modulos/Devices/actions';
const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing(1),
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    },
    cardInfo: {
        padding: theme.spacing(1),
        textAlign: 'center',
        marginBottom: theme.spacing(3),
        width: '50%',
        marginInline: 5,
    },
    textIput: {
        margin: theme.spacing(1),
        borderRadius: 100,
        width: '45%',
        borderRadius: 100,
    },
    form: {
        width: '100%',
        margin: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export default function SearchDevice () {

    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);
    const devices = useSelector((state) => state.devicesState.devices);
    const dispatch = useDispatch();
    const classes = useStyle();
    
    const [searchDevice, setSeactDevice] = useState('');
    
    return (
        <FormControl>
            <Autocomplete
                className={clsx(classes.textIput)}
                id="autocomplete"
                value={selectedDevice}
    
                onChange={(event, newValue) => {
                    if (newValue) {
                        const disp = newValue.split()
                        dispatch(selecionarDevice(disp[0]))
                    } else {
                        console.log('erro')
                    }
                }
                }
                inputValue={searchDevice}
    
                onInputChange={(event, inputValue) => { setSeactDevice(inputValue) }}
                options={devices.map(option => option.device)}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Pesquisar Dispositivo" variant="outlined" />}
            />
    
        </FormControl>
    );
}
