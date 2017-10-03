import ActionTypes from './actionTypes';
import * as Selectors from './selectors';

export default ({ getItem, setItem, removeItem, defaultLocation }) => ({
  Load: () => async (dispatch, getState) => {
    const token = await getItem('react-signin.token');
    const user = token && JSON.parse((await getItem('react-signin.user')));
    // const isLoggedIn = !!token && !!user; // TODO && user.exp > Math.round(new Date().getTime() / 1000)
    const redirectFromLogin = await getItem('react-signin.redirectFromLogin', null);

    dispatch({
      type: ActionTypes.USER_LOADED,
      user: user,
      token: token,
      redirectFromLogin: redirectFromLogin
    });
  },
  RedirectToLogin: (currentLocation, loginLocation, setLocation) => async (dispatch, getState) => {
    await setItem('react-signin.redirectFromLogin', currentLocation);

    dispatch({
      type: ActionTypes.USER_LOGIN_REDIRECT_REQUEST,
      redirectFromLogin: currentLocation
    });

    setLocation(loginLocation);
  },
  LoginUser: (user, token, loginLocation, defaultLocation, setLocation) => async (dispatch, getState) => {
    if(user && token){
      await setItem('react-signin.token', token);
      await setItem('react-signin.user', JSON.stringify(user));
      await removeItem('react-signin.redirectFromLogin');

      let redirect = Selectors.getRedirectFromLogin(getState()) || defaultLocation;

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
  Logout: (setLocation, loginLocation) => async (dispatch, getState) => {
    await removeItem('react-signin.token');
    await removeItem('react-signin.user');
    await removeItem('react-signin.redirectFromLogin');

    dispatch({
      type: ActionTypes.USER_LOGOUT_SUCCESS
    });

    setLocation(loginLocation);
  }
});