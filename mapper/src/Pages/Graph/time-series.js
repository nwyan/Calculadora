import api from '../../Connections/api';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getpropsDevice } from '../../utils/functions'
import {nomeVars,textoVars, colorVars } from './varsProps'
import { Chart } from 'react-google-charts'

export default function TimeSeries (props) {

const selectedDevice = useSelector((state) => state.devicesState.selectedDevices);
const devices = useSelector((state) => state.devicesState.devices)
const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
const propsDevice = getpropsDevice(dadosDevice);
const lastDate = new Date((dadosDevice.length > 0) ? dadosDevice[0].ts * 1000 : 0)
const varsDevice = [...Object.keys(nomeVars).filter((prop) => propDevice.includes(prop)), 'interval']

function getVar1() {
    const lVar = (selectedVar1 === '' ? varsDevice : varsDevice.filter((va) => va === selectedVar1))
    return (lVar.length > 0) ? lVar[0] : ''
}
function getVar2() {
    const lVar = (selectedVar2 === '' ? varsDevice : varsDevice.filter((va) => va === selectedVar2))
    return (lVar.length > 0) ? lVar[0] : ''
}

const selectedVar1 = props.var1
const selectedVar2 = props.var2
const dayCheck = props.dayCheck
const grafFixo = props.grafFixo
const timeWindow = props.timeWindow
const timeField = props.dateField
const var1 = getVar1()
const var2 = (selectedVar2 === '' ? varsDevice : varsDevice.filter((va) => va === selectedVar2))[0]
const [dadosGrafico, setDadosGrafico] = useState(dadosDevice)
const [graph, setGraph] = useState([])

async function downloadData(options) {
        const user = localStorage.getItem('user')
        const id = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""

        await api.get(`data?dev_addr=${id}&${options}&user=${user}`)
            .then((res) => {
                if(res.data.length > 0) setDadosGrafico(res.data);
                else console.log('Lista de dados do gráfico baixada vazia!')
            })
            .catch((err) => {
                console.log(err)
            })
    }

async function downloadnAppendData(options) {
        const user = localStorage.getItem('user')
        const id = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
       
        await api.get(`data?dev_addr=${id}&${options}&user=${user}`)
            .then((res) => {
                const dados = dadosGrafico
                res.data.forEach((data) => {
                    if (data.ts > dados[0].ts)
                        dados.unshift(data)
                })
                setDadosGrafico(dados);
            })
            .catch((err) => {
                console.log(err)
            })
    }

function getPointsGraph() {
        var dados = dadosGrafico
        dados = (var1==='interval' || var2==='interval') ?
            dados.reverse().map((val,i) => (
                {...val, 'interval': (i>0) ? (dadosGrafico[i]['ts']) - dadosGrafico[i-1]['ts'] : null}
            )) : dados
           
        const pointsGraph = dados.map((dev) => ([new Date(dev['ts'] * 1000), dev[var1], dev[var2]]))
        return [['t', textoVars[var1], textoVars[var2]], ...pointsGraph]
    }

useEffect(() => {
        const date = !dayCheck ? lastDate : new Date(dateField + ' 24:00:00')
        const finalDate = date.toLocaleString()
        const finalDate_ts = date.valueOf()

        const msec2day = 1000 * 60 * 60 * 24
        const initialDate = new Date(finalDate_ts - msec2day*timeWindow).toLocaleString()

        downloadData(`from_date=${initialDate}&to_date=${finalDate}${(timeWindow>2)?'&limit=2000':''}`)
    }, [timeWindow, dateField, selectedDevice])

useEffect(() => {
        const pointsGraph = getPointsGraph()
        setGraph(pointsGraph)
    }, [selectedVar1, selectedVar2, dadosGrafico])

useEffect(() => {

        if (!dayCheck && !grafFixo && (dadosGrafico.length > 0)) {
            const date_ts = dadosGrafico[0].ts * 1000
            const date = new Date(date_ts).toLocaleString()

            const instervalId = setInterval(() => {
                downloadnAppendData(`from_date=${date.toLocaleString()}`)
                setGraph(getPointsGraph())
            }, 8000)
            return () => {
                clearInterval(instervalId);
            }
        }
    }, [graph, grafFixo])

return (dadosGrafico.length > 0) ? <DrawGraph/> : <p>Sem dados do gráfico...</p>

function DrawGraph() {
        return (
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="LineChart"
                loader={<div>Carregando...</div>}

                data={graph}
                options={{
                    //legend: 'none',
                    chartArea: { width: '85%', height: '70%' },
                    animation: (dayCheck || grafFixo) ?
                        {
                            duration: 1000,
                            easing: 'out',
                            startup: true
                        } : '',
                    series: {
                        0: { targetAxisIndex: 0,
                            ...( var1 !== 'interval' ? {curveType:'function'} : {lineWidth: 1, lineDashStyle: [4, 5, 2, 5], pointSize: 4 } )
                        },
                        1: { targetAxisIndex: 1, visibleInLegend: (var2 === var1 ? false : true),
                            ...( var2 !== 'interval' ? {curveType:'function'} : {lineWidth: 1, lineDashStyle: [4, 5, 2, 5], pointSize: 4 } )
                        },
                    },
                    hAxis: {
                        title: 'Tempo',
                        gridlines: {
                            count: "-1",
                            units: {
                                minutes: { format: ["HH:mm"] },
                                hours: { format: ["HH:mm \n d/MM", "H'h'"] },
                                days: { format: ["dd/MM \n /yyyy", "d/M"] },
                                months: { format: ["MM/yyyy", "M/yy"] }
                            }
                        },
                        minorGridlines: {
                            units: {
                                minutes: { format: ["HH:mm", ":mm"] },
                                hours: { format: ["HH:mm", "H'h'"] },
                                days: { format: ["d"] },
                            }
                        }
                    },
                    vAxes: {
                        //0: { title: textoVars[var1] },
                        //1: { title: textoVars[var2] }
                    },
                    colors: [colorVars[var1], colorVars[var2]],
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}
