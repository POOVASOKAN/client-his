import React, { useContext, useState, useRef, useEffect } from "react";
import ClipImage from "../../assets/clip.png";
import "./chat.css";
import LeftCard from "./LeftCard";
import { HisContext } from "../../HisContext";

export default function Chat() {
  const { users, sendMessage, messages, user, receiver, sendFile } =
    useContext(HisContext);

  const [message, setMessage] = useState("");

  const lastRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    lastRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   loadAlltheUsers();
  // }, [user]);

  return (
    <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
      <div className="inbox_people">
        <div className="headind_srch">
          <div className="recent_heading">
            <h4>Chats</h4>
          </div>
        </div>
        <div className="inbox_chat">
          {users.map((item, index) => (
            <LeftCard
              key={index}
              name={item.name}
              imgUrl={item.imgUrl}
              _id={item._id}
            />
          ))}
        </div>
      </div>
      <div className="mesgs">
        <div className="msg_history">
          {messages.length == 0 && (
            <p style={{ textAlign: "center" }}>No Messages Found</p>
          )}
          {messages.map((item, index) => {
            if (user._id == item.sender) {
              return (
                <div key={index} className="outgoing_msg">
                  <div className="sent_msg">
                    {item.file ? (
                      <a
                        style={{ textDecoration: "none" }}
                        target="_blank"
                        href={item?.content}
                      >
                        <i class="fa-solid fa-download"></i>{" "}
                        {item && item?.content.split("/").pop()}
                      </a>
                    ) : (
                      <p>{item && item?.content}</p>
                    )}
                    <span className="time_date">
                      {" "}
                      {new Date(item && item.createdAt).toLocaleString()}
                    </span>{" "}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="incoming_msg">
                  <div className="incoming_msg_img">
                    {" "}
                    <img
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                      src={receiver && receiver.imgUrl}
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      {item.file ? (
                        <a
                          style={{ textDecoration: "none" }}
                          target="_blank"
                          href={item?.content}
                        >
                          <i class="fa-solid fa-download"></i>{" "}
                          {item && item?.content.split("/").pop()}
                        </a>
                      ) : (
                        <p>{item && item?.content}</p>
                      )}
                      <span className="time_date">
                        {" "}
                        {new Date(item && item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          <div ref={lastRef}></div>
        </div>
        <div className="type_msg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(message);
              setMessage("");
            }}
          >
            <div className="input_msg_write">
              <input
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                type="text"
                className="write_msg"
                placeholder="Type a message"
              />
              <button
                disabled={receiver == null}
                className="msg_send_btn"
                type="button"
                onClick={() => fileRef.current.click()}
              >
                <img width="50px" src={ClipImage} />
              </button>

              <input
                onChange={(e) => sendFile(e.currentTarget.files[0])}
                ref={fileRef}
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
