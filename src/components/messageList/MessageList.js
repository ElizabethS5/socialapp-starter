import React from "react";
import Message from "../message/Message";
import "./MessageList.css";

class MessageList extends React.Component {
  render() {
    if (this.props.messages.length === 0 || this.props.users.length === 0) {
      return <div>Loading</div>;
    }
    return (
      <div className="MessageList">
        <ul>
          {this.props.messages.map((messageObj, i) => {
            let username = messageObj.username;
            let user = this.props.users.find(
              (user) => user.username === username
            );
            if (user === undefined) {
              user = {
                about: "",
                createdAt: "",
                displayName: "",
                googleId: null,
                pictureLocation: null,
                updatedAt: "",
                username: "",
              };
            }
            return (
              <Message
                key={i}
                data={messageObj}
                user={user}
                loggedIn={this.props.loggedIn}
                likeMessage={this.props.likeMessage}
                deleteLike={this.props.deleteLike}
                token={this.props.token}
                myUsername={this.props.myUsername}
                deleteMessage={this.props.deleteMessage}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
export default MessageList;
