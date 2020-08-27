import React from "react";
import TimeAgo from "react-timeago";
import Heart from "../heart/Heart";
import { Link } from "react-router-dom";
import { Divider, Comment, Avatar } from "antd";
import logo from "../../logo.svg";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }
  componentDidMount() {
    if (this.state.user.username === "") {
    }
  }
  render() {
    let path = "/profile/" + this.props.data.username;
    return (
      <div className="Message">
        <Comment
          author={
            <>
              <strong>{this.props.user.displayName}</strong>{" "}
              <Link to={path}>@{this.props.data.username}</Link>
            </>
          }
          content={this.props.data.text}
          avatar={<Avatar src={logo} alt="logo" />}
          datetime={
            <TimeAgo
              date={this.props.data.createdAt}
              title={this.props.data.createdAt}
            />
          }
          actions={[
            <Heart liked={true} number={this.props.data.likes.length} />,
          ]}
        />
      </div>
    );
  }
}

export default Message;
