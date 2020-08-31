import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

class Menu extends React.Component {
  render() {
    return (
      <div id="menu">
        <h1>Kwitter</h1>
        <div id="menu-links">
          <Link to="/">Message Feed</Link>

          {!this.props.loggedIn && <Link to="/signin">Login</Link>}

          {this.props.loggedIn && (
            <Link to={`/profile/${this.props.username}`}>My Profile</Link>
          )}

          {this.props.loggedIn && (
            <Link
              to="/"
              onClick={() => {
                this.props.handleLogout(this.props.token);
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Menu;
