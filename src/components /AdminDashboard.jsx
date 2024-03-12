import React, { useContext, useState, useEffect } from "react";
import { HisContext } from "../HisContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AdminDashboard = () => {
  const { user, BASE_URL, logout } = useContext(HisContext);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [departmentName, setDepartmentName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const createDepartment = () => {
    fetch(`${BASE_URL}/admin/department/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
      body: JSON.stringify({ name: departmentName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Department Created");
          setDepartmentName("");
          fetchAllDepartments();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const createDoctor = () => {
    fetch(`${BASE_URL}/admin/doctor/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        gender,
        departmentId: department,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Doctor Created");
          setEmail("");
          setPhoneNumber("");
          setGender("male");
          setName("");
          fetchAllDoctors();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchAllDepartments = () => {
    fetch(`${BASE_URL}/admin/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDepartments(data.departments);
          toast.success("Departments Loaded");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchAllDoctors = () => {
    fetch(`${BASE_URL}/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDoctors(data.doctors);
          toast.success("Doctors Loaded");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    fetchAllDepartments();
    fetchAllDoctors();
  }, []);

  return (
    <div className="container mt-5">
     <button className="btn btn-sm btn-primary mt-2 position-absolute top-5 end-0" onClick={logout}>
  <FontAwesomeIcon /> Logout
</button>

      <h1 className="text-center my-4">Welcome to Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              height: "80vh",
              backgroundColor: "#098fac",
              border: "2px solid #098fac",
              borderRadius: "20px",
            }}
          >
            <h3 className="text-white mb-4">Create Doctor</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <button
              className="btn gloss-list"
              style={{ border: "black" }}
              onClick={createDoctor}
            >
              Create Doctor
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              height: "80vh",
              backgroundColor: "#098fac",
              border: "2px solid #098fac",
              borderRadius: "20px",
            }}
          >
            <h3 className="text-white mb-4">All the Doctors</h3>
            {/* List of Doctors */}
            <ol
              style={{ height: "100%", overflowY: "auto" }}
              className="gloss-list"
            >
              {doctors.map((item, index) => (
                <li className="my-3">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={item.imgUrl}
                    />
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>
                      {" "}
                      Department:{" "}
                      {item.departmentID ? item.departmentID.name : "Unknown"}
                    </p>
                    <p>{item.phoneNumber}</p>
                  </div>
                  <hr />
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-4"
            style={{
              height: "80vh",
              backgroundColor: "#098fac",
              border: "2px solid #098fac",
              borderRadius: "20px",
            }}
          >
            <h3 className="text-white mb-4">Add Department</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <button className="btn gloss-list" onClick={createDepartment}>
              Add Department
            </button>
            <h5
              className="mt-3"
              style={{ color: "white", textAlign: "center" }}
            >
              All the Departments
            </h5>
            <ol style={{ height: "100%", overflowY: "auto", color: "white" }}>
              {departments.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
