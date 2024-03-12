import { useRef, useContext } from "react";
import { HisContext } from "../../../HisContext";

export default function DoctorPopup({ slot, deleteSlot, setOption }) {
  if (!slot) {
    return null; // or handle the case when slot is null
  }

  const closeRef = useRef(null);
  const { setReceiver } = useContext(HisContext);
  const takeTomessageScreen = () => {
    alert(slot.bookedBy._id);
    //  1. I will close popup
    closeRef.current.click();
    // 2. i will change the reciever
    setReceiver({
      name: slot.bookedBy.name,
      imgUrl: slot.bookedBy.imgUrl,
      _id: slot.bookedBy._id,
    });
    // 2. i will move to chat screent
    setOption("chat");
  };
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate.replace(/\b0/g, "");
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
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
            <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
              <p className="fw-bold">Start Time</p>
              <p className="fw-bold">End Time</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="date-container">
                <p className="date">{formatDate(slot?.start)}</p>
              </div>
              <div className="date-container">
                <p className="date">{formatDate(slot?.end)}</p>
              </div>
              <div className="date-container">
                <p>Is Booked: {slot.isBooked ? "Yes" : "No"}</p>
              </div>
            </div>
            {slot && slot.isBooked && (
              <h5 style={{ textDecoration: "underline" }}>Patient Details</h5>
            )}

            {slot && slot.isBooked && (
              <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
                <img
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                  src={slot?.bookedBy?.imgUrl}
                />
                <div>
                  <p>Name: {slot?.bookedBy?.name}</p>
                  <p>Email: {slot?.bookedBy?.email}</p>
                  <button
                    onClick={takeTomessageScreen}
                    class="btn btn-primary btn-sm"
                  >
                    Message
                  </button>
                </div>
              </div>
            )}
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
            {slot && slot.isBooked ? null : (
              <button
                onClick={() => {
                  deleteSlot(slot._id);
                  closeRef.current.click();
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete Slot
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
