import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Tabela from './Pages/Table';
import CadastroVariaveis from './Pages/CadastroVariaveis';
import CadastroEvery from './Pages/CadastroEvery';
import CadastroMqtt from './Pages/CadastroMqtt'
import Dispositivo from './Pages/Dispositivos';
import Descricao from './Pages/DescricaoDispositivo'
import Graph from './Pages/Graph';
import Map from './Pages/Map';
import Mqtt from './Pages/Mqtt';
import Error from './Pages/Error';
import DeviceDash from './Pages/DeviceDashBoard/DeviceDash';
import Login from './Pages/User/Login';
import Cadastro from './Pages/User/Cadastro';
import DeviceDash from './Pages/DeviceDashBoard/DeviceDash';

export default function Router () {

    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/" component={Home}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/tabela" component={Tabela}/>
            <Route path="/cadastro/cadastrar-variaveis" component={CadastroVariaveis}/>
            <Route path="/cadastroEverynet" component={CadastroEvery} />
            <Route path="/cadastroMqtt" component={CadastroMqtt}/>
            <Route path="/dispositivos-cadastrados" component={Dispositivo}/>
            <Route path="/graphic" component={Graph}/>
            <Route path="/mapa" component={Map}/>
            <Route path="/mqtt" component={Mqtt}/>
            <Route path="/dados-do-dispositivo" component={DeviceDash} />
            <Route path="/*" component={Error}/>
        </Switch>
    );
}
