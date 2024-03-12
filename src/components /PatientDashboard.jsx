import React, { useContext, useState } from "react";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import Doctors from "./Doctors";
import Chat from "./chats/Chat";
import { HisContext } from "../HisContext";
import PatientAppointment from "./appointments/patients/PatientAppointment";

const PatientDashboard = () => {
  const [option, setOption] = useState("appointment");
  const { user, logout } = useContext(HisContext);
  console.log(user);
  return (
    <div>
      <div className="row">
        <div
          className="col-2 d-flex flex-column flex-shrink-0 p-3 "
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
          <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Patient Dashboard</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li onClick={() => setOption("appointment")}>
              <a
                className={
                  option == "appointment"
                    ? "nav-link text-white "
                    : "nav-link text-white"
                }
                aria-current="page"
              >
                Appointments
              </a>
            </li>
            <li onClick={() => setOption("doctors")}>
              <a
                className={
                  option == "doctor"
                    ? "nav-link text-white "
                    : "nav-link text-white"
                }
              >
                Doctors
              </a>
            </li>
            <li onClick={() => setOption("chat")}>
              <a
                className={
                  option == "chat"
                    ? "nav-link text-white "
                    : "nav-link text-white"
                }
              >
                Chats
              </a>
            </li>
            <li onClick={() => setOption("profile")}>
              <a
                className={
                  option == "profile"
                    ? "nav-link text-white "
                    : "nav-link text-white"
                }
                href="#"
              >
                Profile
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user && user.imgUrl}
                alt=""
                width={32}
                height={32}
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
          {option == "appointment" && (
            <PatientAppointment setOption={setOption} />
          )}
          {option == "doctors" && <Doctors setOption={setOption} />}
          {option == "chat" && <Chat />}
          {option == "profile" && <UpdateProfile />}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
