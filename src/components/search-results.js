import React,{Component} from 'react';
import './components.css';
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';
class SearchResult extends Component{
    state = {
        token: this.props.cookies.get('ad-token'),
        handle :'',
        res:[],
        search:'',
    }
    componentDidMount(){
        if(this.state.token){
        fetch("http://127.0.0.1:4000/api/advertisements/",{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({res:res})).catch(error=>console.log(error));
      }
      else{
        window.location.href = '/login'
      }
}
  
    

handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value 
   });
  };
submit =() =>{
    console.log(this.state.res)
}
render(){
      return (
  <div className="header backgroundimage">
{this.state.res ? <div>
    {this.state.res.map(data => {
        <div key={data.id}>
        <h1>{data.Title}</h1>
        <p>{data.Description}</p>
  </div>  })}
</div> : <h1>State not changed yet</h1>}
</div>
          );
  };
}

export default withCookies(SearchResult);