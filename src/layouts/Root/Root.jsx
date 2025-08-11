import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';

const Root = () => {
    return (
        <div>
            <header className='sticky top-0 z-50'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;