import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Select, InputNumber, Switch, Dropdown, Icon, message } from 'antd';
import componentList from './componentList';

const { Option } = Select;
export default class Simulator extends React.Component {
    constructor() {
        super();
        this.state = {
            devices: [{ name: 'iphone6', value: 'iphone6' }, { name: 'ipad', value: 'ipad' }],
            device: 'iphone6',
            slaces: [{ name: '50%', value: '50' }, { name: '75%', value: '75' }, { name: '100%', value: '100' }],
            slace: 100,
            simulatorWidth:375,
            simulatorHeight:667,
            componentList:{},
            elementList:[]
        }
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    changeScale(value){
        this.setState({slace:value});
    }
    changeSimulatorWidth(value) {
        this.setState({simulatorWidth:value});
    }
    changeSimulatorHeight(value) {
        this.setState({simulatorHeight:value});
    }
// 拖拽元素经过放置元素时
dragOver=(e)=>{
    e.preventDefault();// 此处的代码是必须的  不然无法拖拽
    console.log('拖拽中')
  }
  
  // 拖拽元素放到放置元素时
  drop=(e)=>{
    e.preventDefault();
    // 放置之后的后续操作
    let componentName = JSON.parse(e.dataTransfer.getData('item'));
    let componentNode={
        id:componentName+new Date().getTime(),
        type:componentName,
        value:'button'
    }
    this.nodeAdd(e,componentNode);
    this.nodeToHtml();
  }
  nodeIteratior(e,node,list){
      let listTemp=list;
    Object.keys(componentListTemp).forEach((key)=>{
        if(listTemp[key]===e.target.getAttribute('id')){
            return listTemp[key][node.id]=node;
        }else{
            return nodeIteratior(e,node,listTemp[key])
        }
    })
  }
  nodeAdd(e,componentNode){
      let componentListTemp = this.state.componentList;
    if(e.target.className.indexOf('preview-box')!==-1){
        componentListTemp[componentNode.id]=componentNode;
      }else{
        componentListTemp=this.nodeIteratior(e,componentNode,componentListTemp);
      }
      this.setState({
        componentList:componentListTemp
    })
  }
  nodeToHtml(){
    document.querySelector('.preview-box').innerHTML='';
    let listTemp=this.state.componentList,
    elementListTemp=this.state.elementList;
    Object.keys(listTemp).forEach((key)=>{
        // let componentEle=document.createElement(listTemp[key].type),
        //     componentText=document.createTextNode(listTemp[key].type);
        //     componentEle.appendChild(componentText);
        //     componentEle.setAttribute('id',listTemp[key].id);
        //     document.querySelector('.preview-box').appendChild(componentEle);
        // var content = React.createElement(, { id: listTemp[key].id },listTemp[key].type); // 第三个参数可以分开也可以写成一个数组
    // elementListTemp.push(`<${componentList[listTemp[key].type]}>${listTemp[key].value}</${componentList[listTemp[key].type]}>`);
    // elementListTemp.push(<Mbutton>{listTemp[key].value}</Mbutton>);
    if(listTemp[key].type==='flex'){
    //     <Flex>
    //     <Flex.Item><PlaceHolder /></Flex.Item>
    //     <Flex.Item><PlaceHolder /></Flex.Item>
    //   </Flex>
     elementListTemp.push(React.createElement(componentList[listTemp[key].type], {ctype:'component'},React.createElement(componentList[listTemp[key].type].Item, {ctype:'component'},listTemp[key].type)));   
    }else{
      elementListTemp.push(React.createElement(componentList[listTemp[key].type], {ctype:'component'}, listTemp[key].type));    
    }
    
    });
    this.setState({
        elementList:elementListTemp
    });
    console.dir(elementListTemp)
  }
  clickC(e){
      console.log(e.target.getAttribute('ctype'))
  }
    render() {
        return (
            <div className="simulator">
                <Select defaultValue="iphone6" style={{ width: 120 }} onChange={this.handleChange}>
                    {this.state.devices.map((item) => (<Option value={item.value}>{item.name}</Option>))}
                </Select>
                <InputNumber min={1} defaultValue={this.state.simulatorWidth} onChange={this.changeSimulatorWidth.bind(this)} />
                <span>X</span>
                <InputNumber min={1} defaultValue={this.state.simulatorHeight} onChange={this.changeSimulatorHeight.bind(this)} />
                <Select defaultValue="100%" style={{ width: 120 }} onChange={this.changeScale.bind(this)}>
                    {this.state.slaces.map((item) => (<Option value={item.value}>{item.name}</Option>))}
                </Select>
                <Switch checkedChildren="竖屏" unCheckedChildren="横屏" defaultChecked />
                <div className="preview-box" 
                     style={{width:this.state.simulatorWidth*this.state.slace/100,height:this.state.simulatorHeight*this.state.slace/100}}
                     onDragOver={(e)=>this.dragOver(e)}
                        onDrop={(e)=>this.drop(e)}
                        onClick={(e)=>this.clickC(e)}>
                            {this.state.elementList.map((item)=>{
                                console.dir(item)
                                return item
                            })}
                </div>
            </div>
        )
    }
}