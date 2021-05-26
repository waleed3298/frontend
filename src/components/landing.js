import React, { Component } from 'react'
import Navigation from './navbar';
import Header from './Header';
import Home from './home';
import Footer from './footer';
import axios from 'axios';
export default class Landing extends Component {
    render() {
        return (
        <div id="wrapper" style={{backgroundColor:'white'}}>
         <Navigation linkColor="#0e8b75" color="#fcfbff"/>
         <Header /><br/>
         <Home />
         <Footer color="white" />
         </div>
        
        )
    }
}
