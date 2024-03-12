import React, { useContext, useState, useEffect } from "react";
import { HisContext } from "../HisContext";
import { toast } from "react-toastify";
const AdminDashboard = () => {
  const { user, BASE_URL, logout } = useContext(HisContext);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");

  const [departmentName, setDepartmentName] = useState("");
  const [doctors, setDoctors] = useState([]);

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
  const [departments, setDepartments] = useState([]);
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
          console.log("Departments", data);
          setDepartments(data.departments);

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
          console.log("Doctors are", data);
          setDoctors(data.doctors);
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
    <div>
      <button className="btn btn-sm  btn-primary mt-2" onClick={logout}>
        Logout
      </button>
      <section
        className=" d-flex align-items-center"
        style={{ height: "100%", overflowY: "auto" }}
      >
        <div className="container-fluid h-custom">
          <div className="row h-100">
            <div className="col-md-4 col-lg-4 col-xl-4 offset-xl-1">
              <form>
                <h3 className="mb-3  me-3" style={{ fontFamily: "sans-serif" }}>
                  Create Doctor
                </h3>

                {/* Email input */}
                <div className="form-outline mb-3">
                  <input
                    onChange={(e) => setName(e.currentTarget.value)}
                    type="text"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter your Name"
                    value={name}
                  />
                </div>
                <div className="row">
                  <div className="form-outline mb-3 col">
                    <input
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter your email address"
                      value={email}
                    />
                  </div>
                  <div className="form-outline mb-3 col">
                    <input
                      onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                      type="number"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-outline mb-3 col">
                    <select
                      onChange={(e) => setDepartment(e.currentTarget.value)}
                      className="form-select"
                      style={{ height: "48px" }}
                      aria-label="Default select example"
                    >
                      {departments.map((item, index) => (
                        <option id={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-outline mb-3 col">
                    <select
                      onChange={(e) => setGender(e.currentTarget.value)}
                      className="form-select"
                      style={{ height: "48px" }}
                      aria-label="Default select example"
                      value={gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}

                  <div className="text-center text-lg-start mt-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      onClick={createDoctor}
                    >
                      Create Doctor
                    </button>
                  </div>
                </div>
              </form>
              <hr />
              <h5 className="mt-3">All the Doctors</h5>
              <ol style={{ height: "100%", overflowY: "auto" }}>
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
            <div className="col-md-4 col-lg-4 col-xl-4 offset-xl-1">
              <form>
                <h3 className="mb-3  me-3" style={{ fontFamily: "sans-serif" }}>
                  Add Department
                </h3>

                {/* Email input */}
                <div className="form-outline mb-3">
                  <input
                    onChange={(e) => setDepartmentName(e.currentTarget.value)}
                    type="text"
                    value={departmentName}
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter Department Name"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}

                  <div className="text-center text-lg-start mt-2 pt-2">
                    <button
                      type="button"
                      className="btn  btn-primary btn-sm"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      onClick={createDepartment}
                    >
                      Add Department
                    </button>
                  </div>
                </div>
              </form>
              <hr />
              <h5 className="mt-3">All the Departments</h5>
             
              <ol style={{ height: "100%", overflowY: "auto" }}>
  {departments.map((item, index) => (
    <li key={index}>{item.name}</li>
  ))}
</ol>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AdminDashboard;
