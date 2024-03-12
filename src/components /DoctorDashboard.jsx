import React, { useContext, useState } from "react";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import Patients from "./Patients";
import Chat from "./chats/Chat";
import { HisContext } from "../HisContext";
import DoctorAppointment from "./appointments/doctors/DoctorAppointment";

const DoctorDashboard = () => {
  const [option, setOption] = useState("appointment");
  const { user, logout } = useContext(HisContext);
  console.log(option);
  return (
    <>
      <div>
        <div className="row">
          <div
            className="col-2 d-flex flex-column flex-shrink p-3"
            style={{
              height: "80vh",
              backgroundColor: "#098fac",
              borderRight: "2px solid #098fac",
              borderTop: "2px solid #098fac",
              borderBottom: "2px solid #098fac",
              fontFamily: "Cantarell",
              marginLeft: "10px",
              borderRadius: "20px",
            }}
          >
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none text-white">
              <span className="fs-4">Doctor Dashboard</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto text-black">
              <li
                style={{ color: "white" }}
                onClick={() => setOption("appointment")}
              >
                <a
                  className="nav-link"
                  aria-current="page"
                  style={{ color: "white" }}
                >
                  Appointments
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  href="#"
                  style={{ color: "white" }}
                  onClick={() => setOption("patients")}
                >
                  Patients
                </a>
              </li>
              <li onClick={() => setOption("chat")}>
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  Chats
                </a>
              </li>
              <li onClick={() => setOption("profile")}>
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  Profile
                </a>
              </li>
            </ul>
            <hr />
            <div className="dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-decoration-none dropdown-toggle text-white"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user && user.imgUrl}
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <strong>{user && user.name}</strong>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark text-small shadow"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <a onClick={logout} className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-9" style={{ marginLeft: "20px" }}>
            {option == "appointment" && <DoctorAppointment setOption={setOption}/>}
            {option == "patients" && <Patients setOption={setOption} />}
            {option == "chat" && <Chat />}
            {option == "profile" && <UpdateProfile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
