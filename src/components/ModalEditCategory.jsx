import { Button, Modal } from "flowbite-react";
import { FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import instance from "../utils/http";

export function ModalEdit({
  openModal,
  setOpenModal,
  item,
  handleAddCategory,
}) {
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    handleAddCategory(category?.nameCategory, file && file[0]);
  };

  const getDetailCategory = async (id) => {
    try {
      const res = await instance.get(`/category/${id}`);
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item?.idCategory) {
      getDetailCategory(item.idCategory);
    }
  }, [item?.idCategory]);

  useEffect(() => {
    return () => {
      setFile(null);
      setCategory(null);
    };
  }, []);

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
              value={category?.nameCategory}
              onChange={(e) =>
                setCategory((prev) => ({
                  ...prev,
                  nameCategory: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Tải ảnh" />
            </div>
            <FileInput
              id="file-upload"
              placeholder="Tải ảnh danh mục"
              onChange={(e) => setFile(e.target.files)}
            />
          </div>
          {!file && (
            <div className="w-full flex justify-center mt-3">
              <img src={category?.imageUrl} className="w-[100px]" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Cập nhật</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
