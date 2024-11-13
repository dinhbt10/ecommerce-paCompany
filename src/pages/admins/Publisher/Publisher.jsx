import { useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import { ModalPublisherAddOrEdit } from "./ModalAddOrEdit";
import instance from "../../../utils/http";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmPublisher } from "./ConfirmPublisher";

const tableHead = [
  {
    id: "1",
    name: "STT",
  },
  {
    id: "2",
    name: "Tên nhà xuất bản",
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

const Publisher = () => {
  const [isOpen, setIsOpen] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState();
  const [publisher, setPublisher] = useState([]);
  const [openDelete, setDelete] = useState(false);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [idDelete, setIdDelete] = useState();
  const [item, setItem] = useState({
    idPublisher: "",
    namePublisher: "",
    addressPublisher: "",
    phonePublisher: "",
    emailPublisher: "",
  });

  const handleAddPublisher = async (publisher) => {
    const formData = new FormData();

    Object.keys(publisher).forEach((item) => {
      formData.append(item, publisher[item]);
    });

    const res = await instance.post("publisher/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      setIsOpen(false);
      getPublisher();
    }
  };

  const getPublisher = async () => {
    try {
      const res = await instance.get(
        `publisher/list?page=${currentPage}&size=10`
      );
      const { data, success } = res.data;
      if (success) {
        setPublisher(data.categories);
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

  const handleRemovePublisher = async (id) => {
    const res = await instance.delete(`publisher/${id}`);

    if (res.data.success) {
      setIdDelete();
      setDelete(false);
      getPublisher();
    }
  };

  const handleUpdate = (item) => {
    setIsOpenEdit(true);
    setItem(item);
  };

  const handleUpdatePublisher = async (publisher) => {
    const formData = new FormData();

    Object.keys(publisher).forEach((item) => {
      formData.append(item, publisher[item]);
    });

    const res = await instance.put(
      `publisher/${publisher.idPublisher}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      setIsOpenEdit(false);
      setItem({
        idPublisher: "",
        namePublisher: "",
        addressPublisher: "",
        phonePublisher: "",
        emailPublisher: "",
      });
      getPublisher();
    }
  };

  const onPageChange = (page) => setCurrentPage(page - 1);

  useEffect(() => {
    getPublisher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Nhà xuất bản</h1>
        <button
          className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
          onClick={() => setIsOpen(true)}
        >
          + Thêm nhà xuất bản
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
          {publisher &&
            publisher.map((item, index) => (
              <Table.Row
                key={item.idPublisher}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="pl-1">
                    {(currentPage + 1 - 1) * 10 + index + 1}
                  </div>
                </Table.Cell>
                <Table.Cell>{item.namePublisher}</Table.Cell>
                <Table.Cell>{item.addressPublisher}</Table.Cell>
                <Table.Cell>{item.phonePublisher}</Table.Cell>
                <Table.Cell>{item.emailPublisher}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <RiEdit2Fill
                      fontSize={22}
                      onClick={() => handleUpdate(item)}
                    />
                    <FaRegTrashAlt
                      fontSize={18}
                      className="text-red-700"
                      onClick={() => handleRemove(item.idPublisher)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          {publisher?.length === 0 && (
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
        <ModalPublisherAddOrEdit
          openModal={isOpen}
          setOpenModal={setIsOpen}
          handleAddPublisher={handleAddPublisher}
        />
      )}
      {isOpenEdit && (
        <ModalPublisherAddOrEdit
          openModal={isOpenEdit}
          setOpenModal={setIsOpenEdit}
          handleAddPublisher={handleUpdatePublisher}
          item={item}
        />
      )}
      <ConfirmPublisher
        openModal={openDelete}
        item={idDelete}
        setOpenModal={setDelete}
        handleRemovePublisher={handleRemovePublisher}
      />
    </div>
  );
};

export default Publisher;
