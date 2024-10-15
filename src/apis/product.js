import instance from "../utils/http";

export const createBook = (formData) => {
  return instance.post("/book/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getBook = (params) => {
  return instance.get(`/book/list`, {
    params,
  });
};

export const getDetailBook = (id) => {
  return instance.get(`/book/${id}`);
};
