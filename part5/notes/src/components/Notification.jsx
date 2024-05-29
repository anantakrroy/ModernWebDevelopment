const Notification = ({ notify }) => {
  if (notify === null) {
    return null
  }
  return <div className={notify.type}>{notify.message}</div>
}

export default Notification