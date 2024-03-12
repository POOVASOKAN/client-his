import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PatientSlotDetailsPopup from "./PatientSlotDetailsPopup";
const localizer = momentLocalizer(moment);
import { useState, useRef, useContext, useEffect} from "react";
import { HisContext } from "../../../HisContext";
import { toast } from "react-toastify";
const PatientAppointment = ({setOption}) => {
    const [slots, setSlots] = useState([]);
    const [clickedSlot, setClickedSlot] = useState(null);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const { BASE_URL, user } = useContext(HisContext);
    const fetchAllSlots = () => {
        fetch(`${BASE_URL}/user/patients/slots/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user && user.accessToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // First we have to conver the start and end feidls from strign to date object
              let temp = [];
              data.slots.forEach((item, index) => {
                temp.push({
                  start: new Date(item.start),
                  end: new Date(item.end),
                  _id: item._id,
                  title: item.openedBy.name,
                  openedBy: item.openedBy,
                });
              });
    
              setSlots(temp);
            } else {
              toast.error(data.message);
            }
          })
          .catch((err) => toast.error(err.message));
      };
    
      useEffect(() => {
        fetchAllSlots();
      }, [user]);
    const buttonRef = useRef(null);
    return (
        <div style={{ padding: 10 }}>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            events={slots}
            style={{ height: 500 }}
            eventPropGetter={(event) => {
              const backgroundColor = event.isBooked ? "red" : "green";
              return { style: { backgroundColor } };
            }}
            onSelectEvent={(event) => {
              // 1. Store teh clicked event
              setClickedSlot(event);
              // 2. open popup
              buttonRef.current.click();
            }}
          />
    
          <>
            {/* Button trigger modal */}
            <button
              ref={buttonRef}
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal4"
              style={{ display: "none" }}
            >
              Launch demo modal
            </button>
    
            <PatientSlotDetailsPopup setOption={setOption} slot={clickedSlot} />
          </>
        </div>
      );
    }
export default PatientAppointment;
