import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        newPassword: "",
        newDisplayName: "",
        newAbout: "",
      },
    };
  }
  handleChange = (e) => {
    const formData = { ...this.state.formData };
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  handleSubmit = (e) => {
    const password = this.state.formData.newPassword.trim();
    const displayName = this.state.formData.newDisplayName.trim();
    const about = this.state.formData.newAbout.trim();
    const updateObj = {};
    if (password.length > 2) {
      updateObj.password = password;
    }
    if (displayName.length > 2) {
      updateObj.displayName = displayName;
    }
    if (about.length > 2) {
      updateObj.about = about;
    }
    this.props.updateUser(updateObj);
    this.setState({
      formData: {
        newPassword: "",
        newDisplayName: "",
        newAbout: "",
      },
    });
  };

  render() {
    return (
      <div className="UpdateForm">
        <Form>
          <Form.Item label="New Display Name" name="newDisplayName">
            <Input
              onChange={this.handleChange}
              name="newDisplayName"
              value={this.state.formData.newDisplayName}
            />
          </Form.Item>
          <Form.Item label="New Password" name="newPassword">
            <Input.Password
              onChange={this.handleChange}
              name="newPassword"
              value={this.state.formData.newPassword}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item label="New About" name="newAbout">
            <Input.TextArea
              onChange={this.handleChange}
              name="newAbout"
              value={this.state.formData.newAbout}
            />
          </Form.Item>

          <Button type="primary" onClick={this.handleSubmit}>
            Update Profile
          </Button>
        </Form>
        <br />
        <br />
        <Form>
          <Form.Item>
            <Button type="danger" onClick={this.props.deleteUser}>
              Delete Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UpdateForm;
