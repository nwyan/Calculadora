import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import {
    Container,
    Typography,
    Button,
    Grid,
    Paper
} from '@material-ui/core';
import {
    MeetingRoom,
    NoMeetingRoom,
    PortableWifiOff,
    SettingsInputAntenna
} from '@material-ui/icons';

export default function Mqtt () {

    const [connectionStatus, setConnectionStatus] = useState(false);
    const [messages, setMessages] = useState    ([]);
    
    useEffect(() => {
        const options = {
            protocol: 'mqtt',
            username: 'superuser',
            password: 'bEOmT34OpW'
        }
        var client = mqtt.connect("mqtt://161.97.133.47:9001", options);
    
        client.on('connect', () => setConnectionStatus(true))
        client.subscribe('superuser');
    
        client.on('message', (topic, message, payload) => {
            setMessages(message);
            console.log(client)
            client.end()
        })
    
            client.publish('superuser', 'teste')
    
    }, [])
    
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    {
                        connectionStatus === true ?
                            (
                                <div style={{ display:'flex', alignItems: 'center' }}>
                                    <SettingsInputAntenna style={{ fontSize: 40, color: 'green', marginRight: 20 }} />
                                    <Typography variant="h5">
                                            Dispositivo on
                                    </Typography>
                                </div>
                            )
                            :
                            (
                                <div style={{ display:'flex', alignItems: 'center' }}>
                                        <PortableWifiOff style={{ fontSize:40, color: 'red', marginRight: 20}} />
                                        <Typography variant="h5">
                                            Dispositivo Off
                                        </Typography>
                                </div>
                            )
                    }
                </Grid>
                <Grid item sm={12}>
                    <Typography>
                        {`Teste de resposta: ${messages}`}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}
