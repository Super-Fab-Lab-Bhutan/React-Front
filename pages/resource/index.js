import Head from "next/head";
import { Card, Col, Row } from "antd";

import Link from "next/link";
import Header from "../../components/header";

import { verify } from "jsonwebtoken";
import Image from "next/image";
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

export default function Resource({ isLoggedIn, users }) {
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Resource Page</title>
        <meta
          name="description"
          content="Resource, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main>
        <p className="title">Resources</p>
        <p className="subtitle">Learn from a vibrant ecosystem of innovators</p>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col>
            <p className="subtitle">Training Resources</p>
            <Image
              width={300}
              height={200}
              style={{ borderRadius: "30px", marginBottom: "5px" }}
              src="/assets/img/machines/laser.jpg"
              alt="training resource"
            />
            <center>
              <Link href="/resource/training" passHref>
                <button className="button">Read more</button>
              </Link>
            </center>
          </Col>
          <Col>
            <p className="subtitle">Machine Manuals</p>
            <Image
              width={300}
              height={200}
              style={{ borderRadius: "30px", marginBottom: "5px" }}
              src="/assets/img/resource/drone.jpg"
              alt="training resource"
            />
            <center>
              <Link href="/resource/machine" passHref>
                <button className="button">Read more</button>
              </Link>
            </center>
          </Col>
          <Col>
            <p className="subtitle">Video Tutorials</p>
            <Image
              width={300}
              height={200}
              style={{ borderRadius: "30px", marginBottom: "5px" }}
              src="/assets/img/resource/img1.jpg"
              alt="training resource"
            />
            <center>
              <Link href="/resource/video" passHref>
                <button className="button">Read more</button>
              </Link>
            </center>
          </Col>
        </Row>
        <br />
      </main>
    </Header>
  );
}
