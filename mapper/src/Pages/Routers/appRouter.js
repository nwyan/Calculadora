import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store'
import Header from '../../components/Header'
import PathBar from '../../components/PathBar';
import Combo from '../../components/SelectDeviceCombo';

import Home from '../Home/index';
import Dashboard from '../Dashboard';
import Tabela from '../Table';
import CadastroVariaveis from '../CadastroVariaveis';
import CadastroEvery from '../CadastroEvery';
import CadastroMqtt from '../CadastroMqtt'
import Dispositivo from '../Dispositivos';
import Descricao from '../DescricaoDispositivo'
import Graph from '../Graph';
import Map from '../Map';
import Mqtt from '../Mqtt';
import Error from '../Error';
import DeviceDash from '../DeviceDashBoard/DeviceDash';

export default function Router () {

    return(
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <PathBar />
                <Combo />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/tabela" component={Tabela} />
                    <Route path="/cadastro/cadastrar-variaveis" component={CadastroVariaveis} />
                    <Route path="/cadastroEverynet" component={CadastroEvery} />
                    <Route path="/cadastroMqtt" component={CadastroMqtt} />
                    <Route path="/dispositivos-cadastrados/descricao" component={Descricao} />
                    <Route path="/dispositivos-cadastrados" component={Dispositivo} />
                    <Route path="/graphic" component={Graph} />
                    <Route path="/mapa" component={Map} />
                    <Route path="/mqtt" component={Mqtt} />
                    <Route path="/a" component={DeviceDash} />
                    <Route path="/*" component={Error} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
