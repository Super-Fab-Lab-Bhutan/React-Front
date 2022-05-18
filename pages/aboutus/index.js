// import styles from "../../styles/AboutUs.module.css";
import Image from "next/image";
// image from local storage
import logo from "../../public/assets/img/logo.png";
import office from "../../public/assets/img/aboutus/office.jpg";

import { verify } from "jsonwebtoken";
import Header from "../../components/header";
import { Card, Col, Row, Space } from "antd";
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({ req }) {
  const teamData = [
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id2",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
  ];
  const galleryData = [
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
  ];

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
      teamData,
      galleryData,
      users,
      isLoggedIn,
    },
  };
}

export default function AboutUs({ teamData, galleryData, isLoggedIn, users }) {
  const TeamData = teamData;
  const GalleryData = galleryData;

  // const Team = ({ Data }) => {
  //   return (
  //     <>
  //       <p className="title">Meet Our Team</p>
  //       <div className={styles.img_grid}>
  //         {Data.map((val, i) => {
  //           return (
  //             <div
  //               className={styles.img_card}
  //               style={{
  //                 backgroundImage: `url(${val.image})`,
  //               }}
  //               key={i}
  //             >
  //               <p>{val.username}</p>
  //               <p>{val.role}</p>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </>
  //   );
  // };

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
              src="https://www.youtube.com/embed/-tKVN2mAKRI"
            ></iframe>
          </div>
          {/* <Team Data={TeamData} /> */}
          <p className="title">Gallery</p>

          <Row gutter={[16, 16]} justify="space-evenly">
            {galleryData.map((val, i) => {
              return (
                <Col key={i}>
                  <Card
                    style={{
                      width: "300px",
                      height: "260px",
                    }}
                  >
                    <Image src={val.image} layout="fill" alt="gallery image" />
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
