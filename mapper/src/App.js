import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routers from '../src/Pages/Routers';
import Header from '../src/components/Header';
import PathBar from '../src/components/PathBar'
import store from './store'
import Combo from '../src/components/SelectDeviceCombo';
import Auth from './WSO2/Auth';
import AuthProvider from './components/Context/contextAuth';

export default function App () {

    return (
        // <Auth>
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routers />
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        // </Auth>
    );
}
export default App
