import Link from "next/link";
import styles from "../../styles/Resource.module.css";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({ req }) {

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
export default function Resource({isLoggedIn,users}) {
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <p className="title">Resource</p>
      <p className="title2">Learn from a vibrant ecosystem of innovators</p>
      <br />
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className="title2">Training Resources</div>
          <div
            style={{
              backgroundImage:
                "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
              backgroundSize: "cover",
              borderRadius: "20px",
              height: "250px",
              width: "350px",
            }}
          />
          <div>
            <Link href="/resource/training" passHref>
              <button className="button2">Read more</button>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className="title2">Machine Manuals</div>
          <div
            style={{
              backgroundImage:
                "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
              backgroundSize: "cover",
              borderRadius: "20px",
              height: "250px",
              width: "350px",
            }}
          />
          <div>
            <Link href="/resource/machine" passHref>
              <button className="button2">Read more</button>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className="title2">Video Tutorials</div>
          <div
            style={{
              backgroundImage:
                "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
              backgroundSize: "cover",
              borderRadius: "20px",
              height: "250px",
              width: "350px",
            }}
          />
          <div>
            <Link href="/resource/tutorials" passHref>
              <button className="button2">Read more</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
