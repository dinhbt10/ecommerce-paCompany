import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import instance from "../../../utils/http";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalDistributorAddOrEdit } from "./ModalAddOrEdit";
import { ConfirmDistributor } from "./ConfirmDistributor";

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
  const [isOpen, setIsOpen] = useState();
  const [idDelete, setIdDelete] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState();
  const [openDelete, setDelete] = useState(false);
  const [distributor, setDistributor] = useState(null);
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
    const res = await instance.get("distributor/list");
    if (res.status === 200) {
      setDistributor(res.data);
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

  useEffect(() => {
    getDistributor();
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Nhà phân phối</h1>
        <Button className="outline-none" onClick={() => setIsOpen(true)}>
          + Thêm nhà phân phối
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
          {distributor?.map((item, index) => (
            <Table.Row
              key={item.idDistributor}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <div className="pl-1">{index + 1}</div>
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
                  <FaRegTrashAlt
                    fontSize={18}
                    className="text-red-700"
                    onClick={() => handleRemove(item.idDistributor)}
                  />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {distributor?.length === 0 && (
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
