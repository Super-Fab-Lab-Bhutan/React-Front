import styles from "../../styles/AboutUs.module.css";
import Image from "next/image";
// image from local storage
import logo from "../../public/assets/img/logo.png";
import office from "../../public/assets/img/aboutus/office.jpg";

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
  const teamData = [
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
      teamData,
      galleryData,
      isLoggedIn,
      users
    },
  };
}

export default function AboutUs({ teamData, galleryData,users,isLoggedIn }) {
  const TeamData = teamData;
  const GalleryData = galleryData;

  const Team = ({ Data }) => {
    return (
      <>
      <Header isLoggedIn={isLoggedIn} users={users} />
        <p className={styles.title}>Meet Our Team</p>
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
      </>
    );
  };

  const Gallery = ({ Data }) => {
    return (
      <>
        <p className={styles.title}>Gallery</p>
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
      </>
    );
  };

  return (
    <main>
      <p className="title">The SFL Story</p>
      <p className={styles.title2}>Learn Collaborate Create</p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <Image
            src={office}
            style={{ borderRadius: "30px" }}
            width={300}
            height={300}
            alt="logo"
          />
          <div>
            <p className={styles.title2}>SFL Story</p>
            <hr />
            <p style={{ color: "gray" }}>description</p>
          </div>
        </div>
        <p className={styles.title}>Objectives</p>
      </div>
      <div className={styles.grid2}>
        <div className={styles.card} style={{ width: "70%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={logo} width={180} height={180} alt="logo" />
          </div>
          <div
            style={{
              padding: "30px",
              alignItems: "center",
            }}
          >
            <p>Vision</p>
            <p>&quot;Inspire the future of learning and creating&quot;</p>
            <p>Mission</p>
            <p>
            &quot;Provide digital design tools to ignite a culture of innovation&quot;
            </p>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        <p className={styles.title}>
          Walk Through Video
        </p>
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
      <Team Data={TeamData} />
      <Gallery Data={GalleryData} />
    </main>
  );
}
