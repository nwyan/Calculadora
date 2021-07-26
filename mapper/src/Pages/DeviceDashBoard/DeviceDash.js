import React from 'react';
import './DeviceDash.css'
import SearchDevice from '../../components/SearchDevice/SearchDevice';
import { makeStyles } from '@material-ui/core/styles';
import RouterIcon from '@material-ui/icons/Router';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import OpacityIcon from '@material-ui/icons/Opacity';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import img from '../../assets/rising.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { stampToDate, stampToDateAndHour } from '../../script/timeStampToDate'
const useStylePC = makeStyles(() => ({
    router: {
        color: '#009ED8',
        fontSize: 50,
    },

    fire: {
        color: '#FD0D1B',
        fontSize: 50,
    },

    battery: {
        color: '#43E255',
        fontSize: 50,
    },

    water: {
        color: '#26A6F7',
        fontSize: 50,
    },

    arrowUp: {
        color: '#43E255',
        fontSize: 25,
    },

    arrowDown: {
        color: '#FD0D1B',
        fontSize: 25,
    },

    circle: {
        color: '#43E255',
        fontSize: 120,
    }



}))

export default function DeviceDash (props) {

    const classesIconPC = useStylePC();
    const data = useSelector(state => state);
    const [key, setKey] = useState({ message: 'Sem key' });
    const [selectedDevice, setSelectedDevice] = useState('Nenhum dispositivo selecionado');
    const [typeDevice, setTypeDevice] = useState({ message: 'Sem tipo' });
    const [dataDevice, setDataDevice] = useState({ message: 'Sem dados' });
    const [date, setDate] = useState(0);
    
    useEffect(() => {

        setSelectedDevice(data.devicesState.selectedDevice);
        setDataDevice(data.devicesState.dadosDevice == undefined || data.devicesState.dadosDevice == null ? { message: 'Sem dados' } : data.devicesState.dadosDevice);
        setTypeDevice(data.devicesState.devices.filter(filterDevice => filterDevice.device == selectedDevice)[0])
        setKey(typeDevice ? Object.keys(typeDevice) : 'sem dado')
        setDate(typeDevice == undefined ? 0 : typeDevice.last_seen)
        console.log(data)
        // console.log(key)
        // console.log(selectedDevice)
        // console.log(dataDevice)
        // console.log(typeDevice)

    }, [data]);
    
    return (
        <div className='containerDeviceDash'>
    
            <div className='searchDeviceDash'>
                <SearchDevice></SearchDevice>
            </div>
            <div className='divDataDeviceDash'>
    
                <div className="divDeviceTypeDash">
                    <h4>Dispositivo: <span>{typeDevice == undefined ? '' : typeDevice[key[0]]}</span></h4>
                    <p>Tipo: <span>{typeDevice == undefined ? '' : typeDevice[key[1]]}</span> </p>
                    <p>Status: <span>{typeDevice == undefined ? '' : typeDevice[key[2]] == 0 ? 'Inativo' : "Ativo"}</span> </p>
                    <p>Data: <span>{typeDevice == undefined || isNaN(typeDevice[key[4]]) ? 'N/A' : stampToDate(typeDevice[key[4]])}</span></p>
                    <p>Visto por último: <span>{typeDevice == undefined || isNaN(typeDevice[key[4]]) ? 'N/A' : stampToDateAndHour(typeDevice[key[4]])}</span>  </p>
                </div>
    
                <div className="divImgDeviceDash">
                    <div className="imgDeviceTitleDash">
                        <h3>Dispositivo</h3>
                        <RouterIcon className={classesIconPC.router} />
                    </div>
                    <img src={img} alt="device" />

                </div>
    
                <div className="divTwinSquareDash">
    
                    <div className="divTwinRectangleDash">
                        <div className="divTwinDataDash">
                            <h5>Temperatura</h5>
                            <WhatshotIcon className={classesIconPC.fire} />
                        </div>

                        <div className="divTwinDataDash">
                            <div className="divTwinInfoDash">
                                <span>20 Cº</span>
                            </div>
                            <div className="divTwinStatisticDash">
                                <ArrowUpwardIcon className={classesIconPC.arrowUp} />
                                <p>22%</p>
                            </div>
                        </div>
                    </div>
    
                    <div className="divTwinRectangleDash">
                        <div className="divTwinDataDash">
                            <h5>Umidade</h5>
                            <OpacityIcon className={classesIconPC.water} />
                        </div>
                        <div className="divTwinDataDash">
                            <div className="divTwinInfoDash">
                                <span>20 Cº</span>
                            </div>
                            <div className="divTwinStatisticDash">
                                <ArrowUpwardIcon className={classesIconPC.arrowUp} />
                                <p>22%</p>
                            </div>

                        </div>

                    </div>
    
                </div>
    
                <div className="divBatteryDash">
                    <div className="divBatteryTitleDash">
                        <h5>Bateria</h5>
                        <BatteryChargingFullIcon className={classesIconPC.battery} />
                    </div>
                    <div className="divBatteryStatusDash">
                        <DataUsageIcon className={classesIconPC.circle} />
                        <p>10V</p>
                    </div>
                </div>
    
            </div>
    
            <div className="divInfoMapsDash">

                <div className="graphDash">
                    Grafícos
                </div>

                <div className="mapDash">
                    Mapa
                </div>

            </div>
    
            <div className="divTableDash">
                <h2>Tabela de dados:</h2>

            </div>
    
        </div>
    );
}
