import React from 'react';
// import { Provider } from 'mobx-react';
import { Layout } from 'antd';
import Header from './header/';
import Content from './content/';
import Footer from './footer/';
import {BrowserRouter as Router,Link} from 'react-router-dom';
export default class App extends React.Component{
    render(){
      return(
				<Router>
          <Layout className="layout">
            <Header/>
            <Content/>
            <Footer/>
          </Layout>
        </Router>
      )
    }
}