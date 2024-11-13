import { Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { CiViewBoard } from "react-icons/ci";
import instance from "../../../utils/http";
import { convertDate, formatNumber } from "../../../utils/common";
import { orderStatus } from "./Config";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/app";

const tableHead = [
  { id: 10, name: "STT" },
  {
    id: 1,
    name: "Mã đơn hàng",
  },
  {
    id: 2,
    name: "Ngày đặt",
  },
  {
    id: 3,
    name: "Ngày nhận",
  },
  {
    id: 4,
    name: "Trạng thái",
  },
  {
    id: 5,
    name: "SDT",
  },
  {
    id: 7,
    name: "Tổng tiền",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useContext(AppContext);
  const getOrderListAdmin = async () => {
    const res = await instance.get(
      `orders/list/admin?userId=${userInfo.idUser}`
    );
    const { success, data } = res.data;
    if (success) {
      setOrders(data.orders);
    }
  };

  const handleChangeOrderStatus = async (idCart, idStatus) => {
    const res = await instance.put(
      `orders/update-status?userId=${userInfo.idUser}&orderId=${idCart}&statusId=${idStatus}`
    );
    const { success } = res.data;

    if (success) {
      toast.success(`Thay đổi trạng thái đơn hàng ${idCart} thành công`, {
        autoClose: 1500,
        position: "bottom-right",
      });
      getOrderListAdmin();
    }
  };

  useEffect(() => {
    getOrderListAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Đơn hàng</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders.length > 0 &&
            orders.map((item, index) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{convertDate(item.createdAt)}</Table.Cell>
                <Table.Cell>{convertDate(item.deliveryDate)}</Table.Cell>
                <Table.Cell>
                  <select
                    className="rounded border border-gray-300"
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                    value={
                      orderStatus.find((check) => check.label === item.status)
                        .value
                    }
                    onChange={(e) =>
                      handleChangeOrderStatus(item.id, Number(e.target.value))
                    }
                  >
                    {orderStatus.map((order) => (
                      <option value={order.value} key={order.value}>
                        {order.label}
                      </option>
                    ))}
                  </select>
                </Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{formatNumber(item.total)}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-center items-center gap-2">
                    <CiViewBoard fontSize={18} className="cursor-pointer" />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Orders;
