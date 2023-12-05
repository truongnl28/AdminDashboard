import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import PencilIcon from "../../assets/icons/pencil.svg";

function UserList() {
  // Use the navigate function from react-router-dom for navigation
  const navigate = useNavigate();

  // State for managing user data
  const [data, setData] = useState([
    {
      id: 1,
      avatar: "https://reqres.in/img/faces/1-image.jpg",
      username: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      status: "Active",
    },
    {
      id: 2,
      avatar: "https://reqres.in/img/faces/7-image.jpg",
      username: "Michael Lawson",
      email: "michael.lawson@example.com",
      phone: "012-345-6789",
      status: "Offline",
    },
    {
      id: 3,
      avatar: "https://reqres.in/img/faces/8-image.jpg",
      username: "Lindsay Ferguson",
      email: "lindsay.ferguson@example.com",
      phone: "456-321-8709",
      status: "Active",
    },
    {
      id: 4,
      avatar: "https://reqres.in/img/faces/10-image.jpg",
      username: "Byron Fields",
      email: "byron.fields@example.com",
      phone: "615-087-9234",
      status: "Offline",
    },
    {
      id: 5,
      avatar: "https://reqres.in/img/faces/2-image.jpg",
      username: "George Edwards",
      email: "george.edwards@example.com",
      phone: "675-124-3908",
      status: "Active",
    },
    {
      id: 6,
      avatar: "https://reqres.in/img/faces/3-image.jpg",
      username: "George Fields",
      email: "george.edwards@example.com",
      phone: "675-124-3908",
      status: "Active",
    },
    {
      id: 7,
      avatar: "https://reqres.in/img/faces/5-image.jpg",
      username: "Edwards Fields",
      email: "george.edwards@example.com",
      phone: "675-124-3908",
      status: "Offline",
    },
    // Add more user objects as needed
  ]);

  // State for managing search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 6;

  // Filter users based on the search query
  const filteredUsers = data.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the paginated data for the current page
  const paginatedData = sliceData(filteredUsers, currentPage, rowsPerPage);

  // Get the page range for pagination
  const pageRange = calculateRange(filteredUsers, rowsPerPage);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle page change in pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // Handle user details navigation
  const handleChange = (user) => {
    navigate("/detailsInfoUser", { state: { user } });
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách người dùng</h2>

          {/* Search input for filtering users */}
          <div className="content-search">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng"
              className="content-input"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>

        {/* Render user data table if there are users */}
        {filteredUsers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Ảnh đại diện</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through paginated data to display user rows */}
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span>
                      {/* Display user avatar */}
                      <img
                        src={user.avatar}
                        className="content-avatar"
                        alt=""
                      />
                    </span>
                  </td>
                  {/* Display user information */}
                  <td>
                    <span>{user.username}</span>
                  </td>
                  <td>
                    <span>{user.email}</span>
                  </td>
                  <td>
                    <span>{user.phone}</span>
                  </td>
                  <td>
                    <span>{user.status}</span>
                  </td>
                  {/* Display the edit icon for navigating to user details */}
                  <td>
                    <span>
                      <img
                        src={PencilIcon}
                        alt=""
                        onClick={() => handleChange(user)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Display a message when there is no user data
          <div className="empty-table">Không có dữ liệu</div>
        )}

        {/* Render pagination buttons if there are users */}
        <div className="content-footer">
          {filteredUsers.length > 0
            ? pageRange.map((page) => (
                <span
                  key={page}
                  className={
                    page === currentPage ? "active-pagination" : "pagination"
                  }
                  onClick={() => handleChangePage(page)}
                >
                  {page}
                </span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default UserList;
