import React from "react";
import MessageList from "../components/messageList/MessageList";

class MessageFeed extends React.Component {
  render() {
    return (
      <div className="MessageFeed">
        <MessageList
          messages={this.props.messages}
          users={this.props.users}
          loggedIn={this.props.loggedIn}
          likeMessage={this.props.likeMessage}
          deleteLike={this.props.deleteLike}
          token={this.props.token}
          myUsername={this.props.myUsername}
          // username={this.props.username}
          // displayName={this.props.displayName}
          // password={this.props.password}
          // remember={this.props.remember}
          // handleChange={this.props.handleChange}
          // handleLogin={this.props.handleLogin}
          // handleRegister={this.props.handleRegister}
          // handleCheck={this.props.handleCheck}
        />
      </div>
    );
  }
}
export default MessageFeed;
