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

class PropertyAds extends Component{
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
        fetch("http://127.0.0.1:4000/api/myProfile/",{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
              this.setState({flag:true})
      }
      handleClick = () =>{
        window.location.href = '/addProperty'
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
  
      componentDidMount(){
      this.getProfiles();
      this.getAds();
      this.getLiked();
      this.setState({loading:false})
    }
  
    render(){
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.properties.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => this.setState({currentPage:pageNumber});
    
        return (
            <div>
                <div>
            {this.state.loading ?
              <div class="ui segment">
              <div class="ui active dimmer">
                <div class="ui text loader">Loading</div>
              </div>
              <p></p>
            </div> 
            : 
            <div>
            <Navigation linkColor="white"  color="#556B2F" />
          
            <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <h1 style={{fontFamily:'Lora',textAlign:'center'}}>Dashboard</h1>
            <div class="ui horizontal divider">
            Your Advertisements
          </div>
          {this.state.profile.length > 0 ? <div> <h5 className="text-left">Number of Ads remaining: <b>{this.state.profile[0].Ad_quantity}</b></h5>
          <p style={{width:'50%',color:"tomato"}}>If your number of remaining Ads become 0 then you will have to buy new ones in order to publish new advertisements.</p></div>
          : null}
          <div style={{position:'relative',left:'75%'}} className="row"><div className="Col-lg-6">
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
        <br/><br/>
        <Posts properties={currentPosts} loading={this.state.loading} />
        <br/><br/>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      /> <br/><br/>      
                </div>
           </div> }
   </div>
            </div>
        )
    }
}

export default withCookies(PropertyAds)