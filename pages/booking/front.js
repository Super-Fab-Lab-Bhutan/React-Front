import { Card, Carousel, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

import { verify } from "jsonwebtoken";
import Header from "../../components/header";

const secreteKEY = process.env.JWT_KEY;
const server = process.env.SERVER;
const public_serv = process.env.NEXT_PUBLIC_SERVER;

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

  // Machines
  let carpentry = await fetch(server + "/machines/carpentry");
  carpentry = await carpentry.json();

  let electronic = await fetch(server + "/machines/electronic");
  electronic = await electronic.json();

  let heavymachine = await fetch(server + "/machines/heavy-machinary");
  heavymachine = await heavymachine.json();

  let metalwork = await fetch(server + "/machines/metal-works");
  metalwork = await metalwork.json();

  let Machines = {
    carpentry,
    electronic,
    heavymachine,
    metalwork,
  };
  // .......

  return {
    props: {
      Machines,
      users,
      isLoggedIn,
    },
  };
}

export default function FrontBooking({ Machines, isLoggedIn, users }) {
  // Carousel Card
  const CarouselCard = ({ title, type, Data }) => {
    if (Data[0] === undefined) {
      return;
    } else {
      let random = Math.floor(Math.random() * Data.length);
      let equipmentName = Data[random].equipmentName;
      let description = Data[random].description;
      let image = Data[random].image;
      return (
        <Card
          style={{
            borderRadius: "30px",
            // backgroundColor:"blue"
            minHeight: "400px",
          }}
        >
          <Row justify="space-around">
            <Col>
              <Image
                width={320}
                height={300}
                src={public_serv + "/" + image}
                alt={type}
              />
            </Col>
            <Col
              style={{
                maxWidth: "350px",
              }}
            >
              <p className="title">{title}</p>
              <p className="subtitle">{equipmentName}</p>
              <p className="smtext">{parse(`${description}`)}</p>
              <Link href="/booking" passHref>
                <button className="button">Book Now</button>
              </Link>
            </Col>
          </Row>
        </Card>
      );
    }
  };

  return (
    <Header isLoggedIn={isLoggedIn} users={users}>
      <main style={{ padding: "20px" }}>
        <p className="title">Booking</p>
        <p className="subtitle">
          In order to use the machines, all users must undertake an induction
          training
        </p>
        <br />
        <center>
          <span style={{ textAlign: "center", fontSize: "25px" }}>
            Induction Training
          </span>
        </center>
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
        <br />
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col>
            <Image
              width={340}
              height={270}
              style={{ borderRadius: "30px" }}
              src="https://th.bing.com/th/id/OIP.9XjO4MTL0RPWQly40tk_QQHaEo?pid=ImgDet&rs=1"
              alt="induction png"
            />
          </Col>
          <Col>
            <Image
              width={340}
              height={270}
              style={{ borderRadius: "30px" }}
              src="https://th.bing.com/th/id/OIP.9XjO4MTL0RPWQly40tk_QQHaEo?pid=ImgDet&rs=1"
              alt="induction png"
            />
          </Col>
          <Col>
            <Image
              width={340}
              height={270}
              style={{ borderRadius: "30px" }}
              src="https://th.bing.com/th/id/OIP.9XjO4MTL0RPWQly40tk_QQHaEo?pid=ImgDet&rs=1"
              alt="induction png"
            />
          </Col>
        </Row>
        <br />
        <center>
          <button className="button">Book your Induction</button>
        </center>
        <br />

        <center>
          <span style={{ textAlign: "center", fontSize: "25px" }}>
            Membership Access
          </span>
          <p>
            Machines will be categorized into different levels and accordingly,
            training will be provided.
          </p>
        </center>
        <Row gutter={[16, 36]} justify="space-evenly">
          <Col>
            <Row>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "25px" }}>Basic</b>
                </Card>
              </Col>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                  }}
                >
                  <p className="title">Pre-requirement</p>
                  <ul>
                    <li>Attend Induction training</li>
                    <li>Basic 2D and 3D design skills</li>
                    <li>Basic computer skills</li>
                    <li>Basic electronics knowledge</li>
                  </ul>
                </Card>
              </Col>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                  }}
                >
                  <p className="title">Digital fabrication services</p>
                  <ul>
                    <li>2D and 3D modeling</li>
                    <li>Poster making</li>
                    <li>Woodwork</li>
                    <li>Electronics design</li>
                    <li>Molding and casting</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "25px" }}>Intermediate</b>
                </Card>
              </Col>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                  }}
                >
                  <p className="title">Pre-requirement</p>
                  <ul>
                    <li>Attend Induction training</li>
                    <li>PCB design</li>
                    <li>Basic electronics knowledge</li>
                    <li>Advance designing training</li>
                  </ul>
                </Card>
              </Col>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                  }}
                >
                  <p className="title">Digital fabrication services</p>
                  <ul>
                    <li>Standard 3D prototyping</li>
                    <li>PCB design and production</li>
                    <li>AR/VR training</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <b style={{ fontSize: "25px" }}>Advanced</b>
                </Card>
              </Col>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                  }}
                >
                  <p className="title">Pre-requirement</p>
                  <ul>
                    <li>
                      Attend advance induction training for specific machines
                      and pass a competency test
                    </li>
                    <li>Pass Safe Practice</li>
                    <li>Skilled digital designer</li>
                  </ul>
                </Card>
              </Col>
              <Col>
                <Card
                  hoverable
                  style={{
                    border: "1px solid red",
                    width: "340px",
                    height: "270px",
                  }}
                >
                  <p className="title">Digital fabrication services</p>
                  <ul>
                    <li>Industrial graded prototyping</li>
                    <li>Metal fabrication</li>
                    <li>Metal molding</li>
                    <li>Repair</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <center>
          <b className="title">Book Your Machines</b>
        </center>
        <br />
        <div
          style={{
            borderRadius: "30px",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <Carousel style={{ padding: "10px" }} autoplay>
            <CarouselCard
              title="Carpentry Lab"
              type="carpentry"
              Data={Machines.carpentry.equipment}
            />
            <CarouselCard
              title="Electronic Lab"
              type="electronics"
              Data={Machines.electronic.equipment}
            />
            <CarouselCard
              title="Heavy Machines Lab"
              type="heavymachines"
              Data={Machines.heavymachine.equipment}
            />
            <CarouselCard
              title="Laser Lab"
              type="metalworks"
              Data={Machines.metalwork.equipment}
            />
          </Carousel>
        </div>
        <br />
      </main>
    </Header>
  );
}
