import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import logo from "../public/assets/img/logo.png";
import user from "../public/assets/icons/user.png";

export default function Header({ isLoggedIn, users }) {
  const router = useRouter();
  const [login_state, setLogin] = useState(isLoggedIn);
  const role = users === null ? null : users.role;
  // when user logged in

  const Logout = async () => {
    let response = await fetch("/api/auth/logout");
    response = await response.json();
    if (response) {
      router.replace("/login");
    }
  };

  const UserLoggedIn = () => {
    return (
      <div
        style={{
          float: "right",
          margin: "30px",
        }}
      >
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            {role}
            <Image src={user} width={40} height={40} alt="User" />
          </button>
          <div className={styles.dropcontent}>
            <Link href="/profile">Profile</Link>
            <Link href="/booking/equipment">Booking</Link>
            <button
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div
          style={{
            float: "left",
            margin: "0 20px 0 20px",
          }}
        >
          <Image src={logo} width={70} height={70} alt="logo" />
        </div>
        <span>
          <Link href="/">Home</Link>
        </span>
        <span>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Machines</button>
            <div className={styles.dropcontent}>
              <Link href="/machines/carpentry">Carpentry Lab</Link>
              <Link href="/machines/electronics">Electronic Lab</Link>
              <Link href="/machines/heavymachines">Heavy machinary Lab</Link>
              <Link href="/machines/metalworks">Metal works Lab</Link>
              <Link href="/booking">Booking</Link>
            </div>
          </div>
        </span>
        <span>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Programs</button>
            <div className={styles.dropcontent}>
              <Link href="/programs/education">Education program</Link>
              <Link href="/programs/training">Training program</Link>
              <Link href="/programs/research">Research and Development</Link>
            </div>
          </div>
        </span>
        <span>
          <Link href="/service">Services</Link>
        </span>
        <span>
          <Link href="/news">News and Events</Link>
        </span>
        <span>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>About us</button>
            <div className={styles.dropcontent}>
              <Link href="/aboutus">The story of sfl</Link>
              <Link href="/aboutus/team">Meet the Team</Link>
              <Link href="/aboutus/virtualtour">Virtual Tour</Link>
              <Link href="/aboutus/gallery">Gallery</Link>
            </div>
          </div>
        </span>
        {login_state ? (
          <UserLoggedIn />
        ) : (
          <div
            style={{
              float: "left",
              margin: "20px",
            }}
          >
            <Link href="/login" passHref>
              <button className={styles.navbtn}>Log In</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
