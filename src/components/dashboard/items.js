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
import dashboard from './dashboard';

class DashboardItems extends Component{
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
        items:[],
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
              this.setState({flag:true})
      }
      handleClick = () =>{
        window.location.href = '/addProperty'
      }
      getAds = () =>{
        if(this.state.token){
          this.setState({loading:true})
        fetch("http://127.0.0.1:4000/api/DashboardItems/",{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({items:res})).catch(error=>console.log(error));
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
    const currentPosts = this.state.items.slice(indexOfFirstPost, indexOfLastPost);
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
            Your Store Items
          </div>
          <a href="/AddItem" className="round-button ml-2"><i className="fa fa-plus"></i></a>
        <br/><br/>
        {this.state.items.length>0 ? 
        <Row>
                {this.state.items.map(item=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div style={{boxShadow: '10px 10px  #D5DBDB'}}  className="card">
                        <div className="image">
                          <img alt="Property" src={item.Image}/>
                        </div>
                        <div className="content">
                          <div className="header"></div>
                          <div className="meta">
                            {item.Title}
                          </div>
                          <div className="description">
                            {item.Price}
                            </div>
                        </div>
                        <div className="extra content">
                          <br/><br/>
                          <span className="mt-2">
                      <Link to={URL+item.id}>
                      <Button className="btn-md " style={{backgroundColor:'#34495E',marginLeft:'30px'}}>Edit Ad</Button>
                      </Link>
                      <Button className="btn-md mr-4" style={{backgroundColor:'#E74C3C',marginLeft:'30px'}}  onClick={()=>this.Clicked(item.id)}>Delete</Button>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })}
                </Row>
                : <h1>No items at the store</h1> }
        <br/><br/>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.items.length}
          paginate={paginate}
      /> <br/><br/>      
                </div>
           </div> }
   </div>
            </div>
        )
    }
}

export default withCookies(DashboardItems)