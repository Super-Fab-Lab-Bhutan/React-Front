import { Card, Col, Row } from "antd";
import Link from "next/link";
import parse from "html-react-parser";

import Header from "../../components/header";
import { verify } from "jsonwebtoken";
const secreteKEY = process.env.JWT_KEY;
const server = process.env.SERVER;
const public_serv = process.env.NEXT_PUBLIC_SERVER;
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
  //get data from backend
  let data = await fetch(server + "/trainingresources");
  data = await data.json();

  return {
    props: {
      data,
      users,
      isLoggedIn,
    },
  };
}

export default function TrainingResource({ data, isLoggedIn, users }) {
  const Data = data.file;
  const ManualCard = ({ url, title, description }) => {
    return (
      <Col>
        <Card
          hoverable
          style={{
            display: "grid",
            justifyContent: "center",
            width: "300px",
            height: "300px",
            borderRadius: "30px",
          }}
        >
          <p className="subtitle">{title}</p>
          <p style={{ fontSize: "14px" }}>{parse(`${description}`)}</p>
          <Link href={url} passHref>
            <button
              className="button"
              style={{ position: "absolute", bottom: "10px", left: "36%" }}
            >
              Read more
            </button>
          </Link>
        </Card>
      </Col>
    );
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Training Manual</p>
        <Row gutter={[16, 16]} justify="space-evenly">
          {Data.map((val, i) => {
            return (
              <ManualCard
                title={val.name}
                description={val.description}
                url={public_serv + "/" + val.FileUrl}
                key={i}
              />
            );
          })}
        </Row>
        <br />
      </main>
    </Header>
  );
}
