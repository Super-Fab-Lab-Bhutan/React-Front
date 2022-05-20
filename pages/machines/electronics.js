import { Card, Space, Modal, Row, Col } from "antd";
import Image from "next/image";
import { useState } from "react";
import Header from "../../components/header";
import { verify } from "jsonwebtoken";
const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;
const public_serv = process.env.NEXT_PUBLIC_SERVER;
export async function getServerSideProps({ req }) {
  // fetch data from api
  let data = await fetch(server + "/machines/electronic");
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
    }, // will be passed to the page component as props
  };
}

const { Meta } = Card;

export default function Electronic({ data, users, isLoggedIn }) {
  const Data = data.equipment;

  // Modal Actions
  const [ModalData, setModalData] = useState({
    equipmentName: null,
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

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Electronics Lab</p>
        <div style={{ padding: "20px" }}>
          <Row justify="space-evenly">
            {Data.map((val, i) => {
              // create cards for each equipment
              return (
                <Col
                  style={{
                    marginBottom: "10px",
                  }}
                  key={i}
                >
                  <Card
                    hoverable
                    style={{
                      width: "300px",
                      height: "400px",
                      padding: "5px",
                      borderRadius: "20px",
                    }}
                    cover={
                      <Image
                        width={300}
                        height={220}
                        style={{ borderRadius: "20px" }}
                        alt="example"
                        src={public_serv + "/" + val.image}
                      />
                    }
                  >
                    <Meta
                      title={val.equipmentName}
                      description={val.description.slice(0, 55) + "..."}
                    />
                    <br />
                    <button
                      className="button"
                      onClick={() => {
                        setModalData({
                          equipmentName: val.equipmentName,
                          description: val.description,
                          image: public_serv + "/" + val.image,
                        });
                        showModal();
                      }}
                      style={{
                        borderRadius: "20px",
                        position: "absolute",
                        bottom: "15px",
                      }}
                    >
                      Read more
                    </button>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Modal
            title={ModalData.equipmentName}
            visible={isModalVisible}
            footer={null}
            width={800}
            onCancel={handleCancel}
          >
            <Row justify="space-evenly">
              <Col>
                <Card bordered={false}>
                  <Image
                    width={300}
                    height={300}
                    alt="machineimage"
                    src={ModalData.image}
                  ></Image>
                </Card>
              </Col>
              <Col>
                <Card>{ModalData.description}</Card>
              </Col>
            </Row>
          </Modal>
        </div>
      </main>
    </Header>
  );
}
