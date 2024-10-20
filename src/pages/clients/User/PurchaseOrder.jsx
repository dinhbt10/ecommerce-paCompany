import { useState } from "react";
import { formatNumber, isWithin24Hours } from "../../../utils/common";
import { DeleteModal } from "./DeleteModal";

const PurchaseOrder = ({ data }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleCancel = async () => {
    setOpenModalDelete(true);
  };

  return (
    <div className="flex flex-col gap-5">
      {data.map((item, index) => (
        <div
          className="bg-white p-5 flex flex-col gap-3 rounded-sm"
          key={index}
        >
          <div className="flex justify-between items-center">
            <p className="text-black">{item.author}</p>
            <p className="text-[#cd5f5f]">{item.status}</p>
          </div>
          <div className="flex flex-row gap-3 items-center flex-1 border-b border-t py-3">
            <div className="bg-black w-[100px]">
              <img
                src={item.imageUrls[0]}
                alt="anh"
                width="100px"
                className="max-h-[100px] object-contain"
              />
            </div>
            <div className="flex flex-col flex-1">
              <p>{item.title}</p>
              <div className="flex justify-between items-center">
                <p>x{item.quantity}</p>
                <p className="text-md font-semibold text-[#cd5f5f]">
                  {formatNumber(item.price)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 py-4">
              <div className="text-sm">Thành tiền:</div>
              <div className="text-xl font-semibold text-[#cd5f5f]">
                {formatNumber(item.price * item.quantity)}
              </div>
            </div>
            {item.status === "Pending" && isWithin24Hours(item.date) && (
              <div className="flex items-center gap-2">
                <button className="text-sm border rounded-sm py-2 px-12 bg-gray-200 cursor-not-allowed">
                  Chờ
                </button>
                <button
                  className="text-sm border rounded-sm py-2 px-4"
                  onClick={() => handleCancel()}
                >
                  Hủy đơn hàng
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {openModalDelete && (
        <DeleteModal
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
    </div>
  );
};

export default PurchaseOrder;
