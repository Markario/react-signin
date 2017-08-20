import { Actions } from './constants';
import * as Selectors from './selectors';

export const LoadFromWindow = (history) => (dispatch, getState) => {
  const token = window.localStorage.getItem('token');
  const user = token && JSON.parse(window.localStorage.getItem('user'));
  // const isLoggedIn = !!token && !!user; // TODO && user.exp > Math.round(new Date().getTime() / 1000)
  const redirectFromLogin = window.localStorage.getItem('redirectFromLogin', null);

  dispatch({
    type: Actions.USER_LOADED,
    user: user,
    token: token,
    redirectFromLogin: redirectFromLogin
  });
}

export const RedirectToLogin = (currentLocation, history) => (dispatch, getState) => {
	window.localStorage.setItem('redirectFromLogin', currentLocation);

  dispatch({
		type: Actions.USER_LOGIN_REDIRECT_REQUEST,
		redirectFromLogin: currentLocation
	});

	history.replace('/login');
}

export const LoginUser = (user, token, history) => (dispatch, getState) => {
  if(user && token){
  	window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
    window.localStorage.removeItem('redirectFromLogin');

  	let redirectURL = Selectors.getRedirectFromLogin(getState());

    dispatch({
    	type: Actions.USER_LOGIN_SUCCESS,
    	token: token,
    	user: user
    });

    history.replace(redirectURL ? redirectURL : "/");

  }else{
    dispatch({
    	type: Actions.USER_LOGIN_ERROR,
    	error: "Failed to parse response"
    });

    history.replace("/login?loginFailed=true&error=Failed+to+parse+token");
  }
}

export const Logout = (history) => (dispatch, getState) => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('redirectFromLogin');

  dispatch({
    type: Actions.USER_LOGOUT_SUCCESS
  });

  history.replace('/login');
}