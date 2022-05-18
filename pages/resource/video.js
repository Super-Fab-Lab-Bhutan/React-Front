import { Card, Col, Row } from "antd";

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

export default function VideoResource({ isLoggedIn, users }) {
  const VideoCard = ({ url, title, description }) => {
    return (
      <Col style={{ marginBottom: "15px" }}>
        <Card
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <iframe
            style={{
              borderRadius: "20px",
              width: "100%",
              height: "100%",
            }}
            src={url}
          ></iframe>
          <Card.Meta title={title} description={description} />
        </Card>
      </Col>
    );
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Tutorials</p>
        <Row justify="space-evenly">
          <VideoCard
            title="Title"
            description="Description"
            url="https://res.cloudinary.com/jigmecom/video/upload/v1652834412/Resource/Tutorial/Porter_Robinson_Madeon_-_Shelter_Official_Video_Short_Film_with_A-1_Picture_dtefxr.mp4"
          />
          <VideoCard
            title="Title"
            description="Description"
            url="https://res.cloudinary.com/jigmecom/video/upload/v1652834412/Resource/Tutorial/Porter_Robinson_Madeon_-_Shelter_Official_Video_Short_Film_with_A-1_Picture_dtefxr.mp4"
          />
        </Row>
      </main>
    </Header>
  );
}
