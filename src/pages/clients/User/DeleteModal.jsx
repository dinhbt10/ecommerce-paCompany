import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DeleteModal({ openModal, setOpenModal }) {
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
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Huỷ đơn hàng
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Không phải bây giờ
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
