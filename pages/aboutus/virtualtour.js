import styles from "../../styles/AboutUs.module.css";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({req}) {

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
      users,
      isLoggedIn,
    }, // will be passed to the page component as props
  };
}
export default function virtualtour({ isLoggedIn,users }) {
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <div className={styles.grid}>
        <p className={styles.title}>Walk Through Video</p>
        <div className={styles.video}>
          <iframe
            style={{
              borderRadius: "30px",
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/-tKVN2mAKRI"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
