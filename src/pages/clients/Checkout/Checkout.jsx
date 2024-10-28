import { useLocation, useNavigate } from "react-router-dom";
import { formatNumber, getUserInfoLocalStorage } from "../../../utils/common";
import { MdOutlineWrongLocation } from "react-icons/md";
import { Select, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import instance from "../../../utils/http";

const Checkout = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState({
    note: "",
    shipmentId: 1,
    paymentId: 1,
  });
  const userInfo = getUserInfoLocalStorage();

  const handleSubmit = async () => {
    try {
      const selectedIds = data.map((item) => item.idCart).join(",");
      const res = await instance.post(
        `/orders/create?userId=${userInfo.idUser}&shippingAddress=${userInfo.address}&selectedCartDetailIds=${selectedIds}&paymentId=${checkout.paymentId}&shipmentId=${checkout.shipmentId}&phone=${userInfo.phone}&receivingName=${userInfo.fullname}&note=${checkout.note}`
      );
      const { success } = res.data;
      if (success) {
        navigate("/user?active=1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="bg-white">
        <div className="bg-white">
          <div className="flex justify-between items-center max-w-[1100px] mx-auto py-5">
            <div className="text-2xl text-[#cd5f5f] font-semibold">
              Thanh toán
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto my-3 bg-white px-8 py-6">
        <div className="flex text-xl text-[#cd5f5f] items-center justify-start gap-2 font-medium">
          <MdOutlineWrongLocation /> Địa Chỉ Nhận Hàng
        </div>
        <div className="flex text-xl text-black items-center justify-start gap-2  mt-3">
          <div className="font-medium">
            {userInfo.fullname} {userInfo.phone}
          </div>
          <p className="text-gray-600">{userInfo.address}</p>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto bg-white">
        <div className="p-10">
          <Table>
            <Table.Body>
              <Table.Row className="bg-white">
                <Table.Cell className="w-[58%] text-[#0a0a0a] font-medium p-2 text-xl">
                  Sản phẩm
                </Table.Cell>
                <Table.Cell className="p-2 w-[14%]">Đơn giá</Table.Cell>
                <Table.Cell className="p-2 w-[14%]">Số lượng</Table.Cell>
                <Table.Cell className="p-2 w-[14%]">Thành tiền</Table.Cell>
              </Table.Row>
              {data &&
                data.map((item, index) => (
                  <Table.Row key={index} className="border">
                    <Table.Cell className="w-[58%] text-[#0a0a0a] flex gap-2 items-center">
                      <div className="bg-black w-[80px]">
                        <img
                          src={item.imageUrls[0]}
                          alt="anh"
                          className="min-w-[80px] h-[80px] object-contain"
                        />
                      </div>
                      <div className="">{item.title}</div>
                    </Table.Cell>
                    <Table.Cell className="p-2 w-[14%]">
                      {formatNumber(item.price)}
                    </Table.Cell>
                    <Table.Cell className="pl-10 p-2 w-[14%]">
                      {item.quantity}
                    </Table.Cell>
                    <Table.Cell className="p-2 w-[14%]">
                      {formatNumber(item.price * item.quantity)}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex flex-row bg-gray-50 px-5 py-8 gap-5 border-b">
          <div className="flex items-center gap-3 outline-none border-none w-[50%]">
            <span>Lời nhắn:</span>
            <TextInput
              value={checkout.note}
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  note: e.target.value,
                }))
              }
              className="flex-1"
              id="email1"
              type="email"
              placeholder="Luư ý cho người bán"
            />
          </div>
          <div className="flex items-center gap-3 outline-none border-none w-[50%]">
            <span>Đơn vị vận chuyển:</span>
            <Select
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  shipmentId: e.target.value,
                }))
              }
            >
              <option value={1}>Vận chuyển thường</option>
              <option value={2}>Vận chuyển nhanh</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row bg-gray-50 px-5 py-4 gap-5 border-b justify-end items-center">
          <span className="text-sm text-gray-500">
            Tổng số tiền ({data.length} sản phẩm):
          </span>
          <span className="text-xl text-[#cd5f5f] font-semibold">
            {formatNumber(
              data.length > 1
                ? data.reduce(
                    (a, b) => a.price * a.quantity + b.price * b.quantity
                  )
                : data[0].price * data[0].quantity
            )}
          </span>
        </div>
      </div>
      <div className="bg-white max-w-[1100px] mx-auto mt-5">
        <div className="flex justify-between items-center p-5 border-b">
          <div className="">Phương thức thanh toán</div>
          <Select
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                shipmentId: e.target.value,
              }))
            }
          >
            <option value={1}>Thanh toán khi nhận hàng</option>
            <option value={2}>Thanh toán nhanh</option>
          </Select>
        </div>
        <div className="flex justify-end p-5 border-b">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center w-[300px]">
              <span className="text-sm text-gray-500">Tổng tiền hàng</span>
              <span className="text-md">
                {formatNumber(
                  data.length > 1
                    ? data.reduce(
                        (a, b) => a.price * a.quantity + b.price * b.quantity
                      )
                    : data[0].price * data[0].quantity
                )}
              </span>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span className="text-sm text-gray-500">
                Tổng tiền phí vận chuyển
              </span>
              <span className="text-md">{formatNumber(30000)}</span>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span className="text-sm text-gray-500">Tổng thanh toán</span>
              <span className="text-xl text-[#cd5f5f] font-semibold">
                {formatNumber(
                  (data.length > 1
                    ? data.reduce(
                        (a, b) => a.price * a.quantity + b.price * b.quantity
                      )
                    : data[0].price * data[0].quantity) + 30000
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <div className="text-sm text-gray-500">
            Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo
            Điều khoản BOOKSTORE
          </div>
          <button
            className="bg-[#cd5f5f] w-[200px] p-2 rounded-sm text-white"
            onClick={handleSubmit}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;