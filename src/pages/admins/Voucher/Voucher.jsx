import { Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import instance from "../../../utils/http";

const tableHead = [
  {
    id: 5,
    name: "STT",
  },
  {
    id: 2,
    name: "Mã voucher",
  },
  {
    id: 22,
    name: "Gía trị voucher",
  },
  {
    id: 3,
    name: "Số lượng voucher",
  },
  {
    id: 31,
    name: "Giá trị đơn hàng tối thiểu",
  },
  {
    id: 4,
    name: "Người tạo",
  },
  {
    id: 5,
    name: "Người sửa",
  },
  {
    id: 6,
    name: "Tổng số tiền",
  },
];

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [nameVoucher, setNameVoucher] = useState("");
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState();
  const [id, setID] = useState();
  const [item, setItem] = useState({
    code: "",
    discountValue: "",
    maxUsage: "",
    minOrderValue: "",
    startDate: "",
    endDate: "",
  });

  const onPageChange = (page) => setCurrentPage(page - 1);

  const getVoucher = async () => {
    try {
      const res = await instance.get(`/vouchers/list`, {
        params: {
          page: currentPage,
          size: 10,
          code: nameVoucher,
        },
      });
      if (typeof res.data.data !== "string") {
        setVouchers(res.data.data.voucher);
        setTotalPage(res.data.data.totalPages);
      } else {
        setVouchers([]);
        setTotalPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (id) => {
    try {
      const res = await instance.post(`vouchers/disable/${id}`);
      const { success } = res.data;
      if (success) {
        toast.success("Thay đổi trạng thái thành công");
        getVoucher();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (item) => {
    setID(item.id);
    const clone = {
      code: item.code,
      discountValue: item.discount,
      maxUsage: item.maxU,
      minOrderValue: item.minO,
      startDate: "",
      endDate: "",
    };
    setIsOpenEdit(true);
    setItem(clone);
  };

  const handleAddVoucher = async (voucher) => {
    const formData = new FormData();

    Object.keys(voucher).forEach((item) => {
      formData.append(item, voucher[item]);
    });

    const res = await instance.post("vouchers/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      setIsOpen(false);
      getVoucher();
    }
  };

  const handleUpdateVoucher = async (voucher) => {
    const formData = new FormData();
    Object.keys(voucher).forEach((item) => {
      formData.append(item, voucher[item]);
    });

    const res = await instance.put(`/vouchers/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      setIsOpenEdit(false);
      setItem({
        idPublisher: "",
        namePublisher: "",
        addressPublisher: "",
        phonePublisher: "",
        emailPublisher: "",
      });
      getVoucher();
    }
  };

  useEffect(() => {
    getVoucher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Voucher</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {vouchers &&
            vouchers.length > 0 &&
            vouchers.map((item, index) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <div className="pl-1">
                    {(currentPage + 1 - 1) * 10 + index + 1}
                  </div>
                </Table.Cell>

                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>{item.discount}</Table.Cell>
                <Table.Cell>{item.maxU}</Table.Cell>
                <Table.Cell>{item.minO}</Table.Cell>
                <Table.Cell>{item.created_by}</Table.Cell>
                <Table.Cell>{item.updated_by}</Table.Cell>
                <Table.Cell>
                  <div
                    className="pl-4 cursor-pointer"
                    onClick={() => handleChangeStatus(item.id)}
                  >
                    {item.disable ? <EyeOff /> : <Eye />}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <RiEdit2Fill
                      fontSize={22}
                      onClick={() => handleUpdate(item)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          {vouchers.length === 0 && (
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
        <ModalVoucherAddOrEdit
          openModal={isOpen}
          setOpenModal={setIsOpen}
          handleAddVoucher={handleAddVoucher}
        />
      )}

      {isOpenEdit && (
        <ModalVoucherAddOrEdit
          openModal={isOpenEdit}
          setOpenModal={setIsOpenEdit}
          handleAddVoucher={handleUpdateVoucher}
          item={item}
        />
      )}
    </div>
  );
};

export default Voucher;
