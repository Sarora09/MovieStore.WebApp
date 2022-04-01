import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const OutletComponent = () => {

    const checkId = localStorage.getItem('userId');

    return checkId? <Outlet />: <Navigate to="/" />

}

export default OutletComponent;