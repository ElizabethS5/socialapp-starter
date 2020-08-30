import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Menu from "./components/menu/Menu";
import SignIn from "./pages/SignIn";
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
      auth: {
        username: "",
        token: "",
        displayName: "",
        password: "",
        remember: false,
      },
      loggedIn: false,
    };
  }

  handleChange = (e) => {
    const auth = { ...this.state.auth };
    auth[e.target.name] = e.target.value;
    this.setState({ auth });
  };

  handleCheck = (e) => {
    this.setState((currentState) => {
      const auth = { ...currentState.auth };
      auth.remember = !currentState.auth.remember;
      return { auth };
    });
  };

  handleLogin = (e) => {
    let loginObj = {
      username: this.state.auth.username,
      password: this.state.auth.password,
    };
    this.client
      .login(loginObj)
      .then((data) => {
        const auth = { ...this.state.auth };
        auth.token = data.data.token;
        auth.password = "";
        if (this.state.auth.remember) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("username", data.data.username);
        }
        this.setState({ auth });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleRegister = (e) => {
    console.log("register");
  };

  componentDidMount() {
    this.getUsers();
    this.getMessages();
    if (this.getTokenFromLocaleStorage()) {
      this.client
        .getUserByUsername(localStorage.getItem("username"))
        .then((data) => {
          console.log(data);
          this.setState({ loggedInUser: data.data.user });
        });
    }
  }

  getTokenFromLocaleStorage() {
    if (localStorage.getItem("token")) {
      console.log("still logged in");
      const auth = { ...this.state.auth };
      auth.username = localStorage.getItem("username");
      auth.token = localStorage.getItem("token");
      this.setState({ loggedIn: true, auth });
      return true;
    }
    return false;
  }

  getMessages = () => {
    this.client
      .getMessages()
      .then((data) => {
        data.data.messages.forEach((message) => {
          message.iLike = message.likes.some(
            (like) => like.username === this.state.auth.username
          );
        });
        this.setState({ messages: data.data.messages });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUsers = () => {
    this.client
      .getUsers()
      .then((data) => {
        this.setState({ users: data.data.users });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = (username) => {
    this.client
      .getUserByUsername(username)
      .then((data) => {
        console.log(data.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectUser = (userObj) => {
    this.setState({ selectUser: userObj });
  };

  likeMessage = (messageId) => {};

  render() {
    return (
      <div className="App">
        <Menu />
        <h2>Your favorite microblogging platform</h2>
        {this.state.auth.token !== "" && <Redirect from="/signin" to="/" />}
        {this.state.auth.token === "" && (
          <Redirect from="/profile/:username" to="/signin" />
        )}

        <Switch>
          <Route
            exact
            path="/signin"
            render={(props) => (
              <SignIn
                {...props}
                username={this.state.auth.username}
                displayName={this.state.auth.displayName}
                password={this.state.auth.password}
                remember={this.state.auth.remember}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
                handleRegister={this.handleRegister}
                handleCheck={this.handleCheck}
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
            exact
            path="/"
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
      </div>
    );
  }
}

export default App;
