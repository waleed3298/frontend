import React , {Component} from 'react';
import NavBar from './navbar';
import Button from 'react-bootstrap/Button';
class Landing extends Component{
    render(){
        return(
            <div>
            <NavBar color="white" />
            <div className="header backgroundimage1">
    <div className="top">
    <div className="dark-overlay landing-inner text-dark mt-4">
    <div className="tl container">
        <div style={{width:'80%',left:'10%',right:'10%',top:'10%'}} className="mt-4 col-md-12 text-center mt-4">
        <div style={{position:'relative',top:'200px'}}>
          <h1 id="head" className="text-heavy text-center display-4 mb-4 mt-5 text-light" style={{fontWeight:"heavier",fontSize:'4rem',width:'90%',position:'relative',left:'5%',marginTop:'40%'}}>No more bargain, the quality will not let you to
        </h1><br/>
        <Button className="btn btn-md" variant="outline-light">Search Items</Button>
          </div>
          </div>
    </div>
  </div>
  </div>
  </div>
            </div>
        )
    }
}

export default Landing;