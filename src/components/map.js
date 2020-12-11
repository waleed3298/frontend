import React , {Component} from 'react';
import Data from './mapdata';
import axios from 'axios';

class Map extends Component{
  state = {
    properties:[]
  }
    componentDidMount() {
    axios.get(`http://127.0.0.1:4000/api/properties/`)
      .then(res => {
        const properties = res.data;
        this.setState({ properties });
      })
  }

  render(){
    return(
      <Data width="100vw" height="100vh" data={this.state}/>
    )
  }
}
export default  Map;
