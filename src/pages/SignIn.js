import React from "react";
import LoginOrRegisterForm from "../components/loginOrRegisterForm/LoginOrRegisterForm";
import { Card } from "antd";

function SignIn(props) {
  return (
    <div className="Home">
      <Card>
        <LoginOrRegisterForm
          handleChange={props.handleChange}
          handleCheck={props.handleCheck}
          handleLogin={props.handleLogin}
          handleRegister={props.handleRegister}
          username={props.username}
          displayName={props.displayName}
          password={props.password}
          remember={props.remember}
        />
      </Card>
    </div>
  );
}

export default SignIn;
