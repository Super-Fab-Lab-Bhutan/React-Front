import styles from "../styles/Footer.module.css";
import Image from "next/image";
// images url
import logo from "../public/assets/img/dhi.png";
import location from "../public/assets/icons/location.png";
import call from "../public/assets/icons/call.png";
import mail from "../public/assets/icons/mail.png";

import facebook from "../public/assets/icons/facebook.png";
import twitter from "../public/assets/icons/twitter.png";
import linkedin from "../public/assets/icons/linkedin.png";
import github from "../public/assets/icons/github.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.rows}>
        <div>
          <a>
            <Image src={logo} width={90} height={90} alt="logo" />
          </a>
          <p>Druk Holdings & Investments Limited</p>
        </div>
        <div>
          <p>Contact us</p>
          <p>
            <Image src={location} height={30} width={20} alt="loco" /> Thimphu,
            Bhutan Tech Park
          </p>
          <p>
            <Image src={call} height={20} width={20} alt="call" />{" "}
            +975-2-336257/8
          </p>
          <p>
            <Image src={mail} height={20} width={20} alt="mail" /> DHI,
            drive@gmail.com
          </p>
        </div>
        <div>
          <p>
            <h3>
              We&apos;d love to hear
              <br />
              from you!
            </h3>
          </p>
          <p>
            <button className="button">Stay In Touch</button>
          </p>
          <p
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              width: "200px",
            }}
          >
            <a>
              <Image src={facebook} height={30} width={30} alt="fb" />
            </a>
            <a>
              <Image src={twitter} height={30} width={30} alt="tw" />
            </a>
            <a>
              <Image src={linkedin} height={30} width={30} alt="ln" />
            </a>
            <a>
              <Image src={github} height={30} width={30} alt="git" />
            </a>
          </p>
        </div>
      </div>
      <hr />
      <div className={styles.rows}>
        <p>© Copyright 2022 DHI InnoTech. All rights reserved</p>
      </div>
    </footer>
  );
}
