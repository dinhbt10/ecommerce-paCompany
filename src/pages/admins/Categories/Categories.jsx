import { createCategory, getCategory } from "../../../apis/category";
import { useContext, useEffect, useState } from "react";
import { ModalComponents } from "../../../components/Modal";
import { AiFillEdit } from "react-icons/ai";
import { ModalEdit } from "../../../components/ModalEditCategory";
import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmCategory } from "./Confirm";
import instance from "../../../utils/http";
import { Search } from "lucide-react";
import { AppContext } from "../../../context/app";

const Categories = () => {
  const { userInfo } = useContext(AppContext);
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setItEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [item, setItem] = useState();
  const [nameCategory, setNameCategory] = useState("");
  const getCategoryApi = async () => {
    try {
      const res = await getCategory(nameCategory);
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

  const handleUpdateCategory = async (name, file) => {
    const formData = new FormData();
    formData.append("nameCategory", name);
    if (file) {
      formData.append("image", file);
    }
    const res = await instance.put(`category/${item.idCategory}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      setItEdit(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Thể loại sách</h1>
        <button
          className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
          onClick={() => setIsOpen(true)}
        >
          + Thêm thể loại
        </button>
      </div>
      <div className="flex items-center justify-start z-[100000] mb-3">
        <input
          type="text"
          value={nameCategory}
          onChange={(e) => setNameCategory(e.target.value)}
          placeholder="Tìm kiếm thể loại"
          className="flex-1 rounded-tl-[5px] max-w-[250px] rounded-bl-[5px] placeholder:text-[14px] h-[34px]"
        />
        <button
          className="bg-[#d76e6e] text-white h-[35px] rounded-tr-[5px] rounded-br-[5px] px-3"
          type="button"
          onClick={getCategoryApi}
        >
          <Search size="16px" />
        </button>
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
                  {userInfo.roles[0].name !== "ROLE_EMPLOYEE" && (
                    <FaRegTrashAlt
                      className="text-[18px] text-red-700 cursor-pointer"
                      onClick={() => handleDelete(item.idCategory)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <ModalComponents
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title="Thêm mới thể loại"
        handleAddCategory={handleAddCategory}
      />
      <ModalEdit
        openModal={isOpenEdit}
        setOpenModal={setItEdit}
        item={item}
        handleAddCategory={handleUpdateCategory}
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
