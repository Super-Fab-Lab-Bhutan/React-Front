import { Card, Col, Row } from "antd";
import Link from "next/link";

import Header from "../../components/header";
import { verify } from "jsonwebtoken";
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

export default function Register({ isLoggedIn, users }) {
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Register</p>
        <Row justify="space-evenly">
          <Col style={{ marginBottom: "10px" }}>
            <Card
              style={{
                borderRadius: "30px",
                width: "230px",
                height: "350px",
              }}
            >
              <p className="subtitle">SFL Youth</p>
              <hr />
              <p style={{ color: "gray", fontSize: "12px" }}>
                SFL youth membership plans are for students.Student as young as
                a 5-year-old can join SFL but will need to be accompanied by
                their parents or teachers. Student above the age of 13 years can
                freely come to the lab and use the facilities. You will have
                access to all the basic machines and will also be provided with
                the proper training to use the machines.
              </p>
              <Link href="/register/student" passHref>
                <button
                  className="button"
                  style={{ position: "absolute", bottom: "15px" }}
                >
                  Sign up Now
                </button>
              </Link>
            </Card>
          </Col>
          <Col style={{ marginBottom: "10px" }}>
            <Card
              style={{
                borderRadius: "30px",
                width: "230px",
                height: "350px",
              }}
            >
              <p className="subtitle">SFL Open</p>
              <hr />
              <p style={{ color: "gray", fontSize: "12px" }}>
                SFL open membership plan is for anyone who just wants to learn.
                It is open for maker, hackers, and hobbyist. It is also open for
                families and friends to join.You will have access to all the
                basic machines and will also be provided with the proper
                training to use the machines. SFL team will always be there to
                help you.
              </p>
              <Link href="/register/community" passHref>
                <button
                  className="button"
                  style={{ position: "absolute", bottom: "15px" }}
                >
                  Sign up Now
                </button>
              </Link>
            </Card>
          </Col>
          <Col style={{ marginBottom: "10px" }}>
            <Card
              style={{
                borderRadius: "30px",
                width: "230px",
                height: "350px",
                display: "grid",
                justifyContent: "center",
              }}
            >
              <p className="subtitle">SFL Creator</p>
              <hr />
              <p style={{ color: "gray", fontSize: "12px" }}>
                SFL Creator is for the Start-ups and entrepreneurs who have been
                looking for a place to prototype their ideas. SFL will provide
                you with a platform and a fabricating space for your product.
                SFL team will guide and help you to turn you into a marketable
                product. You will have access to most of the machines except for
                the ones with special training requirements.
              </p>
              <Link href="/register/startup" passHref>
                <button
                  className="button"
                  style={{ position: "absolute", bottom: "15px" }}
                >
                  Sign up Now
                </button>
              </Link>
            </Card>
          </Col>
          <Col style={{ marginBottom: "10px" }}>
            <Card
              style={{
                borderRadius: "30px",
                width: "230px",
                height: "350px",
                display: "grid",
                justifyContent: "center",
              }}
            >
              <p className="subtitle">SFL Business</p>
              <hr />
              <p style={{ color: "gray", fontSize: "12px" }}>
                SFL business is for Companies, agencies and state/government
                looking for a collaborative project or resources. SFL has a huge
                capacity in-term of machines, which can be used for research or
                prototyping. SFL business members will have access to all the
                resources available in the lab.
              </p>
              <Link href="/register/company" passHref>
                <button
                  className="button"
                  style={{ position: "absolute", bottom: "15px" }}
                >
                  Sign up Now
                </button>
              </Link>
            </Card>
          </Col>
        </Row>
      </main>
    </Header>
  );
}
