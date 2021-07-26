import React, {useContext} from 'react'
import {AuthContext} from '../../components/Context/contextAuth';

import RoutersAuth from './routersAuth';
import AppRouter from './appRouter';
export default Router;

function Router () {

    const { signed, loading} = useContext(AuthContext)
    
    return(
        signed ? <AppRouter/> : <RoutersAuth/>
    )
}
