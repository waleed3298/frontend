import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Navigation from './navbar'; 

class Results extends React.Component{
    
    state = {
        properties:[],
        postsPerPage : 6,
        currentPage : 1,
        
    }
    getDetails = () =>{
        const { handle } = this.props.match.params
        fetch(`http://127.0.0.1:4000/api/advertisements/?search=${handle}`,{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({properties:res})).catch(error=>console.log(error));
      }
    handleClick = (id) =>{
        window.location.href= `/AdDetails/${id}`
    }
    componentDidMount(){
        this.getDetails();
    }
    render(){
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.properties.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => this.setState({currentPage:pageNumber});
    URL = '/AdDetails/';
        return(
            <div >
            <Navigation color="#34495E" />
            <div style={{width:'80%',position:'relative',left:'10%'}}>
            <div className="ui horizontal divider">
                Seach Results
                  </div>
                {this.state.properties.length>0? 
                <Row>
                {currentPosts.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div style={{boxShadow: '10px 10px  #D5DBDB'}}  className="card">
                        <div className="image">
                          <img alt="Property" src={property.Image}/>
                        </div>
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
                          <span>
                            {property.Size} {property.Units}
                          </span><br/><br/>
                          <span className="mt-2">
                      <Button onClick={()=>this.handleClick(property.id)} className="btn-md " style={{backgroundColor:'#34495E',marginLeft:'30px'}}>View Advertisement</Button>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })}
                </Row>
                : <h1>No Results Found!!!</h1>
                }
                </div>
                
            </div>
        )
    }
}

export default Results;