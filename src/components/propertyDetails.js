import React,{Component} from 'react';
import Navigation from './navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './components.css';
import Data from './mapdata';

class PropertyDetails extends Component{
    state = {
      }
      getDetails = () =>{
        const { handle } = this.props.match.params
        fetch(`http://127.0.0.1:4000/api/AD/${handle}/`,{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({res})).catch(error=>console.log(error));
      }
      componentDidMount () {
       this.getDetails()
  }
        
      render() {
          const properties = [this.state.Property]
        return(
            <div>
            <Navigation color="#200444" />
            <br />
            {this.state.res ? 
            <div className="mt-4" style={{backgroundColor:'white',width:'80%'}}>
            <h1>{this.state.res.Title}</h1>
            <Row>
            <Col lg={6} sm={12}>
                <Image width="50%" height="40%" style={{borderRight:'1px solid grey'}} src={this.state.res.Image}></Image>
            </Col>
            <Col lg={6} sm={12}>
                <h4>{this.state.res.Description}</h4><hr/>
                <h6>{this.state.res.Price}</h6><hr />
                <h6>{this.state.res.Size}</h6><hr />
                <h6>{this.state.res.Units}</h6><hr />
            </Col>
            </Row>
            </div>
            : null }
            </div>
        )
      }
    }



export default PropertyDetails;

