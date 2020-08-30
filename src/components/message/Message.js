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
      iLike: props.data.iLike,
      number: props.data.likes.length,
    };
  }
  componentDidMount() {
    if (this.state.user.username === "") {
    }
  }

  toggleLike = () => {
    this.setState((currentState) => {
      let number = currentState.number;
      if (currentState.iLike) {
        number -= 1;
      } else {
        number += 1;
      }
      return { number, iLike: !currentState.iLike };
    });
  };

  render() {
    let x = 0;
    if (this.props.data.iLike) {
    }
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
            <Heart
              liked={this.state.iLike}
              number={this.state.number}
              toggleLike={this.toggleLike}
            />,
          ]}
        />
      </div>
    );
  }
}

export default Message;
