import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useHistory} from 'react-router-dom';
import {Spinner, Card, ListGroup, Button, Form} from 'react-bootstrap';
import moment from 'moment';
import Navigation from '../components/navbar';
import {
	getChats,
	selectChats,
	selectChatLoading,
	createChat,
	selectChatError,
	deleteChat
} from '../reducers/chatSlice';
import {selectIsLoggedIn, selectIsLoading} from '../reducers/userSlice';
import './HomePage.css';

function HomePage(match,props) {
	const dispatch = useCallback(useDispatch(), []);
	const chats = useSelector(selectChats);
	const isLoading = useSelector(selectChatLoading);
	const error = useSelector(selectChatError);
	const isAuthLoading = useSelector(selectIsLoading);
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const [username, setUsername] = useState('');
	const history = useHistory();
	const name = match.params
	if(name){
		console.log(match.params)
	}
    
	useEffect(() => {
		dispatch(getChats());
	}, [dispatch]);

	const changeUsername = e => {
		setUsername(e.target.value);
	};

	const submitCreateChat = e => {
		e.preventDefault();
		dispatch(createChat(username, history));
	};

	return (
		<div >
		<Navigation linkColor="#17223e" color="white"/>
		<div className="HomePage"><br/>
		<h2 style={{fontWeight:'bold',textAlign:'left',fontFamily:'Lora',position:'relative',top:'10%'}}>Inbox</h2><br/>
			{isLoading || isAuthLoading ? (
				<Spinner animation="grow" />
			) : (
				<Card>
					<Card.Header>
						<strong>Your conversations</strong>
					</Card.Header>
					<ListGroup variant="flush">
						{chats.map(chat => (
							<ListGroup.Item key={chat.uuid} className="chatLink">
								<a href={`/chat/${chat.uuid}`}>
									<span>{chat.user.username.toUpperCase()}</span>
									<span>{moment(chat.date_created).fromNow()}</span>
								</a>
								<Button variant="danger" onClick={() => dispatch(deleteChat(chat.uuid))}>
									Delete Chat
								</Button>
							</ListGroup.Item>
						))}

						<ListGroup.Item>
							<Form inline onSubmit={submitCreateChat}>
								<Form.Control
									className="mb-2 mr-sm-2"
									placeholder="username..."
									list="usernames"
									value={username}
									onChange={changeUsername}
									required={true}
								/>
								{/* <datalist id="usernames">
									<option value="nicholas"></option>
									<option value="admin"></option>
								</datalist> */}

								<Button
									type="submit"
									style={{float:'right'}}
									className="btn-md mb-2"
									disabled={!username && username.replace(/\s+/g, '') === ''}>
									Chat
								</Button>
							</Form>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			)}
			{error && <p style={{color: 'red'}}>{error}</p>}
		</div></div>
	);
}

export default HomePage;
