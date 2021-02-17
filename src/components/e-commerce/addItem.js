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
        token:this.props.cookies.get('ad-token'),
        Title:'',Image:null,Description:'',Price:'',Discounted_Price:'',Category:'',Type:'',Additional_specifications:'',
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
    form_data.append('Type',this.state.Type);
    form_data.append('Discounted_Price',this.state.Discounted_Price);
    form_data.append('Category',this.state.Category);
    form_data.append('Price',this.state.Price);
    form_data.append('Additional_specifications',this.state.Additional_specifications);
    if(this.state.Image!==null){
    form_data.append('Image',this.state.Image,this.state.Image.name);
    }
    let url = 'http://127.0.0.1:4000/api/CreateItem/';
    axios.post(url,form_data,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
    if(this.state.error){
        return this.state.error
    }
    else{
        window.location.href="http://localhost:3000/dashboard"
    }
  }
    render(){
        return(
            <div>
            {this.state.token ? 
            <div id="wrapper">
                <NavBar color="#34495E" />
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
                        <Form.Label className="mt-1">Item Type</Form.Label>
                        <Form.Control type="text" name="Type" value={this.state.Type} onChange={this.handleChange} />
                        <Form.Label>Price</Form.Label>
                                <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Price" type="number" value={this.state.Price} placeholder="Price for your Item" />
                                <br />
                        <Form.Label>Discounted Price (if any)</Form.Label>
                        <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Discounted_Price" type="number" value={this.state.Discounted_Price} placeholder="Discounted Price" />
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
                        <Form.Label>Additional Features</Form.Label>
                        <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Additional_specifications" type="text" value={this.state.Additional_specifications} placeholder="Additional Features of item" />
                        <br />     
                        <Button style={{backgroundColor:'#3A626F',position:'relative',left:'40%',marginBottom:'100px'}} type="submit" >Submit</Button>
       
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