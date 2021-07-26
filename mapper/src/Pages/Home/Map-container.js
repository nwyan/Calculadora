import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
} from '@material-ui/core'
import { getDate, getlatitude, getlongitude } from '../../utils/functions'
import MapCreator from '../../utils/map-lib'
import L from 'leaflet'
import api from '../../Connections/api';

export default function Maps (props) {

    const dadosTypes = useSelector((state) =>  state.devicesState.dadosType)
    
    const [map, setMap] = useState(null)
    const [timer, setTimer] = useState(true)
    const [markerList, setMarkerList] = useState([])
    
    /*______________________________________________________________________________________
      __________________________________ Lógica do Mapa ____________________________________
      ______________________________________________________________________________________*/
    
    useEffect(() => MapCreator(setMap), []);
    useEffect(() => {
        if (map) {
            const coordinates = [-15.711, -47.911]
            L.marker(coordinates).addTo(map).bindPopup("<b>IBTI</b>").openPopup();

            var popup = L.popup();
            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
            }
            map.on('click', onMapClick);
        }
    }, [map]);
    
    useEffect(() => {
        if (timer == false) {
            const instervalId = setInterval(() => setTimer(true), 20000)
            return () => {
                clearInterval(instervalId);
            }
        }
    }, [timer]);
    
    useEffect(() => {
        if (timer == true && map && dadosTypes.length>0) {
            setTimer(false)
            map.setZoom(11)
            getMapDevices()
        }
    }, [map, dadosTypes, timer]);
    
    function getMapDevices(){
        getGPSDevicesAndData().then(data => {
            if (markerList.length > 0)
                markerList.forEach(marker => marker.removeFrom())
    
            const gpsDevices = Object.keys(data)
            setMarkerList(gpsDevices.map(dev => {
                const lat = data[dev].lat
                const long = data[dev].long
    
                const marker = L.marker([lat, long]).addTo(map)
                marker.bindPopup(
                    `<b>Dispositivo: ${dev}</b> <p>Último envio: ${getDate(data[dev].ts)}`
                  + ` ${data[dev].bateria ? `<br/> Bateria: ${data[dev].bateria}V`:''}</p>`
                  + ` <p>Latitude: ${getlatitude(data[dev].lat)}`
                  + ` <br/>Longitude: ${getlongitude(data[dev].long)}`
                  + ` ${data[dev].velocidade ? `<br/> Velocidade: ${data[dev].velocidade}km/s` : ''}`
                  + ` ${data[dev].altitude ? `<br/> Altitude: ${data[dev].altitude}m` : ''}</p>`
                ).openPopup();
                return marker
            }))
        })
    }
    
    /*______________________________________________________________________________________
      _________________________ Lógica da seleção de dispositivos __________________________
      ______________________________________________________________________________________*/
    
    async function getGPSDevicesAndData(){
        // Agrupa todos os tipos q tem GPS no nome
        let gpsTypes = dadosTypes.filter(type => type.includes('gps'))
        console.log(gpsTypes)
    
        // Baixa os dados dos dispositivos de cada tipo separado e junta tudo
        let data = {}
        for (let i in gpsTypes){
            data ={...data, ...(await downloadData(`dev_type=${gpsTypes[i]}&limit=1`) )}
        }
        // Exclui dispositivos com dados inválidos
        let downloadedData = {}
        Object.keys(data).map(dev => {
            if(data[dev][0].long)
                if(Math.abs(data[dev][0].lat)<=90 && Math.abs(data[dev][0].long)<=180)
                    downloadedData[dev] = data[dev][0]
        })
        console.log(downloadedData)
        return downloadedData
    }
    
    async function downloadData(options) {
        const user = localStorage.getItem('user')
        var resp = await api.get(`data?${options}&user=${user}`)
        return resp.data
    }
    
    /*______________________________________________________________________________________
      __________________________________ Layout do Mapa ____________________________________
      ______________________________________________________________________________________*/
    
    const height = props.height ? props.height : "450px"
    
    return (
        <Container style={{ maxWidth: 1600 }} >
            <div id="mapContainer" style={{ height: height, marginBottom: '2%' }}></div>
        </Container>
    )
}
