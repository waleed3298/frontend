import {createSlice} from '@reduxjs/toolkit';
import {useCookies} from 'react-cookie';
import {instance} from '../globals';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		isLoading: true,
		error: null
	},
	reducers: {
		loadUser: (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
			state.error = null;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
			state.error = null;
		},
		setUserError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
			state.user = null;
		},
		clearUser: state => {
			state.user = null;
			state.isLoading = false;
			state.error = null;
			localStorage.removeItem('token')
		}
	}
});

// ACTIONS
export const {loadUser, clearUser, setLoading, setUserError} = userSlice.actions;

// SELECTORS
export const selectUser = state => state.user.user;
export const selectIsLoading = state => state.user.isLoading;
export const selectAuthError = state => state.user.error;
export const selectIsLoggedIn = state => !!(!state.user.isLoading && state.user.user);

// THUNKS
export const login = (username, password) => dispatch => {
	dispatch(setLoading(true));
	instance
		.post('/auth/login/', {username, password})
		.then(res => dispatch(loadUser(res.data)))
		.catch(err =>
			dispatch(
				setUserError(
					(err.response && err.response.data.err) || 'An error occurred while logging in'
				)
			)
		);
	instance
	.post('auth/token/',{username,password})
	.then(res=>localStorage.setItem('token',res.data.token))
	.catch(err =>
		dispatch(
			setUserError(
				(err.response && err.response.data.err) || 'An error occurred while logging in'
			)
		)
	);
	
};


export const logout = () => dispatch => {
	const token = localStorage.getItem('token')
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Token ${token}`
		}
	}
	dispatch(setLoading(true));
	instance
		.post('/auth/logout/', {},config)
		.then(res => dispatch(clearUser()))
		.catch(err =>
			dispatch(
				setUserError(
					(err.response && err.response.data.err) || 'An error occurred while logging user out'
				)
			)
		);
};

export const checkStatus = () => dispatch => {
	const token = localStorage.getItem('token')
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Token ${token}`
		}
	}
	
	dispatch(setLoading(true));
	instance
		.get('/auth/status/',config)
		.then(res => dispatch(loadUser(res.data)))
		.catch(err => {
			dispatch(setLoading(false));

			// expect a 403 if user has no session active
			if (err.response && err.response.status !== 403) {
				dispatch(setUserError(err.response.data.err));
			} else if (!err.response) {
				dispatch(setUserError('An error occurred while checking user status'));
			}
		});
	};

export default userSlice.reducer;
