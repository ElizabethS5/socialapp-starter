import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

class Menu extends React.Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div id="menu">
        <h1>Kwitter</h1>
        <div id="menu-links">
          <Link to="/">Message Feed</Link>
          <Link to="/signin">Login</Link>
          <Link to={`/profile/${this.props.username}`}>My Profile</Link>
          <Link to="/signin" onClick={this.handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
