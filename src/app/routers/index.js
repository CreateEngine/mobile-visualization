import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import Home from '../home/';
import Editor from '../editor/';
import DataModal from '../dataModal/';
export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/Editor">
                    <Editor />
                </Route>
                <Route path="/DataModal">
                    <DataModal />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch> 
        )
    }
}
