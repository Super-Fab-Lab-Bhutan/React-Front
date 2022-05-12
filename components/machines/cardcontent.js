export default function CardContent({ data }) {
  return (
    <div className="card2">
      <div
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          borderRadius: "20px 20px 0 0",
          width: "300px",
          height: "250px",
        }}
      />
      <br />
      <p>{data.equipmentName}</p>
      <p>{data.description.slice(0, 40)}...</p>
      <p>
        <button
          className="button2"
          onClick={() => {
            let modal = document.getElementById(data._id);
            modal.style.display = "block";
          }}
        >
          Read more
        </button>
      </p>
      <br />
    </div>
  );
}
