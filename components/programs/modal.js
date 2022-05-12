export default function Modal({ data }) {
  return (
    <div id={data._id} className="modal">
      <div className="modal-content">
        <div
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            borderRadius: "20px 0 0 20px",
            minwidth: "300px",
            minHeight: "250px",
          }}
        />
        <div
          style={{
            paddingLeft: "30px",
          }}
        >
          <p className="title2">{data.title}</p>
          <p>{data.description}</p>
          <p>
            <button
              className="button2"
              onClick={() => {
                let modal = document.getElementById(data._id);
                modal.style.display = "none";
              }}
            >
              Read Less
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
