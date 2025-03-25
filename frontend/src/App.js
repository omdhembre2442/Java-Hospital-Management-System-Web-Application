import React from 'react';
import HeaderNavbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
    return ( 
        <div className='app'>
            <header>
                <HeaderNavbar />
            </header>
            <main style={{ paddingTop: "100px" }}>
                <Outlet />
            </main>
            <footer className='footer'>
                <Footer />
            </footer>
        </div>
     );
}

export default App;