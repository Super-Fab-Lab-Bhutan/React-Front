import Header from "../../components/header";

import { verify } from "jsonwebtoken";
const secreteKEY = process.env.JWT_KEY;

export async function getServerSideProps({ req }) {
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
    },
  };
}

export default function FrontBooking({ isLoggedIn, users }) {
  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main>
        <b className="title">Booking</b>
      </main>
    </Header>
  );
}
