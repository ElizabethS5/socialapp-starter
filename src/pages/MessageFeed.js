import React from "react";
import MessageList from "../components/messageList/MessageList";

class MessageFeed extends React.Component {
  render() {
    return (
      <div className="MessageFeed">
        <MessageList messages={this.props.messages} users={this.props.users} />
      </div>
    );
  }
}
export default MessageFeed;
