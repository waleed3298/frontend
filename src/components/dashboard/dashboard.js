import React,{Component} from 'react';
import Navigation from '../navbar';
import {withCookies} from 'react-cookie';
import Image from 'react-bootstrap/Image';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Pagination from '../pagination';
import Posts from '../ads';
import '../components.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LoaderExampleActive from '../loader';

class Dashboard extends Component{  
  state={
        name:'',
        image:null,
        Age:'',
        flag:false,
        contact_no:'',
        loading: true,
        postsPerPage : 3,
        currentPage : 1,
        currentLikedPage : 1,
        properties:[],
        liked:[],
        profile:[],
        selectedProperty :  null,
        token : this.props.cookies.get('adtoken')
    }
    
    getProfiles = () =>{
      fetch("http://127.0.0.1:4000/api/profile/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
    }
  
getLiked = ()=>{
  if(this.state.token){
    this.setState({loading:true})
  fetch("http://127.0.0.1:4000/api/LikedAds/",{
        method : 'GET',
        headers:{
          'Authorization':`Token ${this.state.token}`
        }
        }).then(resp=>resp.json()).then(res=>this.setState({liked:res})).catch(error=>console.log(error));
     }
else{
  window.location.href = '/login'
}
}
handleLink = (id) =>{
  window.location.href = `/AdDetails/${id}`
}
Ads = () =>{
  window.location.href="http://localhost:3000/dashboardAds"
}
Saved = () =>{
  window.location.href="http://localhost:3000/Saved"
}
StoreItems = () =>{
  window.location.href="http://localhost:3000/StoreItems"
}

    componentDidMount(){
    this.getProfiles();
    this.getLiked();
    this.setState({flag:true,loading:false})
    }

    
    render(){
    URL = '/AdDetails/'; 
        return(
          <div>
          {this.state.loading===true ? 
            <LoaderExampleActive />
          :  <div style={{fontFamily:'Lora'}} >
           <div>
            <div>
            <Navigation linkColor="white"  color="#556B2F" />
            <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <div className="ui horizontal divider">
            <h1 style={{textAlign:'center',fontFamily:'Oswald'}}>Dashboard</h1>
          </div>
     <br/>
     <Row style={{height:'80%'}}>
       <Col lg={6}>
       <div style={{width:'200%',height:'100%',boxShadow: '10px 10px  #D5DBDB'}} className="ui raised card">
  <div className="content">
  <Image style={{width:'100px',height:'80px',position:'relative',left:'40%'}} src="/house.png"></Image><hr/>
    <div className="text-center meta">
      <span className="category">Check Property Listings</span>
    </div>
    <div className="description">
      <p>Check details and statistics of your property listings alongwith adding new ones</p>
    </div>
  </div>
  <div className="extra content">
    <div  className="floated author">
    <Button onClick={this.Ads} style={{position:'relative',left:'25%',backgroundColor:'#556B2F'}}>View your advertisements</Button>
    </div>
  </div>
</div>       
       </Col>
       <Col lg={6}>
       <div style={{width:'200%',height:'100%',boxShadow: '10px 10px  #D5DBDB'}} className="ui raised card">
      <div className="content">
      <Image style={{width:'100px',height:'80px',position:'relative',left:'40%'}} src="thumb-up.png"></Image><hr/>
      
        <div className="text-center meta">
          <span className="category">Saved Properties</span>
        </div>
        <div className="description">
          <p>Check the advertisements you saved in order to check later</p>
        </div>
      </div>
      <div className="extra content">
        <div  className="floated author">
        <Button onClick={this.Saved} style={{position:'relative',left:'25%',backgroundColor:'#556B2F'}}>View Saved advertisements</Button>
        </div>
      </div>
    </div>       
      </Col>
     </Row><br/>
     <Row>
       <Col lg={6}>
       <div style={{width:'300%',height:'100%',boxShadow: '10px 10px  #D5DBDB'}} className="ui raised card">
      <div className="content">
      <Image style={{width:'100px',height:'80px',position:'relative',left:'40%'}} src="tools.png"></Image><hr/>
      
        <div className="text-center meta">
          <span className="category">Check your store listings</span>
        </div>
        <div className="description">
          <p>Check the items you have listed on the online store to sell</p>
        </div>
      </div>
      <div className="extra content">
        <div  className="floated author">
        <Button onClick={this.StoreItems} style={{position:'relative',left:'30%',backgroundColor:'#556B2F'}}>View Store Items</Button>
        </div>
      </div>
    </div>       
       </Col>
       <Col lg={6}>
       <div style={{width:'300%',height:'100%',boxShadow: '10px 10px  #D5DBDB'}} className="ui raised card">
      <div className="content">
      <Image style={{width:'100px',height:'80px',position:'relative',left:'40%'}} src="money.png"></Image><hr/>
      
        <div className="text-center meta">
          <span className="category">Check Sales or retrieve amount</span>
        </div>
        <div className="description">
          <p>Check your store items sales or retrieve amount produced by the sales</p>
        </div>
      </div>
      <div className="extra content">
        <div  className="floated author">
        <Button style={{position:'relative',left:'35%',backgroundColor:'#556B2F'}}>Check Sales</Button>
        </div>
      </div>
    </div>       
      
       </Col>
     </Row>
                </div>
           </div>
   </div>
         </div> }
    </div>)
    };
};

export default withCookies(Dashboard);