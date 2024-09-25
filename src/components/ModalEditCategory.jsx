import { Button, Modal } from "flowbite-react";
import { FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export function ModalEdit({
  openModal,
  setOpenModal,
  item,
  handleAddCategory,
}) {
  const [name, setName] = useState(item?.nameCategory || "");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    handleAddCategory(name, file);
  };

  useEffect(() => {
    if (!openModal) {
      setFile("");
      setName("");
    }
  }, [openModal]);
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Chỉnh sửa danh mục</Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Tên danh mục" />
            </div>
            <TextInput
              id="category"
              type="text"
              placeholder="Nhập tên danh mục"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Tải ảnh" />
            </div>
            <FileInput
              id="file-upload"
              placeholder="Tải ảnh danh mục"
              //   value={file}
              onChange={(e) => setFile(e.target.files)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Thêm</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
