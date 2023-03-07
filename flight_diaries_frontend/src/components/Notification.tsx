interface NotificationText {
    text: string
}

const Notification = (props: NotificationText) => {
    const style = {
        color: "red"
    }
    return <p style={style}>{props.text}</p>
}

export default Notification;