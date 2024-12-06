import { Rating, Table } from "flowbite-react";
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

  const getUser = async () => {
    try {
      const res = await instance.get(`feedback/list`);
      if (typeof res.data.data !== "string") {
        setVouchers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
          {vouchers.length > 0 &&
            vouchers.map((item, index) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>

                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.bookTitle}</Table.Cell>
                <Table.Cell>{item.comment}</Table.Cell>
                <Table.Cell>
                  <Rating>
                    <Rating.Star filled={item.rating} />
                  </Rating>
                </Table.Cell>
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
    </div>
  );
};

export default FeedBack;
