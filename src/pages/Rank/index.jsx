import React, { useState, useEffect, useRef } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import "../styles.css";
import RankModal from "../NewConfigModal/rankModal";
import PencilIcon from "../../assets/icons/pencil.svg";
import SaveIcon from "../../assets/icons/save.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteRank, getRank, postRank, updateRank } from "../../actions/rank";

function RankList() {
  const dispatch = useDispatch();
  const listAllRank = useSelector((state) => state.listRankReducer.listRank);
  // State for managing rank data
  const [data, setData] = useState([]);
  const [numberUpdate, setNumberUpdate] = useState(-1);
  const [nameRank, setNameRank] = useState("");
  const [numberRank, setNumberRank] = useState(0);
  const [images, setImages] = useState(null);
  const inputRef = useRef();
  console.log(nameRank, numberRank, images);
  useEffect(() => {
    dispatch(getRank());
  }, [dispatch]);
  useEffect(() => {
    if (listAllRank) {
      setData(listAllRank);
    }
  }, [listAllRank]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = (newRank) => {
    const { rankName, image, point } = newRank;
    if (rankName.trim() === "" || point.trim() === "") {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }
    if (image) {
      const allowedFormats = [".png", ".jpg", ".jpeg"];
      const fileExtension = image.name.slice(
        ((image.name.lastIndexOf(".") - 1) >>> 0) + 2
      );

      if (allowedFormats.indexOf(`.${fileExtension.toLowerCase()}`) === -1) {
        alert("Chỉ chấp nhận các file có định dạng .png, .jpg, hoặc .jpeg");
        return;
      }
    }

    if (isDuplicateRank(rankName, 0)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    } else {
      const newData = {
        rankName: rankName,
        point: point,
        imageURL: image,
      };
      dispatch(postRank(newData));
    }
  };

  const isDuplicateRank = (name, id) => {
    return data.some(
      (row) =>
        row.rankName.toLowerCase() === name.toLowerCase() && row.id !== id
    );
  };

  const handleInputChange = (id, field, value) => {
    if (field === "point") {
      if (isNaN(value) || value.includes(".") || parseFloat(value) <= 0) {
        alert("Giá trị không hợp lệ. Vui lòng nhập lại");
        return;
      }
    }
    const matchingRow = data.find((row) => row.id === id);
    const initialName = matchingRow ? matchingRow.rankName : "Default Name";
    const initialPoint = matchingRow ? matchingRow.point : 0;
    setNameRank(field === "rankName" ? value : initialName);
    setNumberRank(field === "point" ? value : initialPoint);
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
  const handleAvatar = (event) => {
    const selectedImage = event.target.files?.[0] || null;

    if (selectedImage) {
      const allowedFormats = [".png", ".jpg", ".jpeg"];
      const fileExtension = selectedImage.name.slice(
        ((selectedImage.name.lastIndexOf(".") - 1) >>> 0) + 2
      );

      if (allowedFormats.indexOf(`.${fileExtension.toLowerCase()}`) === -1) {
        alert("Chỉ chấp nhận các file có định dạng .png, .jpg, hoặc .jpeg");
        return;
      }
      setImages(selectedImage);
    }
  };

  // const handleFilterChange = (id, filter) => {
  //   setData((prevData) =>
  //     prevData.map((row) =>
  //       row.id === id ? { ...row, isDefault: filter === "true" } : row
  //     )
  //   );
  // };

  const handleEdit = (id, index) => {
    if (numberUpdate === index) {
      setNumberUpdate(-1);
    } else {
      setNumberUpdate(index);
      dispatch(getRank());
      setNameRank(data.find((row) => row.id === id).rankName);
      setNumberRank(data.find((row) => row.id === id).point);
    }
  };

  const handleSave = (id, index) => {
    const isDataInvalid = data.some(
      (row) =>
        row.id === id &&
        (row.rankName.trim() === "" || row.point.toString().trim() === "")
    );
    if (isDataInvalid) {
      alert("Vui lòng nhập dữ liệu.");
      return;
    }

    if (isDuplicateRank(data.find((row) => row.id === id).rankName, id)) {
      alert("Dữ liệu đã tồn tại. Vui lòng chọn dữ liệu khác.");
      return;
    }

    if (numberUpdate === index) {
      setNumberUpdate(-1);
      if (nameRank && numberRank) {
        const NewData = {
          rankName: nameRank,
          point: numberRank,
          image: images,
        };
        console.log(NewData);
        dispatch(updateRank(NewData, id));
      }
    } else {
      setNumberUpdate(index);
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa không?");

    if (isConfirmed) {
      dispatch(deleteRank(id));
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>Danh sách huy hiệu</h2>
          <div className="content-create-btn">
            <button onClick={handleCreate}>Tạo mới</button>
          </div>
        </div>

        {isModalOpen && (
          <RankModal onClose={handleCloseModal} onSave={handleSaveModal} />
        )}

        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Huy hiệu</th>
                <th>Tên huy hiệu</th>
                <th>Điểm</th>
                <th>Chỉnh sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {sliceData(data, currentPage, rowsPerPage).map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <span className="imageRank">
                      {numberUpdate === index ? (
                        <div>
                          {images !== null && (
                            <img
                              src={URL.createObjectURL(images)}
                              alt="Uploaded"
                              style={{ cursor: "pointer" }}
                            />
                          )}
                          <label htmlFor="fileInput">Thêm ảnh</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleAvatar(e)}
                            id="fileInput"
                            style={{
                              display: "none",
                            }}
                            ref={inputRef}
                          />
                        </div>
                      ) : (
                        <img src={row.imageUrl} alt={row.name} />
                      )}
                    </span>
                  </td>

                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.rankName}
                          onChange={(e) =>
                            handleInputChange(
                              row.id,
                              "rankName",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        row.rankName
                      )}
                    </span>
                  </td>

                  <td>
                    <span>
                      {numberUpdate === index ? (
                        <input
                          type="text"
                          value={row.point}
                          onChange={(e) =>
                            handleInputChange(row.id, "point", e.target.value)
                          }
                        />
                      ) : (
                        row.point
                      )}
                    </span>
                  </td>

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
                          onClick={() => handleEdit(row.id, index)}
                        />
                      )}
                    </span>
                  </td>

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
          <div className="empty-table">Không có dữ liệu!</div>
        )}

        <div className="content-footer">
          {data.length > 0 ? (
            <div className="paginationTable">
              {calculateRange(data, rowsPerPage).map((page) => (
                <span
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage === page ? "active-pagination" : "pagination"
                  }
                >
                  {page}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RankList;
