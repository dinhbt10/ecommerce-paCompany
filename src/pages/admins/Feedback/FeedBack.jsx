import { Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import instance from "../../../utils/http";
import { Eye } from "lucide-react";

const tableHead = [
  {
    id: 5,
    name: "STT",
  },
  {
    id: 2,
    name: "TÊN TÀI KHOẢN",
  },
  {
    id: 22,
    name: "TÊN SÁCH",
  },
  {
    id: 3,
    name: "Comment",
  },
  {
    id: 31,
    name: "Rating",
  },
  {
    id: "44",
    name: "Trạng thái",
  },
];

const FeedBack = () => {
  const [vouchers, setVouchers] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (page) => setCurrentPage(page - 1);

  const getUser = async () => {
    try {
      const res = await instance.get(
        `/vouchers/list?page=${currentPage}&size=10`
      );
      if (typeof res.data.data !== "string") {
        setVouchers(res.data.data.voucher);
        setTotalPage(res.data.data.totalPages);
      }
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
        <h1 className="text-2xl font-semibold">Đánh giá</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <div className="pl-1">
                  {(currentPage + 1 - 1) * 10 + index + 1}
                </div>
              </Table.Cell>

              <Table.Cell>Tài khoản {index + 1}</Table.Cell>
              <Table.Cell>Sách {index + 1}</Table.Cell>
              <Table.Cell>Comment {index + 1}</Table.Cell>
              <Table.Cell>Rating {index + 1}</Table.Cell>
              <Table.Cell>
                <div className="pl-4">
                  <Eye />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {vouchers.length === 0 && (
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

export default FeedBack;
