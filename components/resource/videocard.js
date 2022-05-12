import styles from "../../styles/Resource.module.css";

export default function VideoContent({ Data }) {
  return (
    <div className={styles.card3}>
      <iframe
        style={{
          borderRadius: "30px",
          width: "100%",
          height: "100%",
        }}
        src="https://www.youtube.com/embed/-tKVN2mAKRI"
      ></iframe>
      <div style={{ padding: "0 20px 0 0" }}>
        <p className="title2">{Data.tutorialName}</p>
        <p>{Data.description}</p>
      </div>
    </div>
  );
}
