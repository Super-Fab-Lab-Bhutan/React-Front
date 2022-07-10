import Image from "next/image";
import { Card, Space } from "antd";
import parse from "html-react-parser";

import { verify } from "jsonwebtoken";
import Header from "../../components/header";
import Head from "next/head";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;
const public_serv = process.env.NEXT_PUBLIC_SERVER;

export async function getServerSideProps({ req }) {
  // fetch data from api
  let data = await fetch(server + "/news-and-events");
  data = await data.json();
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
      data,
      users,
      isLoggedIn,
    },
  };
}

export default function News({ data, users, isLoggedIn }) {
  const Data = data.news;

  const CardContent = ({ data }) => {
    return (
      <Card
        style={{
          marginBottom: "20px",
        }}
      >
        <Space align="start" wrap>
          <Image
            height={320}
            width={350}
            src={public_serv + "/" + data.image}
            alt="news image"
          />
          <Card
            bordered={false}
            style={{
              minWidth: "350px",
            }}
          >
            <p className="subtitle">{data.title}</p>
            <hr />
            <p style={{ color: "gray" }}>{parse(`${data.description}`)}</p>
          </Card>
        </Space>
      </Card>
    );
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>News and Events</title>
        <meta
          name="description"
          content="News and Events, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main>
        <p className="title">News And Events</p>
        <div
          style={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          {Data.map((val, i) => {
            return <CardContent data={val} key={i} />;
          })}
        </div>
      </main>
    </Header>
  );
}
