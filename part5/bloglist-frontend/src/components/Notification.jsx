const Notification = ({message, type}) => (
    <div>
        <p className={`${type}`}>{message}</p>
    </div>
)

export default Notification