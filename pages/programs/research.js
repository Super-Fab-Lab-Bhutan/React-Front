import { useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { Modal, Space, Card } from "antd";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";
import Head from "next/head";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;
const public_serv = process.env.NEXT_PUBLIC_SERVER;

export async function getServerSideProps({ req }) {
  // fetch data from api
  let data = await fetch(server + "/research-program");
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

  // past projects
  let pastProject = await fetch(server + "/titles");
  pastProject = await pastProject.json();

  const ProgramType = "Research";
  // filter by type
  pastProject = pastProject.program.filter((val) => val.type === ProgramType);
  // sort in descending order of time created, recent first
  pastProject.sort((a, b) => {
    const aDate = new Date(a.timeCreated);
    const bDate = new Date(b.timeCreated);
    return bDate - aDate;
  });
  return {
    props: {
      data,
      pastProject,
      users,
      isLoggedIn,
    }, // will be passed to the page component as props
  };
}

export default function Research({ data, pastProject, users, isLoggedIn }) {
  const Data = data.program;
  const PastProject = pastProject;

  // Modal Actions
  const [modalData, setModalData] = useState({
    title: null,
    description: null,
    image: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function CardContent({ data }) {
    return (
      <Card
        hoverable
        style={{
          borderRadius: "50px",
          minWidth: "350px",
          minHeight: "330px",
          marginBottom: "20px",
        }}
      >
        <Space size="middle" wrap>
          <Image
            width={320}
            height={300}
            src={public_serv + "/" + data.image}
            style={{
              borderRadius: "40px",
            }}
            alt="program image"
          />
          <Card
            bordered={false}
            style={{
              width: "340px",
              height: "340px",
            }}
          >
            <p className="subtitle">{data.title}</p>
            <hr />
            <p style={{ fontSize: "15px", textAlign: "center", color: "gray" }}>
              {parse(`${data.description.slice(0, 200)}...`)}
            </p>
            <button
              className="button"
              onClick={() => {
                setModalData({
                  title: data.title,
                  description: data.description,
                  image: public_serv + "/" + data.image,
                });
                showModal();
              }}
            >
              Read more
            </button>
          </Card>
        </Space>
      </Card>
    );
  }

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Research Programs</title>
        <meta
          name="description"
          content="Research and Development Programs, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main>
        <p className="title">Research And Development</p>
        <p className="subtitle">Fostering A Sustainable Culture Of Creation</p>
        <div style={{ display: "grid", justifyContent: "center" }}>
          <Space align="start" wrap>
            <div>
              {Data.map((val, i) => {
                return <CardContent data={val} key={i} />;
              })}
            </div>
            <Card
              style={{
                width: "340px",
                minHeight: "300px",
                marginLeft: "20px",
                borderLeft: "3px solid orange",
              }}
            >
              <p className="subtitle">Past Project</p>
              <hr />
              <ul>
                {PastProject.map((val, i) => {
                  return (
                    <li key={i} style={{ marginBottom: "10px" }}>
                      {val.title}
                    </li>
                  );
                })}
              </ul>
            </Card>
          </Space>
        </div>

        <Modal
          title={modalData.title}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Space wrap>
            <Card bordered={false}>
              <Image
                width={300}
                height={300}
                alt="machineimage"
                src={modalData.image}
              ></Image>
            </Card>
            <Card bordered={false}>{parse(`${modalData.description}`)}</Card>
          </Space>
        </Modal>
        <br />
      </main>
    </Header>
  );
}
