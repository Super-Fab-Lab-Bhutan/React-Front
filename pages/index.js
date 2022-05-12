import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/assets/img/logo.png";
import clock from "../public/assets/icons/clock.png";

import Header from "../components/header";
import { verify } from "jsonwebtoken";
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

  return {
    props: { users, isLoggedIn },
  };
}

export default function Home({ users, isLoggedIn }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Head>
        <title>Super Fab Lab</title>
        <meta name="description" content="Super Fab Lab Bhutan" />
        <link rel="icon" href="/assets/img/logo.png" />
      </Head>
      <Header isLoggedIn={isLoggedIn} users={users} />
      <main>
        <div className={styles.video_background_holder}>
          <div className={styles.video_background_overlay}>
            <video height="100%" width="100%" playsInline autoPlay loop muted>
              <source src="assets/video/3d.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={styles.video_background_content}>
            <div style={{ marginTop: "50px" }}>
              <Image src={logo} width={170} height={170} alt="logo" />
            </div>
            <div>
              <h1>Welcome To Super Fablab</h1>
            </div>
            <div>
              <p>
                Inspire the future of learning and creating. Provide digital
                design tools to ignite a culture of innovation.
              </p>
            </div>
            <div style={{}}>
              <Link href="/register" passHref>
                <button className="button">Join Us Today!</button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <h1>About Us</h1>
          <div className={styles.card} style={{ margin: "40px" }}>
            <div style={{ display: "inline-block" }}>
              <Image src={logo} height={200} width={200} alt="logo" />
            </div>
            <div>
              <h4 style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Vision
              </h4>
              <p
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                “Inspire the future of learning and creating”
              </p>
              <h4 style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Mission
              </h4>
              <p
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                “Provide digital design tools to ignite a culture of innovation”
              </p>
              <hr />
              <h6
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  color: "black",
                  fontWeight: "normal",
                  fontFamily: "bell",
                }}
              >
                The Bhutan Super FabLab is an open platform for learning and
                innovation; a place to play, learn, mentor, collaborate, and
                create.Located at Thimphu Tech Park, it is the 2nd Super Fab Lab
                in the world, providing unique digital fabrication tools and
                services to its community.It currently consists of four
                different labs - focused on metalwork, carpentry, electronics
                production, and industrial graded work.Join us in our journey to
                learn and create almost anything.
              </h6>
            </div>
          </div>
        </div>
        {/* Dynamic */}
        <div className={styles.container}>
          <h1>Learn</h1>
          <p>To Make Almost Anything</p>
          <div style={{ gridTemplateColumns: "auto auto auto" }}>
            <div className={styles.card2}>
              <div
                style={{
                  backgroundImage:
                    "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
                  backgroundSize: "cover",
                  borderRadius: "20px 20px 0 0",
                  height: "250px",
                  width: "350px",
                }}
              />
              <div style={{ padding: "1.5rem" }}>
                <p className="title2">Education</p>
                <hr />
                <p style={{ color: "gray", textAlign: "left" }}>
                  Education programs are developed to equip the next generation
                  with the necessary skills and knowledge in the field of
                  technology and digital fabrication. Here are some of our
                  programs:
                </p>
                <ul style={{ color: "gray", textAlign: "left" }}>
                  <li>hi</li>
                </ul>
              </div>
              <div>
                <Link href="/programs/education" passHref>
                  <button className="button2">Read More</button>
                </Link>
              </div>
            </div>
            <div className={styles.card2}>
              <div
                style={{
                  backgroundImage:
                    "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
                  backgroundSize: "cover",
                  borderRadius: "20px 20px 0 0",
                  height: "250px",
                  width: "350px",
                }}
              />
              <div style={{ padding: "1.5rem" }}>
                <p className="title2">Professional Development</p>
                <hr />
                <p style={{ color: "gray", textAlign: "left" }}>
                  SFL will offer trainings, workshops, and seminars, all focused
                  on professional development, and building the skills and
                  capacity for digital designing and fabrication. Here are some
                  of the training:
                </p>
                <ul style={{ color: "gray", textAlign: "left" }}>
                  <li>hi</li>
                </ul>
              </div>
              <div>
                <Link href="/programs/training" passHref>
                  <button className="button2">Read More</button>
                </Link>
              </div>
            </div>
            <div className={styles.card2}>
              <div
                style={{
                  backgroundImage:
                    "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
                  backgroundSize: "cover",
                  borderRadius: "20px 20px 0 0",
                  height: "250px",
                  width: "350px",
                }}
              />
              <div style={{ padding: "1.5rem" }}>
                <p className="title2">Research and Collaboration</p>
                <hr />
                <p style={{ color: "gray", textAlign: "left" }}>
                  There is a huge potential for enabling research through the
                  SFL platform. The lab currently enables innovation, invention,
                  and prototyping. To foster a culture of learning, applicable
                  and sustainable in-house research is encouraged. SFL is also
                  open to collaborations with like-minded organizations and
                  individuals.
                </p>
                <ul style={{ color: "gray", textAlign: "left" }}>
                  <li>hi</li>
                </ul>
              </div>
              <div>
                <Link href="/programs/research" passHref>
                  <button className="button2">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ...... */}
        <div className={styles.container}>
          <h1>Create</h1>
          <p>Through Digital Tools And Open Community Ecosystem</p>
          {/* <div className={styles.card}>
            <div>Description</div>
            <div>Image</div>
            <div>Specs</div>
          </div> */}
        </div>
        <div className={styles.container}>
          <h1>Collaborate</h1>
          <p>In An Innovative Space</p>
          <div style={{ gridTemplateColumns: "auto auto auto" }}>
            <div className={styles.card3}>
              <div
                style={{
                  backgroundImage:
                    "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
                  backgroundSize: "cover",
                  position: "absolute",
                  borderRadius: "20px",
                  height: "280px",
                  width: "280px",
                  textAlign: "right",
                  padding: "30px",
                  color: "black",
                }}
              >
                <div>
                  <p className="title2">Work with us as a Volunteer</p>
                  <p>
                    Get a chance to become a part of SFL and get work
                    experience.It&apos;s an opportunity to get free access to
                    the facilities provided by SFL.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.card3}>
              <div
                style={{
                  backgroundImage:
                    "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
                  backgroundSize: "cover",
                  position: "absolute",
                  borderRadius: "20px",
                  height: "280px",
                  width: "280px",
                  textAlign: "right",
                  padding: "30px",
                  color: "black",
                }}
              >
                <div>
                  <p className="title2">Apply for Internships</p>
                  <p>
                    SFL is a great place to learn and get exposure.You will be
                    able to do research and projects with our staff and even our
                    collaborators.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.card3}>
              <div
                style={{
                  backgroundImage:
                    "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
                  backgroundSize: "cover",
                  position: "absolute",
                  borderRadius: "20px",
                  height: "280px",
                  width: "280px",
                  textAlign: "left",
                  padding: "30px",
                  color: "black",
                }}
              >
                <div>
                  <p className="title2">Become a Member</p>
                  <p>
                    We have great membership plans :
                    <br />
                    SFL Youth
                    <br />
                    SFL Community
                    <br />
                    SFL creator
                    <br />
                    SFl Business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <h1>Visit Us</h1>
          <div className={styles.card} style={{ width: "500px" }}>
            <div>
              <Image src={clock} height={90} width={90} alt="clock" />
            </div>
            <h3
              style={{ color: "black", fontFamily: "bell", fontSize: "2rem" }}
            >
              When
            </h3>
            <p style={{ color: "grey", fontSize: "1.1rem" }}>
              Monday to Friday: 9:00 AM -6:00 PM
              <br />
              Saturday and Sunday:
              <br /> Open hours you can walk in anytime for a lab visit. You can
              also book a schedule to use a specific machine at a suitable time.
            </p>
          </div>
        </div>
        <div className={styles.container}>
          <h1>News And Events</h1>
        </div>
        <div
          style={{
            backgroundImage:
              "url(https://th.bing.com/th/id/R.1fa6676f82f058e11409b316f2cc6b4e?rik=wXdge7HsT9LrdA&pid=ImgRaw&r=0)",
            backgroundSize: "cover",
            // position: "absolute",
            height: "280px",
            width: "100%",
            margin: "0 8vh 8vh 0",
          }}
        >
          <div className={styles.container} style={{ color: "white" }}>
            <h1>Title</h1>
            <p>Description.....</p>
            <Link href="/news" passHref>
              <button className="button2">Update More</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
