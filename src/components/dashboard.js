import React,{Component} from 'react';
import Navigation from './navbar';
import {withCookies} from 'react-cookie';
import Image from 'react-bootstrap/Image';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Pagination from './pagination';
import Posts from './ads';
import './components.css';
import Button from 'react-bootstrap/Button';
class Dashboard extends Component{
  
  state={
        loading: true,
        postsPerPage : 3,
        currentPage : 1,
        properties:[],
        profile:[],
        selectedProperty :  null,
        token : this.props.cookies.get('ad-token')
    }
    getProfiles = () =>{
      fetch("http://127.0.0.1:4000/api/profile/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
          if(!this.state.profile){
              window.location.href='/createProfile'
          }
    
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

    componentDidMount(){
    this.getProfiles();
    this.getAds();
    this.setState({loading:false})
  }

    
    render(){
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.properties.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => this.setState({currentPage:pageNumber});
  
      
        return(
            <div style={{fontFamily:'Lora'}} id="wrapper">
            {this.state.loading ?
              <div class="ui segment">
              <div class="ui active dimmer">
                <div class="ui text loader">Loading</div>
              </div>
              <p></p>
            </div> 
            : 
            <div>
            <Navigation color="#34495E" />
            <SideNav style={{backgroundColor:'#34495E',height:'100%'}}
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav >
    {this.state.profile.map(data=>
    <NavItem  eventKey="Profile">
            <NavIcon>
            <Image alt="Profile Picture" style={{width:'50px',height:'50px',marginTop:'20px'}} src={data.image}></Image>
            </NavIcon>
            <NavText className="ml-4">
            <h6>Name:<b>{data.name}</b></h6>
            <h6>Age:{data.Age}</h6>
            <h6>Contact:{data.contact_no}</h6>
            </NavText>
        </NavItem>
        )}<br/><br/>
        <NavItem eventKey="home"><br/><br/>
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            <a href="/">Home</a>
            </NavText>
        </NavItem>
        <NavItem eventKey="maps">
            <NavIcon>
                <i className="fa fa-fw fa-map" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            <a href="/map">Maps</a>
            </NavText>
          </NavItem>
            <NavItem eventKey="properties">
            <NavIcon>
                </NavIcon>
                <NavText>
                <a href="/properties">Houses</a>
                </NavText>
            </NavItem>
            <NavItem eventKey="plots">
            <NavIcon>
                </NavIcon>
                <NavText>
                <a href="/plots">Plots</a>
                </NavText>
            </NavItem>
            <NavItem eventKey="commercial">
            <NavIcon>
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
        <Posts properties={currentPosts} loading={this.state.loading} />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      /> <Button onClick={this.handleClick} style={{backgroundColor:'#34495E',width:'200px'}}>Add New Property</Button><br/><br/>
                </div>
           </div> }
            </div>
        )
    };
};

export default withCookies(Dashboard);