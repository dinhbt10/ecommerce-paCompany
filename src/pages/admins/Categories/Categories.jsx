import { Button } from "flowbite-react";
import { createCategory, getCategory } from "../../../apis/category";
import { useEffect, useState } from "react";
import { ModalComponents } from "../../../components/Modal";
import { AiFillEdit } from "react-icons/ai";
import { ModalEdit } from "../../../components/ModalEditCategory";
import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmCategory } from "./Confirm";
import instance from "../../../utils/http";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setItEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [item, setItem] = useState();
  const getCategoryApi = async () => {
    try {
      const res = await getCategory();
      const { success, data } = res.data;
      if (success) {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (name, file) => {
    const formData = new FormData();
    formData.append("nameCategory", name);
    formData.append("image", file[0]);
    const res = await createCategory(formData);
    if (res.data.success) {
      setIsOpen(false);
      getCategoryApi();
    }
  };

  const handleEdit = (item) => {
    setItem(item);
    setItEdit(true);
  };

  const handleDelete = (id) => {
    setDelete(true);
    setIdDelete(id);
  };

  const handleRemoveCategory = async (id) => {
    try {
      const res = await instance.delete(`category/${id}`);
      const { success } = res.data;
      if (success) {
        getCategoryApi();
        setDelete(false);
        setIdDelete(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Danh mục</h1>
        <Button className="outline-none" onClick={() => setIsOpen(true)}>
          + Thêm danh mục
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {category &&
          category.map((item) => (
            <div
              key={item.idCategory}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.nameCategory}
                className="w-full h-44 object-cover"
              />
              <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-semibold">{item.nameCategory}</h2>
                <div className="flex items-center gap-1">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    <AiFillEdit className="text-2xl" />
                  </div>
                  <FaRegTrashAlt
                    className="text-[18px] text-red-700 cursor-pointer"
                    onClick={() => handleDelete(item.idCategory)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <ModalComponents
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title="Thêm mới danh mục"
        handleAddCategory={handleAddCategory}
      />
      <ModalEdit
        openModal={isOpenEdit}
        setOpenModal={setItEdit}
        item={item}
        handleAddCategory={handleAddCategory}
      />
      <ConfirmCategory
        openModal={openDelete}
        item={idDelete}
        setOpenModal={setDelete}
        handleRemoveCategory={handleRemoveCategory}
      />
    </div>
  );
};

export default Categories;
