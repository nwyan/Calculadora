import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../Connections/api';
import { Form, Card, CardDeck, Row, Col } from 'react-bootstrap';
import './styles.css';
import { selecionarDevice, atualizarDevices, dadosDevice, dadosType } from '../../store/Modulos/Devices/actions';
import AutoComplete from '@material-ui/lab/Autocomplete';
import {MenuItem, TextField} from '@material-ui/core'

export default function Combo () {

    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    //const dadosTypes = useSelector((state) =>  state.devicesState.dadosType)
    //const dadosDevice = useSelector((state) =>  state.devicesState.dadosDevice);
    // const deviceData = useSelector((state) => state.deviceData);
    /*       deviceData = { disp1:[{...}, {...}, {...}, ...],       // <- Mais rápido para acessar dados de dispositivos
                            disp2:[{...}, {...}, {...}, ...], ... } */
    const dispatch = useDispatch()
    
    localStorage.setItem('user', 'bruno')
    const user = localStorage.getItem('user')
    
    if (selectedDevice === '') {
        if (devices.length > 0) {
            dispatch(selecionarDevice(devices[0].device))
        }
    }
    useEffect(() => {
        handleDevices()
        updateDeviceData()
        selectData()
        selectDeviveTypes()
    }, [selectedDevice])
    
    async function handleDevices() {
        await api.get(`devices?user=${user}`)
            .then((res) => {
                const devs = Object.keys(res.data).map(dev => ({ ...res.data[dev], device: dev }))
                dispatch(atualizarDevices(devs))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    async function selectDeviveTypes() {
        await api.get(`types?user=${user}`)
            .then((res) => {
                dispatch(dadosType(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    function equacionarDadosDevices(dadosDevice) {
        return dadosDevice.map((dados) => {
            if (dados.type) {
                return dados;
            }
            else {
                return {
                    ...dados,
                    type: ""
                }
            }
        })
    }
    
    async function selectData() {
        const id = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
        console.log(id)
        if (id !== '') {
            await api.get(`data?dev_addr=${id}&limit=20&user=${user}`)
                .then((res) => {
                    const data = res.data.map(data => ({ ...data, device: id }))
                    dispatch(dadosDevice(equacionarDadosDevices(data)));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    
    async function updateDeviceData() {
        const device = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
        // console.log(device)
        if (device !== '') {
            await api.get(`data?dev_addr=${device}&limit=5&user=${user}`)
                .then((res) => {
                    setDeviceData(device, res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    function setDeviceData(device, data) {
        // alert(JSON.stringify([device, data]))
        if(data){
            if(data.length>0)
                dispatch({ type: 'DEVICE_DATA', payload: [device, data] })
            else
                console.log('Dispositivo sem dados')
        }
        else
            console.log('Erro ao baixar dados')
    }
    
    
    return (
        <div style={{ width: '16%', marginLeft: '80%' }}>
            {/* <Autocomplete
                    value={selectedDevice}
                    onChange={(event, newValue) => {
                        dispatch(selecionarDevice(event.target.value))
                        //setSelectDevice(newValue)
                    }}
                    inputValue={searchDevice}
                    onInputChange={(event, inputValue) => {
                        setSeactDevice(inputValue)
                    }}
                    options={devices}
                    getOptionLabel={(option) =>  option.name ? option.name : option.device}
                    style={{width: 300}}
                   
                    renderInput={(params) => <TextField {...params} label="Pesquisar Dispositivo" variant="outlined"/>}
                /> */}

            {/* <div style={{ marginLeft: '6%' }}>{(devices.length > 0) ? "Dispositivo Selecionado:" : <p> </p>}</div>
            <TextField select value={selectedDevice} onChange={(e) => dispatch(selecionarDevice(e.target.value))}>
                {(devices.length > 0) ? devices.map((dev) => (
                    <MenuItem key={dev.name ? dev.name : dev.device} value={dev.device}>{dev.name ? dev.name : dev.device}</MenuItem>
                )) :
                    (
                        <option>Nenhum dispositivo</option>
                    )
                }
            </TextField> */}
        </div>
    )
}
