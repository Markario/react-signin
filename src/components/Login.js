import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiDesc: null
    }
  }
  componentDidMount(){
    if(this.props.loginRoot === null || this.props.loginRoot === undefined){
      this.setState({apiDesc: {error: { message: "The app may be outdated."}}});
    }else{
      axios.get(this.props.loginRoot + "/login_descriptors").then(
        res => this.setState({apiDesc: res.data}), 
        err => this.setState({apiDesc: {error: {message: "Failed to load login"}}})
      );
    }
  }
  render() {
    if(!this.state.apiDesc){
      return null;
    }

    if(this.state.apiDesc.error){
      let error = this.state.apiDesc.error.message ? this.state.apiDesc.error.message : "Unknown error";
      return this.props.errorComponent ? 
        React.createElement(this.props.errorComponent, { error })
        : <div><p>{error}</p></div>;
    }

    let loginMethods = this.state.apiDesc.map(loginMethod => {
      let href = this.props.loginRoot + loginMethod.login;
      let name = loginMethod.name.charAt(0).toUpperCase() + loginMethod.name.slice(1);
      loginMethod.properName = name;
      loginMethod.href = href;
      return this.props.mapLoginToElement(loginMethod);
    });

    return (<div>{loginMethods}</div>);
  }
}

export default Login;
