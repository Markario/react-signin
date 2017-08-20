import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Actions } from '../redux';

function parseToken (token) {
  try{
    let data = JSON.parse(token);
    return data;
  }catch(SyntaxError){
    return null;
  }
}

class Token extends Component {
  componentWillMount() {
    let tokenParamMatch = RegExp('[?&]user=([^&]*)').exec(this.props.location.search);
    let tokenParam = tokenParamMatch && decodeURIComponent(tokenParamMatch[1].replace(/\+/g, ' '));
    let data = tokenParam ? parseToken(tokenParam) : null;

    //Will handle both success and failure scenarios
    this.props.LoginUser(data.user, data.token, this.props.history);
  }

  render() {
    return null;
  }
}

export default withRouter(connect(null, Actions)(Token));