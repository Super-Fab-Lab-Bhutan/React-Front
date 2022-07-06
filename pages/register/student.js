import { useState, createRef } from "react";
import { Card, Col, Form, Input, Row, Select } from "antd";

import ReCAPTCHA from "react-google-recaptcha";

import Header from "../../components/header";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import Head from "next/head";

const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
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

export default function Student({ isLoggedIn, users }) {
  const [User, setUser] = useState({});
  const [file, setFile] = useState();
  const recaptchaRef = createRef();

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
    const { password, email, phoneNumber, organization, username, gender } =
      User;

    // let FileUrl = await handleUploadFile({
    //   File: file,
    //   Preset: upload_preset,
    // });

    let response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        phoneNumber,
        organization,
        username,
        gender,
        role: "student",
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
      <Head>
        <title>Student Registration</title>
        <meta
          name="description"
          content="Student Registration, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEuiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        ></meta>
      </Head>
      <main>
        <p className="title">Student Membership Form</p>
        <Card
          style={{
            paddingTop: "10px",
            maxWidth: "750px",
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
                  label="School Name"
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
                  label="Gender"
                  name="gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    style={{ width: "200px" }}
                    placeholder="Choose Your Gender"
                  >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col
                style={{
                  width: "200px",
                }}
              >
                <Form.Item label="Upload file">
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      // handleUploadFile({
                      //   File: e.target.files[0],
                      //   Preset: upload_preset,
                      // });
                    }}
                  />
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
        <br />
      </main>
    </Header>
  );
}
