import React from "react";
import { Input, Button, Card } from "antd";

function TextBox(props) {
  return (
    <div className="TextBox">
      <Card>
        <Input.TextArea
          placeholder="Write something"
          onChange={props.handleNewMessageChange}
          value={props.newMessage}
        />

        <Button type="primary" onClick={props.createMessage} className="Button">
          Submit
        </Button>
      </Card>
    </div>
  );
}
export default TextBox;
