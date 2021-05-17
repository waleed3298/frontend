import React,{Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';
export default class Graph extends Component{
  
state={
  cities:[],
}
  getResults = () =>{
let url = `http://127.0.0.1:4000/api/PriceIndex/`
  axios.get(url,{
    headers:{
      'content-type':'multipart/form-data',
    }
  }).then(res=>this.setState({cities:res.data})).catch(error=>this.setState({error:error}));    
  }
  componentDidMount(){
    this.getResults();
  }
  render(){
    return (
    <div>
    <Row>
      <Col lg={6} md={12} sm={12}>
      <div>
    <h6>Price per square feet</h6>
  <LineChart width={600} height={300} data={this.state.cities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="Price_per_sqr_mtr" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="City" />
    <YAxis />
    <Tooltip />
  </LineChart>
  </div>
 
      </Col>
      <Col lg={6} md={12} sm={12}>
      <div>
  <h6>Price to income ratio</h6>
  <LineChart width={600} height={300} data={this.state.cities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="Price_to_income" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="City" />
    <YAxis />
    <Tooltip />
  </LineChart>
  </div>
  
 
      </Col>
    </Row>
  </div>
)}
}