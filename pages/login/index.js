import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/img/logo.png";
import { Card, Input, Form, message } from "antd";
import Header from "../../components/header";

import { verify } from "jsonwebtoken";
import Head from "next/head";
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

export default function Login({ isLoggedIn, users }) {
  const router = useRouter();
  const server = process.env.NEXT_PUBLIC_SERVER;

  const handleSubmit = (val) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(val),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.status == 200) {
          if (data.role != "admin") {
            message.success({ content: data.message });
            router.replace("/profile");
          } else {
            router.replace(server + "/admin");
          }
        } else {
          message.error({ content: data.message });
        }
      });
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Login Page</title>
        <meta
          name="description"
          content="Login Page, Jigme Namgyel Wangchuck SuperFablab"
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
        <Card
          hoverable
          style={{
            display: "grid",
            justifyContent: "center",
            padding: "1.5em",
            borderRadius: "40px",
          }}
        >
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              margin: "15px",
            }}
          >
            <Image src={logo} width={120} height={120} alt="logo" />
          </div>
          <Form onFinish={handleSubmit}>
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
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <input
                type="submit"
                className="button"
                style={{ width: "100%", fontSize: "18px" }}
                value="Login"
              />
            </Form.Item>
          </Form>
          <div>
            Not a member?
            <span style={{ color: "blue" }}>
              <Link href="/register">Sign up now</Link>
            </span>
          </div>
          <div>
            <Link href="/resetpassword">Forgot Passsword!</Link>
          </div>
        </Card>
      </main>
    </Header>
  );
}
