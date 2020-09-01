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
      auth: {
        username: "",
        token: "",
        displayName: "",
        password: "",
        remember: false,
      },
      loggedIn: false,
      newMessage: "",
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getMessages();
    if (this.getTokenFromLocaleStorage()) {
      this.client
        .getUserByUsername(localStorage.getItem("username"))
        .then((data) => {
          this.setState({ selectedUser: data.data.user });
        });
    }
  }

  handleNewMessageChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

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
        auth.remember = true;
        if (this.state.auth.remember) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("username", data.data.username);
        }
        this.setState({ auth, loggedIn: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleLogout = () => {
    this.client
      .logout(this.state.auth.token)
      .then((data) => {
        console.log(data.data);
        const auth = { ...this.state.auth };
        auth.token = "";
        auth.username = "";
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        }
        this.setState({ auth, loggedIn: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleRegister = (e) => {
    const registrationObj = {
      username: this.state.auth.username,
      displayName: this.state.auth.displayName,
      password: this.state.auth.password,
    };
    this.client
      .createUser(registrationObj)
      .then((data) => {
        console.log(data);
        this.handleLogin();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTokenFromLocaleStorage() {
    if (localStorage.getItem("token")) {
      console.log("still logged in");
      const auth = { ...this.state.auth };
      auth.username = localStorage.getItem("username");
      auth.token = localStorage.getItem("token");
      auth.remember = true;
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

  createMessage = () => {
    let text = this.state.newMessage.trim();
    if (text === "") return;
    this.client
      .createMessage(text, this.state.auth.token)
      .then((data) => {
        console.log(data);
        this.setState((currentState) => {
          const messages = [data.data.message, ...currentState.messages];
          return { messages };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteMessage = (messageId) => {
    this.client
      .deleteMessage(messageId, this.state.auth.token)
      .then((data) => {
        console.log(data);
        const messages = [...this.state.messages].filter(
          (message) => message.id !== data.data.id
        );
        this.setState({ messages });
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
        return this.setState({ selectedUser: data.data.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectUser = (userObj) => {
    this.setState({ selectUser: userObj });
  };

  updateUser = (updateData) => {
    this.client
      .updateUser(this.state.auth.username, updateData, this.state.auth.token)
      .then((data) => {
        this.setState({ selectedUser: data.data.user, newMessage: "" });
      })
      .catch((error) => {
        console.log(console.error());
      });
  };

  deleteUser = () => {
    this.client
      .deleteUser(this.state.auth.username, this.state.auth.token)
      .then((data) => {
        console.log(data);
        const messages = [...this.state.messages].filter(
          (message) => message.username !== data.data.username
        );

        this.setState({
          auth: {
            username: "",
            token: "",
            displayName: "",
            password: "",
            remember: false,
          },
          loggedIn: false,
          messages,
        });
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  likeMessage = (messageId) => {
    this.client
      .like({ messageId: messageId }, this.state.auth.token)
      .then((data) => {
        this.setState((currentState) => {
          const messages = [...currentState.messages];
          const message = messages.find(
            (message) => message.id === data.data.like.messageId
          );
          message.likes.push(data.data.like);
          message.iLike = true;
          return { messages };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteLike = (likeId, messageId) => {
    this.client
      .deleteLike(likeId, this.state.auth.token)
      .then((data) => {
        console.log(data.data);
        this.setState((currentState) => {
          const messages = [...currentState.messages];
          const message = messages.find((message) => message.id === messageId);
          console.log(data.data.id);
          const index = message.likes.findIndex(
            (like) => like.id === data.data.id
          );
          message.likes.splice(index, 1);
          message.iLike = false;
          console.log(message);
          return { messages };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <Menu
          loggedIn={this.state.loggedIn}
          username={this.state.auth.username}
          token={this.state.auth.token}
          handleLogout={this.handleLogout}
        />
        {this.state.auth.token !== "" && <Redirect from="/signin" to="/" />}
        {this.state.auth.token === "" && (
          <Redirect from="/profile/:username" to="/" />
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
                getUser={this.getUser}
                username={props.match.params.username}
                selectedUser={this.state.selectedUser}
                messages={this.state.messages.filter(
                  (message) => message.username === props.match.params.username
                )}
                loggedIn={this.state.loggedIn}
                likeMessage={this.likeMessage}
                deleteLike={this.deleteLike}
                token={this.state.auth.token}
                myUsername={this.state.auth.username}
                updateUser={this.updateUser}
                deleteUser={this.deleteUser}
                deleteMessage={this.deleteMessage}
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
                loggedIn={this.state.loggedIn}
                likeMessage={this.likeMessage}
                deleteLike={this.deleteLike}
                token={this.state.auth.token}
                myUsername={this.state.auth.username}
                newMesage={this.state.newMessage}
                handleNewMessageChange={this.handleNewMessageChange}
                createMessage={this.createMessage}
                deleteMessage={this.deleteMessage}
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
