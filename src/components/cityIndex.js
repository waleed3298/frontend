import React, { Component } from 'react'
import {withCookies} from 'react-cookie';
import Navigation from './navbar';
import {Row,Col,ListGroup} from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
class CityIndex extends Component {
    state={
        data:[],
        handle:this.props.match.params.handle,
        token : this.props.cookies.get('adtoken'),
        index:[],
    }
    getResults = () =>{
        let url = `http://127.0.0.1:4000/api/PriceIndex?City=${this.state.handle}`
          axios.get(url,{
            headers:{
              'content-type':'multipart/form-data',
              'Authorization': `Token ${this.state.token}`
            }
          }).then(res=>this.setState({data:res.data})).catch(error=>this.setState({error:error}));    
          }
    
          getIndex = () =>{
            let url = `http://127.0.0.1:4000/api/Indices?City=${this.state.handle}`
              axios.get(url,{
                headers:{
                  'content-type':'multipart/form-data',
                  'Authorization': `Token ${this.state.token}`
                }
              }).then(res=>this.setState({index:res.data})).catch(error=>this.setState({error:error}));    
              }
    componentDidMount(){
        this.getResults()
        this.getIndex()
        console.log(this.state.handle)
    }

    render() {
        return (
            <div>
                   <Navigation color="#f5f8fa" linkColor="#23313e" />
            <div style={{marginTop:'5%',width:'90%',position:'relative',left:'5%'}}>
                <h1 style={{fontWeight:'bold',color:'green'}} className="text-center">Index details of {this.state.handle}</h1><br/>
            <Row>
                <Col lg={8} >
                <LineChart width={800} height={400} data={this.state.index} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="index" stroke="green" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="year" />
                <YAxis dataKey='index' />
                <Tooltip />
            </LineChart>
                </Col>
                <Col lg={4}>
                <ListGroup variant='flush'>
                <h3 style={{fontFamily:'Oswald',marginLeft:'2%'}}>City Real Estate ratios</h3>
                {this.state.data.length!=0 ?
                        <ListGroup.Item> 
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Price to income ratio: </b> {this.state.data[0].Price_to_income}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Mortgage interest ratio: </b> {this.state.data[0].Mortgage_interest_ratio}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Price to rent ratio: </b> {this.state.data[0].Price_to_rent}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Rental Yield: </b> {this.state.data[0].rental_yield}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Price per square meter: </b> {this.state.data[0].Price_per_sqr_mtr}</p>
                       </ListGroup.Item> : null}
                    </ListGroup>

                </Col>
            </Row>            
            </div>
            </div>
        )
    }
}
export default withCookies(CityIndex);