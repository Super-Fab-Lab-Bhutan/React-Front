import styles from "../../styles/Resource.module.css";

import VideoContent from "../../components/resource/videocard";
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
  const data = [
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      tutorialName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
  ];

  return {
    props: {
      data,
      users,
      isLoggedIn,
    },
  };
}

export default function Tutorials({ data,users,
  isLoggedIn }) {
  const Data = data;

  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <p className="title">Tutorials</p>
      <p className="title2" style={{ fontSize: "25px" }}>
        Carpentary Lab
      </p>
      <div className={styles.grid}>
        {Data.map((val, i) => {
          return <VideoContent Data={val} key={i} />;
        })}
      </div>
      <br />

      <p className="title2" style={{ fontSize: "25px" }}>
        Electronic Lab
      </p>
      <div className={styles.grid}>
        {Data.map((val, i) => {
          return <VideoContent Data={val} key={i} />;
        })}
      </div>
      <br />

      <p className="title2" style={{ fontSize: "25px" }}>
        Heavy Machinary Lab
      </p>
      <div className={styles.grid}>
        {Data.map((val, i) => {
          return <VideoContent Data={val} key={i} />;
        })}
      </div>
      <br />

      <p className="title2" style={{ fontSize: "25px" }}>
        Metal Work Lab
      </p>
      <div className={styles.grid}>
        {Data.map((val, i) => {
          return <VideoContent Data={val} key={i} />;
        })}
      </div>
    </main>
  );
}
