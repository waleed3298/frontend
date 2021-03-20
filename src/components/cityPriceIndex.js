import React, { Component } from 'react'
import {Row,Col} from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

export default class cityPriceIndex extends Component {
    state={
        data:[]
    }
    getResults = () =>{
        let url = `http://127.0.0.1:4000/api/Cities/`
          axios.get(url,{
            headers:{
              'content-type':'multipart/form-data',
              'Authorization': `Token ${this.state.token}`
            }
          }).then(res=>this.setState({data:res.data})).catch(error=>this.setState({error:error}));    
          }
        componentDidMount(){
          this.getResults();
        }
      
    render() {
        return (
            <div>
            {console.log(this.state.data)}
                <Row>
                    <Col>
                    <LineChart width={600} height={300} data={this.state.cities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="City" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="City" />
                <YAxis />
                <Tooltip />
            </LineChart>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}
