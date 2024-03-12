import React, { useContext } from "react";
import { HisContext } from "../../HisContext";
import "./usercard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCard = ({
  name,
  imgUrl,
  email,
  address,
  phoneNumber,
  gender,
  _id,
  about,
  departmentID,
  departmentName,
  setOption,
  popupRef,
  setClickedDoctorId, 
}) => {
  const { setReceiver } = useContext(HisContext);

  


  return (
    <div className="container user-card profile-page mt-4">
      <div className="card shadow rounded">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-image">
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={imgUrl}
                  alt="Profile"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-details">
                <h5 className="m-0 mb-2">
                  <strong className="" style={{ color: "#098fac" }}>
                    {name}
                  </strong>
                </h5>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  <b className="mr-2" style={{ fontSize: "14px" }}>
                    Email:
                  </b>
                  &nbsp;{email}
                </p>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  <b>Phone:</b>&nbsp;{phoneNumber}
                </p>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  <b>Gender:</b>&nbsp;{gender}
                </p>
                {about && (
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    <b>About:</b>&nbsp;{about}
                  </p>
                )}
                {departmentName && (
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    <b>Department:</b>&nbsp;{departmentName}
                  </p>
                )}
                <p className="mb-1" style={{ fontSize: "14px" }}>
                  <b> Address:</b> &nbsp;
                  {address ? (
                    <>
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.zip}
                    </>
                  ) : (
                    "No address available"
                  )}
                </p>
                <div
                  className="d-flex"
                  style={{ justifyContent: "center", marginTop: "10px" }}
                >
                  <button
                    onClick={() => {
                      setReceiver({ name, imgUrl, _id });
                      setOption("chat");
                    }}
                    type="button"
                    className="btn btn-sm mr-2"
                    style={{
                      backgroundColor: "#098fac",
                      color: "white",
                      borderRadius: "20px",
                      padding: "5px 15px",
                      boxShadow: "none",
                    }}
                  >
                    Message
                  </button>
                  {departmentName && (
                    <button
                    onClick={() => {
                      setClickedDoctorId(_id);
                      popupRef.current.click();
                    }}
                      type="button"
                      className="btn btn-sm mr-2"
                      style={{
                        backgroundColor: "#098fac",
                        color: "white",
                        borderRadius: "20px",
                        padding: "5px 15px",
                        boxShadow: "none",
                        marginLeft: "30px",
                      }}
                    >
                      Book Slot
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
