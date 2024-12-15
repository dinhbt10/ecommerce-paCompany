import { useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import instance from "../../../utils/http";
import { ModalAddEditEmployee } from "./ModalAddEditEmployee";
import { Eye } from "lucide-react";
import { Search } from "lucide-react";

const tableHead = [
  {
    id: "1",
    name: "STT",
  },
  {
    id: "2",
    name: "Tên nhân viên",
  },
  {
    id: "3",
    name: "Địa chỉ",
  },
  {
    id: "4",
    name: "Số điện thoại",
  },
  {
    id: "5",
    name: "Email",
  },
  {
    id: "44",
    name: "Trạng thái",
  },
];

const Employee = () => {
  const [isOpen, setIsOpen] = useState();
  const [employee, setEmployee] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const getDistributor = async () => {
    try {
      const res = await instance.get(`user/auth/employee/list`);
      const { data, success } = res.data;
      if (success) {
        setEmployee(data.users);
        setTotalPage(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = (page) => setCurrentPage(page - 1);

  useEffect(() => {
    getDistributor();
  }, [currentPage]);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Nhân viên</h1>
        <button
          className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
          onClick={() => setIsOpen(true)}
        >
          + Thêm nhân viên
        </button>
      </div>
      <div className="flex items-center justify-start z-[100000] mb-3">
        <input
          type="text"
          // value={nameDistributor}
          // onChange={(e) => setNameDistributor(e.target.value)}
          placeholder="Tìm kiếm nhân viên"
          className="flex-1 rounded-tl-[5px] max-w-[250px] rounded-bl-[5px] placeholder:text-[14px] h-[34px]"
        />
        <button
          className="bg-[#d76e6e] text-white h-[35px] rounded-tr-[5px] rounded-br-[5px] px-3"
          type="button"
          // onClick={getDistributor}
        >
          <Search size="16px" />
        </button>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employee.length > 0 &&
            employee?.map((item, index) => (
              <Table.Row
                key={item.idUser}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="pl-1">
                    {(currentPage + 1 - 1) * 10 + index + 1}
                  </div>
                </Table.Cell>
                <Table.Cell>{item.fullname}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  <div className="pl-4">
                    <Eye />
                  </div>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))}
          {employee.length === 0 && (
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
      {isOpen && (
        <ModalAddEditEmployee
          openModal={isOpen}
          setOpenModal={setIsOpen}
          getDistributor={getDistributor}
        />
      )}
    </div>
  );
};

export default Employee;
