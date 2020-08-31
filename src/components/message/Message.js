import React from "react";
import TimeAgo from "react-timeago";
import Heart from "../heart/Heart";
import { Link } from "react-router-dom";
import { Comment, Avatar } from "antd";
import logo from "../../logo.svg";

class Message extends React.Component {
  render() {
    let pictureSrc = logo;
    if (this.props.user.pictureLocation) {
      pictureSrc =
        "https://socialapp-api.herokuapp.com" + this.props.user.pictureLocation;
    }
    let path = "/profile/" + this.props.data.username;
    return (
      <div className="Message">
        <Comment
          author={
            <>
              <Link to={path}>
                <strong>{this.props.user.displayName}</strong> @
                {this.props.data.username}
              </Link>
            </>
          }
          content={this.props.data.text}
          avatar={<Avatar src={pictureSrc} alt="logo" />}
          datetime={
            <TimeAgo
              date={new Date(this.props.data.createdAt)}
              title={new Date(this.props.data.createdAt).toLocaleString()}
            />
          }
          actions={[
            <Heart
              loggedIn={this.props.loggedIn}
              iLike={this.props.data.iLike}
              number={this.props.data.likes.length}
              token={this.props.token}
              messageId={this.props.data.id}
              likeMessage={this.props.likeMessage}
              deleteLike={this.props.deleteLike}
              likes={this.props.data.likes}
              myUsername={this.props.myUsername}
            />,
          ]}
        />
      </div>
    );
  }
}

export default Message;
