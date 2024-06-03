import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socketIO from "socket.io-client";
import tune from "../../images/notification.mp3";
import {
    useGetAllNotificationInstructorQuery,
  useUpdateNotificationStatusInstructprMutation,

} from "../../redux/features/notifications/notificationsApi";
import { format } from "timeago.js";

const InstructorHeader = ({ open, setOpen }) => {
  const ENDPOINT = "http://localhost:5000" || "";
  const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [audio] = useState(new Audio(tune));

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const { data, refetch, isSuccess: getNotificationsSuccess } = useGetAllNotificationInstructorQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatusInstructpr, { isSuccess }] = useUpdateNotificationStatusInstructprMutation();
  const [notification, setNotification] = useState([]);

  const playNotificationSound = () => {
    audio.play().catch((error) => console.error("Audio play error:", error));
  };

  useEffect(() => {
    if (data && data.notifications) {
      setNotification(data.notifications.filter((item) => item.status === "unread"));
    }
    if (getNotificationsSuccess) {
      refetch();
    }
    audio.load();
  }, [data, getNotificationsSuccess]);

  useEffect(() => {
    socketId.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });

    
  }, []);

  const handleNotificationStatusChange = async (id) => {
    try {
      await updateNotificationStatusInstructpr(id).unwrap();
      setNotification((prevNotifications) =>
        prevNotifications.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

  return (
    <div>
      <div className="d-flex" style={{ alignItems: "end", justifyContent: "flex-end", position: "relative" }}>
        <li className="nav-item dropdown no-arrow mx-1 list-unstyled">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="messagesDropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded={dropdownVisible ? "true" : "false"}
            onClick={toggleDropdown}
            style={{ position: "relative" }}
          >
            <i className="fa-regular fa-bell fa-xl" style={{ color: "gray", position: "relative" }}>
              <span
                className="badge badge-danger badge-counter"
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  fontSize: "0.75rem",
                  borderRadius: "50%",
                  padding: "0.25em 0.5em",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                {notification.length}
              </span>
            </i>
          </Link>
        </li>
      </div>
      {dropdownVisible && (
        <div
          className="bg-dark text-white py-2 my-3 mx-3"
          style={{
            border: "1px solid black",
            width: "350px",
            height: "500px",
            position: "absolute",
            top: "40px",
            right: "0",
            zIndex: 3,
            overflowY: "auto", // Make the div scrollable
          }}
        >
          <h5 className="text-center">Notification</h5>
          <hr />
          {notification.length === 0 ? (
            <p className="text-center">No new notifications</p>
          ) : (
            notification.map((item) => (
              <div key={item._id} className="messages p-2" style={{ backgroundColor: "gray" }}>
                <div className="single-message mb-1">
                  <div className="message-header" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>{item.title}</div>
                    <div
                      onClick={() => handleNotificationStatusChange(item._id)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Mark as read
                    </div>
                  </div>
                  <p>{item.message}</p>
                  <div className="time">{format(item.createdAt)}</div>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorHeader;
