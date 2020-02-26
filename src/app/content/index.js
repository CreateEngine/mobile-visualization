
import React from 'react';
import Routes from '../routers/'
import { Layout, Menu } from 'antd';
const { Content } = Layout;
export default class Contents extends React.Component {
  render(){
    return (
        <Content>
          <Routes/>
        </Content>
    )
  }
}
