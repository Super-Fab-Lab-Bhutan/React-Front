import { Card, Col, Row } from "antd";
import parse from "html-react-parser";
import Header from "../../components/header";
import { verify } from "jsonwebtoken";
const secreteKEY = process.env.JWT_KEY;
const server = process.env.SERVER;
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
  let data = await fetch(server + "/video");
  data = await data.json();
  return {
    props: {
      data,
      users,
      isLoggedIn,
    },
  };
}

export default function VideoResource({ data, isLoggedIn, users }) {
  const Data = data.file;

  const VideoCard = ({ url, title, description }) => {
    return (
      <Col>
        <Card
          style={{
            width: "340px",
            minHeight: "300px",
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
          <Card.Meta title={title} description={parse(`${description}`)} />
        </Card>
      </Col>
    );
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Tutorials</p>
        <Row gutter={[16, 16]} justify="space-evenly">
          {Data.map((val, i) => {
            //make youtube watch url to embed url
            const regex = new RegExp("v=([^.]+)");
            let uid = regex.exec(val.FileUrl)[1];
            let url = "https://www.youtube.com/watch?v=tKVwA2OHpnM" + uid;
            return (
              <VideoCard
                title={val.name}
                description={val.description}
                // url={val.FileUrl}
                url={url}
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
