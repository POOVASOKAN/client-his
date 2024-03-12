import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext, useRef } from "react";
import { HisContext } from "../../../HisContext";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

function ViewDoctorSlots({ slots, setSlots, doctorName }) {
  const { user, BASE_URL } = useContext(HisContext);
  const bookSlot = (slotId) => {
    fetch(`${BASE_URL}/user/patients/book/${slotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Slot Booked");
          setSlots((prev) => prev.filter((item) => item._id != slotId));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };
  const closeRef = useRef(null);

  const handleConfirm = async (slotId) => {
    await bookSlot(slotId);
    toast.dismiss(); // Close the toast notification
    closeRef.current.click(); // Close the modal
  };

  const handleCancel = () => {
    toast.dismiss();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">
                {doctorName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                events={slots}
                style={{ height: 500 }}
                onSelectEvent={(event) => {
                  toast.info(
                    <div>
                      <div>Do you want to book this slot?</div>
                      <div className="d-flex justify-content-end mt-2">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleConfirm(event._id)}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleCancel}
                        >
                          No
                        </button>
                      </div>
                    </div>,
                    { autoClose: false }
                  );
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                ref={closeRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDoctorSlots;
