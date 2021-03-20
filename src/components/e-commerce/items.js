import React,{Component} from 'react';
import NavBar from './navbar';
import {withCookies} from 'react-cookie';
import PropertyAd from '../property-management/propertyads';
import Pagination from '../pagination';
import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Footer from '../footer';
import {Card,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class Items extends Component{
  state={
      loading: false,
      postsPerPage : 6,
      currentPage : 1,
      Items:[],
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
            }).then(resp=>resp.json()).then(res=>this.setState({Items:res})).catch(error=>console.log(error));
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
      const currentPosts = this.state.Items.slice(indexOfFirstPost, indexOfLastPost);
      const paginate = pageNumber => this.setState({currentPage:pageNumber});
    
        return(
            <div id="wrapper" style={{backgroundColor:'white'}}>
            <NavBar  color="#34495E" />
      <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <div class="ui horizontal divider">
            Your Advertisements
          </div>
          <Row>
          {this.state.Items.length>0 ?
          currentPosts.map(product=>{
         return(
           <Col lg={3} md={6} sm={12}>
          <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.id}`}>
                <Card.Img src={product.Image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.id}`}>
                    <Card.Title as="div">
                        <strong>{product.Title}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="h3">
                    ${product.Price}
                </Card.Text>
            </Card.Body>
        </Card></Col>
         )
        }) : null}
        </Row>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.Items.length}
          paginate={paginate}
      />
                </div>
               
            </div>
        );
    };
};

export default withCookies(Items);
