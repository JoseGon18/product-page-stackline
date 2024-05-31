import React from 'react';
import logo from '../assets/stackline_logo.svg';
import '../styles/Header.css';

const Header: React.FC = () => (
    <header className = "header">
        <img src={logo} alt="Stackline Logo" className="logo"/>
    </header>
);

export default Header;