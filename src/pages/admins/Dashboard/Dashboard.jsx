import { useEffect, useState } from "react";
import instance from "../../../utils/http";
import { Table } from "flowbite-react";
import { convertDate, formatNumber } from "../../../utils/common";
import Chart from "react-apexcharts";
import { optionChart } from "./Config";

const Dashboard = () => {
  const [topBookSale, setTopBookSale] = useState([]);
  const [orders, setOrders] = useState([]);
  const [charts, setCharts] = useState(optionChart);

  const getTopProductSale = async () => {
    const res = await instance.get("book/books-sales");
    const resAPIOrder = await instance.get("orders/list/admin");
    const resAPIChart = await instance.get("orders/revenue-chart");
    Promise.all([res, resAPIOrder, resAPIChart]).then((r) => {
      setTopBookSale(r[0].data.data);
      setOrders(r[1].data.data.orders);
      setCharts((prev) => ({
        ...prev,
        series: [
          {
            name: "Doanh thu",
            data: r[2].data.data.data,
          },
        ],
      }));
    });
  };

  useEffect(() => {
    getTopProductSale();
  }, []);

  return (
    <div>
      <div className="bg-white mb-5 p-6 rounded">
        <div className="text-xl font-medium">Doanh thu năm hiện tại</div>
        <Chart
          series={charts.series}
          options={charts}
          type="bar"
          height={350}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <div className="bg-white rounded p-6">
            <div className="text-xl font-medium">Giao dịch gần đây</div>
            <Table className="mt-3">
              <Table.Head className="border-b">
                <Table.HeadCell>Khác hàng</Table.HeadCell>
                <Table.HeadCell>Ngày đặt hàng</Table.HeadCell>
                <Table.HeadCell>Số lượng</Table.HeadCell>
                <Table.HeadCell>Trạng thái</Table.HeadCell>
              </Table.Head>
              <Table.Body className="">
                {orders.length > 0 &&
                  orders.map((item, index) => {
                    if (index < 5) {
                      return (
                        <Table.Row key={index} className="bg-white border-b">
                          <Table.Cell>{item.receiveName}</Table.Cell>
                          <Table.Cell>{convertDate(item.createdAt)}</Table.Cell>
                          <Table.Cell>{item.books.length}</Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                        </Table.Row>
                      );
                    }
                  })}
                {orders.length === 0 && (
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
        <div className="col-span-1">
          <div className="bg-white rounded p-6">
            <div className="text-xl font-medium">Top sản phẩm bán chạy</div>
            <Table className="mt-3">
              <Table.Head className="border-b">
                <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                <Table.HeadCell>Giá</Table.HeadCell>
                <Table.HeadCell>Lượt bán</Table.HeadCell>
              </Table.Head>
              <Table.Body className="">
                {topBookSale.length > 0 &&
                  topBookSale?.map((item, index) => (
                    <Table.Row key={index} className="bg-white border-b">
                      <Table.Cell>
                        <div className="flex flex-row items-center gap-2">
                          <div className="bg-black h-[20px] min-w-[20px]">
                            <img
                              src={item.imageUrls[0]}
                              alt="anh"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="text-[13px]">{item.bookName}</div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{formatNumber(item.bookPrice)}</Table.Cell>
                      <Table.Cell>{item.totalSold}</Table.Cell>
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
      </div>
    </div>
  );
};

export default Dashboard;
