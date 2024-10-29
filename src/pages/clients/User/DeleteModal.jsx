import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import instance from "../../../utils/http";
import { getUserInfoLocalStorage } from "../../../utils/common";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function DeleteModal({
  orderId,
  openModal,
  setOpenModal,
  getAllStatus,
}) {
  const userInfo = getUserInfoLocalStorage();
  const { t } = useTranslation();

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
      setOpenModal(false);
      getAllStatus();
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
              {t("text-148")}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteOrder}>
                {t("text-149")}
              </Button>
              <button
                className="border px-10 rounded-lg bg-gray-50"
                color="gray"
                onClick={() => setOpenModal(false)}
              >
                {t("text-150")}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
