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

export default function TrainingResource({ isLoggedIn, users }) {
  const ManualCard = ({ url, title, description }) => {
    return (
      <Col style={{ marginBottom: "15px" }}>
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
          <p style={{ fontSize: "14px" }}>{description}</p>
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

        <Row justify="space-evenly">
          <ManualCard
            title="Title"
            description="Description"
            url="https://res.cloudinary.com/jigmecom/image/upload/v1652834190/Resource/TrainingManual/manual_form_3_supwdy.pdf"
          />
          <ManualCard
            title="Title"
            description="Description"
            url="https://res.cloudinary.com/jigmecom/image/upload/v1652834190/Resource/TrainingManual/manual_form_3_supwdy.pdf"
          />
          <ManualCard
            title="Title"
            description="Description"
            url="https://res.cloudinary.com/jigmecom/image/upload/v1652834190/Resource/TrainingManual/manual_form_3_supwdy.pdf"
          />
          <ManualCard
            title="Title"
            description="Description"
            url="https://res.cloudinary.com/jigmecom/image/upload/v1652834190/Resource/TrainingManual/manual_form_3_supwdy.pdf"
          />
        </Row>
      </main>
    </Header>
  );
}
