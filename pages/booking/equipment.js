import { useState, useEffect } from "react";
import styles from "../../styles/Booking.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({ req }) {
  // check for login
  const jwt = req.cookies.jwt;

  let users = null;
  let isLoggedIn;
  try {
    users = verify(jwt, secreteKEY);
    isLoggedIn = true;
  } catch (error) {
    return {
      redirect: {
        //redirects if cookie is invalid
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      server,
      isLoggedIn,
      users,
    },
  };
}

export default function BookingEquipment({ server, isLoggedIn, users }) {
  const [Data, setData] = useState([]);
  //calls api to update booking
  const GetBookings = async () => {
    try {
      let data = await fetch(server + "/user/Bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newdate, role: users.role }),
      });
      data = await data.json();
      setData(data);
    } catch (error) {}
  };
  useEffect(() => {
    GetBookings();
  }, []);

  // send booking
  async function sendData(EquipmentId, newdate, time) {
    try {
      const res = await fetch("http://localhost:5000/user/addBooking", {
        method: "POST",
        body: JSON.stringify({
          userID: users.id,
          date: newdate,
          EquipmentId: EquipmentId,
          time: time,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      alert(data.message);
      console.log(data);
      GetBookings(); //refresh data
    } catch (err) {
      console.log(err);
    }
  }
  const holidays = [new Date(2022, 4, 3), new Date(2023, 0, 11)];

  let [selectedDate, setSelectedDate] = useState(new Date());

  var date = selectedDate.toString().split(" ");
  var newdate = date[0] + " " + date[1] + " " + date[2] + " " + date[3];

  const handleClick = (event) => {
    var data = event.target.dataset.value;
    var time = data.split(" ")[0];
    var EquipmentId = data.split(" ")[1];
    var date = selectedDate.toString().split(" ");
    var newdate = date[0] + " " + date[1] + " " + date[2] + " " + date[3];
    
    if (confirm(`are you sure you want to book on ${newdate} from ${time}`)) {
      sendData(EquipmentId, newdate, time);
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <main>
        <p className="title">Equipment Booking</p>
        <div style={{ padding: "30px" }} className={styles.form}>
          <p style={{ fontSize: "1rem" }}>
            Select a Date:{" "}
            <DatePicker
              selected={selectedDate}
              dateFormat="dd/MM/yyyy"
              excludeDates={holidays}
              onChangeRaw={(e) => e.preventDefault()}
              onChange={(date) => {
                setSelectedDate(date);
                GetBookings();
              }}
              minDate={new Date()}
            />
          </p>
          <div className={styles.grid3}>
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
                              data-value={"09:30-12:30" + " " + val.EquipmentId}
                            ></td>
                            <td
                              colSpan="5"
                              className={styles.unbooked}
                              onClick={handleClick}
                              data-value={"01:30-06:30" + " " + val.EquipmentId}
                            ></td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.card4}></div>
          </div>
        </div>
      </main>
    </>
  );
}
