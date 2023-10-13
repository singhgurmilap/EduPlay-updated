import React from 'react';
import Teacher_Navbar from './Teacher_Navbar';
import { Outlet } from 'react-router-dom';

function Teacher_SharedLayout() {
    return (
        <>
            <div className='backgroundYellow'>
                <Teacher_Navbar />
                <Outlet />
            </div>
        </>
    );
}

export default Teacher_SharedLayout;
