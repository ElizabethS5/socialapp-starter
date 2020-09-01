import React from "react";
import "./LoginOrRegisterForm.css";

import { Form, Button, Input, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

class LoginOrRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: true,
    };
  }

  toggleForm = (e) => {
    this.setState((currentState) => ({ loginForm: !currentState.loginForm }));
  };

  render() {
    return (
      <div className="RegisterForm">
        <Form layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please enter a username" },
              {
                min: 3,
                message:
                  "Username name must be at least 3 characters in length",
              },
            ]}
          >
            <Input
              onChange={this.props.handleChange}
              minLength={3}
              name="username"
              value={this.props.username}
            />
          </Form.Item>
          {!this.state.loginForm && (
            <Form.Item
              name="displayName"
              label="Display Name"
              rules={[
                { required: true, message: "Please enter a display name" },
                {
                  min: 3,
                  message:
                    "Display name must be at least 3 characters in length",
                },
              ]}
            >
              <Input
                onChange={this.props.handleChange}
                name="displayName"
                value={this.props.displayName}
              />
            </Form.Item>
          )}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password
              onChange={this.props.handleChange}
              name="password"
              value={this.props.password}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={this.props.remember}
              onChange={this.props.handleCheck}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          {this.state.loginForm && (
            <Button
              className="Button"
              type="primary"
              onClick={this.props.handleLogin}
            >
              Login
            </Button>
          )}
          {!this.state.loginForm && (
            <Button
              className="Button"
              type="primary"
              onClick={this.props.handleRegister}
            >
              Register
            </Button>
          )}
        </Form>

        <div className="or">or</div>
        <Button className="Button" onClick={this.toggleForm}>
          {this.state.loginForm
            ? "Create a new account"
            : "Log into existing account"}
        </Button>
      </div>
    );
  }
}
export default LoginOrRegisterForm;
