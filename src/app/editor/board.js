import React from 'react';
import Simulator from './simulator.js';
export default class Board extends React.Component {
  render() {
    return (
      <div className='board'>
        <Simulator/>
      </div>
    )
  }
}


