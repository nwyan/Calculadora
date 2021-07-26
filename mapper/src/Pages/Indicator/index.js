import React, { useEffect } from 'react'
import { Jumbotron, Card, Col, Row, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'//necessario para usar o useSelector do redux
import './styles.css';
import { getlatitude, getlongitude, getDate } from '../../utils/functions'

export default function Indicator () {

    const selectedDevice = useSelector((state) => state.devicesState.selectedDevice);//Chama um dispositivo específico do Redux
    const devices = useSelector((state) => state.devicesState.devices)
    const dadosDevice = useSelector((state) => state.devicesState.dadosDevice);
    
    function verificaLista(lista) {
        const dado = (selectedDevice === '') ? lista : lista.filter((dado) => dado.device === selectedDevice)
        return (dado.length > 0) ? dado[0] : []
    }
    
    function verificaPop(prop, lista) {
        const selDados = verificaLista(lista)
        return selDados[prop]
    }
    const device = verficaPop('device', devices);
    
    useEffect(() => {
        console.log(dadosDevice.filter((device) => device.device === selectedDevice)[0] ?
            dadosDevice.filter((device) => device.device === selectedDevice)[0].type : "UNDEFINED");
    }, [selectedDevice])//fica observando caso tenha alguma alteração
    
    function getPropsDevice(){
        const selDados = verificaLista(dadosDevice)
        return Object.keys(selDados)
    }
    const propsDevice = getPropsDevice()
    
    function drawInfoTable() {
        return (
            <ListGroup>
                <ListGroup.Item>Código do dispositivo: {device} </ListGroup.Item>
                <ListGroup.Item>Data do ultimo envio de pacote:  {getDate( verificaProp('ts', dadosDevice) )} </ListGroup.Item>
                {propsDevice.includes('lat') ? <ListGroup.Item>Último valor de Latitude: { getlatitude( verificaProp('lat', dadosDevice) ) }</ListGroup.Item> : ""}
                {propsDevice.includes('long') ? <ListGroup.Item>Último valor de Longitude: { getlongitude(verificaProp('long', dadosDevice) ) }</ListGroup.Item> : ""}
                <ListGroup.Item>Tipo do dispositivo: {verificaProp('type', dadosDevice)} </ListGroup.Item>
                {/* <ListGroup.Item>Bateria: {Último valor de Longitude: {verificaProp('bateria', dadosDevice)} </ListGroup.Item> */}
            </ListGroup>
        )
    }
    
    return (
        <Jumbotron>

            <h4 className="titleInfo">Informações do dispositivo: {verificaProp('name', devices)}</h4>
            {<p>{/*JSON.stringify( verificaLista(dadosDevice) )*/}</p>}

            <Row className="Info">
                <Col>
                    <Card>
                            <Card.Img src={Logo}/>
                    </Card>
                </Col>
                <Col>
                    {
                        ((device !== '') && (dadosDevice.length > 0)) ?
                        (propsDevice.length > 0) ? (
                            drawInfoTable()
                        ) : "" : ""
                    }

                    <Link to="/tabela">
                        <Button variant="warning" style={{ marginTop: '2%' }}>Historico</Button>
                    </Link>
                </Col>
            </Row>


        </Jumbotron>
    )
}
