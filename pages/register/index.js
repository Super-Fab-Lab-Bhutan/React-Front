import Link from "next/link";
import styles from "../../styles/Register.module.css";

export default function Register() {
  return (
    <main>
      <p className="title">Register</p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div>
            <p className={styles.title2}>SFL Youth</p>
            <hr />
            <p style={{ color: "gray" }}>
              SFL youth membership plans are for students.Student as young as a
              5-year-old can join SFL but will need to be accompanied by their
              parents or teachers. Student above the age of 13 years can freely
              come to the lab and use the facilities. You will have access to
              all the basic machines and will also be provided with the proper
              training to use the machines.
            </p>
          </div>
          <div>
            <Link href="/register/student" passHref>
              <button className="button2">Sign up Now</button>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <p className={styles.title2}>SFL Open</p>
            <hr />
            <p style={{ color: "gray" }}>
              SFL open membership plan is for anyone who just wants to learn. It
              is open for maker, hackers, and hobbyist. It is also open for
              families and friends to join.You will have access to all the basic
              machines and will also be provided with the proper training to use
              the machines. SFL team will always be there to help you.
            </p>
          </div>
          <div>
            <Link href="/register/community" passHref>
              <button className="button2">Sign up Now</button>
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <p className={styles.title2}>SFL Creator</p>
            <hr />
            <p style={{ color: "gray" }}>
              SFL Creator is for the Start-ups and entrepreneurs who have been
              looking for a place to prototype their ideas. SFL will provide you
              with a platform and a fabricating space for your product. SFL team
              will guide and help you to turn you into a marketable product. You
              will have access to most of the machines except for the ones with
              special training requirements.
            </p>
          </div>
          <div>
            <Link href="/register/startup" passHref>
              <button className="button2">Sign up Now</button>
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <p className={styles.title2}>SFL Business</p>
            <hr />
            <p style={{ color: "gray" }}>
              SFL business is for Companies, agencies and state/government
              looking for a collaborative project or resources. SFL has a huge
              capacity in-term of machines, which can be used for research or
              prototyping. SFL business members will have access to all the
              resources available in the lab.
            </p>
          </div>
          <div>
            <Link href="/register/company" passHref>
              <button className="button2">Sign up Now</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
