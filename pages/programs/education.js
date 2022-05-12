import styles from "../../styles/Program.module.css";
import Modal from "../../components/programs/modal";
import CardContent from "../../components/programs/cardcontent";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({ req }) {
  // fetch data from api
  let data = await fetch(server + "/education-program");
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

  const pastProject = [
    {
      title: "Title",
    },
    {
      title: "Title1",
    },
    {
      title: "Title2",
    },
    {
      title: "Title3",
    },
  ];

  return {
    props: {
      data,
      pastProject,
      users,
      isLoggedIn,
    }, // will be passed to the page component as props
  };
}

export default function Education({ data, pastProject, users, isLoggedIn }) {
  const Data = data.program;
  const PastProject = pastProject;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <main>
        <p className="title">Education Program</p>
        <p className={styles.title}>To Engage and Inspire</p>
        {Data.map((val, i) => {
          // creates modal from data
          return <Modal data={val} key={i} />;
        })}
        <div className={styles.grid}>
          <div>
            {Data.map((val, i) => {
              return <CardContent data={val} key={i} />;
            })}
          </div>
          <div className={styles.card2}>
            <p className={styles.title}>Past Project</p>
            <hr />
            <ul>
              {PastProject.map((val, i) => {
                return (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    {val.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
