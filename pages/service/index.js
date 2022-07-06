import { Card, Col, Row } from "antd";
import Link from "next/link";
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

export default function Service({ isLoggedIn, users }) {
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Service Page</title>
        <meta
          name="description"
          content="Service Page, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEuiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        ></meta>
      </Head>
      <main>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          <p className="title">We Offer Awsome Services</p>
          <p className="subtitle">Sustainable Solutions to your Problems</p>
        </div>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col>
            <Card
              hoverable
              style={{
                borderRadius: "30px",
                width: "260px",
                minHeight: "350px",
              }}
            >
              <p className="subtitle">CONSULTATION</p>
              <div style={{ color: "gray" }}>
                <p style={{ fontSize: "12px" }}>
                  Let us help solve your problem. We can be of service in:
                </p>
                <ul>
                  <li style={{ fontSize: "12px" }}>Machine Installation</li>
                  <li style={{ fontSize: "12px" }}>
                    Designing, fabricating, and prototyping.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    STEM related program, developement and design
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    Connect you to our collaborators
                  </li>
                </ul>
                <p style={{ fontSize: "12px" }}>
                  SFL also provides help with research and development by
                  exploring innovative solutions.
                </p>
              </div>
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{
                borderRadius: "30px",
                width: "260px",
                minHeight: "350px",
              }}
            >
              <p className="subtitle">REPAIR</p>
              <p style={{ color: "gray", fontSize: "12px" }}>
                SFL machines can be used for mending anything broken or for
                modifying products to meet your evolving needs.We have four labs
                with machines for metal works, carpentry, electronics, as well
                as advanced industrial heavy machinery which can be used for
                precision works.
              </p>
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{
                borderRadius: "30px",
                width: "260px",
                minHeight: "350px",
              }}
            >
              <p className="subtitle">PROTOTYPING</p>
              <p style={{ color: "gray", fontSize: "12px" }}>
                Turn your ideas into reality.SFL will connect you to
                cutting-edge digital fabrication technology.You can prototype
                your work and ideas using our digital fabrication technology.We
                have 3D printers,CNC machines, and an electronic production room
                for any kind of prototyping work. Our lab has machines that can
                work with any type of material fit for your product.
              </p>
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{
                borderRadius: "30px",
                width: "260px",
                minHeight: "350px",
              }}
            >
              <p className="subtitle">INCUBATION</p>
              <p style={{ color: "gray", fontSize: "12px" }}>
                SFL is a great place for a start-up. You will find all the
                resources required to nurture and grow your idea into a
                product.You can find access to advisors, expertise, mentors,
                training, and also potential inventors.
              </p>
            </Card>
          </Col>
        </Row>
        <br />
        <Row justify="space-evenly">
          <Col style={{ marginBottom: "10px" }}>
            <Card
              hoverable
              style={{
                width: "340px",
                borderRadius: "30px",
                minHeight: "360px",
              }}
            >
              <p className="subtitle">MEMBERSHIP</p>
              <p
                style={{ color: "gray", fontSize: "13px", textAlign: "center" }}
              >
                Super Fab Lab is open community. It is an innovative and
                collaborative space where anyone can make almost anything. Be
                part of SFL through our membership schemes and join the global
                network of fabbers. We offer four membership schemes:
                <br />
                SFL youth
                <br /> SFL Open
                <br />
                SFL Creator
                <br />
                SFL business
              </p>
              <Link href="/register" passHref>
                <button
                  className="button"
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    width: "85%",
                  }}
                >
                  Sign Up Now
                </button>
              </Link>
            </Card>
          </Col>
          <Col style={{ marginBottom: "10px" }}>
            <Card
              hoverable
              style={{
                width: "340px",
                borderRadius: "30px",
                minHeight: "360px",
              }}
            >
              <p className="subtitle">RESOURCES</p>
              <p
                style={{ color: "gray", fontSize: "13px", textAlign: "center" }}
              >
                Our resources are open to everyone.You can find compilations of
                machine manuals, training resources, video tutorials. We also
                have a database of open-sourced past projects done in our
                lab.Additionally, you will be provided with helpful links to
                guide you through your learning journey.
                <br />
                Training resources
                <br />
                Machine manuals
                <br />
                Induction training resources
                <br />
                Video tutorials
              </p>
              <Link href="/resource" passHref>
                <button
                  className="button"
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    width: "85%",
                  }}
                >
                  Read more
                </button>
              </Link>
            </Card>
          </Col>
        </Row>
        <br />
        <Card
          style={{
            textAlign: "center",
            display: "grid",
            justifyContent: "center",
          }}
        >
          <p className="title">Get In Touch</p>
          <p style={{ color: "gray", fontSize: "14px" }}>
            For inquiry on collaborations, job opportunities, internships,
            voluntary services, events and programs or anything else.
            <br />
            READ more about becoming out volunteer/internship programs
          </p>
          {/* <Link href="/" passHref>
            <button className="button">Contact Us</button>
          </Link> */}
        </Card>
        <br />
      </main>
    </Header>
  );
}
