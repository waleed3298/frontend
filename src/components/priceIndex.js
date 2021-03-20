import React, { Component } from 'react'
import Navigation from './navbar';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './components.css';
import {Form,Row,Col,Button,Card,ListGroup} from 'react-bootstrap';
import {Grid,List} from 'semantic-ui-react';
import Graph from './graph';
import Cities from './cities';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class priceIndex extends Component {
    state={
        City:'',
        properties:[],
        islamabad:'',
        rawalpindi:'',
        lahore:'',
        karachi:'',
        hyderabad:'',
        sialkot:'',
        quetta:'',
        peshawar:'',
        data:[],
        Year:'y_2013',
    }
  getCities = () =>{
      let url = `http://127.0.0.1:4000/api/Cities/`
        axios.get(url,{
          headers:{
            'content-type':'multipart/form-data',
            'Authorization': `Token ${this.state.token}`
          }
        }).then(res=>this.setState({data:res.data})).catch(error=>this.setState({error:error}));    
        }
  
handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value 
   });
  };
  getResults = () =>{
    let url = `http://127.0.0.1:4000/api/CityIndex/1/`
      axios.get(url,{
        headers:{
          'content-type':'multipart/form-data',
          'Authorization': `Token ${this.state.token}`
        }
      }).then(res=>this.setState({data:res.data})).catch(error=>this.setState({error:error}));    
      }
    componentDidMount(){
      this.getResults();
      this.getCities();
    }
    render() {
        return (
            <div>
            <Navigation color="transparent" linkColor="white" />
            <div className="header backgroundimage2">
            <div className="top">
            <div className="dark-overlay landing-inner text-dark mt-2">
            <div className="tl container">
              <div  className="row">
                <div style={{width:'80%',left:'10%',right:'10%',top:'2%'}} className="mt-4 col-md-12 text-center mt-4">
                <div style={{position:'relative',top:'10%'}} className="row mt-4">
                <div className="col-lg-6 col-md-6">
                  <h1 id="head" className="text-heavy text-left display-4 mb-4 mt-5 text-light" style={{fontWeight:"heavier",fontSize:'5rem',position:'relative',right:'5%'}}>Real Estate price index and statistics</h1> 
                  </div><div className="col-lg-6 col-md-6">
               <Cities />    
                  </div>
                  </div>
                  </div>
              </div>
            </div>
          </div><br/><br/><br/><br/>
          </div>
          <br/>        
          </div>
          <Row style={{position:'relative',left:'15%',width:'70%'}}>
              <Col lg={4} md={4} sm={4}><Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Most Viewed Cities</strong></ListGroup.Item>
                    <ListGroup.Item>Karachi</ListGroup.Item>
                    <ListGroup.Item>Lahore</ListGroup.Item>
                    <ListGroup.Item>Rawalpindi</ListGroup.Item>
                </ListGroup>
                </Card></Col>
              <Col lg={4} md={4} sm={4}><Card style={{ width: '18rem' }}>
  <ListGroup variant="flush">
    <ListGroup.Item><strong>Highest Price to income ratio</strong></ListGroup.Item>
    <ListGroup.Item>Peshawar</ListGroup.Item>
    <ListGroup.Item>Sialkot</ListGroup.Item>
    <ListGroup.Item>Rawalpindi</ListGroup.Item>
  </ListGroup>
</Card></Col>
              <Col lg={4} md={4} sm={4}><Card style={{ width: '18rem' }}>
  <ListGroup variant="flush">
    <ListGroup.Item><strong>Lowest price to income ratio</strong></ListGroup.Item>
    <ListGroup.Item>Islamabad</ListGroup.Item>
    <ListGroup.Item>Lahore</ListGroup.Item>
    <ListGroup.Item>Karachi</ListGroup.Item>
  </ListGroup>
</Card></Col>
          </Row>
          <br/>
          <h1 className="text-center mt-4">Price per sqr ft of some famous cities of Pakistan</h1><br/>
          <div style={{marginLeft:'5%'}}>
          <Graph />
          </div>
          <div>
          <br/><br/>
          <h4 className="text-center">Comparing Price Indices of various cities in differect Years</h4>
          <Form style={{width:'20%',position:'relative',left:'80%'}}>
          <Form.Control value={this.state.Year} name='Year' onChange={this.handleChange} size="md" as="select">
                                        <option value="y_2013">Year 2013</option>
                                        <option value="y_2014">Year 2014</option>
                                        <option value="y_2015">Year 2015</option>
                                        <option value="y_2016">Year 2016</option>
                                        <option value="y_2017">Year 2017</option>
                                        <option value="y_2018">Year 2018</option>
                                        <option value="y_2019">Year 2019</option>
                                        <option value="y_2020">Year 2020</option>
                                        <option value="y_2021">Year 2021</option>
                                        </Form.Control>                        
          </Form><br/>
          <div style={{marginLeft:'30%',marginTop:'5%'}}>
          <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey={this.state.Year}  stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="City" />
                <YAxis />
                <Tooltip />
            </LineChart>
          </div>
          </div>
          </div>
          );
    }
}
