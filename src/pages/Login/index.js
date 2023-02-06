import React from "react";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 获取跳转实例对象
  const navigate = useNavigate();
  const { loginStore } = useStore();
  const onFinish = async (values) => {
    console.log(values);
    const { mobile, code } = values;
    try {
      await loginStore.login({ mobile, code });
      navigate("/");
      message.success("登录成功");
    } catch (e) {
      message.error(e.response?.data?.message || "登录失败");
    }
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />

        {/* 表单 */}
        <Form
          validateTrigger={["onBlur"]}
          name="mobile"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialvalues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            initialvalues={{
              remember: true,
              mobile: "13711111111",
              code: "246810",
            }}
            label="Username"
            name="mobile"
            rules={[
              {
                required: true,
                message: "请输入手机号!",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确手机号!",
                validateTrigger: "onBlur",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="code"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
              {
                len: 6,
                message: "请输入6位密码",
                validateTrigger: "onBlur",
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 8,
            }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 2,
            }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
