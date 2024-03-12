import React, { useContext } from "react";
import { HisContext } from "../../HisContext";
import "./chat.css";

export default function LeftCard({ name, imgUrl, _id }) {
  const { receiver, setReceiver } = useContext(HisContext);
  return (
    <div
      className={
        receiver && receiver._id == _id ? "chat_list active_chat" : "chat_list"
      }
      onClick={() => setReceiver({ name, imgUrl, _id })}
      style={{ cursor: "pointer" }}
    >
      <div className="chat_people">
        <div className="chat_img">
          {" "}
          <img
            style={{
              marginTop: "10px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
            src={imgUrl}
            alt="sunil"
          />{" "}
        </div>
        <div className="chat_ib">
          <h5 style={{ marginTop: "5px" }}>{name}</h5>
          <p>
            Test, which is a new approach to have all solutions astrology under
            one roof.
          </p>
        </div>
      </div>
    </div>
  );
}
