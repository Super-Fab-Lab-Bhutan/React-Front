import Link from "next/link";
import styles from "../../styles/Booking.module.css";
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

  return {
    props: {
      users,
      isLoggedIn,
    }, // will be passed to the page component as props
  };
}



export default function Booking({  users, isLoggedIn }) {
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <p className="title">Booking</p>
      <p className="title2">
        In order to use the machines, all users must undertake an induction
        training
      </p>

      <div style={{ padding: "30px" }}>
        <p className="title2" style={{ fontSize: "23px" }}>
          Induction Training
        </p>
        <p>
          SFL has many machines that can be categorized into different levels of
          complexity, skill requirements and risk. Based on this, for lab users,
          standard induction training for the use of machines and the lab will
          be developed.
        </p>
        <ul>
          <li>
            The training program will consist of dos and don&apos;ts of the
            labs, Standard operating procedures of the lab.
          </li>
          <li>
            For all the machines, separate training sessions and competency
            exams will have to be taken.
          </li>
          <li>
            For all the first time users and users who will need refreshers
            training, you will have to go through the training and get competent
            in the use of the machines.
          </li>
          <li>
            The induction training will be given based on the access they have
            to the different types of machines. Training will also be given
            based on the membership plans they receive
          </li>
        </ul>
      </div>
      <div className={styles.grid}>
        <div
          style={{
            backgroundImage: `url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)`,
            backgroundSize: "cover",
            borderRadius: "20px",
            width: "350px",
            height: "250px",
          }}
        />
        <div
          style={{
            backgroundImage: `url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)`,
            backgroundSize: "cover",
            borderRadius: "20px",
            width: "350px",
            height: "250px",
          }}
        />
        <div
          style={{
            backgroundImage: `url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)`,
            backgroundSize: "cover",
            borderRadius: "20px",
            width: "350px",
            height: "250px",
          }}
        />
      </div>
      <div style={{ margin: "30px" }}>
        <center>
          <Link href="/" passHref>
            <button className="button2">Book your Induction Training</button>
          </Link>
        </center>
      </div>
      <div>
        <p className="title2" style={{ fontSize: "2rem" }}>
          Membership Access
        </p>
        <p className="title2">
          Machines will be categorized into different levels and accordingly,
          training will be provided.
        </p>
        {/*Basic */}
        <div className={styles.grid2}>
          <div
            className={styles.card2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <b style={{ fontSize: "25px" }}>Basic</b>
          </div>
          <div className={styles.card2}>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
              Pre-requirement
            </p>
            <ul>
              <li>Attend Induction training</li>
              <li>Basic 2D and 3D design skills</li>
              <li>Basic computer skills</li>
              <li>Basic electronics knowledge</li>
            </ul>
          </div>
          <div className={styles.card2}>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
              Digital fabrication services
            </p>
            <ul>
              <li>2D and 3D modeling</li>
              <li>Poster making</li>
              <li>Woodwork</li>
              <li>Electronics design</li>
              <li>Molding and casting</li>
            </ul>
          </div>
        </div>
        {/* Intermediate */}
        <div className={styles.grid2}>
          <div
            className={styles.card2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <b style={{ fontSize: "25px" }}>Intermediate</b>
          </div>
          <div className={styles.card2}>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
              Pre-requirement
            </p>
            <ul>
              <li>Attend Induction Training</li>
              <li>PCB design</li>
              <li>Basic electronics knowledge</li>
              <li>Advance designing training</li>
            </ul>
          </div>
          <div className={styles.card2}>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
              Digital fabrication services
            </p>
            <ul>
              <li>Standard 3D prototyping</li>
              <li>PCB design and production</li>
              <li>AR/VR training</li>
            </ul>
          </div>
        </div>
        {/*Advanced */}
        <div className={styles.grid2}>
          <div
            className={styles.card2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <b style={{ fontSize: "25px" }}>Advanced</b>
          </div>
          <div className={styles.card2}>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
              Pre-requirement
            </p>
            <ul>
              <li>
                Attend advance induction training for specific machines and pass
                a competency test
              </li>
              <li>Pass Safe Practice</li>
              <li>Skilled digital designer</li>
            </ul>
          </div>
          <div className={styles.card2}>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
              Digital fabrication services
            </p>
            <ul>
              <li>Industrial graded prototyping</li>
              <li>Metal fabrication</li>
              <li>Metal molding</li>
              <li>Repair</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/booking/equipment" passHref>
            <button className="button2" style={{ minWidth: "250px" }}>
              <p className="title2">Book Now</p>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
