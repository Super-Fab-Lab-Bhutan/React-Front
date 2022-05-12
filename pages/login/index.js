import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/img/logo.png";
import styles from "../../styles/Login.module.css";

export default function Login() {
  const router = useRouter();
  const [User, setUser] = useState({});
  const server = process.env.NEXT_PUBLIC_SERVER;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(User),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          if (data.role != "admin") {
            router.replace("/");
          } else {
            console.log("admin");
            router.replace(server + "/admin");
          }
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <main>
      <br />
      <p className="title"></p>
      <div className={styles.grid}>
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image src={logo} width={120} height={120} alt="logo" />
            </div>
            <br />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <br />
            <input
              type="submit"
              className="button2"
              style={{ width: "100%", fontSize: "18px" }}
              value="Login"
            />
            <br />
            <br />
            <div>
              Not a member?
              <span style={{ color: "blue" }}>
                <Link href="/register">Sign up now</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
