import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Card, Button, Popconfirm, Table, message, DatePicker } from "antd";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import { useEffect, useState } from "react";
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
    return {
      redirect: {
        //redirects if cookie is invalid
        permanent: false,
        destination: "/login",
      },
    };
  }
  // fetch data from api

  let newdate = new Date().toJSON().substring(0, 10);

  let data = await fetch(server + "/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userID: users.id, date: newdate }),
  });
  let info = await data.json();

  return {
    props: {
      info,
      users,
      isLoggedIn,
      newdate,
    }, // will be passed to the page component as props
  };
}

export default function Profile({ info, users, isLoggedIn, newdate }) {
  const [State, setStateChange] = useState(Math.random());
  const [UserData, setUserData] = useState(info.UserData);
  const [Data, setData] = useState(info.bookings);
  const [date, setDate] = useState(newdate);

  const GetData = async () => {
    let data = await fetch(server + "/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID: users.id, date: date }),
    });
    data = await data.json();
    let bookings = data.bookings;
    for (let i = 0; i < bookings.length; i++) {
      bookings[i].key = i;
    }
    setData(bookings);
  };

  useEffect(() => {
    GetData();
  }, [State]);

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
          message.success("Cancel booking successful");
          setStateChange(Math.random());
        } else {
          message.error("Error could not delete booking");
        }
      });
  };

  // bookings table ....
  const columns = [
    {
      title: "Name",
      dataIndex: "EquipmentName",
      key: "EquipmentName",
    },
    {
      title: "Type",
      dataIndex: "EquipmentType",
      key: "EquipmentType",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    // {
    //   title: "Booked at",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    // },
    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <Popconfirm
          title={
            "Are you sure, you want to cancel your booking at " +
            val.date +
            " " +
            val.time
          }
          onConfirm={() => {
            deleteBooking(val._id);
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Cancel</Button>
        </Popconfirm>
      ),
    },
  ];

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
          httpEquiv="Content-Type"
          content="text/html; charset= ISO-8859-1"
        />
      </Head>
      <main>
        <p className="title">User Profile</p>
        <Card style={{ margin: "25px" }}>
          <center>
            <p>{UserData.role.toUpperCase()}</p>
          </center>
          <p>Name : {UserData.username}</p>
          <p>Email : {UserData.email}</p>
          <p>Phone Number : {UserData.phoneNumber}</p>
          <p>Organization : {UserData.organization}</p>
          <p>Gender : {UserData.gender}</p>
          <p>
            Verification Status :{" "}
            {UserData.isVerified ? (
              <span>
                <CheckCircleOutlined style={{ color: "green" }} />
                Verified
              </span>
            ) : (
              <span>
                <ExclamationCircleOutlined
                  style={{
                    color: "blue",
                  }}
                />
                Pending
              </span>
            )}
          </p>
          <p>
            Induction Traning Status :{" "}
            {UserData.inductionTraning ? (
              <span>
                <CheckCircleOutlined style={{ color: "green" }} />
                Completed
              </span>
            ) : (
              <span>
                <ExclamationCircleOutlined
                  style={{
                    color: "blue",
                  }}
                />
                Not Completed
              </span>
            )}
          </p>
        </Card>
        <p className="title">My Bookings</p>
        <div style={{ display: "grid", justifyContent: "center" }}>
          <DatePicker
            placeholder={date}
            onChange={(e, val) => {
              setDate(val);
              setStateChange(Math.random());
            }}
          />
        </div>
        <div style={{ padding: "25px", overflow: "auto" }}>
          <Table bordered dataSource={Data} columns={columns} />
        </div>
      </main>
    </>
  );
}
