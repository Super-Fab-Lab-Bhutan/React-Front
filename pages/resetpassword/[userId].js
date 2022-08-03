import Header from "../../components/header";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import { Button, Card, Col, Form, Input, message, Row, Steps } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

const secreteKEY = process.env.JWT_KEY;
const server = process.env.NEXT_PUBLIC_SERVER;

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

const { Step } = Steps;

export default function ForgotPassword({ isLoggedIn, users }) {
  const router = useRouter();
  const { userId } = router.query;
  const [currentStep, setCurrentStep] = useState(1); //step 2
  const [userID, setUserID] = useState(userId);

  const handleFirstStep = async (val) => {
    const { email } = val;
    await fetch(server + "/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.value == "true") {
          message.success(data.message);
          setUserID(data.userID);
          setCurrentStep(1);
        } else {
          message.error(data.message);
        }
      });
  };

  const handleSecondStep = async (val) => {
    const { token, password, cpassword } = val;
    if (password != cpassword) {
      message.error("Confirmation password is Incorrect");
      return;
    }
    await fetch(server + "/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userID,
        resetString: token,
        newPassword: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.value == "true") {
          message.success(data.message);
          setUserID(data.userID);
          setTimeout(() => {
            router.push("/login");
          }, 3000); //wait 3 second
        } else {
          message.error(data.message);
        }
      });
  };

  const FirstStep = () => {
    return (
      <Card
        hoverable
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "1.5em",
          borderRadius: "40px",
          textAlign: "center",
          maxWidth: 370,
        }}
      >
        <p>Enter your Email</p>
        <Form onFinish={handleFirstStep}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input type="text" placeholder="Email" />
          </Form.Item>
          <Form.Item style={{ width: 50, float: "right", clear: "both" }}>
            <Input type="submit" value="Send" />
          </Form.Item>
        </Form>
      </Card>
    );
  };

  const SecondStep = () => {
    return (
      <Card
        hoverable
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "1.5em",
          borderRadius: "40px",
          textAlign: "center",
          maxWidth: 370,
        }}
      >
        <p>Reset Passsword</p>
        <Form onFinish={handleSecondStep}>
          <Form.Item
            label="Token"
            name="token"
            rules={[
              {
                required: true,
                message: "Please enter your token!",
              },
            ]}
          >
            <Input type="text" placeholder="Token" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="cpassword"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Confirm password" />
          </Form.Item>
          <Form.Item style={{ width: 50, float: "right", clear: "both" }}>
            <Input type="submit" value="Done" />
          </Form.Item>
        </Form>

        <Button
          style={{ width: 60, float: "left" }}
          onClick={() => {
            setCurrentStep(0);
          }}
        >
          Back
        </Button>
      </Card>
    );
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Reset Passsword</title>
        <meta
          name="description"
          content="Reset Password Page, Jigme Namgyel Wangchuck SuperFablab Bhutan"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Row justify="space-evenly" style={{ padding: 15 }}>
          <Col span={24}>
            <Steps responsive={false} current={currentStep}>
              <Step
                title="Send Eamil"
                description="We will email to you a unique token, which you will use to reset your password"
              />
              <Step
                title="Reset Password"
                description="Type in your token and new password"
              />
            </Steps>
          </Col>
          <Col span={24}>
            <center>{currentStep == 0 ? <FirstStep /> : <SecondStep />}</center>
          </Col>
        </Row>
      </main>
    </Header>
  );
}
