import instance from "../utils/http";

export const getCategory = () => {
  return instance.get("/category/list");
};

export const createCategory = (formData) => {
  return instance.post("/category", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
