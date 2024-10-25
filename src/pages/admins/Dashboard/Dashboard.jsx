import { useEffect, useState } from "react";
import instance from "../../../utils/http";
import { Table } from "flowbite-react";
import { formatNumber } from "../../../utils/common";

const Dashboard = () => {
  const [topBookSale, setTopBookSale] = useState([]);
  const getTopProductSale = async () => {
    const res = await instance.get("book/books-sales");
    const { data, success } = res.data;
    if (success) {
      setTopBookSale(data);
    }
  };

  useEffect(() => {
    getTopProductSale();
  }, []);

  return (
    <div>
      <div className="bg-white rounded p-4">
        <div className="text-xl">Top sản phẩm bán chạy</div>
        <Table border className="mt-3">
          <Table.Body className="divide-y border">
            {topBookSale.length > 0 &&
              topBookSale?.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <div className="flex flex-row items-center gap-2">
                      <div className="bg-black h-[80px] min-w-[80px]">
                        <img
                          src={item.imageUrls[0]}
                          alt="anh"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="">{item.bookName}</div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col items-center gap-2">
                      Giá tiền
                      <div className="">{formatNumber(item.bookPrice)}</div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col items-center gap-2">
                      Lượt bán
                      <div className="">{item.totalSold}</div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            {topBookSale.length === 0 && (
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
    </div>
  );
};

export default Dashboard;
