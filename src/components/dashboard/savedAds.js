import React,{Component} from 'react';
import Navigation from '../navbar';
import {withCookies} from 'react-cookie';
import Image from 'react-bootstrap/Image';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Pagination from '../pagination';
import '../components.css';
import Button from 'react-bootstrap/Button';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
  baseURL : "http://127.0.0.1:4000/api"
})

class SavedAds extends Component{
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

    Clicked = async(id) =>{
      await api.delete(`/Unlike/${id}/`)
      window.location.href = '/Saved'
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
      this.getLiked();
      this.setState({loading:false})
      }
    render(){
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const LikedAds = this.state.liked.slice(indexOfFirstPost,indexOfLastPost)
    const paginate = pageNumber => this.setState({currentPage:pageNumber});
    
        return(
            <div >
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
            <Navigation color="#556B2F" linkColor="white" />
            
            <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <h1 style={{fontFamily:'Lora',textAlign:'center'}}>Dashboard</h1>
        {this.state.liked.length>0 ? 
      <div>
       <div class="ui horizontal divider">
          Saved Advertisements
          </div>
        <br/><br/>
        <Row>
                {this.props.loading ? <h2>Loading...</h2> : null}
                {LikedAds.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div className="card">
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
                          <span className="mt-2">
                          <Row>
                            <Col lg={6}>
                            <Button onClick={()=>this.handleLink(property.Ad)} className="btn-md " style={{backgroundColor:'#34495E'}}>View Ad</Button>
                            </Col>
                            <Col lg={6}>
                            <Button onClick={()=>this.Clicked(property.id)} className="btn-md " style={{backgroundColor:'tomato'}}><i className="fa fa-thumbs-down"></i>Unlike Ad</Button>
                            </Col>
                          </Row>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })}
                </Row>
           </div>     : <h6>No liked Advertisements</h6> }
        <br/><br/>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.liked.length}
          paginate={paginate}
      /> <br/><br/>      
                </div>
           </div> }
   </div>
    
            </div>
        )
    }
}

export default withCookies(SavedAds);