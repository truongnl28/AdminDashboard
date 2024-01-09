import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import PencilIcon from "../../assets/icons/pencil.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { getShowMember } from "../../actions/member";

function ItemsList() {
  // Use the navigate function from react-router-dom for navigation
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const listAllMember = useSelector(
    (state) => state.listMemberReducer.listMember
  );
  const [data, setData] = useState([]);
  console.log(listAllMember);
  useEffect(() => {
    dispatch(getShowMember());
  }, [dispatch]);
  useEffect(() => {
    if (listAllMember) {
      setData(listAllMember);
    }
  }, [listAllMember]);

  // State for managing search query
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
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle page change in pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

    if (isConfirmed) {
    //   dispatch(deleteRank(id));
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách món đồ</h2>

          <div className="">
            <select>
              <option value="">Đang đợi</option>
              <option value="">Đã xác nhận</option>
              <option value="">Hoàn thành</option>
              <option value="">Đã hủy</option>
            </select>
          </div>

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
                <th>Ảnh</th>
                <th>Tên món đồ</th>
                <th>Danh mục</th>
                <th>Điểm</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <Link to={`/user:${user.id}`}>
                      <img src={PencilIcon} alt="" />
                    </Link>
                  </td>
                  <td>
                    <span>
                      <img
                        src={TrashIcon}
                        alt=""
                        // onClick={() => handleDelete(row.id)}
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

export default ItemsList;
