import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {withCookies} from 'react-cookie';

class Views extends Component{
    state = {
        token : this.props.cookies.get('ad-token')
    }
    handleClick=()=>{
        window.location.href="/chat"
    }
    componentDidMount(){
        this.setViews()
    }
    setViews = () =>{
        let id = this.props.data.id;
        let form_data = new FormData();
          form_data.append('Title',this.props.data.Title);
          form_data.append('Description',this.props.data.Description);
          form_data.append('Type',this.props.data.Type);
          form_data.append('Location',this.props.data.Location);
          form_data.append('Construction_status',this.props.data.Construction_status);
          form_data.append('Price',this.props.data.Price);
          form_data.append('Size',this.props.data.Size);
          form_data.append('Units',this.props.data.Units);
          form_data.append('City',this.props.data.City);
          form_data.append('Beds',this.props.data.Beds);
          form_data.append('Baths',this.props.data.Baths);
          form_data.append('Purpose',this.props.data.Purpose);
          form_data.append('Views',this.props.data.Views+1)
        let url = `http://127.0.0.1:4000/api/Edit/${id}/`
        axios.put(url,form_data,{
            headers:{
              'content-type':'multipart/form-data',
              'Authorization': `Token ${this.state.token}`
            }
          }).then(res=>console.log(res)).catch(error=>console.log(error));        
      }
      
    render(){
        return(
            <div>
            <h6><b>Contact Seller</b> </h6>
            <Button style={{backgroundColor:'#34495E'}} onClick={this.handleClick}>Contact Seller</Button><br/><br/>
            </div>
        )
    }
}

export default withCookies(Views);