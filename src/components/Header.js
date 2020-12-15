import React,{Component} from 'react';
import "./components.css";
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';
import {Link} from 'react-router-dom';

class Header extends Component{
  state = {
    search:'',
  }
  
handleChange = (event) =>{
  const value = event.target.value;
 this.setState({
   [event.target.name]: value 
 });
};
    render(){
      var URL = '/results/'
        return (
    <div className="header backgroundimage">
    <div className="top">
    <div className="dark-overlay landing-inner text-dark mt-4">
    <div className="tl container">
      <div className="row mt-4">
        <div className="col-md-12 text-center mt-4">
          <h1 className="animate__animated animate__bounce text-heavy display-3 mb-4 mt-5 text-light" style={{fontWeight:"heavier"}}>Finding The Dream For Every Owner.
</h1>
          <p className="tl lead mt-4 text-light">Search Properties for sale in Pakistan</p>
          <input name="search" onChange={this.handleChange} value={this.state.value} className="tl form-control form mt-4 mr-2" type="text" />
          <i class="search icon"></i>
          <Link to={URL+this.state.search}>
          <Button onClick={this.submit} className="button ml-2 btn-lg" style={{backgroundColor:'#7BBc7f'}}>Search</Button>
          </Link>
          </div>
      </div>
    </div>
  </div>
  </div>
  </div>
            );
    };
}
export default withCookies(Header);
