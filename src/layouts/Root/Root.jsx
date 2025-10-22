import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot'; // Add this import

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
            {/* Add Chatbot component */}
            <Chatbot />
        </div>
    );
};

export default Root;