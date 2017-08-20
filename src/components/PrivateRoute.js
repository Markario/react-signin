import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { Actions, Selectors } from '../redux';

class PrivateComponent extends Component {
  componentDidMount() {
    if(!this.props.isLoggedIn && this.props.location.pathname !== "/login"){
      this.props.RedirectToLogin(this.props.location.pathname, this.props.history);
    }
  }

  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let pathname = this.props.location.pathname;

    if(!isLoggedIn && pathname !== "/login"){
      return null;
    }

    return this.props.component;
  }
}
const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: Selectors.isUserLoggedIn(state)
});

PrivateComponent = connect(mapStateToProps, Actions)(PrivateComponent);

const privateComponent = (props, component) => <PrivateComponent component={component} {...props} />;

const renderRoute = ({ component, render, children, ...rest }) => {
  if(children){
    throw new Error("PrivateRoute is not compatible with Route.children props");
  }

  if(component){
    return <Route {...rest} render={ props => privateComponent(props, React.createElement(component, props)) } />
  }else if(render){
    return <Route {...rest} render={ props => privateComponent(props, render(props)) } />
  } 
}

class PrivateRoute extends Component {
  render(){
    return renderRoute(this.props);
  }
}

export default PrivateRoute;