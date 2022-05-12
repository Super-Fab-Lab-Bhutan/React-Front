import Link from "next/link";
import { useState, createRef } from "react";
import styles from "../../styles/Register.module.css";
import Header from "../../components/header";
import ReCAPTCHA from "react-google-recaptcha";

export default function Student() {
  const [User, setUser] = useState({});
  const recaptchaRef = createRef();
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, cpassword } = User;
    if (password === cpassword) {
      // Execute the reCAPTCHA when the form is submitted
      recaptchaRef.current.execute();
    } else {
      alert("Confirmation password is Incorrect");
    }
  };
  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    const { password, email, phoneNumber, organization, username, gender } =
      User;
    let response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        phoneNumber,
        organization,
        username,
        gender,
        role: "student",
        captcha: captchaCode, //recaptcha code
      }),
    });
    response = await response.json();
    if (response.status === 200) {
      alert("Successfully registered");
    } else {
      alert(response.message);
    }
    recaptchaRef.current.reset();
  };

  return (
    <>
      <Header isLoggedIn={false} users={null} />
      <main>
        <p className="title"></p>
        <p className={styles.title2}>Student Membership Form</p>
        <div className={styles.form_grid}>
          <form>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={sitekey}
              onChange={onReCAPTCHAChange}
            />
            <div className={styles.form}>
              <div>
                <label htmlFor="username">First Name</label>
                <br />
                <input type="text" onChange={handleChange} name="username" />
              </div>
              <div>
                <label htmlFor="organization">School Name</label>
                <br />
                <input
                  type="text"
                  onChange={handleChange}
                  name="organization"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input type="text" onChange={handleChange} name="email" />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <br />
                <input type="text" onChange={handleChange} name="phoneNumber" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <div>
                <label htmlFor="cpassword">Confirm Password</label>
                <br />
                <input
                  type="password"
                  onChange={handleChange}
                  name="cpassword"
                />
              </div>
            </div>
            <div style={{ marginRight: "30px" }}>
              <p style={{ fontSize: "24px" }}>Gender</p>
              <input
                type="radio"
                onChange={handleChange}
                name="gender"
                value="male"
              />
              <label htmlFor="male">Male</label>
              <br />
              <input
                type="radio"
                onChange={handleChange}
                name="gender"
                value="female"
              />
              <label htmlFor="female">Female</label>
              <br />
              <br />
              <br />
              <input
                className="button2"
                style={{ width: "100%", fontSize: "18px" }}
                type="submit"
                onClick={handleSubmit}
                value="Register"
              />
              <br />
              <br />
              Already a member?
              <span style={{ color: "blue" }}>
                <Link href="/login">Login Now</Link>
              </span>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
