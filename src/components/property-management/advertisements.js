import React,{Component} from 'react';
import Navigation from '../navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import {withCookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Footer from '../footer';
class PropertyDisplay extends Component{
  state={
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
      var URL = '/AdDetails/'
        return(
            <div id="wrapper">
            <SideNav style={{backgroundColor:'#04164b',height:'1400px'}}
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
            <h6>Search Results</h6>
            <Row>
                {this.state.properties.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
                    <div key={property.id}>
                    <CardDeck style={{position:'relative',left:'10%'}}>
                      <Card style={{margin:'20px',width:'25%'}}>
                        <Card.Img variant="top" src={property.Image} />
                        <Card.Body>
                          <Card.Title>{property.Title}</Card.Title>
                          <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                      </Card>
                      </CardDeck>
                      <Link to={URL+property.id}>
                      <Button>View Advertisement</Button>
                      </Link>
                      </div>
                    </Col>
                    )
                })};
                </Row>
  <Footer />                
            </div>
        );
    };
};

export default withCookies(PropertyDisplay);
