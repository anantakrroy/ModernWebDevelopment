const notifStyle = {
  marginTop: "20px",
  color: "green",
  fontSize: "16px",
  backgroundColor: "#d6d6c2",
  padding: "5px",
  border: "2px solid green",
  borderRadius: "3px",
};

const Notification = ({ message }) => {
  if (message) {
    return <div style={notifStyle}>{message}</div>;
  }
};

export default Notification;
