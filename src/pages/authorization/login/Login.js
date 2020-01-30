import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { GlobalContext } from "../../../context/GlobalContextProvider";
import { ROOT_PATH, CUSTOMER_INFO_PATH } from "../../../routes/NavigationPath";

import "./login.scss";

const WrappedLogin = props => {
  const { authContext } = useContext(GlobalContext);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        authContext.loginRequest(values);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  if (authContext.isLogin) return <Redirect to={ROOT_PATH} />;

  return (
    <div className="login_form_wrapper">
      <Form onSubmit={handleSubmit} className="login_form">
        <Row>
          <Col
            className="login_title"
            style={{
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            Mini Bank
          </Col>
          <Col
            className="login_title"
            style={{
              fontWeight: "bold",
              fontSize: "13px"
            }}
          >
            Internet Banking
          </Col>
        </Row>
        <br />
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              autoComplete={"new-email"}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("personalCode", {
            rules: [
              { required: true, message: "Please input your personal code!" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Personal Code"
              autoComplete={"new-code"}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              autoComplete={"new-password"}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={authContext.loading}
            className="login_form_button"
            icon="login"
          >
            Log in
          </Button>
          <a href={CUSTOMER_INFO_PATH} className="registerLink">
            Register For Internet Banking!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

const Login = Form.create({ name: "login" })(WrappedLogin);

export default Login;
