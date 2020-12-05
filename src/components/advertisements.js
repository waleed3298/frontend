import React,{Component} from 'react';
import Navigation from './navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';

const api = axios.create({
  baseURL : "http://127.0.0.1:4000/api"
})

class PropertyDisplay extends Component{
    state={
        properties:[],
        selectedProperty :  null,
    }
    getAds = () =>{
      fetch("http://127.0.0.1:4000/api/properties/",{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({properties:res})).catch(error=>console.log(error))
    }
    
    componentDidMount(){
      this.getAds();
    }
        
    Clicked = async(id) =>{
      let data = await api.delete(`/Delete/${id}/`)
      this.getAds();
    }
    render(){
        return(
            <div id="wrapper">
            <Navigation color="Black" />
            <h6>Search Results</h6>
            <Row>
                {this.state.properties.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={3}>
                    <div key={property.id}>
                    <CardDeck>
                      <Card style={{margin:'20px'}}>
                        <Card.Img variant="top" src={property.Image} />
                        <Card.Body>
                          <Card.Title>{property.Title}</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                      </Card>
                      </CardDeck>
                      <Button onClick={()=>this.Clicked(property.id)}>Delete</Button>
                      </div>
                    </Col>
                    )
                })};
                </Row>
            </div>
        );
    };
};

export default PropertyDisplay;
