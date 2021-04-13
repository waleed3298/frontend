import React,{Component} from 'react';
import Navigation from '../navbar';
import {withCookies} from 'react-cookie';
import PropertyAd from './propertyads';
import Pagination from '../pagination';
import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Footer from '../footer';

class Properties extends Component{
  state={
    loading: false,
    postsPerPage : 6,
    currentPage : 1,
    properties:[],
    selectedProperty :  null,
    token : this.props.cookies.get('adtoken')
  }

  getAds = () =>{
      if(this.state.token){
      fetch("http://127.0.0.1:4000/api/properties/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({properties:res})).catch(error=>console.log(error));
    }
    else{
      window.location.href = '/login'
    }
  }

    componentDidMount(){
      this.getAds();
    }

    render(){
      const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
      const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
      const currentPosts = this.state.properties.slice(indexOfFirstPost, indexOfLastPost);
      const paginate = pageNumber => this.setState({currentPage:pageNumber});
    
      var URL = '/AdDetails/'
        return(
            <div id="wrapper">
            <Navigation linkColor="white"  color="#556B2F" />
            
      <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <h1 style={{fontFamily:'Lora',textAlign:'center'}}>Houses For Sale</h1>
            <br/><br/>
          <PropertyAd properties={currentPosts} loading={this.state.loading} />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      />
                </div>
               
            </div>
        );
    };
};

export default withCookies(Properties);
