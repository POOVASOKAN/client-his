import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HisContext } from "../../../HisContext";
import { toast } from "react-toastify";
import DoctorPopup from "./DoctorPopup";

const localizer = momentLocalizer(moment);
const DoctorAppointment = ({ setOption }) => {
  // const BASE_URL = "http://localhost:3001";
  const BASE_URL = "https://server-his.onrender.com";
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [slots, setSlots] = useState([]);
  const [clickedSlot, setClickedSlot] = useState(null);
  const { user } = useContext(HisContext);

  const openSlot = () => {
    fetch(`${BASE_URL}/user/doctors/slots/open`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
      body: JSON.stringify({ start, end }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("New Slot Data:", data.newSlot); // Log new slot data
        if (data.success) {
          toast.success("Slot Opened");
          // fetchAllSlots();
          setSlots((prev) => [
            ...prev,
            {
              start: new Date(data.newSlot.start),
              end: new Date(data.newSlot.end),
              _id: data.newSlot._id,
              isBooked: data.newSlot.isBooked,
              title: data.newSlot.isBooked == true ? "Bookend" : "Available",
            },
          ]);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const deleteSlot = (slotId) => {
    fetch(`${BASE_URL}/user/doctors/slots/delete/${slotId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSlots((prevSlots) =>
            prevSlots.filter((slot) => slot._id !== slotId)
          );
          toast.success("Slot Deleted");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchAllSlots = () => {
    fetch(`${BASE_URL}/user/doctors/slots/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let temp = [];
          data.slots.forEach((item) => {
            temp.push({
              start: new Date(item.start),
              end: new Date(item.end),
              _id: item._id,
              isBooked: item.isBooked,
              title: item.isBooked == true ?  item.bookedBy.name : "Available",
              bookedBy: item.bookedBy ? item.bookedBy : null,
            });
            setSlots(temp);
            console.log(temp);
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    fetchAllSlots();
  }, [user]);

  console.log(slots);
  //for Modal popup
  const buttonRef = useRef(null);

  return (
    <div style={{ padding: "10px" }}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={slots}
        style={{ height: 500 }}
        //chainging the colours
        eventPropGetter={(event) => {
          const backgroundColor = event.isBooked ? "blue" : "green";
          return { style: { backgroundColor } };
        }}
        //Enabling click functionality for the event
        onSelectEvent={(event) => {
          // console.log(event);
          //1.Store the clicked Event
          setClickedSlot(event);
          //2.open the Popup
          buttonRef.current.click();
        }}
      />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card" style={{ backgroundColor: "#f5f5f5" }}>
              <div className="card-body">
                <h5 className="card-title text-center">
                  Appointment Scheduler
                </h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    openSlot();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="startDateTime">From</label>
                    <input
                      required
                      type="datetime-local"
                      className="form-control"
                      id="startDateTime"
                      placeholder="Select start date and time"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDateTime">To</label>
                    <input
                      required
                      type="datetime-local"
                      className="form-control"
                      id="endDateTime"
                      placeholder="Select end date and time"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      disabled={!start}
                      min={start}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#098FAC", marginTop: "10px" }}
                    >
                      Open Slot
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <>
          <>
            {/* Button trigger modal */}
            <button
              ref={buttonRef}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ display: "none" }}
            >
              Launch demo modal
            </button>
            {/* Modal */}
            <DoctorPopup setOption={setOption} slot={clickedSlot} deleteSlot={deleteSlot} />
          </>
        </>
      </div>
    </div>
  );
};

export default DoctorAppointment;
