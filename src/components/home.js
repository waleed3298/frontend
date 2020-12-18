import React, {Component} from 'react';
import './components.css';
class Home extends Component{

   MouseOver = (event) =>{
    event.target.style.color = '#457b9d';    
  }
   MouseOut = (event) =>{
    event.target.style.color="#34495E";
  }
    render(){
        return (<div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'5%',textAlign:'center'}}>
          <section id="features">
<div className="row">
  <div className="feature-box col-lg-4">
  <i onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} style={{fontSize:'50px'}} className="icon fas fa-check-circle fa-4x mb-4"></i>
    <h3 style={{fontWeight:'600'}}>Easy to use.</h3>
    <p>Buy and Sell your houses easily.</p>
</div>
<div className="feature-box col-lg-4">
  <i onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} style={{fontSize:'50px'}} className="icon fas fa-building fa-4x mb-4"></i>
    <h3 style={{fontWeight:'600'}}>Elite Clientele</h3>
    <p>We have all type of properties to deal with.</p>
</div>
<div className="feature-box col-lg-4">
    <i onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} style={{fontSize:'50px'}} className="icon fas fa-wrench fa-4x mb-4"></i>
    <h3 style={{fontWeight:'bold'}}>Construction Material</h3>
    <p>Buy and Sell All type of Construction Material.</p>
</div>
</div>
  </section>
          <br /><br/>
        </div>
        );
};
}
export default Home;
