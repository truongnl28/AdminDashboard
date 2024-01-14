import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import BackIcon from "../../assets/icons/left-arrow.svg";

function ReviewList() {
  // Use the navigate function from react-router-dom for navigation
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item,userId } = state;
  console.log(userId)
  const [data, setData] = useState([]);
  console.log(item?.feedbacksGiver);
  useEffect(() => {
    if (item) {
      setData(item?.feedbacksGiver);
    }
  }, [item]);

  // State for managing search query
  const [searchQuery] = useState("");

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 8;

  // Filter users based on the search query
  const filteredUsers = data?.filter((user) =>
    user?.receiver?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // Get the paginated data for the current page
  const paginatedData = sliceData(filteredUsers, currentPage, rowsPerPage);

  // Get the page range for pagination
  const pageRange = calculateRange(filteredUsers, rowsPerPage);

  // Handle search input change
  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  //   setCurrentPage(1); // Reset to the first page when searching
  // };

  // Handle page change in pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleExit = () => {
    return  navigate(`/${userId}`);
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <img
            src={BackIcon}
            className="back-btn"
            alt=""
            onClick={()=>handleExit()}
          />
          <h2>Danh sách đánh giá</h2>

          {/* Search input for filtering users */}
          {/* <div className="content-search">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng"
              className="content-input"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div> */}
        </div>

        {/* Render user data table if there are users */}
        {filteredUsers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Ảnh đại diện người đánh giá</th>
                <th>Tên người đánh giá</th>
                <th>Lời đánh giá</th>
                <th style={{textAlign: 'center'}}>Sao đánh giá</th>
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
                        src={
                          user?.receiver?.image ??
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                        }
                        className="content-avatar"
                        alt=""
                      />
                    </span>
                  </td>
                  {/* Display user information */}
                  <td>
                    <span>{user?.receiver?.name}</span>
                  </td>
                  <td>
                    <span>{user?.content}</span>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <span>{user?.rating}</span>
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

export default ReviewList;
