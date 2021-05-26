import React , {Component} from 'react';
import Navigation from '../navbar';
import Button from 'react-bootstrap/Button';
import '../components.css';
import Items from './items';
import {Link} from 'react-router-dom';
import Footer from '../footer';
class landing extends Component{
  
  addItem = () =>{
    window.location.href="/AddItem"
  }
  render(){
        return(
            <div>
            <Navigation linkColor="white"  color="transparent" />
            <div style={{height:'92vh'}} className="header backgroundimage1">
    <div className="top">
    <div className="dark-overlay landing-inner text-dark mt-4">
    <div className="tl container">
        <div style={{width:'80%',height:'80%',left:'10%',right:'10%',top:'10%'}} className="mt-4 col-md-12 text-center mt-4">
        <div style={{position:'relative',top:'200px'}}>
          <h1 id="head" className="text-heavy text-center display-4 mb-4 mt-5 text-light" style={{fontWeight:"heavier",fontSize:'4rem',width:'90%',position:'relative',left:'5%',marginTop:'40%'}}>Online Store for Construction Material
        </h1><br/>
        <Link to="/items">
        <Button className="btn btn-md mr-3" variant="outline-light">Search Items</Button>
        </Link></div>
          </div>
    </div>
  </div>
  </div>
  </div>
  <Items />
  <Footer color="white" />
            </div>
        )
    }
}

export default landing;