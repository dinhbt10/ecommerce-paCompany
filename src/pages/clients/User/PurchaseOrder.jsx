import { useState } from "react";
import {
  convertDate,
  formatNumber,
  isWithin24Hours,
} from "../../../utils/common";
import { DeleteModal } from "./DeleteModal";

const PurchaseOrder = ({ data }) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const handleCancel = async (id) => {
    setOrderId(id);
    setOpenModalDelete(true);
  };

  return (
    <div className="flex flex-col gap-5">
      {data &&
        data.map((item, index) => (
          <div
            className="bg-white p-5 flex flex-col gap-3 rounded-sm cursor-pointer"
            key={index}
          >
            <div className="flex justify-between items-center">
              <p className="text-black">
                Ngày nhận hàng: {convertDate(item.deliveryDate)}
              </p>
              <p className="text-[#cd5f5f]">{item.status}</p>
            </div>
            <div className="flex flex-col gap-2">
              {item.books.map((book, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-center flex-1 border-b border-t py-3"
                >
                  <div className="bg-black w-[100px]">
                    <img
                      src={book.imageUrls[0]}
                      alt="anh"
                      width="100px"
                      className="max-h-[100px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p>{book.nameBook}</p>
                    <div className="flex justify-between items-center">
                      <p>x{book.quantity}</p>
                      <p className="text-md font-semibold text-[#cd5f5f]">
                        {formatNumber(book.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 py-4">
                <div className="text-sm">Thành tiền:</div>
                <div className="text-xl font-semibold text-[#cd5f5f]">
                  {formatNumber(item.total)}
                </div>
              </div>
              {item.status === "Processing" &&
                isWithin24Hours(item.createdAt) && (
                  <div className="flex items-center gap-2">
                    <button className="text-sm border rounded-sm py-2 px-12 bg-gray-200 cursor-not-allowed">
                      Chờ
                    </button>
                    <button
                      className="text-sm border rounded-sm py-2 px-4"
                      onClick={() => handleCancel(item.id)}
                    >
                      Hủy đơn hàng
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      {data.length === 0 && (
        <div className="flex items-center justify-center bg-white h-[400px] flex-col gap-2 rounded">
          <img
            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
            className="h-[100px]"
          />
          Chưa có đơn hàng
        </div>
      )}
      {openModalDelete && (
        <DeleteModal
          orderId={orderId}
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
    </div>
  );
};

export default PurchaseOrder;
