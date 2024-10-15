import { Table } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

const data = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    address: "123 Đường ABC, Phường X, Quận Y, TP. Hồ Chí Minh",
    phone: "0901234567",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Trần Thị B",
    address: "45 Đường DEF, Phường Z, Quận W, Hà Nội",
    phone: "0909876543",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Phạm Văn C",
    address: "67 Đường GHI, Phường P, Quận Q, Đà Nẵng",
    phone: "0912345678",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Lê Thị D",
    address: "89 Đường JKL, Phường L, Quận M, Hải Phòng",
    phone: "0918765432",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Đặng Văn E",
    address: "101 Đường MNO, Phường R, Quận S, Cần Thơ",
    phone: "0923456789",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Ngô Thị F",
    address: "123 Đường PQR, Phường U, Quận V, Bình Dương",
    phone: "0932345678",
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Vũ Văn G",
    address: "45 Đường STU, Phường W, Quận X, Vũng Tàu",
    phone: "0938765432",
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Hoàng Thị H",
    address: "67 Đường VWX, Phường Y, Quận Z, Nha Trang",
    phone: "0941234567",
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "Đỗ Văn I",
    address: "89 Đường YZ, Phường A, Quận B, Huế",
    phone: "0949876543",
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Phan Thị J",
    address: "101 Đường XYZ, Phường C, Quận D, Quy Nhơn",
    phone: "0952345678",
    imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

const tableHead = [
  {
    id: 1,
    name: "Ảnh khách hàng",
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
];

const Customers = () => {
  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Khách hàng</h1>
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
              <Table.Cell>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="ml-6 w-[50px] h-[50px] object-cover rounded-[50%]"
                />
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
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

export default Customers;
