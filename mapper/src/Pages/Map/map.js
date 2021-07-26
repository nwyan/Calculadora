import React, {useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Checkbox,
    FormControlLabel,
    TextField
} from '@material-ui/core'
import {getDate, getpropsDevice, getlatitude, getlongitude} from '../../utils/functions'
import MapCreator from '../../utils/map-lib'
import L from 'leaflet'
import api from '../../Connections/api';
import mqtt from 'mqtt';

export default function Map (props) {

    const devices = useSelector((state) => state.devicesState.devices)
    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice)
    
    const devs = useSelector((state) => stats.device);
    const deviceData =  devs[selectedDevice].data
    const deviceProps = devs[selectedDevice].props
    
    const client = useState((state) => state.MQTTclient)
    const currentTopic = useSelector((state) => state.MQTTcurrentTopic)
    const dispatch = useDispatch()
    const setClient = MQTTclient => dispatch({ type: 'MQTT_CLIENT', payload: MQTTclient })
    const setCurrentTopic = MQTTcurrentTopic => dispatch({ type: 'MQTT_CT', payload: MQTTcurrentTopic })
    
    const [map, setMap] = useState(null)
    const [newData, setNewData] = useState({lat:-15.711, long:-47.911})
    const [marker, setMarker] = useState(null)
    const [polyline, setPolyline] = useState(null)
    const [dayCheck, setDayCheck] = useState(false);
    const [dateField, setDateField] = useState('')
    const [dataMap, setDataMap] = useState([{lat:-15.711, long:-47.911}])
    
    function verificaLista(lista, prop) {
        const selDevice = (lista.length > 0) ? (selectedDevice === '' ? lista[0].device : lista.filter((dev) => dev.device === selectedDevice)) : []
        return (selDevice.length > 0) ? selDevice[0][prop] ? selDevice[0][prop] : 0.0 : 0
    }
    
    const device = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""
    const height = props.height ? props.height : "450px"
    const user = localStorage.getItem('user')
    
    /*______________________________________________________________________________________
      __________________________________ Lógica do Mapa ____________________________________
      ______________________________________________________________________________________*/
    
    useEffect(() => MapCreator(setMap), []);
    useEffect(() => {
      if(map){
        var marker = L.marker([newData.lat, newData.long])

        marker.addTo(map)
        .bindPopup("<b>IBTI</b>").openPopup();

        // L.circle([coordinates[0]+.003, coordinates[1]-0.06], 500, {   //Figura 1
        //   color: 'red',
        //   fillColor: '#f03',
        //   fillOpacity: 0.5
        // }).addTo(map).bindPopup("I am a circle.");

        // L.polygon([                                                 //Figura 2
        //     [coordinates[0]+.009, coordinates[1]-0.08],
        //     [coordinates[0]+.003, coordinates[1]-0.06],
        //     [coordinates[0]+.01, coordinates[1]-0.047]
        // ]).addTo(map).bindPopup("I am a polygon.");

        var popup = L.popup();
        function onMapClick(e) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
        }
        map.on('click', onMapClick);

        setMarker(marker)
        setPolyline(L.polyline([], {color: 'red'}).addTo(map))
      }
    }, [map]);
    useEffect(() => {   // <- Controlado pelo MQTT
        if (marker) {
            const coordinates = [newData.lat, newData.long]
            if (deviceProps.includes('lat')) {
                if (!dayCheck) {
                    console.log(coordinates)

                    marker.setLatLng(coordinates).bindPopup(
                        `<b>Dispositivo: ${verificaLista(devices, 'name')}</b> <p>Último envio: ${getDate(newData.ts)} <br/>Bateria: ${newData.bateria ? newData.bateria : 0}V</p> <p>Latitude: ${getlatitude(newData.lat)} <br/>Longitude: ${getlongitude(newData.long)}</p>`
                    )
                    map.setView(coordinates, 13)
                }
            }
            else {
                marker.setLatLng(coordinates).bindPopup("<b>IBTI</b>")
            }
        }
    }, [newData]);
    useEffect(() => {   // <- Controlado pelo campo de data
        if (deviceProps.includes('lat') && dayCheck) {
            const listCoords = dataMap.map(data => [data.lat, data.long])//.slice(0, 1000)
            if (listCoords.length > 0) {
                marker.setLatLng(listCoords[0])
                map.setView(listCoords[0]);

                polyline.setLatLngs(listCoords)
                map.fitBounds(polyline.getBounds());     // zoom the map to the polyline
            }
        }
    }, [dataMap])
    
    /*______________________________________________________________________________________
      __________________________________ Lógica do MQTT ____________________________________
      ______________________________________________________________________________________*/
    
    useEffect(() => {
        if (!client) {
            const options = {
                protocol: 'mqtt',
                username: 'superuser',
                password: 'bEOmT34OpW'
            }
            const clientMQTT = mqtt.connect("mqtt://161.97.133.47:9001", options)
            clientMQTT.on('connect', () => {
                console.log('MQTT connected!')
            });

            clientMQTT.on('error', (err) => {
                console.error('MQTT Connection error: ', err);
                client.end();
            });
            clientMQTT.on('reconnect', () => {
                console.log('Reconnecting MQTT');
            });
            setClient(clientMQTT)
        }
        else {
            client.on('message', (topic, buffer) => {
                const msg = buffer.toString().replace("ObjectId(", "").replace(")", "").replaceAll("'", '"')
                console.log(`tópico: ${topic}`)
                console.log(msg)
                const message = JSON.parse(msg)
                setNewData(message)
            });
            console.log('MQTT message event trigged!')
        }
    }, [client])
    useEffect(() => {
        if (deviceProps.includes('lat')) setNewData(deviceData[0])
        else setNewData({ lat: -15.711, long: -47.911 })

        if (client) {
            if (client.connected) {
                const nextTopic = `ibtioutput/${user}/${device}`
                if (nextTopic !== currentTopic) {
                    if (currentTopic) {
                        client.unsubscribe(currentTopic)
                        console.log(`unsubscribed topic: ${currentTopic}`)
                    }
                    client.subscribe(nextTopic)
                    console.log(`subscribed topic: ${nextTopic}`)
                    setCurrentTopic(nextTopic)
                }
            }
        }
    }, [client, devs])
    
    /*______________________________________________________________________________________
      _____________________________ Lógica da data específica ______________________________
      ______________________________________________________________________________________*/
    
    async function downloadData(options) {
        const user = localStorage.getItem('user')
        const id = (devices.length > 0) ? (selectedDevice === '' ? devices[0].device : devices.filter((dev) => dev.device === selectedDevice)[0].device) : ""

        await api.get(`data?dev_addr=${id}&${options}&user=${user}`)
            .then((res) => {
                setDataMap(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    useEffect(() => {
        if (deviceData.length > 0 && selectedDevice !== '') {
            const lastDate = new Date(deviceData[0].ts * 1000)
            setDateField(lastDate.toISOString().slice(0, 10))
        }
    }, [devs])
    
    useEffect(() => {
        if (dayCheck && dateField !== '' && deviceProps.includes('lat')) {
            const selectedDate = new Date(dateField + ' 00:00:00')
            const dateStr = selectedDate.toLocaleString().slice(0, 10)
            downloadData(`date=${dateStr}&limit=1000`)
        }
        else
            if (polyline) polyline.setLatLngs([])

    }, [dayCheck, dateField])
    
    /*______________________________________________________________________________________
      __________________________________ Layout do Mapa ____________________________________
      ______________________________________________________________________________________*/
    
    return (
        <Container style={{ maxWidth: 1600 }} >
            <FormControlLabel
                control={<Checkbox color="prmary" value={dayCheck} onChange={(e) => setDayCheck(e.target.checked)} style={{ marginBottom: '2%' }} />}
                label="Dia específico" />
            {dayCheck === true ?
                <TextField label="Dia" variant="outlined" type="date" value={dateField} onChange={(e) => setDateField(e.target.value)} style={{ marginLeft: '2%', marginBottom: '2%' }} />
                : ''}

            <div id="mapContainer" style={{ height: height, marginBottom: '2%' }}></div>
        </Container>
    )
}
