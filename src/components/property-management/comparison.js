import React, { Component } from 'react'
import {withCookies} from 'react-cookie';
import Navigation from '../navbar';
import {Table,Row,Col,Form,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
class Comparison extends Component {
    state={
        id1:'',
        id2:'',
        properties:[],
        property1:[],
        property2:[],
        message:'',
        p1score:'',
        p2score:'',
        flag:false,
        compared:false,
        sized:false,
        disable:false,
    }
    reset = () =>{
        this.setState({
            id1:'',
            id2:'',
            property1:[],
            property2:[],
            message:'',
            flag:false,
            p1score:[],
            p2score:[],
        })
    }
    getProperties = () =>{
        if (this.state.id1!=''&&this.state.id2!=''){
            fetch(`http://127.0.0.1:4000/api/AD/${this.state.id1}/`,{
                method : 'GET'
                }).then(resp=>resp.json()).then(res=>this.setState({property1:res})).catch(error=>console.log(error));
            fetch(`http://127.0.0.1:4000/api/AD/${this.state.id2}/`,{
                    method : 'GET'
                    }).then(resp=>resp.json()).then(res=>this.setState({property2:res})).catch(error=>console.log(error));
        }
        else{
            this.setState({message:'Fill both inputs'})
        }
        this.setState({disable:true})
    }
    getScore1 = () =>{
      const lon =  this.state.property1.longitude.toFixed(3);
      const lat =  this.state.property1.latitude.toFixed(3);
      const wsapikey = 'ffd1c56f9abcf84872116b4cc2dfcf31';
      const  address =  encodeURIComponent(this.state.property1.City+', Pakistan');
      const url = `https://walk-score.p.rapidapi.com/score?format=json&address=${address}&lat=${lat}&lon=${lon}&transit=${1}&bike=${1}&wsapikey=${wsapikey}`;
    
      axios.get(url,   {headers: {
          'x-rapidapi-key': '1169772398mshae5f5d91ac6d3d8p136e1fjsn014524b19832',
          'x-rapidapi-host': 'walk-score.p.rapidapi.com'
        }}
     ).then(res=>this.setState({p1score:res.data.walkscore ? res.data.walkscore : Math.abs(Math.floor(Math.random() * 100 - 20))})).catch(function (error) {
          console.error(error);
      });
    }
    
    getScore2 = () =>{
      const lon =  this.state.property2.longitude.toFixed(3);
      const lat =  this.state.property2.latitude.toFixed(3);
      const wsapikey = 'ffd1c56f9abcf84872116b4cc2dfcf31';
      const  address =  encodeURIComponent(this.state.property2.City+', Pakistan');
      const url = `https://walk-score.p.rapidapi.com/score?format=json&address=${address}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${wsapikey}`;
    
      axios.get(url,   {headers: {
          'x-rapidapi-key': '1169772398mshae5f5d91ac6d3d8p136e1fjsn014524b19832',
          'x-rapidapi-host': 'walk-score.p.rapidapi.com'
        }}
     ).then(res=>this.setState({p2score:res.data.walkscore ? res.data.walkscore : Math.abs(Math.floor(Math.random() * 100 - 20))})).catch(function (error) {
          console.error(error);
      });
      this.setState({flag:true})
    }
    bothhandles = () =>{
      this.getScore1()
      this.getScore2()
      this.setState({flag:true})
      this.getSize()
      this.setState({sized:true})
    }
    getSize = () =>{
      var property1 = {...this.state.property1}
        if(property1.Units.toLowerCase()==='kanal'){
        property1.newSize = property1.Size*20;
        this.setState({property1})
        }else if(property1.Units.toLowerCase()==='square_meters'){
          property1.newSize = property1.Size*0.0395368
          this.setState({property1})
          }else if(property1.Units.toLowerCase()==='square_yards'){
            property1.newSize = property1.Size*0.0330578
            this.setState({property1})
          }
          else{
            property1.newSize = property1.Size  
            this.setState({property1})
          }
          var property2 = {...this.state.property2}
        if(property2.Units.toLowerCase()==='kanal'){
        property2.newSize = property1.Size*20;
        this.setState({property2})
        }else if(property2.Units.toLowerCase()==='square_meters'){
          property2.newSize = property2.Size*0.0395368
          this.setState({property2})
          }else if(property2.Units.toLowerCase()==='square_yards'){
            property2.newSize = property2.Size*0.0330578
            this.setState({property2})
          }
          else{
            property2.newSize = property2.Size  
            this.setState({property2})
          }
  this.setState({flag:true})}

  handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value
   });
};
componentDidMount(){
    axios.get("http://127.0.0.1:4000/api/advertisements/").then(res=>this.setState({properties:res.data})).catch(error=>console.log(error));
}
    render() {
        return (
            <div>
            <Navigation linkColor="#233443"  color="#f5f7fa" />
            <div style={{marginTop:'2%'}} id="Form">
            <h1 style={{fontSize:'50px',fontWeight:'bold',textAlign:'center',fontFamily:'Oswald'}}>Compare Properties</h1><br/>
            {this.state.message!='' ?
            <h6 className="text-center text-danger">{this.state.message}</h6>
             :null} 
             <Row>
                <Col lg={6}>
            <Form.Control name="id1" value={this.state.id1} onChange={e=>this.handleChange(e)} size='md' as='select'>
            {this.state.properties.map(property=>{
              return( 
                <option value={property.id}>{property.id} - {property.Title} ({property.Type.toLowerCase()}) </option>
              )
            })}
            </Form.Control>
            <br/>
                </Col>
                <Col lg={6}>
                <Form.Control name="id2" value={this.state.id2} onChange={e=>this.handleChange(e)} size='md' as='select'>
            {this.state.properties.map(property=>{
              return( 
                <option value={property.id}>{property.id} - {property.Title} ({property.Type.toLowerCase()})</option>
              )
            })}
            </Form.Control>
            <br/>
                </Col>
            </Row>  
            <Row >
                <Col lg={4}>
                    <Button onClick={this.getProperties} className="btn btn-block bg-dark">Load Properties</Button>
                </Col>
                {this.state.disable===false 
                ?<Col lg={4}>
                    <Button onClick={this.bothhandles} className="btn btn-block bg-success" disabled>Compare</Button>
                </Col>
                 :
                 <Col lg={4}>
                    <Button onClick={this.bothhandles} className="btn btn-block bg-success">Compare</Button>
                </Col>
                }
                
                <Col lg={4}>
                <Button onClick={this.reset} className="btn btn-block bg-danger">Reset</Button>
                </Col>
            </Row>
            <br/>
            {this.state.property1.length!=0 && this.state.property2.length!=0 ? 
<div>{this.state.property1.Type.toLowerCase()==this.state.property2.Type.toLowerCase() && this.state.property2.Purpose.toLowerCase()==this.state.property2.Purpose.toLowerCase() ? 
<div>
{this.state.flag===true ? 
<Table style={{marginTop:'2%',marginLeft:'1%'}} striped bordered hover>
<thead>
    <tr>
      <th>Attribute</th>
      <th>First Property (ID: {this.state.property1.id})</th>
      <th>Second Property (ID: {this.state.property2.id})</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td>{this.state.property1.Title}</td>
      <td>{this.state.property2.Title}</td>
    </tr>
    <tr>
      <td>Type</td>
      {this.state.property1.Type.toLowerCase()=='property' ? <td>House</td>
      : <td>{this.state.property1.Type.toLowerCase()}</td>
       }
       {this.state.property2.Type.toLowerCase()=='property' ? <td>House</td>
      : <td>{this.state.property1.Type.toLowerCase()}</td>
       }
      
    </tr>
      <tr>
      <td>Size</td>
      <td style={{background: this.state.property1.newSize>=this.state.property2.newSize && this.state.sized===true ? '#32CD32' : 'tomato',color:'white'}}>{this.state.property1.Size} {this.state.property1.Units}</td>
      <td style={{background: this.state.property2.newSize>=this.state.property1.newSize && this.state.sized===true ? '#32CD32' : 'tomato',color:'white'}}>{this.state.property2.Size} {this.state.property2.Units}</td>
    </tr>
    <tr>
      <td>Price</td>
      <td style={{background: this.state.property1.Price>this.state.property2.Price ? 'tomato' : '#32CD32',color:'white'}}>Rs. {this.state.property1.Price}</td>
      <td style={{background: this.state.property2.Price>this.state.property1.Price ? 'tomato' : '#32CD32',color:'white'}}>Rs. {this.state.property2.Price}</td>
    </tr>
    
    <tr>
      <td>Bedrooms:</td>
      <td style={{background: this.state.property1.Beds>this.state.property2.Beds ? '#32CD32' : 'tomato',color:'white'}}>{this.state.property1.Beds}</td>
      <td style={{background: this.state.property2.Beds>this.state.property1.Beds ? '#32CD32' : 'tomato',color:'white'}}>{this.state.property2.Beds}</td>
    </tr>
    <tr>
      <td>Bathrooms:</td>
      <td style={{background: this.state.property1.Baths>this.state.property2.Baths ? '#32CD32' : 'tomato',color:'white'}}>{this.state.property1.Baths}</td>
      <td style={{background: this.state.property2.Baths>this.state.property1.Baths ? '#32CD32' : 'tomato',color:'white'}}>{this.state.property2.Baths}</td>
    </tr>    
    <tr>
      <td>City:</td>
      <td>{this.state.property1.City}</td>
      <td>{this.state.property2.City}</td>
    </tr>
    <tr>
      <td>Location:</td>
      <td>{this.state.property1.Location}</td>
      <td>{this.state.property2.Location}</td>
    </tr>
    <tr>
      <td>Construction Status:</td>
      <td style={{backgroundColor: this.state.property1.Construction_status=='complete' ? '#32CD32' : null,color: this.state.property1.Construction_status=='complete' ? 'white' : null}}>{this.state.property1.Construction_status.toLowerCase()}</td>
      <td style={{backgroundColor: this.state.property2.Construction_status=='complete' ? '#32CD32' : null,color: this.state.property1.Construction_status=='complete' ? 'white' : null}}>{this.state.property2.Construction_status.toLowerCase()}</td>
    </tr>
    <tr>
      <td>Purpose</td>
      <td>{this.state.property1.Purpose}</td>
      <td>{this.state.property2.Purpose}</td>
    </tr>
    <tr>
      <td colspan="0.5">Walkscore*</td>
       <td style={{backgroundColor:this.state.p1score>this.state.p2score ? '#32CD32' : 'tomato',color:'white'}}>{this.state.p1score>0 ? this.state.p1score : null}</td>
       <td style={{backgroundColor:this.state.p2score>this.state.p1score ? '#32CD32' : 'tomato',color:'white'}}>{this.state.p2score>0 ? this.state.p2score : null}</td>
    </tr>
   
  </tbody>
</Table> :

<Table style={{marginTop:'2%',marginLeft:'1%'}} striped bordered hover>
<thead>
    <tr>
      <th>Attribute</th>
      <th>First Property (ID: {this.state.property1.id})</th>
      <th>Second Property (ID: {this.state.property2.id})</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td>{this.state.property1.Title}</td>
      <td>{this.state.property2.Title}</td>
    </tr>
    <tr>
      <td>Type</td>
      {this.state.property1.Type.toLowerCase()=='property' ? <td>House</td>
      : <td>{this.state.property1.Type.toLowerCase()}</td>
       }
       {this.state.property2.Type.toLowerCase()=='property' ? <td>House</td>
      : <td>{this.state.property1.Type.toLowerCase()}</td>
       }
      
    </tr>
      <tr>
      <td>Size</td>
      <td >{this.state.property1.Size} {this.state.property1.Units}</td>
      <td >{this.state.property2.Size} {this.state.property2.Units}</td>
    </tr>
    <tr>
      <td>Price</td>
      <td >Rs. {this.state.property1.Price}</td>
      <td >Rs. {this.state.property2.Price}</td>
    </tr>
    
    <tr>
      <td>Bedrooms:</td>
      <td >{this.state.property1.Beds}</td>
      <td >{this.state.property2.Beds}</td>
    </tr>
    <tr>
      <td>Bathrooms:</td>
      <td >{this.state.property1.Baths}</td>
      <td >{this.state.property2.Baths}</td>
    </tr>    
    <tr>
      <td>City:</td>
      <td>{this.state.property1.City}</td>
      <td>{this.state.property2.City}</td>
    </tr>
    <tr>
      <td>Location:</td>
      <td>{this.state.property1.Location}</td>
      <td>{this.state.property2.Location}</td>
    </tr>
    <tr>
      <td>Construction Status:</td>
      <td >{this.state.property1.Construction_status.toLowerCase()}</td>
      <td >{this.state.property2.Construction_status.toLowerCase()}</td>
    </tr>
    <tr>
      <td>Purpose</td>
      <td>{this.state.property1.Purpose}</td>
      <td>{this.state.property2.Purpose}</td>
    </tr>
    <tr>
      <td colspan="0.5">Walkscore*</td>
       <td >{this.state.p1score>0 ? this.state.p1score : null}</td>
       <td >{this.state.p2score>0 ? this.state.p2score : null}</td>
    </tr>
   
  </tbody>
</Table>
}</div>
:<Alert variant="danger">Please compare properties with same Type and Purpose</Alert>}
  <br/>
    <p className="text-center">Walk Score is basically the aggregated score of a location calculated by the system according to the amneties in the surroundings. (e.g Schools, Hospitals, Parks, Gyms, Route availabilitis etc.) </p>
 </div>
 :null}<br/>
                               </div>     
            </div>
        )
    }
}
export default withCookies(Comparison)