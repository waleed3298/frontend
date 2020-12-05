import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components.css';

class Footer extends React.Component{
  render(){
    return(
      <div className='footer'>
      <div className='top'>
      <Row  style={{position:'relative',left:'12%',top:'10px',padding:'5%'}}>
      <Col>
      <div>
      <b>Properties</b><br/>
      Houses<br/>
      Plots<br />
      Commercial Areas
      </div>
      </Col>
      <Col>
      <div>
      <b>About Us</b><br/>
      Contact<br/>
      Blog<br/>
      FAQ<br/>
      </div>
      </Col>
      <Col>
      <div>
      <b>Location</b><br/>
      Facebook<br/>
      Instagram<br/>
      Twitter<br/>
      </div>
      </Col>
      </Row>
      </div>
      </div>
    )
  }
}

export default Footer;
