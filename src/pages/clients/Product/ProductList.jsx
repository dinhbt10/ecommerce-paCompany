import { useEffect, useMemo, useState } from "react";
import { getBook } from "../../../apis/product";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatNumber, getDateIfWithin7Days } from "../../../utils/common";
import { getCategory } from "../../../apis/category";
import { Label, Radio } from "flowbite-react";
import { TbCategory } from "react-icons/tb";
import instance from "../../../utils/http";
import { GoInbox } from "react-icons/go";
import useQueryParams from "../../../hook/useQueryParam";

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState([]);
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const [distributor, setDistributor] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data.books);
  };

  const getCategoryApi = async () => {
    const categoryApi = getCategory();
    const publisherApi = instance.get("publisher/list");
    const distributorApi = instance.get("distributor/list");
    Promise.all([categoryApi, publisherApi, distributorApi]).then((results) => {
      setCategory(results[0].data.data.categories);
      setPublisher(results[1].data);
      setDistributor(results[2].data);
    });
  };

  const filteredData = useMemo(() => {
    return books.filter((item) => {
      // Lặp qua tất cả các key-value trong searchParams
      return Object.entries(queryParams).every(([key, value]) => {
        // Kiểm tra xem key có tồn tại trong item và giá trị khớp với searchParams
        return (
          key in item &&
          item[key].toString().toLowerCase() === value.toLowerCase()
        );
      });
    });
  }, [books, queryParams]);
  console.log(filteredData);

  useEffect(() => {
    getCategoryApi();
    getProductList();
  }, []);

  useEffect(() => {
    // console.log(books);
    // console.log(queryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryParams), books]);

  return (
    <div className="max-w-[1100px] w-full mx-auto">
      <div className="h-10 border flex items-center gap-3 justify-start bg-white mb-4 px-2">
        <Link className="text-sm text-gray-700" to="/">
          Trang chủ
        </Link>
        <MdKeyboardArrowRight />
        <Link className="text-sm text-gray-700" to="/product">
          Cửa hàng
        </Link>
        <MdKeyboardArrowRight />
        <span className="text-sm text-black border-l-2 border-[#9F9F9F] font-medium pl-4">
          {queryParams.nameCategory || "Tất cả"}
        </span>
      </div>
      <div className="grid grid-cols-5 bg-white gap-3 mb-5 pb-5">
        <div className="col-span-1 pl-2 pt-5">
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-md border">
              <div className="flex items-center justify-start gap-2 text-md text=[#131523] bg-[#eee] font-semibold mb-3 uppercase">
                <div className="p-3 bg-[#d5d4d4]">
                  <TbCategory className="text-md" />
                </div>
                Danh mục
              </div>
              <fieldset className="flex max-w-md flex-col gap-4 p-5 pt-0">
                {category.length > 0 && (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.delete("categoryName");
                      setSearchParams(newSearchParams);
                    }}
                  >
                    <Radio
                      className="cursor-pointer"
                      value={""}
                      checked={!queryParams.categoryName}
                    />
                    <Label className="cursor-pointer">Tất cả</Label>
                  </div>
                )}
                {category?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setSearchParams({
                        ...queryParams,
                        categoryName: item.nameCategory,
                      })
                    }
                  >
                    <Radio
                      className="cursor-pointer"
                      value={item.nameCategory}
                      checked={item.nameCategory === queryParams.categoryName}
                    />
                    <Label className="text-[#475156] cursor-pointer">
                      {item.nameCategory}
                    </Label>
                  </div>
                ))}
                {category.length === 0 && (
                  <div className="flex justify-center items-center text-red-700">
                    Bạn chưa có danh mục
                  </div>
                )}
              </fieldset>
            </div>
            <div className="bg-white rounded-md border">
              <div className="flex items-center justify-start gap-2 text-md text=[#131523] bg-[#eee] font-semibold mb-3 uppercase">
                <div className="p-3 bg-[#d5d4d4]">
                  <GoInbox className="text-md" />
                </div>
                Nhà cung cấp
              </div>
              <fieldset className="flex max-w-md flex-col gap-4 p-5 pt-0">
                {category.length > 0 && (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.delete("publisherName");
                      setSearchParams(newSearchParams);
                    }}
                  >
                    <Radio
                      className="cursor-pointer"
                      value={""}
                      checked={!queryParams.publisherName}
                    />
                    <Label className="cursor-pointer">Tất cả</Label>
                  </div>
                )}
                {publisher?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setSearchParams({
                        ...queryParams,
                        publisherName: item.namePublisher,
                      })
                    }
                  >
                    <Radio
                      className="cursor-pointer"
                      value={item.namePublisher}
                      checked={item.namePublisher === queryParams.publisherName}
                    />
                    <Label className="text-[#475156] cursor-pointer">
                      {item.namePublisher}
                    </Label>
                  </div>
                ))}
                {category.length === 0 && (
                  <div className="flex justify-center items-center text-red-700">
                    Bạn chưa có danh mục
                  </div>
                )}
              </fieldset>
            </div>
            <div className="bg-white rounded-md border">
              <div className="flex items-center justify-start gap-2 text-md text=[#131523] bg-[#eee] font-semibold mb-3 uppercase">
                <div className="p-3 bg-[#d5d4d4]">
                  <GoInbox className="text-md" />
                </div>
                Nhà xuất bản
              </div>
              <fieldset className="flex max-w-md flex-col gap-4 p-5 pt-0">
                {distributor.length > 0 && (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.delete("distributorName");
                      setSearchParams(newSearchParams);
                    }}
                  >
                    <Radio
                      className="cursor-pointer"
                      checked={!queryParams.distributorName}
                    />
                    <Label className="cursor-pointer">Tất cả</Label>
                  </div>
                )}
                {distributor?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      setSearchParams({
                        ...queryParams,
                        distributorName: item.nameDistributor,
                      })
                    }
                  >
                    <Radio
                      className="cursor-pointer"
                      value={item.nameDistributor}
                      checked={
                        item.nameDistributor === queryParams.distributorName
                      }
                    />
                    <Label className="text-[#475156] cursor-pointer">
                      {item.nameDistributor}
                    </Label>
                  </div>
                ))}
                {category.length === 0 && (
                  <div className="flex justify-center items-center text-red-700">
                    Bạn chưa có danh mục
                  </div>
                )}
              </fieldset>
            </div>
          </div>
        </div>
        <div className="col-span-4 min-h-[500px]">
          <div className="flex justify-between items-center bg-[#F2F4F5] mt-5 p-2 px-5 mr-4">
            <div className="text-sm text-[#5F6C72]">Bộ lọc:</div>
            <div className="text-sm text-[#5F6C72]">
              <span className="text-[#141414] font-semibold">
                {filteredData.length}
              </span>{" "}
              Kết quả tìm kiếm
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 pt-4 pr-4 pb-10">
            {filteredData.map((item, index) => (
              <div
                className="col-span-1 rounded-sm cursor-pointer border p-3 relative"
                key={index}
                onClick={() => navigate(`/product/${item.idBook}`)}
              >
                <img
                  src={item.imageUrls[0]}
                  alt={item.nameBook}
                  className="object-cover h-[265px] w-full"
                />
                <div className="flex flex-col p-2 pb-0">
                  <span className="font-bold text-[#3A3A3A]">
                    {item.nameBook}
                  </span>
                  <span className="text-md font-semibold">
                    {formatNumber(item.price)}
                  </span>
                </div>
                {getDateIfWithin7Days(item.createAt) ? (
                  <div className="absolute top-2 left-2 w-10 h-6 bg-red-500 flex justify-center items-center rounded-sm text-sm text-white">
                    Mới
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
            <div className="col-span-4">
              <div className="flex justify-center items-center h-full">
                {filteredData.length === 0 && <>Không có kết quả</>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
