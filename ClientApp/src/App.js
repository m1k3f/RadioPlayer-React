import React, { Component } from 'react';
import Radio from './components/Radio'

import './css/Site.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Radio />
    );
  }
}
