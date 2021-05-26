import React,{Component} from 'react';
import Navigation from '../navbar';
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
      token : this.props.cookies.get('adtoken')
    }
    getAds = () =>{
      if(this.state.token){
      fetch("http://127.0.0.1:4000/api/Products/",{
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
          <div  style={{backgroundColor:'#fcfbff'}}>
                 <div style={{width:'80%',position:'relative',left:'10%',right:'20%'}}>
            <div class="ui horizontal divider">
            <h2 style={{fontWeight:'bold'}}>Some Top Products</h2>
          </div>
          <Row>
          {this.state.Items.length>0 ?
          currentPosts.map(product=>{
         return(
           <Col lg={3} md={6} sm={12}>
          <Card className="">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="h3">
                    ${product.price}
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

export default withCookies(Items)