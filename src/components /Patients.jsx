import React from "react";
import { useContext, useState } from "react";
import UserCard from "./UserCard/UserCard";
import { HisContext } from "../HisContext";
export default function Patients({ setOption }) {
  const { users } = useContext(HisContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Change this value as needed
  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Calculate total number of pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Calculate index of the last item to display on current page
  const lastIndex = currentPage * itemsPerPage;

  // Calculate index of the first item to display on current page
  const firstIndex = lastIndex - itemsPerPage;

  // Get users for the current page
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          Total Patients: {users.length}
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

      <div className="row">
        {currentUsers.map((item, index) => (
          <div key={index} className="col col-6">
            <UserCard
              name={item.name}
              imgUrl={item.imgUrl}
              email={item.email}
              address={item.address}
              phoneNumber={item.phoneNumber}
              gender={item.gender}
              _id={item._id}
              setOption={setOption}
            />
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center mt-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(i + 1)}
          style={{ backgroundColor: currentPage === i + 1 ? "#098fac" : "" }}
        >
          {i + 1}
        </button>
      </li>
    ))} 
  </ul>
</nav>

    </div>
  );
}
