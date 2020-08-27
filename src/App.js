import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MessageFeed from "./pages/MessageFeed";
import NotFound from "./pages/NotFound";

import ApiService from "./apiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.client = new ApiService();
    this.state = {
      users: [],
      messages: [],
      selectedUser: {
        about: "",
        createdAt: "",
        displayName: "",
        googleId: null,
        pictureLocation: null,
        updatedAt: "",
        username: "",
      },
      loggedInUser: {
        about: "",
        createdAt: "",
        displayName: "",
        googleId: null,
        pictureLocation: null,
        updatedAt: "",
        username: "",
      },
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getMessages();
  }

  getMessages = () => {
    this.client.getMessages().then((data) => {
      this.setState({ messages: data.data.messages });
    });
  };

  getUsers = () => {
    this.client.getUsers().then((data) => {
      this.setState({ users: data.data.users });
    });
  };

  getUser = (username) => {
    this.client.getUserByUsername(username).then((data) => {
      console.log(data.data.user);
    });
  };

  selectUser = (userObj) => {
    this.setState({ selectUser: userObj });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              users={this.state.users}
              messages={this.state.messages}
              getUser={(username) => this.getUser(username)}
            />
          )}
        />
        <Route
          path="/profile/:username"
          render={(props) => (
            <Profile
              {...props}
              username={props.match.params.username}
              user={this.state.selectedUser}
            />
          )}
        />
        <Route
          path="/messagefeed"
          render={(props) => (
            <MessageFeed
              {...props}
              users={this.state.users}
              messages={this.state.messages}
              getUser={(username) => this.getUser(username)}
            />
          )}
        />
        <Route exact path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
