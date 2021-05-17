import React , {Component} from 'react';
import Navigation from '../navbar';
import Button from 'react-bootstrap/Button';
import '../components.css';
import Items from './items';
class landing extends Component{
  
  addItem = () =>{
    window.location.href="/AddItem"
  }
  render(){
        return(
            <div>
            <Navigation linkColor="white"  color="transparent" />
            <div className="header backgroundimage1">
    <div className="top">
    <div className="dark-overlay landing-inner text-dark mt-4">
    <div className="tl container">
        <div style={{width:'80%',left:'10%',right:'10%',top:'10%'}} className="mt-4 col-md-12 text-center mt-4">
        <div style={{position:'relative',top:'200px'}}>
          <h1 id="head" className="text-heavy text-center display-4 mb-4 mt-5 text-light" style={{fontWeight:"heavier",fontSize:'4rem',width:'90%',position:'relative',left:'5%',marginTop:'40%'}}>Online Store for Construction Material
        </h1><br/>
        <Button className="btn btn-md mr-3" variant="outline-light">Search Items</Button>
        <Button onClick={this.addItem} className="btn btn-md" variant="outline-light">Add New Item</Button>
          </div>
          </div>
    </div>
  </div>
  </div>
  </div>
  <Items />
            </div>
        )
    }
}

export default landing;