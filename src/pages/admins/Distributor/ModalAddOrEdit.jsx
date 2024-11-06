import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";

export function ModalDistributorAddOrEdit({
  openModal,
  setOpenModal,
  handleAddDistributor,
  item,
}) {
  const [distributor, setDistributor] = useState(
    item || {
      nameDistributor: "",
      address: "",
      phone: "",
      email: "",
    }
  );

  const handleSubmit = () => {
    handleAddDistributor(distributor);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {item ? "Chỉnh sửa nhà phân phối" : "Thêm nhà phân phối"}
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="1" value="Tên nhà phân phối" />
            </div>
            <TextInput
              id="1"
              type="text"
              placeholder="Nhập tên nhà phân phối"
              required
              value={distributor.nameDistributor}
              onChange={(e) =>
                setDistributor({
                  ...distributor,
                  nameDistributor: e.target.value,
                })
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
              value={distributor.address}
              onChange={(e) =>
                setDistributor({
                  ...distributor,
                  address: e.target.value,
                })
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
              value={distributor.phone}
              onChange={(e) =>
                setDistributor({
                  ...distributor,
                  phone: e.target.value,
                })
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
              value={distributor.email}
              onChange={(e) =>
                setDistributor({
                  ...distributor,
                  email: e.target.value,
                })
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
