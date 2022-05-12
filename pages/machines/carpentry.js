import Modal from "../../components/machines/modal";
import CardContent from "../../components/machines/cardcontent";
import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const server = process.env.SERVER;
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({req}) {
  // fetch data from api
  let data = await fetch(server + "/machines/carpentry");
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
    }, // will be passed to the page component as props
  };
}

export default function Carpentry({ data, users, isLoggedIn }) {
  const Data = data.equipment;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <main>
        <p className="title">Carpentry Lab</p>
        {Data.map((val, i) => {
          // creates modal from data
          return <Modal data={val} key={i} />;
        })}
        <div className="grid">
          {Data.map((val, i) => {
            // create cards for each equipment
            return <CardContent data={val} key={i} />;
          })}
        </div>
      </main>
    </>
  );
}
