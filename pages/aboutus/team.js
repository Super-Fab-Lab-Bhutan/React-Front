import { Card, Row, Col } from "antd";
import Image from "next/image";
import Header from "../../components/header";
import { verify } from "jsonwebtoken";
const secreteKEY = process.env.JWT_KEY;
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

  //get teams data
  let teamData = await fetch(public_serv + "/team");
  teamData = await teamData.json();

  return {
    props: {
      teamData,
      users,
      isLoggedIn,
    },
  };
}

export default function Team({ teamData, isLoggedIn, users }) {
  const TeamData = teamData.team;
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Meet Our Team</p>
        <Row gutter={[16, 16]} justify="space-evenly">
          {TeamData.map((val, i) => {
            return (
              <Col key={i}>
                <Card
                  hoverable
                  style={{ borderRadius: "30px", width: 240 }}
                  cover={
                    <Image
                      alt="example"
                      width={240}
                      height={280}
                      style={{ borderRadius: "30px 30px 0 0" }}
                      src={public_serv + "/" + val.image}
                    />
                  }
                >
                  <Card.Meta title={val.name} description={val.description} />
                </Card>
              </Col>
            );
          })}
        </Row>
        <br />
      </main>
    </Header>
  );
}
