import React from 'react';
import { Menu, Icon, Button } from 'antd';


const { SubMenu } = Menu;
const menuConfig = [{
  name: 'layout',
  value: '布局',
  children: [
    {
      name: 'flex',
      value: 'Flex布局'
    },
    {
      name: 'wingBlank',
      value: '两页留白'
    },
    {
      name: 'wingSpace',
      value: '上下留白'
    }
  ]
},
{
  name: 'dataEntry',
  value: '数据输入',
  children: [
    {
      name: 'button',
      value: '按钮'
    }
  ]
}]
export default class Components extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  // 拖拽开始
  dragStart = (e, item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));// 拖拽元素携带的数据
  }
  render() {
    return (
      <div style={{ maxWidth: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {
            menuConfig.map((item) => {
              return (<SubMenu
                key={item.name}
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>{item.value}</span>
                  </span>
                }>
                {!!item.children && item.children.length > 0 && item.children.map((itemOne) => {
                  return (
                    <Menu.Item key={itemOne.name} draggable={true} onDragStart={(e) => this.dragStart(e,itemOne.name)}>{itemOne.value}</Menu.Item>
                  )
                })}
              </SubMenu>)
            })
          }
        </Menu>
      </div>
    );
  }
}

