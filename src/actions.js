import ActionTypes from './actionTypes';
import * as Selectors from './selectors';

export default ({ getItem, setItem, removeItem, loginLocation }) => ({
  Load: () => (dispatch, getState) => {
    const token = getItem('react-signin.token');
    const user = token && JSON.parse(getItem('react-signin.user'));
    // const isLoggedIn = !!token && !!user; // TODO && user.exp > Math.round(new Date().getTime() / 1000)
    const redirectFromLogin = getItem('react-signin.redirectFromLogin', null);

    dispatch({
      type: ActionTypes.USER_LOADED,
      user: user,
      token: token,
      redirectFromLogin: redirectFromLogin
    });
  },
  RedirectToLogin: (currentLocation, setLocation) => (dispatch, getState) => {
    setItem('react-signin.redirectFromLogin', currentLocation);

    dispatch({
      type: ActionTypes.USER_LOGIN_REDIRECT_REQUEST,
      redirectFromLogin: currentLocation
    });

    setLocation(loginLocation);
  },
  LoginUser: (user, token, setLocation) => (dispatch, getState) => {
    if(user && token){
      setItem('react-signin.token', token);
      setItem('react-signin.user', JSON.stringify(user));
      removeItem('react-signin.redirectFromLogin');

      let redirect = Selectors.getRedirectFromLogin(getState());

      dispatch({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        token: token,
        user: user
      });

      setLocation(redirect);

    }else{
      dispatch({
        type: ActionTypes.USER_LOGIN_ERROR,
        error: "Failed to parse response"
      });

      setLocation(loginLocation, {
        loginFailed: true, 
        error: "Failed to parse token"
      });
    }
  },
  Logout: (setLocation) => (dispatch, getState) => {
    removeItem('react-signin.token');
    removeItem('react-signin.user');
    removeItem('react-signin.redirectFromLogin');

    dispatch({
      type: ActionTypes.USER_LOGOUT_SUCCESS
    });

    setLocation(loginLocation);
  }
});