import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb  } from 'antd';
const { Header } = Layout;
export default class Headers extends React.Component {
  render(){
    return (
        <div>
        <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">主页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/Editor">编辑器</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/DataModal">数据模型</Link></Menu.Item>
            </Menu>
          </Header>
           <Breadcrumb style={{ margin: '16px 0' }}>
           <Breadcrumb.Item>Home</Breadcrumb.Item>
           <Breadcrumb.Item>List</Breadcrumb.Item>
           <Breadcrumb.Item>App</Breadcrumb.Item>
         </Breadcrumb>
         </div>
    )
  }
}

