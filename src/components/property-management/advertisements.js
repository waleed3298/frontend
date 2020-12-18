import React,{Component} from 'react';
import Navigation from '../navbar';
import {withCookies} from 'react-cookie';
import PropertyAd from './propertyads';
import Pagination from '../pagination';
import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Footer from '../footer';
class PropertyDisplay extends Component{
  state={
      loading: false,
      postsPerPage : 6,
      currentPage : 1,
      properties:[],
      selectedProperty :  null,
      token : this.props.cookies.get('ad-token')
    }
    getAds = () =>{
      if(this.state.token){
      fetch("http://127.0.0.1:4000/api/advertisements/",{
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
    
        return(
            <div id="wrapper">
            <Navigation  color="#34495E" />
            <SideNav style={{backgroundColor:'#34495E',height:'1400px'}}
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav  defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            <a href="/">Home</a>
            </NavText>
        </NavItem>
        <NavItem eventKey="maps">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            <a href="/map">Maps</a>
            </NavText>
          </NavItem>
            <NavItem eventKey="properties">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
                <NavText>
                <a href="/properties">Properties</a>
                </NavText>
            </NavItem>
            <NavItem eventKey="plots">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
                <NavText>
                <a href="/plots">Plots</a>
                </NavText>
            </NavItem>
            <NavItem eventKey="commercial">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
                <NavText>
                <a href="/commercial-areas">Commercial Areas</a>
                </NavText>
            </NavItem>
            
    </SideNav.Nav>
</SideNav>
      <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <h1 style={{fontFamily:'Lora',textAlign:'center'}}>Dashboard</h1>
            <div class="ui horizontal divider">
            Your Advertisements
          </div>
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

export default withCookies(PropertyDisplay);
