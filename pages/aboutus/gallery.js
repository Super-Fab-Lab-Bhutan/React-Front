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

  const galleryData = [
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
    {
      id: "id",
      image:
        "https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0",
    },
  ];

  return {
    props: {
      galleryData,
      users,
      isLoggedIn,
    },
  };
}

export default function gallery({ galleryData, users, isLoggedIn }) {
  const Data = galleryData;
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <p className="title">Collection Pictures of SFL</p>
      <div className={styles.img_grid2}>
        {Data.map((val, i) => {
          return (
            <div
              className={styles.img_card2}
              style={{
                backgroundImage: `url(${val.image})`,
              }}
              key={i}
            />
          );
        })}
      </div>
    </main>
  );
}
