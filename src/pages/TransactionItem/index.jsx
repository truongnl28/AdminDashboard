import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import PencilIcon from "../../assets/icons/pencil.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../../actions/transaction";

function TransactionList() {
  const dispatch = useDispatch();
  const listAllTransaction = useSelector(
    (state) => state.listTransactionReducer.listTransaction
  );
  const [data, setData] = useState([]);
  // State for managing search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 8;
  useEffect(() => {
    dispatch(getTransaction());
  }, [dispatch]);
  useEffect(() => {
    if (listAllTransaction) {
      setData(listAllTransaction);
    }
  }, [listAllTransaction]);
  // Filter users based on the search query
  const filteredUsers = data?.filter((user) =>
    user?.item?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
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

  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách lý do hủy</h2>

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

        {filteredUsers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Email người hủy</th>
                <th>Món đồ</th>
                <th>Lý do</th>
                <th>Chi tiết người dùng</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through paginated data to display user rows */}
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span>{user.item?.giver?.email}</span>
                  </td>

                  <td>
                    <span>{user.item.name}</span>
                  </td>

                  <td>
                    <span>{user.reasonDescription}</span>
                  </td>

                  <td>
                    <Link to={`/${user.id}`}>
                      <img src={PencilIcon} alt="" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-table">Không có dữ liệu!</div>
        )}

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

export default TransactionList;
