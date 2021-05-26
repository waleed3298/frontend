import React, { Component } from 'react'
import {withCookies} from 'react-cookie'
import Navigation from '../navbar';
class Blogdetail extends Component {
    state = {
        token:this.props.cookies.get('adtoken'),
        Blog:[],
    }
    getBlogs = () =>{
        const handle = this.props.match.params.handle
        fetch(`http://127.0.0.1:4000/api/Blog/${handle}/`,{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({Blog:res})).catch(error=>console.log(error));
    }
    componentDidMount(){
        this.getBlogs()
    }
    render() {
        return (
            <div>
            <Navigation linkColor="#233443"  color="#f5f7fa" />
            <div style={{marginTop:'5%'}}>
            {this.state.Blog.length!=0 ? 
                <div style={{width:'70%',position:'relative',left:'15%'}}>
                <img style={{width:'70vw',height:'70vh',position:'relative'}} src={this.state.Blog.Title_image} alt="title" /><br/><br/>
                <h2 style={{fontWeight:'bold',fontFamily:'Lora',textAlign:'center'}}>{this.state.Blog.Title}</h2>
                <p className="text-danger text-left">{this.state.Blog.genre}</p>
                <p>{this.state.Blog.para0}</p>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading1}</h3>
                <p>{this.state.Blog.para1}</p><br/>
                <img style={{width:'70vw',height:'70vh',position:'relative'}} src={this.state.Blog.extra_image1} alt="title" /><br/><br/>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading2}</h3>
                <p>{this.state.Blog.para2}</p><br/>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading3}</h3>
                <p>{this.state.Blog.para3}</p><br/>
               <br/> <img style={{width:'70vw',height:'70vh',position:'relative'}} src={this.state.Blog.extra_image2} alt="title" /><br/><br/>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading4}</h3>
                <p>{this.state.Blog.para4}</p><br/>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading5}</h3>
                <p>{this.state.Blog.para5}</p><br/>
               <br/> <img style={{width:'70vw',height:'70vh',position:'relative'}} src={this.state.Blog.extra_image1} alt="title" /><br/><br/>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading6}</h3>
                <p>{this.state.Blog.para6}</p><br/>
                <h3 style={{fontWeight:'bold',fontFamily:'Lora'}}>{this.state.Blog.subheading7}</h3>
                <p>{this.state.Blog.para7}</p><br/>
              </div>:null}
            </div> 
            </div>
        )
    }
}

export default withCookies(Blogdetail);