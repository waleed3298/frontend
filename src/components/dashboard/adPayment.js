import React, { Component } from 'react';
import AdPay from '../adPay';
import Navigation from '../navbar';
import {withCookies} from 'react-cookie';
import axios from 'axios';
import {Row,Col,Form,Card} from 'react-bootstrap';
class AdPayment extends Component {
    state={
        profile : [],
        token : this.props.cookies.get('adtoken'),
        payment:''
    }
    getProfile = () =>{
        fetch("http://127.0.0.1:4000/api/myProfile/",{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
              this.setState({flag:true})
    }
    updateProfile = (e) =>{
        let ads = Number(this.state.profile[0].Ad_quantity) + Number(this.state.payment)
        e.preventDefault();
      let form_data = new FormData();
      form_data.append('Full_Name',this.state.profile[0].Full_Name);
      form_data.append('Ad_quantity', ads);
      let url = `http://127.0.0.1:4000/api/UpdateProfile/${this.state.profile[0].id}/`;
      axios.put(url,form_data,{
        headers:{
          'content-type':'multipart/form-data',
          'Authorization': `Token ${this.state.token}`
        }
      }).then(res=>console.log(res)).catch(error=>this.setState({error}));
      if(this.state.error){
        console.log(this.state.error)
      }
      else{
          window.location.href="dashboard"
      }
    }
    componentDidMount(){
        this.getProfile()
    }
    render() {
        return (
            <div>
            <div style={{width:'60%',position:'relative',left:'20%',top:'50px'}}>
            <h3 className="text-center">Select your package</h3><br/>
            {this.state.payment!='' ? console.log(this.state.payment) : null}
            <Row>
                <Col lg={4} md={4} sm={4}>
                <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Basic Package</Card.Title>
    <Card.Text>
    Publish four new property advertisements for just Rs.8000
    </Card.Text>
  </Card.Body>
</Card>
                </Col>
                <Col lg={4} md={4} sm={4} >
                <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Primary Package</Card.Title>
    <Card.Text>
    Publish four new property advertisements for just Rs.16000
    </Card.Text>
  </Card.Body>
</Card>
                </Col>
                <Col lg={4} md={4} sm={4}>
                <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Advanced Package</Card.Title>
    <Card.Text>
    Publish four new property advertisements for just Rs.20000
    </Card.Text>
  </Card.Body>
</Card>
                </Col>
            </Row>
            <Row>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Check
                            type='radio'
                            label='4 Advertisements'
                            id='package'
                            name='package'
                            value="4"
                            onChange={(e) => this.setState({payment:e.target.value})}
                        >
                        </Form.Check>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Check
                            type='radio'
                            label='10 Advertisements'
                            id='package'
                            name='package'
                            value="10"
                            onChange={(e) => this.setState({payment:e.target.value})}
                        >
                        </Form.Check>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                    <Form.Check
                            type='radio'
                            label='18 Advertisements'
                            id='package'
                            name='package'
                            value="18"
                            onChange={(e) => this.setState({payment:e.target.value})}
                        >
                        </Form.Check>
                    </Col>
                </Row><br/>  
            {this.state.payment=='4' ? <AdPay price='8000'/> : null }
            {this.state.payment=='10' ? <AdPay price='16000'/> : null }
            {this.state.payment=='18' ? <AdPay price='20000'/> : null }
          </div><br/>
            <button style={{width:'50%',position:'relative',left:'25%',top:'70px'}} onClick={this.updateProfile} className="btn btn-md btn-dark">Update Advertisement quantity</button>
            </div>
        )
    }
}

export default withCookies(AdPayment)