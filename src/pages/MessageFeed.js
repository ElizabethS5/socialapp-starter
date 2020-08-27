import React from "react";
import Menu from "../components/menu/Menu";
import MessageList from "../components/messageList/MessageList";

class MessageFeed extends React.Component {
  render() {
    return (
      <div className="MessageFeed">
        <Menu />
        <MessageList messages={this.props.messages} users={this.props.users} />
      </div>
    );
  }
}
export default MessageFeed;
