import instance from "../utils/http";

export const getCategory = (nameCategory) => {
  return instance.get("/category/list", {
    params: { nameCategory: nameCategory || undefined },
  });
};

export const createCategory = (formData) => {
  return instance.post("/category/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
