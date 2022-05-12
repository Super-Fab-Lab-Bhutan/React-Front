import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Service.module.css";
import Header from "../../components/header";
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
export default function Service({ users, isLoggedIn }) {
  return (
    <div style={{ textAlign: "center" }}>
    <Head>
        <title>Super Fab Lab</title>
        <meta name="description" content="Super Fab Lab Bhutan" />
        <link rel="icon" href="/assets/img/logo.png" />
    </Head>
      <Header isLoggedIn={isLoggedIn} users={users} />
    <main>
      <p className="title">We Offer Awsome Services</p>
      <p className={styles.title2}>Sustainable Solutions to your Problems</p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.card_title}>CONSULTATION</p>
          <p style={{ color: "gray" }}>
            Let us help solve your problem. We can be of service in:
          </p>
          <ul style={{ color: "gray" }}>
            <li>Machine Installation</li>
            <li>Designing, fabricating, and prototyping.</li>
            <li>STEM related program, developement and design</li>
            <li>Connect you to our collaborators</li>
          </ul>
          <p style={{ color: "gray" }}>
            SFL also provides help with research and development by exploring
            innovative solutions.
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.card_title}>REPAIR</p>
          <p style={{ color: "gray" }}>
            SFL machines can be used for mending anything broken or for
            modifying products to meet your evolving needs.We have four labs
            with machines for metal works, carpentry, electronics, as well as
            advanced industrial heavy machinery which can be used for precision
            works.
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.card_title}>PROTOTYPING</p>
          <p style={{ color: "gray" }}>
            Turn your ideas into reality.SFL will connect you to cutting-edge
            digital fabrication technology.You can prototype your work and ideas
            using our digital fabrication technology.We have 3D printers,CNC
            machines, and an electronic production room for any kind of
            prototyping work. Our lab has machines that can work with any type
            of material fit for your product.
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.card_title}>INCUBATION</p>
          <p style={{ color: "gray" }}>
            SFL is a great place for a start-up. You will find all the resources
            required to nurture and grow your idea into a product.You can find
            access to advisors, expertise, mentors, training, and also potential
            inventors.
          </p>
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={styles.card2}>
          <p className={styles.card_title}>MEMBERSHIP</p>
          <p style={{ color: "gray" }}>
            Super Fab Lab is open community. It is an innovative and
            collaborative space where anyone can make almost anything. Be part
            of SFL through our membership schemes and join the global network of
            fabbers. We offer four membership schemes:
            <br />
            SFL youth
            <br /> SFL Open
            <br />
            SFL Creator
            <br />
            SFL business
          </p>

          <Link href="/register" passHref>
            <button className="button2" style={{ width: "100%" }}>
              Sign Up Now
            </button>
          </Link>
        </div>
        <div className={styles.card2}>
          <p className={styles.card_title}>RESOURCES</p>
          <p style={{ color: "gray" }}>
            Our resources are open to everyone.You can find compilations of
            machine manuals, training resources, video tutorials. We also have a
            database of open-sourced past projects done in our lab.Additionally,
            you will be provided with helpful links to guide you through your
            learning journey.
            <br />
            Training resources
            <br />
            Machine manuals
            <br />
            Induction training resources
            <br />
            Video tutorials
          </p>
          <Link href="/resource" passHref>
            <button className="button2" style={{ width: "100%" }}>
              Read more
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.grid3}>
        <div className={styles.card3}>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
            }}
          >
            <p className={styles.title2}>Get In Touch</p>
            <p style={{ color: "gray" }}>
              For inquiry on collaborations, job opportunities, internships,
              voluntary services, events and programs or anything else.
              <br />
              READ more about becoming out volunteer/internship programs
            </p>
            <div style={{ alignItems: "center" }}>
              <Link href="/" passHref>
                <button className="button2">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
