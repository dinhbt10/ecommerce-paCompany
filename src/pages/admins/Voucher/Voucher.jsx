import { Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import instance from "../../../utils/http";

const tableHead = [
  {
    id: 5,
    name: "STT",
  },
  {
    id: 2,
    name: "Tên khách hàng",
  },
  {
    id: 3,
    name: "Địa chỉ",
  },
  {
    id: 4,
    name: "Số điện thoại",
  },
  {
    id: 5,
    name: "Tổng số đơn hàng đã đặt",
  },
  {
    id: 6,
    name: "Tổng số tiền",
  },
];

const Voucher = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (page) => setCurrentPage(page - 1);

  const getUser = async () => {
    try {
      const res = await instance.get(
        `/vouchers/list?page=${currentPage}&size=10`
      );
      setUsers(res.data.data.users);
      setTotalPage(res.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Voucher</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {users &&
            users.length > 0 &&
            users.map((item, index) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="pl-1">
                    {(currentPage + 1 - 1) * 10 + index + 1}
                  </div>
                </Table.Cell>

                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{10}</Table.Cell>
                <Table.Cell>100.000đ</Table.Cell>
              </Table.Row>
            ))}
          {users.length === 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell colSpan={6}>
                <div className="flex justify-center items-center h-[300px]">
                  Không có dữ liệu
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Voucher;
