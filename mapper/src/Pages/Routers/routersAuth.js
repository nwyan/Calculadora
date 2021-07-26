import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../User/Login';
import Cadastro from '../User/Cadastro';

export default function RoutersAuth () {

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Cadastro" component={Cadastro} />
            </Switch>
        </BrowserRouter>
    )
}
