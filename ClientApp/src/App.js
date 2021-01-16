import React, { Component } from 'react';
import Radio from './components/Radio'

import './css/animation.css'
import './css/fontawesome/all.min.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div className="radioApp fade-in">        
        <Radio />        
      </div>
    );
  }
}
