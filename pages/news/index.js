import styles from "../../styles/News.module.css";

import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;

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
      <div className={styles.card}>
        <div
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            minWidth: "370px",
            minHeight: "300px",
          }}
        />
        <div>
          <p className={styles.title}>{data.title}</p>
          <hr />
          <p style={{ color: "gray" }}>{data.description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <main>
        <p className="title">News And Events</p>
        <div className={styles.grid}>
          {Data.map((val, i) => {
            return <CardContent data={val} key={i} />;
          })}
        </div>
      </main>
    </>
  );
}
