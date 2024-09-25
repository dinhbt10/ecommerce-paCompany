import instance from "../utils/http";

export const getCategory = () => {
  return instance.get("/category/list");
};

export const createCategory = (formData) => {
  return instance.post("/category/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
