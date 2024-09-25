import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
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
  const [publisher, setPublisher] = useState(null);
  const [openDelete, setDelete] = useState(false);
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
    const res = await instance.get("publisher/list");
    if (res.status === 200) {
      setPublisher(res.data);
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

  useEffect(() => {
    getPublisher();
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Nhà xuất bản</h1>
        <Button className="outline-none" onClick={() => setIsOpen(true)}>
          + Thêm nhà xuất bản
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {publisher?.map((item, index) => (
            <Table.Row
              key={item.idPublisher}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <div className="pl-1">{index + 1}</div>
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
