import styles from "../../styles/Resource.module.css";
import CardContent from "../../components/resource/cardcontent";
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

  const data = [
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
      description: "gdhajdnk adbjd  a djha daadkjda  daad da adk d",
    },
    {
      id: "id",
      equipmentName: "Name",
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

export default function Training({ data, users, isLoggedIn }) {
  const Data = data;

  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <p className="title">Training Manual</p>
      <div className={styles.grid}>
        {Data.map((val, i) => {
          return <CardContent Data={val} key={i} />;
        })}
      </div>
    </main>
  );
}
