import { Button, Datepicker, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { convertToISO } from "../../../utils/common";

const ModalVoucherAddOrEdit = ({
  openModal,
  setOpenModal,
  handleAddVoucher,
  item,
}) => {
  const [voucher, setVoucher] = useState(
    item || {
      code: "",
      discountValue: "",
      maxUsage: "",
      minOrderValue: "",
      startDate: "",
      endDate: "",
    }
  );

  const handleSubmit = () => {
    const clone = {
      ...voucher,
      startDate: convertToISO(voucher.startDate),
      endDate: convertToISO(voucher.endDate),
    };

    const isValid = Object.values(clone).every((e) => e);

    if (!isValid) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    handleAddVoucher(clone);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {item ? "Chỉnh sửa voucher" : "Thêm voucher"}
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="1" value="Mã voucher" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="1"
              type="text"
              placeholder="Nhập mã voucher"
              required
              value={voucher.code}
              onChange={(e) => setVoucher({ ...voucher, code: e.target.value })}
            />
          </div>
          <div className="flex flex-row items-center gap-2 mr-2 mb-3">
            <div className="flex-1">
              <Label htmlFor="1" value="Ngày bắt đầu" />
              <span className="text-red-600">*</span>
              <Datepicker
                onChange={(e) =>
                  setVoucher((prev) => ({
                    ...prev,
                    startDate: e,
                  }))
                }
                className="h-[34px]"
                language="vi-VN"
                labelTodayButton="Hôm nay"
                labelClearButton="Xoá"
              />
            </div>
            <div className="mt-5">~</div>
            <div className="flex-1">
              <Label htmlFor="1" value="Ngày kết thúc" />
              <span className="text-red-600">*</span>
              <Datepicker
                onChange={(e) =>
                  setVoucher((prev) => ({
                    ...prev,
                    endDate: e,
                  }))
                }
                className="h-[34px]"
                language="vi-VN"
                labelTodayButton="Hôm nay"
                labelClearButton="Xoá"
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="2" value="Giá trị voucher" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="2"
              type="text"
              placeholder="Nhập giá trị voucher"
              required
              value={voucher.discountValue}
              onChange={(e) =>
                setVoucher({ ...voucher, discountValue: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="3" value="Số lượng được sử dung" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="3"
              type="number"
              placeholder="Nhập số lượng được sử dung"
              required
              value={voucher.maxUsage}
              onChange={(e) =>
                setVoucher({ ...voucher, maxUsage: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="4" value="Giá trị đơn hàng tối thiểu" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="4"
              type="number"
              placeholder="Nhập giá trị đơn hàng tối thiểu"
              required
              value={voucher.minOrderValue}
              onChange={(e) =>
                setVoucher({ ...voucher, minOrderValue: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
            onClick={handleSubmit}
          >
            {item ? "Sửa" : "Thêm"}
          </button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalVoucherAddOrEdit;
