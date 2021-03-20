import React, { Component } from 'react'
import Navigation from './navbar';
import Header from './Header';
import Home from './home';
import Footer from './footer'
export default class Landing extends Component {
    render() {
        return (
        <div id="wrapper" style={{backgroundColor:'white'}}>
         <Navigation linkColor="white" color="Transparent"/>
         <Header />
         <Home />
         <Footer />
         </div>
        
        )
    }
}
