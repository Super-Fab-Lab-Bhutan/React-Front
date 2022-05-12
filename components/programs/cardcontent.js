import styles from "../../styles/Program.module.css";

export default function CardContent({ data }) {
  return (
    <div className={styles.card}>
      <div
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          borderRadius: "40px",
          width: "370px",
          height: "300px",
        }}
      />
      <div className={styles.card_content}>
        <p className={styles.title}>{data.title}</p>
        <hr />
        <p>{data.description.slice(0, 200)}...</p>
        <button
          className="button2"
          onClick={() => {
            let modal = document.getElementById(data._id);
            modal.style.display = "block";
          }}
        >
          Read more
        </button>
      </div>
    </div>
  );
}
