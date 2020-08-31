import React from "react";
import logo from "../logo.svg";
import { Image } from "antd";
import TimeAgo from "react-timeago";
import Message from "../components/message/Message";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.username);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.username === this.props.username) return;
    this.props.getUser(this.props.username);
  }
  render() {
    let pictureSrc = logo;
    if (this.props.selectedUser.pictureLocation) {
      pictureSrc =
        "https://socialapp-api.herokuapp.com" +
        this.props.selectedUser.pictureLocation;
    }

    return (
      <div className="Profile">
        <h2>
          {this.props.selectedUser.displayName} @
          {this.props.selectedUser.username}
        </h2>
        <Image width={200} src={pictureSrc} />
        <p>About: {this.props.selectedUser.about}</p>
        <p>
          Started Kwitter:{" "}
          <TimeAgo
            date={new Date(this.props.selectedUser.createdAt)}
            title={new Date(this.props.selectedUser.createdAt).toLocaleString()}
          />
        </p>
        <p>
          Last Updated Kwitter:{" "}
          <TimeAgo
            date={new Date(this.props.selectedUser.updatedAt)}
            title={new Date(this.props.selectedUser.updatedAt).toLocaleString()}
          />
        </p>
        {this.props.messages.map((message, i) => (
          <Message
            key={i}
            data={message}
            user={this.props.selectedUser}
            loggedIn={this.props.loggedIn}
            token={this.props.token}
            likeMessage={this.props.likeMessage}
            deleteLike={this.props.deleteLike}
            myUsername={this.props.myUsername}
          />
        ))}
      </div>
    );
  }
}

export default Profile;
