export const getUser = state => state.user;
export const getToken = state => state.token;
export const getRedirectFromLogin = state => state.redirectFromLogin;
export const isUserLoggedIn = state => !!state.user;