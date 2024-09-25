import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";

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
          <Button onClick={handleSubmit}>{item ? "Sửa" : "Thêm"}</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
