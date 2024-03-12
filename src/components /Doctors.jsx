import React, { useContext, useState, useRef, useEffect } from "react";
import UserCard from "./UserCard/UserCard";
import { HisContext } from "../HisContext";
import ViewDoctorSlots from "./appointments/patients/ViewDoctorSlots";

const Doctors = ({ setOption }) => {
  const {
    user,
    users,
    departments,
    fetchDoctorsByDepartment,
    loadAlltheUsers,
     BASE_URL,
  } = useContext(HisContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("none");
  const popupRef = useRef(null);
  const [clickedDoctorId, setClickedDoctorId] = useState("");
  const [doctorName, setDoctorName] = useState(""); 

  const [slots, setSlots] = useState([]);

  // Filter doctors based on search query and selected department
  const filteredDoctors = users.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (department === "none" || doctor?.departmentID?._id === department)
  );

  const handleDepartmentChange = (e) => {
    setDepartment(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (department !== "none") {
      fetchDoctorsByDepartment(department);
    }
  };

  const handleReset = () => {
    loadAlltheUsers();
    setSearchQuery("");
    setDepartment("none");
  };

  const getAllOpenSlotsOfDoctor = () => {
    fetch(
      `${BASE_URL}/user/patients/get-doctor-open-slots/${clickedDoctorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user && user.accessToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let temp = [];
          data.slots.forEach((item, index) => {
            temp.push({
              start: new Date(item.start),
              end: new Date(item.end),
              _id: item._id,
              title: "Available",
            });
          });

          setSlots(temp);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    if (clickedDoctorId) {
      getAllOpenSlotsOfDoctor();
      popupRef.current.click();
      const clickedDoctor = users.find((doctor) => doctor._id === clickedDoctorId);
      setDoctorName(clickedDoctor?.name || "");
    }
  }, [clickedDoctorId, users]);
  console.log(clickedDoctorId);

  return (
    <div className="mt-4">
      <div className="container text-center mb-3">
        <h5
          style={{
            fontFamily: "sans-serif",
            color: "#098fac",
            fontSize: "16px",
          }}
        >
          Total Doctors: {filteredDoctors.length}
        </h5>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          style={{
            width: "33%",
            borderRadius: "20px",
            borderColor: "#098fac",
            borderWidth: "thin",
            paddingLeft: "10px",
            display: "block",
            margin: "auto",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="mb-3" style={{ marginRight: "20px" }}>
            <select
              value={department}
              onChange={handleDepartmentChange}
              className="form-control"
              style={{
                width: "100%",
                borderRadius: "20px",
                borderColor: "#098fac",
                borderWidth: "1px",
                paddingLeft: "10px",
              }}
            >
              <option value="none">Select Department</option>
              {departments.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className="btn btn-sm btn-primary"
              type="submit"
              value="Submit"
              style={{
                backgroundColor: "#098fac",
                color: "white",
                borderRadius: "20px",
                padding: "5px 15px",
                boxShadow: "none",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleReset}
              className="btn btn-sm btn-secondary"
              style={{
                backgroundColor: "#ddd",
                color: "#333",
                borderRadius: "20px",
                padding: "5px 15px",
                boxShadow: "none",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id} className="col col-6">
            <UserCard
              name={doctor.name}
              imgUrl={doctor.imgUrl}
              email={doctor.email}
              address={doctor.address}
              phoneNumber={doctor.phoneNumber}
              gender={doctor.gender}
              _id={doctor._id}
              about={doctor.about}
              departmentName={doctor?.departmentID?.name}
              setOption={setOption}
              popupRef={popupRef}
              setClickedDoctorId={setClickedDoctorId}
            />
          </div>
        ))}
      </div>

      <button
        ref={popupRef}
        style={{ display: "none" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <ViewDoctorSlots setSlots={setSlots} slots={slots} doctorName={doctorName} />
    </div>
  );
};

export default Doctors;
