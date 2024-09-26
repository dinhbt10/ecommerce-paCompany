import instance from "../utils/http";

export const createBook = (formData) => {
  return instance.post("/book/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getBook = (nameBook) => {
  return instance.get(`/book/list?nameBook=${nameBook || ""}`);
};

export const getDetailBook = (id) => {
  return instance.get(`/book/${id}`);
};
