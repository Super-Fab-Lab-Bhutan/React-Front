import { verify } from "jsonwebtoken";
import Header from "../../components/header";


const server = process.env.SERVER;
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
 
  // fetch data from api
  
    let data = await fetch(server + "/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userID: users.id}),
    });
    let info = await data.json();

 

  return {
    props: {
      info,
      users,
      isLoggedIn,
    }, // will be passed to the page component as props
  };
}


export default function Profile({ info, users, isLoggedIn }) {
const Data=info.bookings;

return (
  <>
    <Header isLoggedIn={isLoggedIn} users={users} />
    <main>
      <p className="title">My Bookings</p>
      {Data.map((val, i) => {
        // creates modal from data

        return(
          <div className="card2" key={i}>
          <br />
          <p>EquipmentID :{val.EquipmentId}</p>
          <p>Name :{val.EquipmentName}</p>
          <p>Type :{val.EquipmentType}</p>
          <p>Date :{val.date}</p>
          <p>Time :{val.time}</p>
          <p>Booked at: {(val.createdAt)}</p>
          <p>
            <button
              className="button2"
              onClick={() => {
                let modal = document.getElementById(val._id);
              }}
            >
              Cancel
            </button>
          </p>
          <br />
        </div>
      )})}
      
    </main>
  </>
);
}
