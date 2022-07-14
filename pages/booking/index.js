import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Modal,
  Radio,
  Row,
  Tabs,
  Spin,
  message,
  Popconfirm,
} from "antd";
import styles from "../../styles/Booking.module.css";
import Header from "../../components/header";
import { verify } from "jsonwebtoken";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
const secreteKEY = process.env.JWT_KEY; //server side
const server = process.env.NEXT_PUBLIC_SERVER; //client side

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
    return {
      redirect: {
        //redirects if cookie is invalid
        permanent: false,
        destination: "/login",
      },
    };
  }

  let DD = new Date();
  let mm = DD.getMonth() + 1;
  let monthString = "";
  if (mm < 10) {
    monthString = "0" + String(mm);
  } else {
    monthString = String(mm);
  }
  let newdate = `${DD.getFullYear()}-${monthString}-${DD.getDate()}`;
  //get initial booking
  let initialData = [];
  try {
    let data = await fetch(server + "/user/Bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: newdate,
        role: users.role,
        userId: users.id,
      }),
    });
    data = await data.json();
    initialData = data;
  } catch (error) {}

  return {
    props: {
      users,
      isLoggedIn,
      initialData,
      newdate,
    },
  };
}

const { TabPane } = Tabs;

export default function Booking({ initialData, isLoggedIn, users, newdate }) {
  const equipmentTypeOptions = ["Carpentry", "Electronic", "Heavy", "Metal"];

  const [Data, setData] = useState(initialData);
  const [date, setDate] = useState(newdate);
  const [state, setStateChange] = useState(Math.random());
  const [loading, setLoading] = useState(false);
  //calls api to update booking
  const GetBookings = async () => {
    try {
      await fetch(server + "/user/Bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date,
          role: users.role,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (error) {}
  };

  useEffect(() => {
    GetBookings();
  }, [state]);

  //...Modal
  const [showModalView, setModalView] = useState(false);
  // .....

  // send booking
  async function sendData(EquipmentId, date, time) {
    try {
      const res = await fetch(server + "/user/addBooking", {
        method: "POST",
        body: JSON.stringify({
          userID: users.id,
          date: date,
          EquipmentId: EquipmentId,
          time: time,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json(); 
      message.info({ content: data.message });
      GetBookings();
    } catch (err) {
      console.log(err);
    }
  }
  // const holidays = [new Date(2022, 4, 3), new Date(2023, 0, 11)];

  const handleClick = (time, EquipmentId) => {
    setLoading(true);
    sendData(EquipmentId, date, time);
    setStateChange(Math.random());
  };

  const BookingTable = ({ TableData }) => {
    return (
      <div style={{ overflowX: "auto" }}>
        <table border="1px" cellSpacing="0">
          <thead cellPadding="5px">
            <tr>
              <th style={{ width: "250px" }}>Equipments</th>
              <th>9:30-10:30</th>
              <th>10:30-11:30</th>
              <th>11:30-12:30</th>
              <th>1:30-2:30</th>
              <th>2:30-3:30</th>
              <th>3:30-4:30</th>
              <th>4:30-5:30</th>
              <th>5:30-6:30</th>
            </tr>
          </thead>
          <tbody>
            {TableData.map((val, i) => {
              if (val.EquipmentName.search("3d") == -1) {
                return (
                  <tr key={i}>
                    <th>{val.EquipmentName}</th>
                    {val.Booking.map((items, j) => {
                      let classStyle;
                      if (items.booked == 0) {
                        classStyle = styles.booked;
                      } else if (items.booked == 1) {
                        classStyle = styles.userbooked;
                      } else {
                        classStyle = styles.unbooked;
                      }
                      return (
                        <Popconfirm
                          key={j}
                          title={`are you sure you want to book on ${date} from ${items.time}`}
                          onConfirm={() => {
                            handleClick(items.time, val.EquipmentId);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <td
                            key={j}
                            className={classStyle}
                            data-value={items.time + " " + val.EquipmentId}
                          />
                          {/* `are you sure you want to book on ${date} from ${time}`   */}
                        </Popconfirm>
                      );
                    })}
                  </tr>
                );
              } else {
                return (
                  <tr key={i}>
                    <th>{val.EquipmentName}</th>
                    <Popconfirm
                      title={`are you sure you want to book on ${date} from 09:30-12:30`}
                      onConfirm={() => {
                        handleClick("09:30-12:30", val.EquipmentId);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <td
                        colSpan="3"
                        className={styles.unbooked}
                        data-value={"09:30-12:30" + " " + val.EquipmentId}
                      />
                    </Popconfirm>
                    <Popconfirm
                      title={`are you sure you want to book on ${date} from 01:30-06:30`}
                      onConfirm={() => {
                        handleClick("01:30-06:30", val.EquipmentId);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <td
                        colSpan="5"
                        className={styles.unbooked}
                        data-value={"01:30-06:30" + " " + val.EquipmentId}
                      />
                    </Popconfirm>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const [InductionDay, setInductionDay] = useState();
  const [InductionDate, setInductionDate] = useState();
  const [showInductionDate, setShowInductionDate] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false);

  const BookInduction = async () => {
    try {
      let response = await fetch(server + "/user/bookingInduction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: InductionDate, userID: users.id }),
      });
      response = await response.json();
      if (response.value === "true") {
        message.success({ content: response.message });
      } else {
        message.error({ content: response.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const InductionForm = () => {
    return (
      <Card bordered={false} title="Induction Training Form">
        <p>
          Induction training is only on Thursday and Friday(3:00pm - 5:00pm)
        </p>
        <span>Select Day:</span>
        <br />
        <Radio.Group
          value={InductionDay}
          onChange={(e) => {
            setInductionDay(e.target.value);
            setShowInductionDate(true);
          }}
        >
          <Radio value="Thursday">Thursday</Radio>
          <Radio value="Friday">Friday</Radio>
        </Radio.Group>
        <br />
        <br />
        {showInductionDate ? (
          <>
            <DatePicker
              placement="bottomLeft"
              onChange={(e, val) => {
                setInductionDate(val);
              }}
            />
            {"   "}
            {InductionDate}
            <br />
            <br />
            <Checkbox
              checked={checkTerms}
              onChange={(e) => {
                setCheckTerms(e.target.checked);
              }}
            >
              I have read and agreed to the{" "}
              <Link
                href={
                  server +
                  "/" +
                  "uploads/files/1653046420611-SP400-flexx_8027_Operationmanual_EN.pdf"
                }
              >
                Terms and Conditions
              </Link>{" "}
              of SFL
            </Checkbox>
            <br />
            <br />
            {checkTerms ? (
              <button
                className="button"
                onClick={() => {
                  BookInduction();
                }}
                style={{ width: 150 }}
              >
                Submit
              </button>
            ) : null}
          </>
        ) : null}
      </Card>
    );
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <Head>
        <title>Booking Page</title>
        <meta
          name="description"
          content="Booking Page, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main>
        <p className="title">Booking</p>
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col>
            <div style={{ padding: "10px" }}>
              Date:{" "}
              <DatePicker
                placeholder={date}
                onChange={(x, val) => {
                  setDate(val);
                  setStateChange(Math.random());
                  // GetBookings();
                }}
              />
              <br />
              <br />
              <button
                className="button"
                onClick={() => {
                  setModalView(true);
                }}
              >
                Enroll For Induction Training
              </button>
            </div>
            <Card
              title="Legend"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div style={{ maxWidth: "200px" }}>
                <div
                  className={styles.booked}
                  style={{ float: "left", marginRight: "25px" }}
                />
                Booked
              </div>
              <br />
              <div style={{ maxWidth: "200px" }}>
                <div
                  className={styles.userbooked}
                  style={{ float: "left", marginRight: "25px" }}
                />
                Your Booking
              </div>
              <br />

              <div style={{ maxWidth: "200px" }}>
                <div
                  className={styles.unbooked}
                  style={{ float: "left", marginRight: "25px" }}
                />
                Available
              </div>
              <br />
            </Card>
          </Col>

          <Col style={{ padding: "25px" }}>
            <Spin spinning={loading}>
              <Tabs tabPosition="top">
                {equipmentTypeOptions.map((val, i) => {
                  let EquipmentData = Data.filter((data) => {
                    return data.Type == val;
                  });

                  return (
                    <TabPane tab={val} key={i}>
                      <BookingTable TableData={EquipmentData} />
                    </TabPane>
                  );
                })}
              </Tabs>
            </Spin>
          </Col>
        </Row>
        <Modal
          visible={showModalView}
          footer={null}
          onCancel={() => {
            setModalView(false);
          }}
          width={500}
        >
          <InductionForm />
        </Modal>
        <br />
      </main>
    </Header>
  );
}
