import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function ModalPublisherAddOrEdit({
  openModal,
  setOpenModal,
  handleAddPublisher,
  item,
}) {
  const [publisher, setPublisher] = useState(
    item || {
      namePublisher: "",
      addressPublisher: "",
      phonePublisher: "",
      emailPublisher: "",
    }
  );

  const handleSubmit = () => {
    const isValid = Object.values(publisher).every((e) => e);

    if (!isValid) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    handleAddPublisher(publisher);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {item ? "Chỉnh sửa nhà xuất bản" : "Thêm nhà xuất bản"}
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="1" value="Tên nhà xuất bản" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="1"
              type="text"
              placeholder="Nhập tên nhà xuất bản"
              required
              value={publisher.namePublisher}
              onChange={(e) =>
                setPublisher({ ...publisher, namePublisher: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="2" value="Địa chỉ" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="2"
              type="text"
              placeholder="Nhập tên địa chỉ"
              required
              value={publisher.addressPublisher}
              onChange={(e) =>
                setPublisher({ ...publisher, addressPublisher: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="3" value="Số điện thoại" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="3"
              type="number"
              placeholder="Nhập tên số điện thoại"
              required
              value={publisher.phonePublisher}
              onChange={(e) =>
                setPublisher({ ...publisher, phonePublisher: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="4" value="Email" />
              <span className="text-red-600">*</span>
            </div>
            <TextInput
              id="4"
              type="email"
              placeholder="Nhập email"
              required
              value={publisher.emailPublisher}
              onChange={(e) =>
                setPublisher({ ...publisher, emailPublisher: e.target.value })
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
}
