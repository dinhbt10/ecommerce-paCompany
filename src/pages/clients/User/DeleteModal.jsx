import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import instance from "../../../utils/http";
import { getUserInfoLocalStorage } from "../../../utils/common";
import { toast } from "react-toastify";

export function DeleteModal({ orderId, openModal, setOpenModal }) {
  const userInfo = getUserInfoLocalStorage();

  const handleDeleteOrder = async () => {
    const res = await instance.delete(
      `orders/cancel?userId=${userInfo.idUser}&orderId=${orderId}`
    );
    const { success } = res.data;
    if (success) {
      toast.success("Huỷ đơn hàng thành công", {
        autoClose: 1500,
        position: "bottom-right",
      });
    }
  };
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-10 w-10 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn huỷ đơn hàng không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteOrder}>
                Huỷ đơn hàng
              </Button>
              <button
                className="border px-10 rounded-lg bg-gray-50"
                color="gray"
                onClick={() => setOpenModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
