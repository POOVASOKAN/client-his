import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./App.css";
export const HisContext = createContext(null);
import { socket } from "./socket.js";

export default function HisProvider({ children }) {
  // const BASE_URL = "http://localhost:3001";
  const BASE_URL = "https://server-his.onrender.com";

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user); // 1.Store the data in the user state
          localStorage.setItem("user", JSON.stringify(data.user));
          //2.navigate to the routes according to the role
          const role = data.user.role;
          if (role == "DOCTOR") {
            navigate("/doctor/dashboard");
          } else if (role == "PATIENT") {
            navigate("/patient/dashboard");
          } else if (role == "ADMIN") {
            navigate("/admin/dashboard");
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };
  const signup = (email, password, name, phoneNumber, gender) => {
    fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, phoneNumber, gender }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            "Please activate your account by the link shared on your email !"
          );

          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };
  // const resetPassword = async (email) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/forgot-password`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     if (data.success) {
  //       toast.success("Check your email for the password reset link", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //       });
  //     } else {
  //       console.error("Password reset failed:", data.message);
  //       // You can set an error state here and handle it in your component
  //     }
  //   } catch (error) {
  //     console.error("Error resetting password:", error.message);
  //     // Handle unexpected errors here
  //   }
  // };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Check your email for the password reset link", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        console.error("Password reset failed:", data.message);
        // You can set an error state here and handle it in your component
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      // Handle unexpected errors here
    }
  };

  const updateProfile = (name, phone, about, address) => {
    fetch(`${BASE_URL}/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
      body: JSON.stringify({ name, phone, about, address }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Profile Details Updated");
          // update the user state
          setUser((prevUser) => ({
            ...prevUser,
            name,
            phoneNumber: phone,
            about,
            address,
          }));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };

  const uploadProfilePic = (file) => {
    const media = new FormData();
    media.append("profile", file);
    fetch(`${BASE_URL}/user/profile-photo`, {
      method: "PUT",
      headers: {
        Authorization: user && user.accessToken,
      },
      body: media,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update the user field if successful
          setUser((prevUser) => ({
            ...prevUser,
            imgUrl: data.imgUrl,
          }));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  //all the users with which we can chat
  const [users, setUsers] = useState([]);

  const fetchAllDoctors = () => {
    fetch(`${BASE_URL}/user/doctors/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Doctors ", data);
        if (data.success) {
          console.log("Data Doctors ", data.doctors);
          setUsers(data.doctors);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };

  const fetchAllPatients = () => {
    fetch(`${BASE_URL}/user/patients/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.patients);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };

  const fetchDoctorsByDepartment = (departmentID) => {
    fetch(`${BASE_URL}/user/doctors/department/${departmentID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.doctors);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };

  const [departments, setDepartments] = useState([]);

  const fetchAllDepartments = () => {
    fetch(`${BASE_URL}/user/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("departments", data);
          setDepartments(data.departments);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => alert(err.message));
  };

  const loadAlltheUsers = () => {
    if (user) {
      if (user.role == "DOCTOR") {
        fetchAllPatients();
      } else if (user.role == "PATIENT") {
        fetchAllDoctors();
      }
    }
  };
  useEffect(() => {
    loadAlltheUsers();
    if (user) fetchAllDepartments();
  }, [user]);

  //if the user exists then only connect to socket
  useEffect(() => {
    if (user) {
      socket.connect();

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  const [messages, setMessages] = useState([]);
  //Sending messages via websocket

  const sendMessage = (messaget) => {
    const message = messaget.trim();
    if (message.length == 0) {
      toast.error("Invalid Message");
      return;
    }
    // check if receiver and user is there then only we can send message
    if (receiver && user) {
      const payload = {
        message,
        receiverId: receiver._id,
        senderId: user && user._id,
      };

      socket.emit("message-received", payload);
    } else {
      toast.error("Failed to send Message");
    }
  };

  const sendFile = (file) => {
    // console.log(file);
    if (file && user && receiver) {
      const payload = {
        file,
        receiverId: receiver._id,
        senderId: user && user._id,
        fileName: file.name,
      };
      socket.emit("file-receiver", payload);
    } else {
      toast.error("Unable to send the File");
    }
  };
  //useeffect to fetch routes based on the role
  useEffect(() => {
    if (user) {
      if (user.role == "DOCTOR") {
        fetchAllPatients();
      } else if (user.role == "PATIENT") {
        fetchAllDoctors();
      }
    }
  }, [user]);
  console.log("The value of users are ", users);
  console.log("User is ", user);

  //....... CHat Logics
  const [receiver, setReceiver] = useState(null);

  const receivedMessage = (payload) => {
    setMessages((prev) => [...prev, payload]);
    // console.log("Message Receiver", payload);
  };

  const fetchAllMessages = () => {
    fetch(`${BASE_URL}/user/messages/all/${receiver._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user && user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.sucesss) {
          setMessages(data.messages);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error("Error while loading messages"));
  };

  useEffect(() => {
    let messageId;
    //if user & receiver exist then only we will add listener as well as fetch messages
    if (user && receiver) {
      console.log("fetchallmessages");
      fetchAllMessages();
      messageId =
        user._id >= receiver._id
          ? user._id + receiver._id
          : receiver._id + user._id;
    }
    // console.log("Listening for ", messageId);
    socket.on(messageId, receivedMessage);

    return () => {
      socket.off(messageId, receivedMessage);
    };
  }, [receiver, user]);
  console.log("Receiver is", receiver);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let temp = localStorage.getItem("user");
      temp = JSON.parse(temp);
      setUser(temp);
      let role = temp.role;
      console.log("Role:", role); // Add this line for debugging
      if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else if (role === "PATIENT") {
        navigate("/patient/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        // If the role is not recognized, redirect to the login page
        navigate("/login");
      }
    } else {
      // If no user is found in localStorage, redirect to the login page
      navigate("/login");
    }
  }, []);

  return (
    <HisContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        uploadProfilePic,
        users,
        departments,
        fetchDoctorsByDepartment,
        receiver,
        setReceiver,
        sendMessage,
        messages,
        sendFile,
        BASE_URL,
        forgotPassword,
      }}
    >
      {children}
    </HisContext.Provider>
  );
}
