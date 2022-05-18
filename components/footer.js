import { Row, Col, Space } from "antd";
import Link from "next/link";
import Image from "next/image";
import dhi_logo from "../public/assets/img/dhi.png";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  GithubFilled,
  FacebookFilled,
  LinkedinFilled,
  TwitterCircleFilled,
  EnvironmentFilled,
  PhoneFilled,
  MailFilled,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: "grid", justifyContent: "center" }}>
        <Row gutter={[48, 16]}>
          <Col>
            <Image width={90} height={90} src={dhi_logo} alt="DHI logo" />
            <p>Druk Holdings & Investments Limited</p>
          </Col>
          <Col>
            <p>Contact Us</p>
            <Space size="middle">
              <EnvironmentFilled />
              <p>Thimphu, Bhutan Tech Park</p>
            </Space>
            <br />
            <Space size="middle">
              <PhoneFilled />
              <p>+975-2-336257/8</p>
            </Space>
            <br />
            <Space size="middle">
              <MailFilled />
              <p>DHI, drive@gmail.com</p>
            </Space>
          </Col>
          <Col>
            <p>We&apos;d love to hear from you!</p>
            <br />
            <button className="button" style={{ color: "white" }}>
              Stay In Touch
            </button>
            <br />
            <br />
            <Space wrap size="middle">
              <Link href="/" passHref>
                <FacebookFilled />
              </Link>
              <Link href="/" passHref>
                <TwitterCircleFilled />
              </Link>
              <Link href="/" passHref>
                <LinkedinFilled />
              </Link>
              <Link href="/" passHref>
                <GithubFilled />
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
      <hr />
      <p style={{ textAlign: "center" }}>
        © Copyright 2022 DHI InnoTech. All rights reserved
      </p>
    </footer>
  );
}
