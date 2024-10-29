import { useEffect, useState } from "react";
import instance from "../../../utils/http";
import { Table } from "flowbite-react";
import { convertDate, formatNumber } from "../../../utils/common";
import Chart from "react-apexcharts";
import { optionChart } from "./Config";
import { CiUser } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const totalData = [
  {
    name: "Tổng sản phẩm",
    icon: <IoBagCheckOutline />,
    link: "/admin/products",
  },
  {
    name: "Tổng số tài khoản",
    icon: <CiUser />,
    link: "/admin/customers",
  },
  {
    name: "Tổng số đơn hàng",
    icon: <CiShoppingCart />,
    link: "/admin/orders",
  },
  {
    name: "Tổng doanh thu",
    icon: <CiMoneyBill />,
    link: "/admin",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [topBookSale, setTopBookSale] = useState([]);
  const [orders, setOrders] = useState([]);
  const [charts, setCharts] = useState(optionChart);
  const [totals, setTotals] = useState({
    totalBook: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalIcomes: 0,
  });
  const keys = Object.keys(totals);

  const getTopProductSale = async () => {
    const res = await instance.get("book/books-sales");
    const resAPIOrder = await instance.get("orders/list/admin");
    const resAPIChart = await instance.get("orders/revenue-chart");
    const totalDashboard = await instance.get("/orders/sales");
    Promise.all([res, resAPIOrder, resAPIChart, totalDashboard]).then((r) => {
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
      setTotals(r[3].data.data);
    });
  };

  useEffect(() => {
    getTopProductSale();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 mb-5 gap-5">
        {totalData.map((item, index) => (
          <div
            className="col-span-1 bg-white rounded cursor-pointer"
            key={index}
            onClick={() => navigate(item.link)}
          >
            <div className="flex items-center p-3 gap-2">
              <div className="text-3xl">{item.icon}</div>
              <div className="flex flex-col">
                <div className="text-sm">{item.name}</div>
                <div className="text-sm">
                  {index === 3
                    ? formatNumber(totals[keys[index]])
                    : totals[keys[index]]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white mb-5 p-2 rounded">
        <div className="text-xl font-medium px-2">Doanh thu năm hiện tại</div>
        <Chart
          series={charts.series}
          options={charts}
          type="bar"
          height={200}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1">
          <div className="bg-white rounded p-2">
            <div className="text-xl font-medium px-2">Giao dịch gần đây</div>
            <Table className="mt-3">
              <Table.Head className="border-b">
                <Table.HeadCell className="text-[10px]">
                  Khác hàng
                </Table.HeadCell>
                <Table.HeadCell className="text-[10px]">
                  Ngày đặt hàng
                </Table.HeadCell>
                <Table.HeadCell className="text-[10px]">
                  Số lượng
                </Table.HeadCell>
                <Table.HeadCell className="text-[10px]">
                  Trạng thái
                </Table.HeadCell>
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
          <div className="bg-white rounded p-2">
            <div className="text-xl font-medium px-2">
              Top sản phẩm bán chạy
            </div>
            <Table className="mt-3">
              <Table.Head className="border-b">
                <Table.HeadCell className="text-[10px]">
                  Tên sản phẩm
                </Table.HeadCell>
                <Table.HeadCell className="text-[10px]">Giá</Table.HeadCell>
                <Table.HeadCell className="text-[10px] truncate">
                  Lượt bán
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {topBookSale.length > 0 &&
                  topBookSale?.map((item, index) => (
                    <Table.Row key={index} className="bg-white border-b">
                      <Table.Cell>
                        <div className="flex flex-row items-center gap-2">
                          <div className="bg-black h-[30px] min-w-[30px]">
                            <img
                              src={item.imageUrls[0]}
                              alt="anh"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="text-[12px]">{item.bookName}</div>
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
