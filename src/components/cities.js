import React, { Component } from 'react';
import './components.css';
import {List} from 'semantic-ui-react'
export default class Cities extends Component {
    render() {
        return (
<div id="div1" style={{position:'relative',left:'10%',width:'60%',top:'20%',paddingTop:'5%',paddingBottom:'5%'}} >
            <List style={{color:'white'}}>
                <List.Item className="mb-2">Islamabad</List.Item>
                <List.Item className="mb-2">Lahore</List.Item>
                <List.Item className="mb-2">Peshawar</List.Item>
                <List.Item className="mb-2">Karachi</List.Item>
                <List.Item className="mb-2">Quetta</List.Item>
                <List.Item className="mb-2">Sialkot</List.Item>
                <List.Item className="mb-2">Hyderabad</List.Item>
                <List.Item className="mb-2">Rawalpindi</List.Item>
            </List>
            </div>

            )
    }
}
