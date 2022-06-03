import Image from "next/image";
import { Card, Col, Row } from "antd";
// image from local storage
import logo from "../../public/assets/img/logo.png";
import office from "../../public/assets/img/aboutus/office.jpg";

import { verify } from "jsonwebtoken";
import Header from "../../components/header";
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

  //get gallery image
  let galleryData = await fetch(public_serv + "/getimages");
  galleryData = await galleryData.json();

  return {
    props: {
      teamData,
      galleryData,
      users,
      isLoggedIn,
    },
  };
}

export default function AboutUs({ teamData, galleryData, isLoggedIn, users }) {
  const TeamData = teamData.team;
  const GalleryData = galleryData.gallery;

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">The SFL Story</p>
        <p className="subtitle">Learn Collaborate Create</p>
        <div style={{ display: "grid", justifyContent: "center" }}>
          <Card
            style={{
              borderRadius: "30px",
              maxWidth: "98%",
              minHeight: "350px",
              margin: "auto",
            }}
          >
            <Row justify="space-evenly">
              <Col>
                <Image
                  src={office}
                  style={{ borderRadius: "30px" }}
                  width={350}
                  height={300}
                  alt="logo"
                />
              </Col>
              <Col
                style={{
                  minWidth: "330px",
                  maxWidth: "60%",
                }}
              >
                <div>
                  <p className="subtitle">SFL Story</p>
                  <hr />
                  <p style={{ color: "gray", fontSize: "12px" }}>
                    Druk Holding and Investments (“DHI”) Limited, in
                    collaboration with the Bhutan Foundation, USA and the Center
                    of Bits and Atoms (“CBA”) from Massachusetts Institute of
                    Technology (“MIT”), Cambridge, USA, is establishing the
                    first-ever Super Fab Lab (“SFL”) in Bhutan. This facility
                    will be the second of its kind, outside of the United
                    States, and third in the world, with advanced capabilities
                    in research and prototyping. The space will impart an open
                    platform for digital design, fabrication, and innovation
                    with the latest machines and tools, allowing users to make
                    (almost) anything.Druk Holding and Investments (“DHI”)
                    Limited, in collaboration with the Bhutan Foundation, USA
                    and the Center of Bits and Atoms (“CBA”) from Massachusetts
                    Institute of Technology (“MIT”), Cambridge, USA, is
                    establishing the first-ever Super Fab Lab (“SFL”) in Bhutan.
                    This facility will be the second of its kind, outside of the
                    United States, and third in the world, with advanced
                    capabilities in research and prototyping. The space will
                    impart an open platform for digital design, fabrication, and
                    innovation with the latest machines and tools, allowing
                    users to make anything.
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
          <br />
          <p className="title">Objectives</p>
          <Card
            style={{ borderRadius: "30px", maxWidth: "700px", margin: "auto" }}
          >
            <Row justify="space-evenly">
              <Col>
                <div>
                  <Image src={logo} width={180} height={180} alt="logo" />
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  <p>Vision</p>
                  <p>&quot;Inspire the future of learning and creating&quot;</p>
                  <p>Mission</p>
                  <p>
                    &quot;Provide digital design tools to ignite a culture of
                    innovation&quot;
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
          <p className="title">Walk Through Video</p>
          <div
            style={{
              height: "400px",
              padding: "30px",
              margin: "auto",
              width: "80%",
              borderRadius: "30px",
            }}
          >
            <iframe
              style={{
                borderRadius: "30px",
                width: "100%",
                height: "100%",
              }}
              src="https://youtu.be/embed/tKVwA2OHpnM"
            ></iframe>
          </div>
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
          <p className="title">Gallery</p>
          <Row gutter={[16, 16]} justify="space-evenly">
            {GalleryData.map((val, i) => {
              return (
                <Col key={i}>
                  <Card
                    style={{
                      width: "300px",
                      height: "260px",
                    }}
                  >
                    <Image
                      src={public_serv + "/" + val.image}
                      layout="fill"
                      alt="gallery image"
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <br />
        </div>
      </main>
    </Header>
  );
}
