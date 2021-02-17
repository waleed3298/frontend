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
import SideBar from '../sidebar';

class Dashboard extends Component{
  
  state={
        name:'',
        image:null,
        Age:'',
        flag:false,
        contact_no:'',
        loading: false,
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
    this.setState({loading:false})
    }

    
    render(){
    URL = '/AdDetails/'; 
        return(
            <div style={{fontFamily:'Lora'}} >
            {this.state.profile.length>0 ?
            <div>
            <div>
            <Navigation color="#34495E" />
            <SideNav style={{backgroundColor:'#34495E',height:'800px'}}
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
            <NavItem eventKey="search">
            <NavIcon>
            </NavIcon>
                <NavText>
                <a href="/search">Search Advertisements</a>
                </NavText>
            </NavItem>            
    </SideNav.Nav>
</SideNav>
            <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <div class="ui horizontal divider">
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
    <Button onClick={this.Ads} style={{position:'relative',left:'25%',backgroundColor:'#34495E'}}>View your advertisements</Button>
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
        <Button onClick={this.Saved} style={{position:'relative',left:'25%',backgroundColor:'#34495E'}}>View Saved advertisements</Button>
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
        <Button onClick={this.StoreItems} style={{position:'relative',left:'30%',backgroundColor:'#34495E'}}>View Store Items</Button>
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
        <Button style={{position:'relative',left:'35%',backgroundColor:'#34495E'}}>Check Sales</Button>
        </div>
      </div>
    </div>       
      
       </Col>
     </Row>
                </div>
           </div>
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