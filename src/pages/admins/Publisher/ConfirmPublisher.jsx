import { Button, Modal } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";

export function ConfirmPublisher({
  openModal,
  setOpenModal,
  handleRemovePublisher,
  item,
}) {
  const handleSubmit = () => {
    handleRemovePublisher(item);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Xóa tác giả</Modal.Header>
        <Modal.Body>
          <div className="flex justify-center mb-3">
            <FaRegTrashAlt className="text-center text-2xl text-red-700" />
          </div>
          <div className="text-center">
            Bạn có chắc chắn muốn xoá tác giả này không?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
