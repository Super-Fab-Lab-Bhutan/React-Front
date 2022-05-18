import { Card, Row, Col } from "antd";
import Image from "next/image";
import Header from "../../components/header";

export async function getServerSideProps({ req }) {
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
      galleryData,
      users,
      isLoggedIn,
    },
  };
}

export default function gallery({ galleryData, isLoggedIn, users }) {
  const Data = galleryData;
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Collection Pictures of SFL</p>
        <Row gutter={[16, 16]} justify="space-evenly">
          {Data.map((val, i) => {
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
      </main>
    </Header>
  );
}
