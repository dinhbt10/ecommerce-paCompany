import { Pagination, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { CiViewBoard } from "react-icons/ci";
import instance from "../../../utils/http";
import { convertDate, formatNumber } from "../../../utils/common";
import { orderStatus } from "./Config";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/app";
import ModalDetailOrders from "./ModalDetailOrders";
import { Search } from "lucide-react";

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
    name: "Trạng thái đơn hàng",
  },
  {
    id: 5,
    name: "Thanh toán",
  },
  {
    id: 7,
    name: "Tổng tiền",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState(null);

  const { userInfo } = useContext(AppContext);
  const getOrderListAdmin = async () => {
    const res = await instance.get(
      `orders/list/admin?userId=${userInfo.idUser}&page=${currentPage}&size=10`
    );
    const { success, data } = res.data;
    if (success) {
      setTotalPage(data.totalPages);
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
  const onPageChange = (page) => setCurrentPage(page - 1);

  const handleGetDetail = async (orderId) => {
    try {
      const res = await instance.get(`orders/detail_admin?orderId=${orderId}`);
      const { data } = res.data;
      setOrderDetailData(data);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderListAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Đơn hàng</h1>
      </div>
      <div className="flex items-center justify-start z-[100000] mb-3">
        <input
          type="text"
          placeholder="Tìm kiếm nhà xuất bản"
          className="flex-1 rounded-tl-[5px] max-w-[250px] rounded-bl-[5px] placeholder:text-[14px] h-[34px]"
        />
        <button
          className="bg-[#d76e6e] text-white h-[35px] rounded-tr-[5px] rounded-br-[5px] px-3"
          type="button"
        >
          <Search size="16px" />
        </button>
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
                <Table.Cell>
                  {(currentPage + 1 - 1) * 10 + index + 1}
                </Table.Cell>
                <Table.Cell>{item.orderCode}</Table.Cell>
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
                <Table.Cell className="uppercase">{item.payment}</Table.Cell>
                <Table.Cell>{formatNumber(item.total)}</Table.Cell>
                <Table.Cell>
                  <div
                    className="flex justify-center items-center gap-2"
                    onClick={() => handleGetDetail(item.id)}
                  >
                    <CiViewBoard fontSize={18} className="cursor-pointer" />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      {openModal && (
        <ModalDetailOrders
          isOpen={openModal}
          setOpenModal={setOpenModal}
          data={orderDetailData}
        />
      )}
    </div>
  );
};

export default Orders;
