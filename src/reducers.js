import ActionTypes from './actionTypes';
import _cloneDeep from 'lodash/cloneDeep';

const { 
	USER_LOADED, 
	USER_LOGOUT_SUCCESS, 
	USER_LOGIN_SUCCESS, 
	USER_LOGIN_ERROR, 
	USER_LOGIN_REDIRECT_REQUEST 
} = ActionTypes;

const UserReducer = (state = null, action) => {
	switch(action.type){
		case USER_LOADED:
		case USER_LOGIN_SUCCESS:
			return _cloneDeep(action.user);
		case USER_LOGIN_ERROR:
		case USER_LOGOUT_SUCCESS:
			return null;
		default:
			return state;
	}
}

const TokenReducer = (state = null, action) => {
	switch(action.type){
		case USER_LOADED:
		case USER_LOGIN_SUCCESS:
			return _cloneDeep(action.token);
		case USER_LOGIN_ERROR:
		case USER_LOGOUT_SUCCESS:
			return null;
		default:
			return state;
	}
}

const RedirectReducer = (state = null, action) => {
	switch(action.type){
		case USER_LOADED:
		case USER_LOGIN_REDIRECT_REQUEST:
			return _cloneDeep(action.redirectFromLogin);
		case USER_LOGOUT_SUCCESS:
		case USER_LOGIN_SUCCESS:
			return null;
		default:
			return state;
	}
}

const UserLoadedReducer = (state = false, action) => {
	switch(action.type){
		case USER_LOADED:
			return true;
		default:
			return state;
	}
}

export default {
	user: UserReducer,
	token: TokenReducer,
	redirectFromLogin: RedirectReducer,
	hasUserLoaded: UserLoadedReducer
};