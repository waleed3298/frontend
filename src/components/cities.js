import React, { Component } from 'react';
import './components.css';
import {List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
export default class Cities extends Component {
    render() {
        return (
<div id="div1" style={{position:'relative',left:'10%',width:'60%',top:'20%',paddingTop:'5%',paddingBottom:'5%'}} >
            <List style={{color:'white'}}>
             <Link to='/Index/Islamabad'><List.Item style={{color:'white'}} className="mb-2">Islamabad</List.Item></Link>   
                <List.Item className="mb-2">Lahore</List.Item>
                <Link to='/Index/Peshawar'>   <List.Item style={{color:'white'}} className="mb-2">Peshawar</List.Item></Link>
                <List.Item className="mb-2">Quetta</List.Item>
                <List.Item className="mb-2">Sialkot</List.Item>
                <List.Item className="mb-2">Hyderabad</List.Item>
                <Link to='/Index/Rawalpindi'>  <List.Item style={{color:'white'}} className="mb-2">Rawalpindi</List.Item></Link>
            
            </List>
            </div>

            )
    }
}
