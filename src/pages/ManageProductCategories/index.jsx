import React, { useEffect, useState } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import ManageProductModal from "../NewConfigModal/manageProductModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategory, postCategory, updateCategory } from "../../actions/category";

function ManageProductList() {
  // State for managing product data
  const dispatch = useDispatch();
  const listAllCategory = useSelector(
    (state) => state.listCategoryReducer.listCategory
  );
  const [data, setData] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const [updatePointY, setPointY] = useState(0);
  const [numberUpdate, setNumberUpdate] = useState(-1);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  useEffect(() => {
    if (listAllCategory) {
      setData(listAllCategory);
    }
  }, [listAllCategory]);

  // State for managing search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of rows to display per page
  const rowsPerPage = 6;

  // Filter products based on the search query
  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get paginated data and page range based on search results
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPage);
  const pageRange = calculateRange(filteredData, rowsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle edit mode for a product
  const handleEdit = (index) => {
    if (numberUpdate === index) {
      setNumberUpdate(-1);
    } else {
      setNumberUpdate(index);
      dispatch(getCategory());
    }
  };

  // Handle saving changes for a product
  const handleSave = (id, index) => {
    // Check if data is invalid (missing values)
    const isDataInvalid = data.some(
      (row) =>
        row.id === id &&
        (row.name.trim() === "" ||
          row.pointY.toString().trim() === "")
    );

    if (isDataInvalid) {
      alert("Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }

    // Check for duplicate category name
    if (isDuplicateName(data.find((row) => row.id === id).name, id)) {
      alert("Tên danh mục sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    // Update data to exit editing mode
    if (numberUpdate === index) {
      setNumberUpdate(-1);
      if (updateName && updatePointY) {
        const NewData = {
          name: updateName,
          y_Point: updatePointY,
        };
        // console.log("first", NewData);
        dispatch(updateCategory(NewData,id));
      }
    } else {
      setNumberUpdate(index);
    }
  };

  // Handle input change for a product field
  const handleInputChange = (id, field, value) => {
    // Validate numeric fields (pointX, pointY)
    if (field === "pointY") {
      if (isNaN(value) || value.includes(".") || parseFloat(value) <= 0) {
        alert("Giá trị không hợp lệ. Vui lòng nhập lại");
        return;
      }
    }
    const matchingRow = data.find((row) => row.id === id);

    // Use the initial values from the matching row or provide default values if not found
    const initialName = matchingRow ? matchingRow.name : "Default Name";
    const initialYPoint = matchingRow ? matchingRow.pointY : 0;

    setUpdateName(field === "name" ? value : initialName);
    setPointY(field === "pointY" ? value : initialYPoint);
    // Update data with the new value
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Handle change in the default filter for a product
  // const handleFilterChange = (id, filter) => {
  //   setData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === id ? { ...row, isDefault: filter === "true" } : row
  //     )
  //   );
  // };

  // Handle deletion of a product
  const handleDelete = (id) => {
    // Confirm deletion with the user
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");
    if (isConfirmed) {
      // Remove the product from the data
      setData((prevData) => prevData.filter((row) => row.id !== id));
      dispatch(deleteCategory(id))

    }
  };

  // Handle opening the modal for creating a new product
  const handleCreate = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Validate data for a new product
  const validateData = (newConfig) => {
    const { y_Point } = newConfig;

    if (isNaN(y_Point) || y_Point.includes(".") || parseFloat(y_Point) <= 0) {
      return "Điểm Y không hợp lệ. Vui lòng nhập số dương và không có dấu thập phân.";
    }

    return null;
  };

  // Handle saving changes for a new product from the modal
  const handleSaveModal = (newConfig) => {
    const { name, pointY } = newConfig;
    

    // Check for missing values in the new product
    if (name?.trim() === "" || pointY?.trim() === "") {
      alert("Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }

    // Validate numeric fields (pointX, pointY)
    const validationError = validateData(newConfig);

    if (validationError) {
      alert(validationError);
      return;
    }

    // Check for duplicate category name in the new product
    if (isDuplicateName(name, 0)) {
      alert("Tên danh mục sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }else{
      dispatch(postCategory(newConfig))
    }
  };

  // Check if a category name is a duplicate
  const isDuplicateName = (name, id) => {
    return data.some(
      (row) => row.name.toLowerCase() === name.toLowerCase() && row.id !== id
    );
  };

  // Handle change in the current page for pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // Render the component
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách danh mục sản phẩm</h2>

          {/* Button for creating a new product */}
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>

          {/* Search input for filtering products */}
          <div className="content-search">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="content-input"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
        </div>

        {/* Render the modal for creating a new product */}
        {isModalOpen && (
          <ManageProductModal
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        )}

        {/* Render the product data table if there are products */}
        {filteredData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tên danh mục sản phẩm</th>
                <th>Điểm X</th>
                <th>Điểm Y</th>
                <th>Mặc định</th>
                <th>Thao tác</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through paginated data to display product rows */}
              {paginatedData.map((row, index) => (
                <tr key={row.id}>
                  {/* Render category name field */}
                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) =>
                            handleInputChange(row.id, "name", e.target.value)
                          }
                        />
                      ) : (
                        row.name
                      )}
                    </span>
                  </td>

                  {/* Render pointX field */}
                  <td>
                    <span>
                        {row.pointX}
                    </span>
                  </td>

                  {/* Render pointY field */}
                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.pointY}
                          onChange={(e) =>
                            handleInputChange(row.id, "pointY", e.target.value)
                          }
                        />
                      ) : (
                        row.pointY
                      )}
                    </span>
                  </td>

                  {/* Render isDefault field */}
                  <td>
                    <span>
                      {/* {numberUpdate[index]===true ? (
                        <div className="filter-dropdown">
                          <select
                            value={row.isDefault.toString()}
                            onChange={(e) =>
                              handleFilterChange(row.id, e.target.value)
                            }
                          >
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </select>
                        </div>
                      ) : row.isDefault ? (
                        "Có"
                      ) : ( */}
                      Không
                      {/* )} */}
                    </span>
                  </td>

                  {/* Render edit or save icon based on edit mode */}
                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <img
                          src={SaveIcon}
                          alt=""
                          onClick={() => handleSave(row.id, index)}
                        />
                      ) : (
                        <img
                          src={PencilIcon}
                          alt=""
                          onClick={() => handleEdit(index)}
                        />
                      )}
                    </span>
                  </td>

                  {/* Render delete icon */}
                  <td>
                    <span>
                      <img
                        src={TrashIcon}
                        alt=""
                        onClick={() => handleDelete(row.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Display a message when there is no product data
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        {/* Render pagination buttons if there are products */}
        <div className="content-footer">
          {filteredData.length > 0
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

export default ManageProductList;
