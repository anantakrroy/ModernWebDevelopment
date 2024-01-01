const notifStyle = {
  greenStyle: {
    marginTop: "20px",
    color: "green",
    fontSize: "16px",
    backgroundColor: "#d6d6c2",
    padding: "5px",
    border: "2px solid green",
    borderRadius: "3px",
  },
  redStyle: {
    marginTop: "20px",
    color: "red",
    fontSize: "16px",
    backgroundColor: "#d6d6c2",
    padding: "5px",
    border: "2px solid red",
    borderRadius: "3px",
  },
};

const Notification = ({ notification }) => {
  if (
    notification.type === "createNotif" ||
    notification.type === "updateNotif"
  ) {
    return <div style={notifStyle.greenStyle}>{notification.message}</div>;
  } else if (
    notification.type === "deleteNotif" 
  ) {
    return <div style={notifStyle.redStyle}>{notification.message}</div>;
  }
};

export default Notification;
