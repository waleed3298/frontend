import {createSlice} from '@reduxjs/toolkit';

import {instance} from '../globals';

export const chatSlice = createSlice({
	name: ' chat',
	initialState: {
		messages: [],
		loading: false,
		error: null,
		chats: []
	},
	reducers: {
		loadMessages: (state, action) => {
			state.messages = [...action.payload, ...state.messages];
			state.loading = false;
		},
		loadMessage: (state, action) => {
			state.messages = [action.payload, ...state.messages];
			state.loading = false;
		},
		clearMessages: state => {
			state.messages = [];
			state.error = null;
		},
		loadChats: (state, action) => {
			state.chats = action.payload;
			state.loading = false;
		},
		filterChat: (state, action) => {
			state.chats = state.chats.filter(chat => chat.uuid !== action.payload);
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
			state.error = null;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		}
	}
});

// ACTIONS
export const {
	loadMessages,
	loadMessage,
	clearMessages,
	loadChats,
	setError,
	setLoading,
	filterChat
} = chatSlice.actions;

// SELECTORS
export const selectMessages = state => state.chat.messages;
export const selectChatLoading = state => state.chat.loading;
export const selectChatError = state => state.chat.error;
export const selectChats = state => state.chat.chats;

export const fetchMessages = chat_uuid => dispatch => {
	const token = localStorage.getItem('token')
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Token ${token}`
		}
	}
	
	dispatch(setLoading(true));
	instance
		.get(`/chat/${chat_uuid}/`,config)
		.then(res => dispatch(loadMessages(res.data)))
		.catch(err => dispatch(setError(err.response.data.detail)));
};

export const getChats = () => dispatch => {
	const token = localStorage.getItem('token')
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Token ${token}`
		}
	}
	dispatch(setLoading(true));
	instance
		.get('/chat/',config)
		.then(res => dispatch(loadChats(res.data)))
		.catch(err => {
			if (err.response) {
				dispatch(setError(err.response.data.detail));
			} else {
				dispatch(setError('Error fetching chats'));
			}
		});
};

export const createChat = (recipient, history) => dispatch => {
	const token = localStorage.getItem('token')
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Token ${token}`
		}
	}
	dispatch(setLoading(true));
	instance
		.post('/chat/', {recipient},config)
		.then(res => {
			const chat_uuid = res.data.uuid;
			dispatch(setLoading(false));
			history.push(`/chat/${chat_uuid}`);
		})
		.catch(err => {
			if (err.response.data.recipient && err.response.data.recipient.length) {
				dispatch(setError(err.response.data.recipient[0]));
			} else {
				dispatch(setError('Error creating new chat'));
			}
		});
};

export const deleteChat = chatUuid => dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Token b190ff994ed457db0834d770c9219949036d1bef`
		}
	}
	instance
		.delete(`/chat/${chatUuid}/delete/`,config)
		.then(res => dispatch(filterChat(chatUuid)))
		.catch(err => dispatch(setError(err.response.data.detail || 'Could not delete chat')));
};

export default chatSlice.reducer;
