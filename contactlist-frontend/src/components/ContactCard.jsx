export default function ContactCard(props) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", margin: "10px" }}
      onClick={props.onClick}
    >
      <img
        src="/src/assets/user.png"
        style={{ width: "40px", height: "40px" }}
        alt=""
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: 0 }}>
          {props.firstName} {props.lastName}
        </h3>
        <p style={{ margin: 0 }}>{props.phoneNumber}</p>
      </div>
    </div>
  );
}
