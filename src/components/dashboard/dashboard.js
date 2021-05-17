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
import { BarChart,LineChart,Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Grid,Segment} from 'semantic-ui-react';
import { Card, Icon,Divider } from 'semantic-ui-react'
class Dashboard extends Component{  
  state={
        name:'',
        image:null,
        Age:'',
        flag:false,
        contact_no:'',
        recent:[],
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
      fetch("http://127.0.0.1:4000/api/myProfile/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
    }
    getAds = () =>{
      if(this.state.token){
        this.setState({loading:true})
      fetch("http://127.0.0.1:4000/api/dashboard/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({properties:res})).catch(error=>console.log(error));
            this.setState({loading:false})
         }
    else{
      window.location.href = '/login'
    }
  }
  Recent = () =>{
    if(this.state.token){
      this.setState({loading:true})
    fetch("http://127.0.0.1:4000/api/recent/",{
          method : 'GET',
          headers:{
            'Authorization':`Token ${this.state.token}`
          }
          }).then(resp=>resp.json()).then(res=>this.setState({recent:res})).catch(error=>console.log(error));
          this.setState({loading:false})
       }
  else{
    window.location.href = '/login'
  }
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
    this.getAds();
    this.getProfiles();
    this.getLiked();
    this.Recent();
    this.setState({flag:true,loading:false})
    }

    
    render(){
    var URL = '/editproperty/'     
        return(
          <div style={{backgroundColor:'#f2f2f2'}}>
          {this.state.loading===true ? 
            <LoaderExampleActive />
          :  <div style={{fontFamily:'Lora'}} >
           <div>
            <div>
            
            <Navigation linkColor="#52ab98"  color="#ffffff" />
            <div className="ui horizontal divider">
            <h1 style={{textAlign:'center',fontFamily:'Oswald'}}>Dashboard</h1>
          </div>
          <div style={{position:'relative',left:'80%'}} className="row"><div className="Col-lg-6">
          <Link to='/inbox'>
          <p className="round-button mr-3"><i className="fa fa-envelope"></i></p>
          </Link>
          </div>
          <div className="Col-lg-6">
          {this.state.profile.length > 0 ?
          this.state.profile[0].Ad_quantity>0 ?
            <Link to='/addproperty'>
          <p className="round-button ml-2"><i className="fa fa-plus"></i></p>
          </Link>
           : 
           <Link to='/adPayment'>
          <p className="round-button ml-2"><i className="fa fa-plus"></i></p>
          </Link>
           :null}
          </div></div>
            <Row>
        <Col lg={8} sm={8} md={8}>{this.state.properties.length>0 ?
        <div style={{marginLeft:'5%'}}>
        <h4  className="ml-3">Advertisement Statistics: </h4>
          <BarChart style={{backgroundColor:'#ffffff',paddingRight:'15%'}}  width={900} height={400} data={this.state.properties}>
    <XAxis Legend="ID"  dataKey="id" stroke="#556b2f" padding={{ left: 10, right: 10 }}/>
    <YAxis  dataKey="Views" />
    <Tooltip />
    <Bar dataKey="Views" fill="#c8d8e4" barSize={30} />
  </BarChart></div> : <p>No properties data</p>}
         </Col>
         <Col>
         {this.state.profile.length > 0 ? 
         <Card style={{marginLeft:'20%',marginTop:'6%',width:'60%',height:'50vh',borderRadius:'10px'}}>
      <Card.Content>
        <Image
          size='small'
          src='/person.jpg'
       circular style={{borderRadius:'150px',marginLeft:'30%',marginBottom:'10%',width:'50%'}} /><br/>
        <Card.Meta style={{fontSize:'20px'}} className="text-center">{this.state.profile[0].Full_Name}</Card.Meta><br/>
        <Card.Description style={{position:'relative',bottom:'10px'}}>
          <p>Gender: {this.state.profile[0].Gender ? this.state.profile[0].Gender : "Not Provided" }</p>
          <p>Age: {this.state.profile[0].Age ? this.state.profile[0].Age : "Not Provided" }</p>
          <p>CNIC No: {this.state.profile[0].CNIC ? this.state.profile[0].CNIC : "Not Provided" }</p>
        </Card.Description>
      </Card.Content>
      
  </Card>
   : null}
         </Col>
      </Row><br/>
      <h4 style={{position:'relative',left:'20px'}} className="ml-4">Recent Listings:</h4>
            <div style={{width:'70%',position:'relative',left:'15%',right:'20%'}}>
            
       <br/>
     <Row style={{height:'80%'}}>
     {this.state.recent.length>0 ?
      this.state.recent.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={3}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div className="card">
                        <div className="image">
                          <img alt="Property" src={property.Image}/>
                        </div>
                        <div className="content">
                          <div className="header"></div>
                          <div className="meta">
                            {property.Title}
                          </div>
                          <div className="description">
                            {property.Price}
                            </div>
                        </div>
                        <div className="extra content">
                          <span className="right floated">
                          <i className="fa fa-eye mr-2" style={{ fontSize: '1em' }} />
             {property.Views}
                          </span>
                          <span>
                            {property.Size} {property.Units}
                          </span><br/><br/>
                          <span className="mt-2">
                      <Link to={URL+property.id}>
                      <Button className="btn-block " style={{backgroundColor:'#52ab98'}}>Edit Ad</Button>
                      </Link>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })
     : null}
     </Row>
                </div>
           </div>
   </div>
         </div> }
         <h4 style={{position:'relative',left:'20px'}} className="ml-4">Dashboard Events:</h4>
         <div style={{width:'70%',position:'relative',left:'15%'}} class="ui cards">
  <div class="card">
    <div class="content">
      <div class="description">
        View or Edit your Listings 
      </div>
    </div>
    <Link to="/dashboardAds">
    <Button style={{backgroundColor:'#94618e'}} className="btn btn-block"><i style={{color:'white'}} className="fa fa-eye"></i> Listings</Button></Link>
 </div>
  <div class="card">
    <div class="content">
      <div class="description">
        Check for the Listings you saved for later
      </div>
    </div>
    <Link to="/Saved">
    <Button style={{backgroundColor:'#94618e'}} className="btn btn-block"><i style={{color:'white'}} className="fa fa-heart"></i> Liked</Button></Link>
  </div>
  <div class="card">
    <div class="content">
      <div class="description">
       View and manage your order summary
      </div>
    </div>
    <Link to="/orders">
    <Button style={{backgroundColor:'#94618e'}} className="btn btn-block"><i style={{color:'white'}} className="fa fa-shopping-cart"></i> Orders</Button></Link>
 </div>
</div> 
    </div>)
    };
};

export default withCookies(Dashboard);