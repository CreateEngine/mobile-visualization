import React from 'react';
import { Collapse, Icon, Select,Tabs,Tree ,Button } from 'antd';


const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;
const { TreeNode } = Tree;
function callback(key) {
  console.log(key);
}

const text = `
 字体，字体单位，风格...
`;

const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

export default class Control extends React.Component {
  state = {
    expandIconPosition: 'left',
  };

  onPositionChange = expandIconPosition => {
    this.setState({ expandIconPosition });
  };
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  render() {
    const { expandIconPosition } = this.state;
    return (
      <div style={{width:300}}>
        <Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          expandIconPosition={expandIconPosition}
        >
          <Panel header="全局配置
          " key="1" extra={genExtra()}>
            <div>{text}</div>
          </Panel>
          <Panel header="组件配置" key="2" extra={genExtra()}>
            <div>
            <Tabs>
              <TabPane tab="基本设置" key="11">
                Content of tab 1
              </TabPane>
              <TabPane tab="交互" key="22">
                Content of tab 2
              </TabPane>
              <TabPane tab="数据" key="33">
                Content of tab 3
              </TabPane>
            </Tabs>
            </div>
          </Panel>
          <Panel header="组件图层" key="3" extra={genExtra()}>
            <div>
            <Tree
        showLine
   
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
            <TreeNode title="leaf" key="0-0-0-2" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="parent 1-2" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
        </TreeNode>
      </Tree>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
