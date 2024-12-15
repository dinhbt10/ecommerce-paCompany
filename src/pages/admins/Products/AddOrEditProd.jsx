import { useEffect, useState } from "react";
import { Button, Label, Radio, Textarea, TextInput } from "flowbite-react";
import { GiCancel } from "react-icons/gi";
import { getCategory } from "../../../apis/category";
import instance from "../../../utils/http";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../apis/product";
import { toast } from "react-toastify";

export function AddOrEditProduct() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [distributor, setDistributor] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [product, setProduct] = useState({
    nameBook: "",
    author: "",
    description_short: "",
    description_long: "",
    year_publisher: "",
    images: [],
    size: "",
    page_number: "",
    barcode: "",
    price: null,
    quantity: null,
    idCategory: null,
    idPublisher: null,
    idDistributor: null,
  });

  const handleAddFile = (e) => {
    const files = e.target.files;
    const listFile = Array.from(files);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...listFile],
    }));

    const blobUrls = [...imageUrls];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const blobUrl = URL.createObjectURL(file);
      blobUrls.push(blobUrl);
    }

    setImageUrls(blobUrls);
  };

  const handleRemoveImage = (id) => {
    setImageUrls((pre) => pre?.filter((_, index) => index !== id));
    setProduct((pre) => ({
      ...pre,
      images: pre.images?.filter((_, index) => index !== id),
    }));
  };

  const getCategoryApi = async () => {
    const categoryApi = getCategory();
    const publisherApi = instance.get("publisher/list");
    const distributorApi = instance.get("distributor/list");
    Promise.all([categoryApi, publisherApi, distributorApi]).then((results) => {
      setCategory(results[0].data.data.categories);
      setPublisher(results[1].data.data.categories);
      setDistributor(results[2].data.data.categories);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(product).every((e) => e);
    if (!isValid) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key !== "images") {
        formData.append(key, product[key]);
      }
    });
    product.images.forEach((item) => {
      formData.append("images", item);
    });
    const res = await createBook(formData);
    if (res.data.success) {
      navigate(-1);
    }
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  useEffect(() => {
    if (category) {
      if (!product?.idCategory) {
        setProduct((prev) => ({
          ...prev,
          idCategory: category.find((_, index) => index === 0)?.idCategory,
        }));
      }
    }
  }, [category, product?.idCategory]);

  useEffect(() => {
    if (publisher) {
      if (!product?.idPublisher) {
        setProduct((prev) => ({
          ...prev,
          idPublisher: publisher?.find((_, index) => index === 0)?.idPublisher,
        }));
      }
    }
  }, [publisher, product?.idPublisher]);

  useEffect(() => {
    if (distributor) {
      if (!product?.idDistributor) {
        setProduct((prev) => ({
          ...prev,
          idDistributor: distributor.find((_, index) => index === 0)
            ?.idDistributor,
        }));
      }
    }
  }, [distributor, product?.idDistributor]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex mb-4 justify-between items-center">
          <h1 className="text-2xl font-semibold">Thêm sản phẩm</h1>
          <div className="flex flex-wrap gap-2">
            <Button color="gray" onClick={() => navigate(-1)}>
              Trở lại
            </Button>
            <button
              type="submit"
              className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-8 gap-5">
            <div className="col-span-6">
              <div className="bg-white p-5 rounded-md">
                <div className="text-lg text=[#131523] font-semibold mb-3">
                  Thông tin
                </div>
                <div className="mb-1">
                  <Label value="Tên sản phẩm" />
                  <span className="text-red-600">*</span>
                </div>
                <TextInput
                  id="3"
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  value={product?.nameBook}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      nameBook: e.target.value,
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-5 my-3">
                  <div className="col-span-1">
                    <div className="mb-1">
                      <Label value="Tên tác giả" />
                      <span className="text-red-600">*</span>
                    </div>
                    <TextInput
                      id="3"
                      type="text"
                      placeholder="Nhập tên tác giả"
                      value={product?.author}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="mb-1">
                      <Label value="Năm phát hành" />
                      <span className="text-red-600">*</span>
                    </div>
                    <TextInput
                      id="3"
                      type="text"
                      placeholder="Nhập năm phát hành"
                      value={product?.year_publisher}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          year_publisher: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-5 my-2">
                    <div className="col-span-1">
                      <div className="mb-1">
                        <Label value="Kích thước sách" />
                        <span className="text-red-600">*</span>
                      </div>
                      <TextInput
                        id="3"
                        type="text"
                        placeholder="Nhập kích thước sách"
                        value={product?.size}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            size: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="mb-1">
                        <Label value="Số trang" />
                        <span className="text-red-600">*</span>
                      </div>
                      <TextInput
                        id="3"
                        type="text"
                        placeholder="Nhập số trang"
                        value={product?.page_number}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            page_number: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5 my-3">
                  <div className="col-span-1">
                    <div className="mb-1">
                      <Label value="Mã vạch" />
                      <span className="text-red-600">*</span>
                    </div>
                    <TextInput
                      id="3"
                      type="text"
                      placeholder="Nhập mã vạch"
                      value={product?.barcode}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          barcode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="mb-1">
                      <Label value="Giá tiền" />
                      <span className="text-red-600">*</span>
                    </div>
                    <TextInput
                      id="3"
                      type="number"
                      placeholder="Nhập giá tiền"
                      value={product?.price}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="mb-1">
                      <Label value="Số lượng" />
                      <span className="text-red-600">*</span>
                    </div>
                    <TextInput
                      id="3"
                      type="number"
                      placeholder="Nhập số lượng"
                      value={product?.quantity}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="my-2">
                  <div className="mb-1">
                    <Label value="Ảnh" className="mb-2" />
                    <span className="text-red-600">*</span>
                  </div>
                  <div className="flex justify-start overflow-auto gap-3">
                    <label
                      htmlFor="image"
                      className="min-w-[100px] h-[70px] flex justify-center items-center p-1  cursor-pointer border-dashed border border-black rounded"
                    >
                      Thêm ảnh
                    </label>
                    {imageUrls?.map((item, index) => (
                      <div key={index} className="relative">
                        <img
                          src={item}
                          className="min-w-[100px] h-[70px] object-cover rounded"
                        />
                        <GiCancel
                          className="absolute top-1 right-1 text-xl text-red-600 cursor-pointer"
                          onClick={() => handleRemoveImage(index)}
                        />
                      </div>
                    ))}
                    <input
                      type="file"
                      hidden
                      id="image"
                      multiple
                      onChange={(e) => handleAddFile(e)}
                    />
                  </div>
                </div>
                <div className="my-1">
                  <Label value="Mô tả ngắn" />
                  <span className="text-red-600">*</span>
                </div>
                <Textarea
                  placeholder="Nhập mô tả chung"
                  rows={2}
                  value={product?.description_short}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      description_short: e.target.value,
                    })
                  }
                />
                <div className="my-2">
                  <div className="mb-2 block">
                    <Label value="Mô tả chi tiết" />
                    <span className="text-red-600">*</span>
                  </div>
                  <Textarea
                    placeholder="Nhập mô tả chi tiết"
                    rows={4}
                    value={product?.description_long}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        description_long: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-5">
                <div className="bg-white p-5 rounded-md">
                  <div className="text-lg text=[#131523] font-semibold mb-3">
                    Thể loại
                    <span className="text-red-600">*</span>
                  </div>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    {category?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Radio
                          value={item.idCategory}
                          checked={item.idCategory === product?.idCategory}
                          onChange={() =>
                            setProduct({
                              ...product,
                              idCategory: item.idCategory,
                            })
                          }
                        />
                        <Label htmlFor="united-state">
                          {item.nameCategory}
                        </Label>
                      </div>
                    ))}
                    {category && category.length === 0 && (
                      <div className="flex justify-center items-center text-red-700">
                        Bạn chưa có thể loại
                      </div>
                    )}
                  </fieldset>
                </div>
                <div className="bg-white p-5 rounded-md">
                  <div className="text-lg text=[#131523] font-semibold mb-3">
                    Nhà phân phối
                    <span className="text-red-600">*</span>
                  </div>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    {distributor?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Radio
                          value={item.idDistributor}
                          checked={
                            item.idDistributor === product?.idDistributor
                          }
                          onChange={() =>
                            setProduct({
                              ...product,
                              idDistributor: item.idDistributor,
                            })
                          }
                        />
                        <Label htmlFor="united-state">
                          {item.nameDistributor}
                        </Label>
                      </div>
                    ))}
                    {distributor.length === 0 && (
                      <div className="flex justify-center items-center text-red-700">
                        Bạn chưa có nhà phân phối
                      </div>
                    )}
                  </fieldset>
                </div>
                <div className="bg-white p-5 rounded-md">
                  <div className="text-lg text=[#131523] font-semibold mb-3">
                    Nhà xuất bản
                    <span className="text-red-600">*</span>
                  </div>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    {publisher?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Radio
                          value={item.idPublisher}
                          checked={item.idPublisher === product?.idPublisher}
                          onChange={() =>
                            setProduct({
                              ...product,
                              idPublisher: item.idPublisher,
                            })
                          }
                        />
                        <Label htmlFor="united-state">
                          {item.namePublisher}
                        </Label>
                      </div>
                    ))}
                    {publisher.length === 0 && (
                      <div className="flex justify-center items-center text-red-700">
                        Bạn chưa có nhà xuất bản
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
