import instance from "../utils/http";

export const createBook = (formData) => {
  return instance.post("/book", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getBook = () => {
  return instance.get("/book/list");
};

export const getDetailBook = (id) => {
  return instance.get(`/book/${id}`);
};
