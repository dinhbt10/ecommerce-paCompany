import { Modal } from "flowbite-react";
import { convertDate, formatNumber } from "../../../utils/common";

const ModalDetailOrders = ({ isOpen, setOpenModal, data }) => {
  console.log(data);

  return (
    <Modal show={isOpen} onClose={() => setOpenModal(false)}>
      <Modal.Header>Chi tiết đặt hàng</Modal.Header>
      <Modal.Body>
        <div className="flex justify-between items-center">
          <div>Sản phẩm đã đặt: {data.books.length}</div>
          <div>
            Trạng thái đơn hàng:{" "}
            <span className="text-red-800">{data.status}</span>
          </div>
        </div>
        {data?.books.map((item) => {
          return (
            <div
              key={item.idBook}
              className="border p-3 mt-3 flex flex-row gap-2 items-center"
            >
              <div className="w-3/4 flex items-center justify-start gap-2">
                <div className="min-w-[80px] h-[80px] bg-slate-200">
                  <img
                    src={item.imageUrls[0]}
                    alt="anh"
                    className="w-full h-full object-contain rounded-sm"
                  />
                </div>
                <div className="text-sm">{item.nameBook}</div>
              </div>
              <div className="w-1/4 flex flex-row gap-2">
                <div className="flex flex-col items-center">
                  <div className="text-md">Số lượng</div>
                  <div className="text-sm text-red-800">{item.quantity}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-md">Giá tiền</div>
                  <div className="text-sm text-red-800">
                    {formatNumber(item.price)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-3">
          <span>Thông tin đơn hàng</span>
          <div className="flex flex-col gap-2 border py-2 px-3 mt-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Mã đơn hàng</span>
              <span className="text-sm">{data.orderCode}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Hình thức vận chuyển</span>
              <span className="text-sm">{data.shipment}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Thành toán</span>
              <span className="text-sm">{data.payment}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">SDT người nhận</span>
              <span className="text-sm">{data.phone}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Địa chỉ người nhận</span>
              <span className="text-sm">{data.shippingAdrress}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Tên người nhận</span>
              <span className="text-sm">{data.receiveName}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm">Ngày giao hàng</span>
              <span className="text-sm">{convertDate(data.deliveryDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-3 gap-1">
          Thành tiền:{" "}
          <span className="text-red-800">{formatNumber(data.total)}</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailOrders;
