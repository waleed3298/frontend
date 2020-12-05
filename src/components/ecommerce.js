import React,{Component} from 'react';
import Navigation from './navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Ecom extends Component {
    state = {items:[]}

componentDidMount(){
    fetch("http://127.0.0.1:4000/api/items",{
    method : 'GET',
    headers : {
        Authorization :'Token 8a5d0fd34e04de34009dde7704a713416cc36835'
    }
}
    ).then(resp=>resp.json()).then(res=>this.setState({items:res})).catch(error=>console.log(error))
}

    render(){
        return (
        <div>
        <Navigation color="black" />
        <Row>
                {this.state.items.map(item=>{
                    return( 
                    <Col sm={12} md={6} lg={4}>
                    <div key={item.id}>
                    <Card style={{ width: '28rem' }}>
                    <Card.Img variant="top" style={{width:'28rem',height:'16rem'}} src={item.image_url} />
                    <Card.Body>
                        <Card.Title>{item.Title}</Card.Title>
                        <Card.Text>
                        {item.Description}
                        </Card.Text>
                        <Row>
                        </Row>
                        <Card.Text>{item.Price}</Card.Text>
                        <Button variant="primary">View Items</Button>
                    </Card.Body>
                    </Card>
                    </div>
                    </Col>
                    );
                })};
                </Row>
        </div>
        );
    };
}

export default Ecom;