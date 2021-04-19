import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {withCookies} from 'react-cookie'
import Navigation from '../navbar';
import NavBar from './navbar';

class AddItem extends Component{
    state = {
        token:this.props.cookies.get('adtoken'),
        Title:'',Image:null,Description:'',Price:'',Brand:'',Category:'',countInStock:'',
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
  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('Title',this.state.Title);
    form_data.append('Description',this.state.Description);
    form_data.append('Brand',this.state.Brand);
    form_data.append('Category',this.state.Category);
    form_data.append('Price',this.state.Price);
    form_data.append('countInStock',this.state.countInStock);
    if(this.state.Image!==null){
    form_data.append('Image',this.state.Image,this.state.Image.name);
    }
    let url = 'http://127.0.0.1:4000/api/CreateProduct/';
    axios.post(url,form_data,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
    
  }
    render(){
        return(
            <div>
            {this.state.token ? 
            <div id="wrapper">
                <NavBar color="#556B2F" />
                <div className="Form">
                   <Form onSubmit={this.handleSubmit} >
                       <Form.Group>
                           <div id="Form">
                               <h1 style={{textAlign:'center',fontFamily:'prata'}}>Add Item to the Store</h1>
                               <h3 className="text-info" style={{textAlign:'center',fontFamily:'Lora'}}>Item Details</h3>
                               <Form.Label>Ad Title</Form.Label>
                                <Form.Control size="md" name="Title" value={this.state.Title} onChange={e=>this.handleChange(e)} type="text" placeholder="Title for your Advertisement" /><br/><br/>
                        <Form.Label>Image</Form.Label>
                        <input type="file" id="image" accept="image/jpg,image/png" onChange={this.handleImageChange} />
                                <br />
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={this.state.Description} onChange={e=>this.handleChange(e)} name="Description" as="textarea" rows={3}/>
                                <br />
                        <Form.Label>Price</Form.Label>
                                <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Price" type="number" value={this.state.Price} placeholder="Price for your Item" />
                                <br />
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Brand" type="text" value={this.state.Brand} placeholder="Brand" />
                        <br />
                        <Form.Label>Category</Form.Label>
                                <Form.Control value={this.state.Category} name='Category' onChange={this.handleChange} size="md" as="select">
                                <option value="electric">Electric</option>
                                <option value="paints">Paint</option>
                                <option value="wallpaper">Wallpaper</option>
                                <option value="construction_tools">Construction Tools</option>
                                <option value="building_material">Building Material</option>
                                <option value="bathroom">Bathroom</option>
                                <option value="lighting">Lighting</option>
                                <option value="hardware">Hardware</option>
                                <option value="decor">Decor</option>
                                <option value="security">Security</option>
                                <option value="kitchen">Kitchen</option>
                                <option value="walls_and_flooring">Walls and Flooring</option>
                                </Form.Control>
                                <br />
                        <Form.Label>Stock Amount:</Form.Label>
                        <Form.Control onChange={e=>this.handleChange(e)} size="md" name="countInStock" type="text" value={this.state.Additional_specifications} placeholder="Number of items" />
                        <br />     
                        <Button style={{backgroundColor:'#556B2F',position:'relative',left:'40%',marginBottom:'100px'}} type="submit" >Submit</Button>
       
                           </div>
                       </Form.Group>
                   </Form> 
                </div>
            </div>
            : window.location.href="/login"}
            </div>
        )
    }
}

export default withCookies(AddItem)