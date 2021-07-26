import React, { useState, useEffect } from 'react';
import SearchForm from '../../components/SelectDeviceCombo/search-form'
import Map from './map-container'

export default function Mapa () {

    return (
        <React.Fragment>
            <SearchForm />
            <Map height="750px" />
        </React.Fragment>
    )
}
