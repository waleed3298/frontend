import React,{Component} from 'react';
import {Form , Button} from 'react-bootstrap';
import Navigation from './navbar';
class Chat extends Component{
    render(){
        return(
            <div>
                <Navigation color="#34495E" />
            <div style={{width:'60%',position:'relative',left:'20%',right:'20%',top:'20%'}}>
            <Form>
            <Form.Control name="Messages" as="textarea" rows={8}/>
            <hr/>
            <Form.Control  size="md" name="Price" type="text"  placeholder="Type Your Message" /><Button variant="info">Send</Button>
            </Form>
            </div>
            </div>
        )
    }
}
export default Chat;