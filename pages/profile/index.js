import { Card } from "antd";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import { useState } from "react";
import Header from "../../components/header";

const server = process.env.NEXT_PUBLIC_SERVER;
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
    isLoggedIn = false;
  }
  // fetch data from api

  let data = await fetch(server + "/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userID: users.id }),
  });
  let info = await data.json();

  return {
    props: {
      info,
      users,
      isLoggedIn,
    }, // will be passed to the page component as props
  };
}

export default function Profile({ info, users, isLoggedIn }) {
  const [State, setStateChange] = useState(Math.random());

  const [Data, setData] = useState(info.bookings);

  const GetData = async () => {
    let data = await fetch(server + "/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: users.id }),
    });
    data = await data.json();
    setData(data);
  };

  const deleteBooking = async (id) => {
    await fetch(server + "/delete/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, userID: users.id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          GetData();
          // setStateChange(Math.random());
          alert("deleted");
        } else {
          alert("Error could not delete booking");
        }
      });
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <Head>
        <title>Profile Page</title>
        <meta
          name="description"
          content="Profile Page, Jigme Namgyel Wangchuck SuperFablab"
        />
        <link rel="icon" href="/assets/img/logo.png" />

        <meta
          httpEuiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        ></meta>
      </Head>
      <main>
        <p className="title">My Bookings</p>
        {/* {State ? ( */}
        <div>
          {Data.map((val, i) => {
            // creates modal from data

            return (
              <Card key={i}>
                <br />
                {/* <p>EquipmentID :{val.EquipmentId}</p> */}
                <p>Name :{val.EquipmentName}</p>
                <p>Type :{val.EquipmentType}</p>
                <p>Date :{val.date}</p>
                <p>Time :{val.time}</p>
                <p>Booked at: {val.createdAt}</p>
                <p>
                  <button
                    className="button2"
                    onClick={() => {
                      deleteBooking(val._id);
                    }}
                  >
                    Cancel
                  </button>
                </p>
                <br />
              </Card>
            );
          })}
        </div>
        {/* ) : null} */}
      </main>
    </>
  );
}
