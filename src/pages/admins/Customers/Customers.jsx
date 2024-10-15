import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import instance from "../../../utils/http";

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
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const res = await instance.get("/user/auth/list");
      setUsers(res.data.data.users);
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
          {users &&
            users.length > 0 &&
            users.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <img
                    src={
                      "https://danviet.mediacdn.vn/296231569849192448/2024/6/13/son-tung-mtp-17182382517241228747767.jpg"
                    }
                    alt={item.name}
                    className="ml-6 w-[50px] h-[50px] object-cover rounded-[50%]"
                  />
                </Table.Cell>
                <Table.Cell>{item.username}</Table.Cell>
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
          {users.length === 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell colSpan={5}>
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

export default Customers;
