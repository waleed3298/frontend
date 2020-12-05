import React, {Component} from 'react';
import Market from './market.png';
import Sales from './for-sale.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Home extends Component{
    render(){
        return (<div>
          <h4 style={{textAlign:'center',fontSize:'1rem'}}>Vivid<b>Realty</b> is here to help you whether you are a</h4>
          <h4 style={{textAlign:'center',fontSize:'1rem'}}>Buyer or Seller</h4>
          <div style={{position:'relative',left:'20%'}}>
          <br/><br/><Row>
          <Col lg={4} md={6} sm={12}>
          <Card style={{ backgroundColor:'#f4f6f7',width: '22rem',padding:'20px',boxShadow: '0px 0px 20px grey',textAlign:'center' }}>
          <Card.Img style={{width:'10rem',position:'relative',left:'22%'}} variant="top" src={Sales} />
          <Card.Body>
            <Card.Title style={{fontSize:'18px'}}>Be a Seller</Card.Title>
            <Card.Text style={{fontSize:'12px'}}>
              What's the market price? Is it a good time to Sell?
              How to complete the procedure to sell a property?
            </Card.Text>
            <Button variant="primary">Sell my house -></Button>
          </Card.Body>
        </Card>
        </Col><br /><br/>
        <Col lg={4} md={6} sm={12}>
        <Card style={{ backgroundColor:'#f4f6f7',width: '22rem',padding:'20px',boxShadow: '0px 0px 20px grey',textAlign:'center' }}>
        <Card.Img style={{width:'10rem',position:'relative',left:'22%'}} variant="top" src={Market} />
        <Card.Body>
        <Card.Title style={{fontSize:'18px'}}>Be a Buyer</Card.Title>
        <Card.Text style={{fontSize:'12px'}}>
        How much is this house? Is this house overpriced?
        What's the procedure to buy a property?
        </Card.Text>
        <Button variant="primary">Buy a house -></Button>
        </Card.Body>
        </Card>
        </Col>
        </Row>
          </div>
          <br /><br/>
        </div>

        );
};
}
export default Home;
