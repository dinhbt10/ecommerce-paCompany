import { useContext, useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import instance from "../../../utils/http";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalDistributorAddOrEdit } from "./ModalAddOrEdit";
import { ConfirmDistributor } from "./ConfirmDistributor";
import { Search } from "lucide-react";
import { AppContext } from "../../../context/app";

const tableHead = [
  {
    id: "1",
    name: "STT",
  },
  {
    id: "2",
    name: "Tên nhà phân phối",
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
];

const Distributor = () => {
  const { userInfo } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState();
  const [idDelete, setIdDelete] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState();
  const [openDelete, setDelete] = useState(false);
  const [distributor, setDistributor] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [nameDistributor, setNameDistributor] = useState("");

  const [item, setItem] = useState({
    idDistributor: "",
    nameDistributor: "",
    addressDistributor: "",
    phoneDistributor: "",
    emailDistributor: "",
  });

  const handleAddDistributor = async (Distributor) => {
    const formData = new FormData();

    Object.keys(Distributor).forEach((item) => {
      formData.append(item, Distributor[item]);
    });

    const res = await instance.post("distributor/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      setIsOpen(false);
      getDistributor();
    }
  };

  const getDistributor = async () => {
    try {
      const res = await instance.get(`distributor/list`, {
        params: {
          page: currentPage,
          size: 10,
          nameDistributor,
        },
      });
      const { data, success } = res.data;
      if (success) {
        setDistributor(data.categories);
        setTotalPage(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (id) => {
    setIdDelete(id);
    setDelete(true);
  };

  const handleRemoveDistributor = async (id) => {
    const res = await instance.delete(`distributor/${id}`);
    if (res.data.success) {
      setIdDelete();
      setDelete(false);
      getDistributor();
    }
  };

  const handleUpdate = (item) => {
    setIsOpenEdit(true);
    setItem(item);
  };

  const handleUpdateDistributor = async (distributor) => {
    const formData = new FormData();

    Object.keys(distributor).forEach((item) => {
      formData.append(item, distributor[item]);
    });

    const res = await instance.put(
      `distributor/${distributor.idDistributor}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      setIsOpenEdit(false);
      setItem({
        idDistributor: "",
        nameDistributor: "",
        addressDistributor: "",
        phoneDistributor: "",
        emailDistributor: "",
      });
      getDistributor();
    }
  };

  const onPageChange = (page) => setCurrentPage(page - 1);

  useEffect(() => {
    getDistributor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Nhà phân phối</h1>
        <button
          className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
          onClick={() => setIsOpen(true)}
        >
          + Thêm nhà phân phối
        </button>
      </div>
      <div className="flex items-center justify-start z-[100000] mb-3">
        <input
          type="text"
          value={nameDistributor}
          onChange={(e) => setNameDistributor(e.target.value)}
          placeholder="Tìm kiếm nhà phân phối"
          className="flex-1 rounded-tl-[5px] max-w-[250px] rounded-bl-[5px] placeholder:text-[14px] h-[34px]"
        />
        <button
          className="bg-[#d76e6e] text-white h-[35px] rounded-tr-[5px] rounded-br-[5px] px-3"
          type="button"
          onClick={getDistributor}
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
          {distributor.length > 0 &&
            distributor?.map((item, index) => (
              <Table.Row
                key={item.idDistributor}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="pl-1">
                    {(currentPage + 1 - 1) * 10 + index + 1}
                  </div>
                </Table.Cell>
                <Table.Cell>{item.nameDistributor}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <RiEdit2Fill
                      fontSize={22}
                      onClick={() => handleUpdate(item)}
                    />
                    {userInfo.roles[0].name !== "ROLE_EMPLOYEE" && (
                      <FaRegTrashAlt
                        fontSize={18}
                        className="text-red-700"
                        onClick={() => handleRemove(item.idDistributor)}
                      />
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          {distributor.length === 0 && (
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
        <ModalDistributorAddOrEdit
          openModal={isOpen}
          setOpenModal={setIsOpen}
          handleAddDistributor={handleAddDistributor}
        />
      )}
      {isOpenEdit && (
        <ModalDistributorAddOrEdit
          openModal={isOpenEdit}
          setOpenModal={setIsOpenEdit}
          handleAddDistributor={handleUpdateDistributor}
          item={item}
        />
      )}
      <ConfirmDistributor
        openModal={openDelete}
        item={idDelete}
        setOpenModal={setDelete}
        handleRemoveDistributor={handleRemoveDistributor}
      />
    </div>
  );
};

export default Distributor;
