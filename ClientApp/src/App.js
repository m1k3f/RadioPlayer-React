import React, { Component } from 'react';
import { RadioProvider } from './components/context/RadioContext';
import Radio from './components/Radio'

import './css/animation.css'
import './css/fontawesome/all.min.css';
import './css/radio.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div className="fade-in">
        <RadioProvider>
          <Radio />
        </RadioProvider>
      </div>
    );
  }
}
