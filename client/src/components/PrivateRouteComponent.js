import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => ({
  user: state.user
});

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.islogin === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));