import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import App from './app/';
let rootNode = document.createElement('div');
rootNode.setAttribute('id','app');
document.body.appendChild(rootNode);
ReactDOM.render(<App/>,rootNode);  

