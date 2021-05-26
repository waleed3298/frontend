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
import {Redirect} from 'react-router-dom';
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
add = () =>{
  window.location.href="/addProperty"
}
    componentDidMount(){
    this.getAds();
    this.getProfiles();
    this.Recent();
    this.setState({flag:true,loading:false})
    }
  edit = () =>{
    window.location.href=`/editProfile/${this.state.profile[0].id}`
  }

    
    render(){
    var URL = '/editproperty/'     
        return(
          <div style={{backgroundColor:'#f5f8fa',height:'100%'}}><Navigation linkColor="#233443"  color="#fcfbff" />      
          {this.state.loading===true ? 
            <LoaderExampleActive />
          :  <div style={{fontFamily:'Lora',marginTop:'6%'}} >
           <div>
            <div>
            
            <div style={{width:'60%',position:'relative',left:'20%'}} className="ui horizontal divider">
            <h1 style={{textAlign:'center',fontFamily:'Oswald',fontWeight:'bold',fontSize:'50px'}}>Dashboard</h1>
          </div>
            <Row style={{position:'relative',bottom:'15px'}}>
            <Col className="ml-2" lg={1} sm={1} md={1}>
            <Link to="/Saved">
            <button style={{backgroundColor:'white',color:'#0e8b75',borderRadius:'10px',marginBottom:'5%',width:'7vw',height:'10vh',position:'relative',left:'5%',top:'5%'}} className="btn btn-lg"><i className="fa fa-heart"></i>  Liked</button><br/>
            </Link><Link to="/dashboardAds">
 <button style={{backgroundColor:'white',color:'#0e8b75',borderRadius:'10px',marginBottom:'5%',width:'7vw',height:'10vh',position:'relative',left:'5%',top:'10%'}} className="btn btn-lg"><i className="fa fa-eye"></i>Listings</button></Link><br/>
 <Link to="/orders">
<button style={{backgroundColor:'white',color:'#0e8b75',borderRadius:'10px',marginBottom:'5%',width:'7vw',height:'10vh',position:'relative',left:'5%',top:'15%'}} className="btn btn-lg"><i className="fa fa-shopping-cart"></i>Orders</button></Link><br/><br/><br/><br/><br/>
<div>
{this.state.profile ? 
  <div>
  {console.log(this.state.profile)}
            <button onClick={this.edit} style={{backgroundColor:'white',color:'#0e8b75',borderRadius:'10px',marginBottom:'5%',width:'7vw',height:'10vh',position:'relative',left:'5%',top:'25%'}} className="btn btn-lg">Edit Profile</button><br/>
            </div>:
            <div>
            <Link to="/createProfile">
            <button style={{backgroundColor:'white',color:'#0e8b75',borderRadius:'10px',marginBottom:'5%',width:'7vw',height:'10vh',position:'relative',left:'5%',top:'20%'}} className="btn btn-lg">Create Profile</button><br/>
            </Link>
            </div>}
            </div>   </Col>
        <Col lg={6} sm={6} md={6}>{this.state.properties.length>0 ?
        <div>
          <h4 style={{position:'relative',left:'2%',fontWeight:'bold'}} className="ml-3">Listing Stats </h4>
          <i style={{color:'#0e8a75',float:'right',position:'relative',left:'10%'}} className="fa fa-circle "> Houses</i>    <i style={{color:'#ff6645',float:'right',position:'relative',left:'45%'}} className="fa fa-circle ml-3">  Plots and Commercial area</i>
            <BarChart xlabel="id" Ylabel="Views" style={{paddingRight:'15%'}}  width={900} height={400} data={this.state.properties}>
          <CartesianGrid strokeDasharray="3 3" />
    <XAxis label={{ value: "ID", position: "insideBottom", dy: 10}}  dataKey="id" stroke="#556b2f" padding={{ left: 10, right: 10 }}/>
    <YAxis  label={{ value: "Views", position: "insideLeft", angle: -90,   dy: -5}}  dataKey="Views" />
    <Tooltip />
    <Bar stackId="a" dataKey="Views" width="20px" >
                {
                  this.state.properties.map((entry, index) => (
                    <Cell fill={entry.Type === "property" ? '#0e8a75' : '#ff6645' }/>
         
           ))
                }
 </Bar>
  </BarChart></div>
   : <h4 style={{position:'relative',left:'10%',fontWeight:'bold'}}>No current listings to show stats</h4>}
         </Col>
         <Col lg={4} sm={12} md={12}>
         
         <div style={{position:'relative',left:'25vw'}} className="row">
          <div className="Col-lg-6">
          <Link to="/inbox">
          <p className="round-button ml-3"><i className="fa fa-envelope"></i></p>
          </Link>
          </div>
          <div className="Col-lg-6">
          {this.state.profile.length > 0 ?
          this.state.profile[0].Ad_quantity>0 ?
            <Link to='/addproperty'>
          <p onClick={this.add} className="round-button mr-2 ml-2"><i className="fa fa-plus"></i></p>
          </Link>
           : 
           <Link to='/adPayment'>
          <p className="round-button mr-2 ml-2"><i className="fa fa-plus"></i></p>
          </Link>
           :null}
          </div></div>
          
         
         {this.state.profile.length > 0 ? 
         <Card style={{marginLeft:'60%',marginTop:'6%',width:'60%',height:'50vh',borderRadius:'10px'}}>
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
      
      <h4 style={{position:'relative',left:'12%',fontWeight:'bold'}} className="ml-3">Recent Listings </h4>      <div style={{width:'70%',position:'relative',left:'15%',right:'20%'}}>
            
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
                      <Button className="btn-block " style={{backgroundColor:'#0e8b75'}}>Edit Ad</Button>
                      </Link>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })
     : <h6>No current Listings</h6>}
     </Row>
                </div>
           </div>
   </div>
         </div> }
    </div>)
    };
};

export default withCookies(Dashboard);