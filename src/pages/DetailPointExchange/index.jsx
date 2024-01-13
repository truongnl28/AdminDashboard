import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/icons/left-arrow.svg";
import "./pointExchange.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionPointDetail } from "../../actions/transaction";

function DetailPointExchange() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailItem = useSelector(
    (state) => state.detailTransactionPointReducer.detailPoint
  );
  const [item, setItem] = useState(undefined);
  console.log(item)
  useEffect(() => {
    dispatch(getTransactionPointDetail(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (detailItem) {
      setItem(detailItem);
    }
  }, [detailItem]);
  const handleExit = () => {
    navigate("/pointExchange");
  };

  return (
    <div className="detailPoint">
      <div className="detailPoint-container">
        <div className="detailPoint-header">
          <img
            src={BackIcon}
            className="back-btn"
            alt=""
            onClick={handleExit}
          />
          <h2>Chi tiết trao đổi điểm</h2>
        </div>
        <div className="detailPoint-body">
          <div className="detailPoint-row">
            {/* Column 1 */}
            <div className="detailPoint-column">
              <div className="detailPoint-image">
                <img
                  src={item?.images ?item?.images[0]?.imageUrl
                    :""}
                  className="detailPoint-avatar"
                  alt=""
                />
              </div>
              <div className="">
                <label htmlFor="">Tên món đồ</label>
                <input type="text" value={item?.itemName ?? 0} readOnly />
              </div>
              <div className="">
                <label htmlFor="">Danh mục</label>
                <input
                  type="text"
                  value={item?.categoryName ?? 0}
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor="">Điểm của món đồ</label>
                <input type="text" value={item?.itemPoint ?? 0} readOnly />
              </div>
            </div>

            {/* Column 2 */}
            <div className="detailPoint-column">
              <div className="">
                <label htmlFor="">Tên người cho</label>
                <input
                  type="text"
                  value={item?.memberGiverName ?? 0}
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor="">Số điểm thay đổi</label>
                <input
                  type="text"
                  style={{color:`${item?.changePointMemberGiver<0?"black":"green"}`}}
                  value={`+${item?.changePointMemberGiver ?? 0}`}
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor="">Số điểm còn lại</label>
                <input type="text" value={item?.oldPointMemberGiver ?? 0} readOnly />
              </div>
            </div>

            {/* Column 3 */}
            <div className="detailPoint-column">
              <div className="">
                <label htmlFor="">Tên người nhận</label>
                <input
                  type="text"
                  value={item?.memberReceiverName ?? 0}
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor="">Số điểm thay đổi</label>
                <input type="text" style={{color:`${item?.changePointMemberReceiver>0?"black":"red"}`}} value={item?.changePointMemberReceiver ?? 0} readOnly />
              </div>
              <div className="">
                <label htmlFor="">Số điểm còn lại</label>
                <input type="text" value={item?.oldPointMemberReceiver?? 0} readOnly />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="btn">
          <button className="refundPoints">Hoàn trả điểm</button>
        </div> */}
      </div>
    </div>
  );
}

export default DetailPointExchange;
