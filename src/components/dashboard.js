import React,{Component} from 'react';
import Navigation from './navbar';
import {withCookies} from 'react-cookie';
import Image from 'react-bootstrap/Image';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Pagination from './pagination';
import Posts from './ads';
import './components.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
        token : this.props.cookies.get('ad-token')
    }
    handleChange = (event) =>{
      const value = event.target.value;
     this.setState({
       [event.target.name]: value
     });
  };
  handleImageChange = (e) =>{
      this.setState({image:e.target.files[0]})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name',this.state.name)
        form_data.append('Age',this.state.Age)
        form_data.append('contact_no',this.state.contact_no)
        let url = 'http://127.0.0.1:4000/api/createProfile/';
          axios.post(url,form_data,{
            headers:{
              'content-type':'multipart/form-data',
              'Authorization': `Token ${this.state.token}`
            }
          }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
          if(this.state.error){
            return <h1>{this.state.error}</h1>
          }
          else{
            window.location.href="/dashboard"
          }
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
    const LikedAds = this.state.liked.slice(indexOfFirstPost,indexOfLastPost)
    const paginate = pageNumber => this.setState({currentPage:pageNumber});
    const paginate_saved = pageNumber => this.setState({currentLikedPage:pageNumber});
    
    URL = '/AdDetails/'; 
      
        return(
            <div style={{fontFamily:'Lora'}} id="wrapper">
            {this.state.profile.length>0 ?
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
          <div style={{position:'relative',left:'75%'}} className="row"><div className="Col-lg-6">
          <a href="/addProperty" className="round-button mr-3"><i className="fa fa-envelope"></i></a>
          </div>
          <div className="Col-lg-6">
          <a href="/addProperty" className="round-button ml-2"><i className="fa fa-plus"></i></a>
          </div></div>
        <br/><br/>
        <Posts properties={currentPosts} loading={this.state.loading} />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      /> <br/><br/>
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
                      <Button onClick={()=>this.handleLink(property.Ad)} className="btn-md " style={{backgroundColor:'#34495E',marginLeft:'30px'}}>View Advertisement</Button>
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
          paginate={paginate_saved}
      />
                </div>
           </div> }
   </div> : 
   <div>
   <Navigation color="#34495E" />
            <div className="Form">
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                        <div id="Form">
                        <h1 style={{textAlign:'center',fontFamily:'prata'}}>Create Profile</h1><br />
                        <h3 className="text-info" style={{textAlign:'center',fontFamily:'Lora'}}>Personal Information</h3>
                        <Form.Label>Name</Form.Label>
                                <Form.Control size="md" name="name" value={this.state.name} onChange={e=>this.handleChange(e)} type="text" placeholder="Your Name" /><br/><br/>
                        <Form.Label>Age</Form.Label>
                                <Form.Control size="md" name="Age" value={this.state.Age} onChange={e=>this.handleChange(e)} type="number" placeholder="Your Name" /><br/><br/>
                        
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control size="md" name="contact_no" value={this.state.contact_no} onChange={e=>this.handleChange(e)} type="text" placeholder="Your Contact Number" /><br/><br/>
                        <Button style={{backgroundColor:'#3A626F',position:'relative',left:'40%',marginBottom:'100px'}} type="submit" >Submit</Button>
      
            </div>
            </Form.Group>
            </Form>
            </div>
            </div>
    }     </div>
        )
    };
};

export default withCookies(Dashboard);