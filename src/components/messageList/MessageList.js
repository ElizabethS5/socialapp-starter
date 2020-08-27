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
        {/* {JSON.stringify(this.props.users)} */}
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
            return <Message key={i} data={messageObj} user={user} />;
          })}
        </ul>
      </div>
    );
  }
}
export default MessageList;
