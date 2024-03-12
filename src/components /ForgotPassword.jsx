import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HisContext } from "../HisContext";
import { useContext } from "react";
import LoginImage from "../assets/image1.jpg";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(HisContext);

  const [email, setEmail] = useState();

  return (
    <section
      className="d-flex align-items-center"
      style={{ height: "90vh", fontFamily: "Cantarell" }}
    >
      <div className="container-fluid  h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={LoginImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <h5 className="mb-3  me-3" style={{ fontFamily: "Cantarell" }}>
                Forgot your password?
              </h5>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter your email address"
                />
                <label className="form-label" htmlFor="form3Example3"></label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn  btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                      backgroundColor: "#098fac",
                      color: "white",
                    }}
                    onClick={() => forgotPassword(email)}
                  >
                    Reset password
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Remember your password?
                    <Link to="/login" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
