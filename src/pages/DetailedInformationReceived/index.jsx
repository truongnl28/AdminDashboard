import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import PencilIcon from "../../assets/icons/pencil.svg";
import BackIcon from "../../assets/icons/left-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getItemRegister } from "../../actions/item";

function DetailedInformationReceived() {
  // Use the navigate function from react-router-dom for navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {itemId} = useParams();
  console.log(itemId)
  const listAllMember = useSelector(
    (state) => state.listItemRegisterReducer.listItemRegister
  );
  const [data, setData] = useState([]);
  console.log(listAllMember);
  useEffect(() => {
    dispatch(getItemRegister(itemId));
  }, [dispatch, itemId]);
  useEffect(() => {
    if (listAllMember) {
      setData(listAllMember);
    }
  }, [listAllMember]);

  // State for managing search query
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState("");

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 8;

  // Filter users based on the search query
  const filteredUsers = data?.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
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
    navigate(`/detailOfProduct/${itemId}`)
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
            onClick={handleExit}
          />
          <h2>Số người đăng ký nhận: </h2>

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
                <th>Ảnh đại diện </th>
                <th>Tên</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Số điện thoại</th>
                <th style={{ textAlign: "center" }}>Trạng thái</th>
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
                        src={
                          user.image ??
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                        }
                        className="content-avatar"
                        alt=""
                      />
                    </span>
                  </td>
                  {/* Display user information */}
                  <td>
                    <span>{user.name}</span>
                  </td>
                  <td>
                    <span>{user.email}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span>{user.phoneNumber ?? "N/A"}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span
                    style={{color:`${user?.isDeleted === true ?"red":"blue"}` }}
                    >
                      {user.isDeleted === true ? "Not active" : "Active"}
                    </span>
                  </td>
                  {/* Display the edit icon for navigating to user details */}
                  <td>
                    <Link to={`/item:${user.id}:${itemId}`}>
                      <img src={PencilIcon} alt="" />
                    </Link>
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

export default DetailedInformationReceived;
