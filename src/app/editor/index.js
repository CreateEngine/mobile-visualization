import React from 'react';
import Components from './components.js';
import Control from './control.js';
import ToolHeader from './toolHeader.js';
import ToolFooter from './toolFooter.js';
import Board from './board.js';
import './editor.less'
export default class Editor extends React.Component {
  render() {
    return (
      <div className="editor">
        <ToolHeader />
        <div className="editor-content">
          <Components />
          <Board />
          <Control />
        </div>
        <ToolFooter />
      </div>
    )
  }
}