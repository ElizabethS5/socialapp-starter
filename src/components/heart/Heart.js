import React from "react";
import { Button, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import "./Heart.css";

class Heart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iLike: props.iLike,
      number: props.number,
      disable: false,
    };
  }

  componentDidMount() {
    this.setState((currentState, currentProps) => {
      if (currentProps.loggedIn) {
        return { disable: false };
      } else {
        return { disable: true };
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState((currentState) => ({ disable: !this.props.loggedIn }));
    }
    if (
      prevProps.iLike === this.props.iLike &&
      prevProps.loggedIn === this.props.loggedIn
    )
      return;
    this.setState((currentState, currentProps) => ({
      iLike: this.props.iLike,
      number: this.props.number,
    }));
  }

  startLoad() {
    return this.setState({ disable: true });
  }
  endLoad() {
    return this.setState({ disable: false });
  }

  toggleLike = () => {
    this.startLoad();
    if (!this.state.iLike) {
      this.props.likeMessage(this.props.messageId);
    } else {
      const myLike = this.props.likes.find(
        (like) => like.username === this.props.myUsername
      );
      this.props.deleteLike(myLike.id, myLike.messageId);
    }
    this.endLoad();
  };

  render() {
    let icon = <HeartOutlined />;
    if (this.state.iLike) {
      icon = <HeartFilled />;
    }
    return (
      <div className="Heart" onClick={this.toggleLike}>
        <Tooltip title={this.state.iLike ? "unlike" : "like"}>
          <Button className="like-button" disabled={this.state.disable}>
            {icon}
          </Button>
          {this.state.number}
        </Tooltip>
      </div>
    );
  }
}
export default Heart;
