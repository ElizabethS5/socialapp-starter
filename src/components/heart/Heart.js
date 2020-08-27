import React from "react";
import { Button, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import "./Heart.css";

function Heart(props) {
  let icon = <HeartOutlined />;
  if (props.liked) {
    icon = <HeartFilled />;
  }
  return (
    <div className="Heart">
      <Tooltip title="like">
        <Button className="like-button">{icon}</Button>
        {props.number}
      </Tooltip>
    </div>
  );
}
export default Heart;
