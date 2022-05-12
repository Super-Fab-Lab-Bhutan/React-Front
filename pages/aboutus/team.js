import styles from "../../styles/AboutUs.module.css";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;
export async function getServerSideProps({req}) {
  const jwt = req.cookies.jwt;

  let users = null;
  let isLoggedIn;
  try {
    users = verify(jwt, secreteKEY);
    isLoggedIn = true;
  } catch (error) {
    isLoggedIn = false;
  }
  const teamsData = [
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id2",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
    {
      id: "id",
      username: "Name",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
      role: "Description",
    },
  ];

  return {
    props: {
      teamsData,
      isLoggedIn,
      users
    },
  };
}
export default function team({ teamsData,isLoggedIn,users }) {
  const Data = teamsData;
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <p className="title">Meet Our Team</p>
      <div className={styles.img_grid}>
        {Data.map((val, i) => {
          return (
            <div
              className={styles.img_card}
              style={{
                backgroundImage: `url(${val.image})`,
              }}
              key={i}
            >
              <p>{val.username}</p>
              <p>{val.role}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
