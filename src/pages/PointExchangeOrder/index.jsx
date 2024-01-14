import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import PencilIcon from "../../assets/icons/pencil.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionPoint } from "../../actions/transaction";

function PointExchange() {
  // Use the navigate function from react-router-dom for navigation
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const listAllTransactionPoint = useSelector(
    (state) => state.listTransactionPointReducer.listTransactionPoint
  );
  const [data, setData] = useState([]);
  console.log(listAllTransactionPoint);
  useEffect(() => {
    dispatch(getTransactionPoint());
  }, [dispatch]);
  useEffect(() => {
    if (listAllTransactionPoint) {
      setData(listAllTransactionPoint);
    }
  }, [listAllTransactionPoint]);

  // State for managing search query
  const [searchQuery] = useState("");

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 8;

  // Filter users based on the search query
  const filteredUsers = data?.filter((user) =>
    user?.item?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
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

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách lệnh trao đổi điểm</h2>

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
                <th>Tên món đồ</th>
                <th>Danh mục</th>
                <th>Điểm</th>
                <th>Trạng thái vật phẩm</th>
                <th>Người cho</th>
                <th>Người nhận</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through paginated data to display user rows */}
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span style={{ display: "flex", justifyItems: "center" }}>
                      {/* Display user avatar */}
                      <img
                        src={
                          user?.item?.images[0]?.imageUrl ??
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                        }
                        className="content-avatar"
                        alt=""
                      />
                      <p style={{ marginLeft: "10px" }}>{user?.item?.name}</p>
                    </span>
                  </td>
                  {/* Display user information */}
                  <td>
                    <span>{user?.item?.category?.name}</span>
                  </td>
                  <td>
                    <span>{user?.points}</span>
                  </td>
                  <td>
                    <span>{user?.type === "GIVE" ? "Đưa cho" : "Nhận"}</span>
                  </td>
                  <td>
                    <span>{user?.item?.giver?.name}</span>
                  </td>
                  <td>
                    <span>{user?.item?.receiver?.name}</span>
                  </td>
                  {/* Display the edit icon for navigating to user details */}
                  <td>
                    <Link to={`/detailPointExchange/${user.id}`}>
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

export default PointExchange;
