import { useState, createRef } from "react";
import { Card, Col, Form, Input, Row, Select } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

import Header from "../../components/header";
import { verify } from "jsonwebtoken";
import Link from "next/link";

const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({ req }) {
  // check for login
  const jwt = req.cookies.jwt;

  let users = null;
  let isLoggedIn;
  try {
    users = verify(jwt, secreteKEY);
    isLoggedIn = true;
  } catch (error) {
    isLoggedIn = false;
  }

  return {
    props: {
      users,
      isLoggedIn,
    },
  };
}

export default function Company({ isLoggedIn, users }) {
  const [User, setUser] = useState({});
  const recaptchaRef = createRef();
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    string: {
      range: "${label} must be at least ${min}",
    },
  };

  const handleSubmit = async (val) => {
    const { password, cpassword } = val;
    if (password === cpassword) {
      //set User data
      setUser(val);
      // Execute the reCAPTCHA when the form is submitted
      recaptchaRef.current.execute();
    } else {
      alert("Confirmation password is Incorrect");
    }
  };

  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    const { password, email, phoneNumber, organization, username } = User;
    let response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        phoneNumber,
        organization,
        username,
        role: "company",
        captcha: captchaCode, //recaptcha code
      }),
    });
    response = await response.json();
    if (response.status === 200) {
      alert("Successfully registered");
    } else {
      alert(response.message);
    }
    recaptchaRef.current.reset();
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Company Membership Form</p>
        <Card
          style={{
            paddingTop: "10px",
            maxWidth: "700px",
            borderRadius: "30px",
            margin: "auto",
          }}
        >
          <Form onFinish={handleSubmit} validateMessages={validateMessages}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={sitekey}
              onChange={onReCAPTCHAChange}
            />
            <Row justify="space-around">
              <Col>
                <Form.Item
                  label="Full Name"
                  name="username"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Company Name"
                  name="organization"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Confirm Password"
                  name="cpassword"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col
                span={24}
                style={{ display: "grid", justifyContent: "center" }}
              >
                <Form.Item>
                  <button
                    type="submit"
                    style={{ width: "200px" }}
                    className="button"
                  >
                    Register
                  </button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <p style={{ textAlign: "center" }}>
            Already a member?
            <span style={{ color: "blue" }}>
              <Link href="/login">Login Now</Link>
            </span>
          </p>
        </Card>
      </main>
    </Header>
  );
}
