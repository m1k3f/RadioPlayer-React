import React, { Component } from 'react';

import { RadioProvider } from './context/RadioContext';
import NavBar from './navbar/NavBar';
import Content from './Content'
import '../css/radio.css';

export default class Radio extends Component {
    
    render() {
        return (
            <RadioProvider>
                <NavBar />
                <Content />
            </RadioProvider>
        );
    }
}
