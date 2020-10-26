import React, { Component } from 'react';
import NavBar from './navbar/NavBar';
import Content from './Content'

export default class Radio extends Component {

    render() {
        return (
            <NavBar />
            <Content />
        );
    }
}