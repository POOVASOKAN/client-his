import React from "react";
import { useRef, useContext } from "react";
import { HisContext } from "../../../HisContext";

const PatientSlotDetailsPopup = ({slot, setOption} ) => {
  const closeRef = useRef(null);
  const { setReceiver } = useContext(HisContext);
  const takeTomessageScreen = () => {
    // 1. I will close popup
    closeRef.current.click();
    // 2. i will change the reciever
    setReceiver({
      name: slot.openedBy.name,
      imgUrl: slot.openedBy.imgUrl,
      _id: slot.openedBy._id,
    });
    // 2. i will move to chat screent
    setOption("chat");
  };

  return (
    <div>
      <div
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        id="exampleModal4"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Slot Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p>
                  <b>Start Time</b>
                </p>
                <p>
                  <b>End Time</b>
                </p>
              </div>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p>{slot && slot.start.toLocaleString()}</p>
                <p>{slot && slot.end.toLocaleString()}</p>
              </div>
              <h3>Doctor Details</h3>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                  src={slot?.openedBy?.imgUrl}
                />
                <div>
                  <p>Name: {slot?.openedBy?.name}</p>
                  <p>Email: {slot?.openedBy?.email}</p>
                  <button
                    onClick={takeTomessageScreen}
                    className="btn btn-primary btn-sm"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSlotDetailsPopup;
