import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import RouterIcon from '@material-ui/icons/Router';
import MemoryIcon from '@material-ui/icons/Memory';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import { useState } from 'react';
import { useEffect } from 'react';
import Map from './Map-container'
const useStylePC = makeStyles(() => ({
    router: {
        color: '#009ED8',
        fontSize: 50,
    },

    chip: {
        color: '#C41F1F',
        fontSize: 50,
    },

    battery: {
        color: '#43E255',
        fontSize: 50,
    }

}))

export default function Home () {

    const data = useSelector((state) => state.devicesState.devices);
    const [allDevices, setAlldevices] = useState(0);
    const [lastSeen, setLastSeen] = useState([]);
    const [allDevicesActives, setAllDevicesActives] = useState([]);
    const classesIconPC = useStylePC();
    
    useEffect(() => {
        setAlldevices(data.length);
    
        setLastSeen(
            data.map(last => {
                if (last.last_seen) {
                    let date = new Date(last.last_seen * 1000);
                    let dataFormatada = "Data:" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " Hora:" + date.getHours() + ":" + date.getMinutes();
                    return dataFormatada
                } else {
                    let dia = "Não há dados"
                    return dia;
                }
            })
        );
    
        setAllDevicesActives(data.filter(device => device.status != 0));
    
    }, [data])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'nomeDispositivo', headerName: 'Nome do dispositivo', width: 250 },
        { field: 'tipo', headerName: 'Tipo', width: 150 },
        { field: 'vistoPorUltimo', headerName: 'Visto por último', width: 250 }
    ];
    
    const rows = data.map((row, i) => {
    
        return (
            {
                id: i + 1,
                nomeDispositivo: row.name,
                tipo: row.type,
                vistoPorUltimo: lastSeen[i],
            })
    })
    
    return (
        <div className="containerHome">


            <div className="divDataDeviceHome">

                <div className="dataDevicesHome">
                    <div className="squareDataHome">
                        <p>Sensores: <span>{allDevices}</span> </p>
                        <RouterIcon className={classesIconPC.router}></RouterIcon>
                    </div>

                    <div className="squareDataHome">
                        <p>Sensores Ativos: <span>{allDevicesActives.length}</span></p>
                        <MemoryIcon className={classesIconPC.chip}></MemoryIcon>
                    </div>

                    <div className="squareDataHome">
                        <p>Bateria:<span>12W</span></p>
                        <BatteryChargingFullIcon className={classesIconPC.battery}></BatteryChargingFullIcon>
                    </div>

                </div>


                <div className="listDevicesHome">
                    <h2>Dispositivos</h2>
                    <div style={{ height: 400, width: '98%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </div>
                </div>

            </div>


            <div className="divMapHome">
                <Map ></Map>
            </div>

        </div>
    )
}
