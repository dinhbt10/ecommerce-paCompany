import { Table } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

const tableHead = [
  {
    id: 1,
    name: "Tên sản phẩm",
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
    name: "Số lượng",
  },
  {
    id: 5,
    name: "Đơn giá",
  },
  {
    id: 6,
    name: "Tổng tiền",
  },
  {
    id: 7,
    name: "Ngày đặt",
  },
];

const data = [
  {
    productName: "Laptop Dell XPS 13",
    customerName: "Nguyễn Văn A",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    price: "28,000,000 VND",
    quantity: 1,
    totalPrice: "28,000,000 VND",
    orderDate: "2023-09-01",
  },
  {
    productName: "iPhone 14 Pro",
    customerName: "Trần Thị B",
    address: "456 Đường DEF, Quận 3, TP. Hà Nội",
    price: "25,000,000 VND",
    quantity: 2,
    totalPrice: "50,000,000 VND",
    orderDate: "2023-09-02",
  },
  {
    productName: "Samsung Galaxy S21",
    customerName: "Phạm Văn C",
    address: "789 Đường GHI, Quận 5, TP. Đà Nẵng",
    price: "18,500,000 VND",
    quantity: 1,
    totalPrice: "18,500,000 VND",
    orderDate: "2023-09-03",
  },
  {
    productName: "Sony WH-1000XM5",
    customerName: "Lê Thị D",
    address: "101 Đường JKL, Quận 7, TP. Hải Phòng",
    price: "7,000,000 VND",
    quantity: 3,
    totalPrice: "21,000,000 VND",
    orderDate: "2023-09-04",
  },
  {
    productName: "MacBook Air M2",
    customerName: "Đặng Văn E",
    address: "202 Đường MNO, Quận 9, TP. Cần Thơ",
    price: "35,000,000 VND",
    quantity: 1,
    totalPrice: "35,000,000 VND",
    orderDate: "2023-09-05",
  },
  {
    productName: "Google Pixel 7",
    customerName: "Ngô Thị F",
    address: "303 Đường PQR, Quận 2, TP. Bình Dương",
    price: "15,000,000 VND",
    quantity: 2,
    totalPrice: "30,000,000 VND",
    orderDate: "2023-09-06",
  },
  {
    productName: "Apple Watch Series 8",
    customerName: "Vũ Văn G",
    address: "404 Đường STU, Quận 4, TP. Vũng Tàu",
    price: "12,000,000 VND",
    quantity: 1,
    totalPrice: "12,000,000 VND",
    orderDate: "2023-09-07",
  },
  {
    productName: "Xbox Series X",
    customerName: "Hoàng Thị H",
    address: "505 Đường VWX, Quận 6, TP. Nha Trang",
    price: "15,000,000 VND",
    quantity: 2,
    totalPrice: "30,000,000 VND",
    orderDate: "2023-09-08",
  },
  {
    productName: "PlayStation 5",
    customerName: "Đỗ Văn I",
    address: "606 Đường YZ, Quận 8, TP. Huế",
    price: "14,500,000 VND",
    quantity: 1,
    totalPrice: "14,500,000 VND",
    orderDate: "2023-09-09",
  },
  {
    productName: "HP Spectre x360",
    customerName: "Phan Thị J",
    address: "707 Đường XYZ, Quận 10, TP. Quy Nhơn",
    price: "30,000,000 VND",
    quantity: 1,
    totalPrice: "30,000,000 VND",
    orderDate: "2023-09-10",
  },
];

const Orders = () => {
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
          {data.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{item.productName}</Table.Cell>
              <Table.Cell>{item.customerName}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.totalPrice}</Table.Cell>
              <Table.Cell>{item.orderDate}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-center items-center gap-2">
                  <RiEdit2Fill fontSize={20} />
                  <FaRegTrashAlt />
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
