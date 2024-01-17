import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import PencilIcon from "../../assets/icons/pencil.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getItem } from "../../actions/item";
export const styleStatus = {
  PENDING: "Đang đợi",
  APPROVED: "Đã xác nhận",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};
function ItemsList() {
  // Use the navigate function from react-router-dom for navigation
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const listAllItem = useSelector((state) => state.listItemReducer.listItem);
  const [data, setData] = useState([]);
  console.log(listAllItem);
  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);
  useEffect(() => {
    if (listAllItem) {
      setData(listAllItem);
    }
  }, [listAllItem]);

  // State for managing search query
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 8;

  // Filter users based on the search query
  const filteredUsers = data?.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
      (selectedStatus ? user?.status === selectedStatus : true)
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

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách món đồ</h2>

          <div className="filter-dropdown">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tất cả</option>
              {Object.keys(styleStatus).map((status) => (
                <option key={status} value={status}>
                  {styleStatus[status]}
                </option>
              ))}
            </select>
          </div>

          {/* Search input for filtering users */}
          <div className="content-search">
            <input
              type="text"
              placeholder="Tìm kiếm món đồ"
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
                <th>Ảnh</th>
                <th>Tên món đồ</th>
                <th>Danh mục</th>
                <th>Điểm</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: "center" }}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={
                        user?.images[0]?.imageUrl ??
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                      }
                      className="image-item"
                      alt=""
                    />
                  </td>
                  <td>
                    <span>{user?.name}</span>
                  </td>
                  <td>
                    <span>{user?.category?.name}</span>
                  </td>
                  <td>
                    <span>{user?.point}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: `${
                          user?.status === "PENDING"
                            ? "#3498db"
                            : user?.status === "APPROVED"
                            ? "#2ecc71"
                            : user?.status === "COMPLETED"
                            ? "#f39c12"
                            : user?.status === "CANCELLED"
                            ? "#e74c3c"
                            : "black"
                        }`,
                      }}
                    >
                      {styleStatus[user?.status]}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Link to={`/detailOfProduct/${user.id}`}>
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

export default ItemsList;
