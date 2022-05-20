import { Col, DatePicker, Row, Segmented } from "antd";
import styles from "../../styles/Booking.module.css";
import Header from "../../components/header";

import { verify } from "jsonwebtoken";
import { useState } from "react";
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
  let newdate = `${DD.getFullYear()}-${DD.getMonth()}-${DD.getDate()}`;
  //get initial booking
  let initialData = [];
  try {
    let data = await fetch(server + "/user/Bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: newdate, role: users.role }),
    });
    data = await data.json();
    initialData = data;
  } catch (error) {}

  return {
    props: {
      users,
      isLoggedIn,
      initialData,
    },
  };
}

export default function Booking({ initialData, isLoggedIn, users }) {
  const equipmentTypeOptions = ["Carpentry", "Electronic", "Heavy", "Metal"];

  const [Data, setData] = useState(initialData);
  const [date, setDate] = useState(new Date());
  const [equipmentType, setType] = useState(equipmentTypeOptions[0]);

  //calls api to update booking
  const GetBookings = async () => {
    try {
      let data = await fetch(server + "/user/Bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: newdate,
          role: users.role,
          type: equipmentType,
        }),
      });
      data = await data.json();
      setData(data);
    } catch (error) {}
  };

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
      alert(data.message);
      GetBookings(); //refresh data
    } catch (err) {
      console.log(err);
    }
  }
  const holidays = [new Date(2022, 4, 3), new Date(2023, 0, 11)];

  const handleClick = (event) => {
    var data = event.target.dataset.value;
    var time = data.split(" ")[0];
    var EquipmentId = data.split(" ")[1];
    // console.log(date + time + EquipmentId);
    if (confirm(`are you sure you want to book on ${date} from ${time}`)) {
      sendData(EquipmentId, date, time);
    }
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <p className="title">Booking</p>

        <div style={{ padding: "10px" }}>
          Date:{" "}
          <DatePicker
            onChange={(x, val) => {
              setDate(val);
              GetBookings();
            }}
          />
          <br />
          Equipment Type:
          <br />
          <Segmented
            options={equipmentTypeOptions}
            value={equipmentType}
            onChange={(val) => {
              setType(val);
              GetBookings();
            }}
          />
          <br />
          <br />
          <Row justify="space-evenly">
            <Col>
              <div className={styles.card3}>
                <div style={{ overflowX: "auto" }}>
                  <table border="1px" cellSpacing="0">
                    <thead cellPadding="5px">
                      <tr>
                        <th>Equipments</th>
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
                      {Data.map((val, i) => {
                        if (val.EquipmentName.search("3d") == -1) {
                          return (
                            <tr key={i}>
                              <th>{val.EquipmentName}</th>
                              {val.Booking.map((items, j) => {
                                return (
                                  <td
                                    key={j}
                                    className={
                                      items.booked
                                        ? styles.booked
                                        : styles.unbooked
                                    }
                                    onClick={handleClick}
                                    data-value={
                                      items.time + " " + val.EquipmentId
                                    }
                                  ></td>
                                );
                              })}
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={i}>
                              <th>{val.EquipmentName}</th>
                              <td
                                colSpan="3"
                                className={styles.unbooked}
                                onClick={handleClick}
                                data-value={
                                  "09:30-12:30" + " " + val.EquipmentId
                                }
                              ></td>
                              <td
                                colSpan="5"
                                className={styles.unbooked}
                                onClick={handleClick}
                                data-value={
                                  "01:30-06:30" + " " + val.EquipmentId
                                }
                              ></td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </Header>
  );
}
