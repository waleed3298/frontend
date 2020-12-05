import React,{Component} from 'react';
import "./components.css";
import Button from 'react-bootstrap/Button';
class Header extends Component{
    render(){
        return (
    <div className="header backgroundimage">
    <div className="top">
    <div className="dark-overlay landing-inner text-dark mt-4">
    <div className="tl container">
      <div className="row mt-4">
        <div className="col-md-12 text-center mt-4">
          <h1 className="text-heavy display-3 mb-4 mt-5 text-light" style={{fontWeight:"heavier"}}>Finding The Dream For Every Owner.
</h1>
          <p className="tl lead mt-4 text-light">Search Properties for sale in Pakistan</p>
          <input className="tl form-control form mt-4 mr-2" type="text" placeholder="Search for Properties"/>
          <Button className="button ml-2 btn-md" style={{backgroundColor:'#7BBc7f'}}>Search</Button>

          </div>
      </div>
    </div>
  </div>
  </div>
  </div>
            );
    };
}
export default Header;
