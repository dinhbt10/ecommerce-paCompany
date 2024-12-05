import { useEffect, useMemo, useState } from "react";
import { getBook } from "../../../apis/product";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatNumber, getDateIfWithin7Days } from "../../../utils/common";
import { getCategory } from "../../../apis/category";
import { Label } from "flowbite-react";
import { TbCategory } from "react-icons/tb";
import instance from "../../../utils/http";
import { GoInbox } from "react-icons/go";
import useQueryParams from "../../../hook/useQueryParam";
import { useTranslation } from "react-i18next";
import _ from "lodash";

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState([]);
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const [distributor, setDistributor] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState(queryParams.sortOrder || "desc");

  const getProductList = async () => {
    const res = await getBook({ page: 0, size: 12 });
    setBooks(res.data.data.books);
  };

  const getCategoryApi = async () => {
    const categoryApi = getCategory();
    const publisherApi = instance.get("publisher/list");
    const distributorApi = instance.get("distributor/list");
    Promise.all([categoryApi, publisherApi, distributorApi]).then((results) => {
      setCategory([{ nameCategory: "" }, ...results[0].data.data.categories]);
      setPublisher([{ namePublisher: "" }, ...results[1].data.data.categories]);
      setDistributor([
        { nameDistributor: "" },
        ...results[2].data.data.categories,
      ]);
    });
  };

  const handleFilterChange = (paramName, value) => {
    const currentValues = searchParams.get(paramName)
      ? searchParams.get(paramName).split(",")
      : [];

    let updatedValues;
    if (currentValues.includes(value)) {
      updatedValues = currentValues.filter((item) => item !== value);
    } else {
      updatedValues = [...currentValues, value];
    }

    if (updatedValues.length > 0) {
      searchParams.set(paramName, updatedValues.join(","));
    } else {
      searchParams.delete(paramName);
    }

    setSearchParams(searchParams);
  };

  const handleSortChange = (e) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);
    setSearchParams({ ...queryParams, sortOrder: selectedOrder });
  };

  const filteredData = useMemo(() => {
    // Loại bỏ điều kiện sortPrice khỏi queryParams khi lọc
    const filteredParams = _.omit(queryParams, ["sortOrder"]);
    // Lọc sản phẩm dựa trên các điều kiện từ filterParams (loại bỏ sortPrice)
    const filteredBooks = books.filter((item) => {
      return Object.entries(filteredParams).every(([key, value]) => {
        const selectedValues = value ? value.split(",") : [];
        return (
          selectedValues.length === 0 ||
          selectedValues.includes(item[key]?.toString())
        );
      });
    });

    return filteredBooks.sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      return b.price - a.price;
    });
  }, [books, queryParams, sortOrder]);

  useEffect(() => {
    getCategoryApi();
    getProductList();
  }, []);

  return (
    <div className="max-w-[1100px] w-full mx-auto">
      <div className="h-10 border flex items-center gap-3 justify-start bg-white mb-4 px-2">
        <Link className="text-sm text-gray-700" to="/">
          {t("text-13")}
        </Link>
        <MdKeyboardArrowRight />
        <Link className="text-sm text-gray-700" to="/product">
          {t("text-14")}
        </Link>
        <MdKeyboardArrowRight />
        <span className="text-sm text-black border-l-2 border-[#9F9F9F] font-medium pl-4">
          {queryParams.nameCategory || t("text-15")}
        </span>
      </div>

      <div className="grid grid-cols-5 bg-white gap-3 mb-5 pb-5">
        <div className="col-span-1 pl-2 pt-5">
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-md border">
              <div className="flex items-center justify-start gap-2 text-md text-[#131523] bg-[#eee] font-semibold mb-3 uppercase">
                <div className="p-3 bg-[#d5d4d4]">
                  <TbCategory className="text-md" />
                </div>
                {t("text-11")}
              </div>
              <fieldset className="flex max-w-md flex-col gap-4 p-5 pt-0">
                {category?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      id={item.nameCategory}
                      type="checkbox"
                      className="cursor-pointer outline-none ring-0 rounded-sm text-[#cd5f5f]"
                      value={item.nameCategory}
                      checked={
                        item.nameCategory === ""
                          ? !searchParams.get("categoryName")
                          : searchParams
                              .get("categoryName")
                              ?.split(",")
                              .includes(item.nameCategory)
                      }
                      onChange={() =>
                        handleFilterChange("categoryName", item.nameCategory)
                      }
                    />
                    <Label
                      className="text-[#475156] cursor-pointer"
                      htmlFor={item.nameCategory}
                    >
                      {item.nameCategory ? t(item.nameCategory) : t("text-15")}
                    </Label>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="bg-white rounded-md border">
              <div className="flex items-center justify-start gap-2 text-md text-[#131523] bg-[#eee] font-semibold mb-3 uppercase">
                <div className="p-3 bg-[#d5d4d4]">
                  <GoInbox className="text-md" />
                </div>
                {t("text-17")}
              </div>
              <fieldset className="flex max-w-md flex-col gap-4 p-5 pt-0">
                {publisher?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      id={item.namePublisher}
                      type="checkbox"
                      className="cursor-pointer outline-none ring-0 rounded-sm text-[#cd5f5f]"
                      value={item.namePublisher}
                      checked={
                        item.namePublisher === ""
                          ? !searchParams.get("publisherName")
                          : searchParams
                              .get("publisherName")
                              ?.split(",")
                              .includes(item.namePublisher)
                      }
                      onChange={() =>
                        handleFilterChange("publisherName", item.namePublisher)
                      }
                    />
                    <Label
                      className="text-[#475156] cursor-pointer"
                      htmlFor={item.namePublisher}
                    >
                      {item.namePublisher
                        ? t(item.namePublisher)
                        : t("text-15")}
                    </Label>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="bg-white rounded-md border">
              <div className="flex items-center justify-start gap-2 text-md text-[#131523] bg-[#eee] font-semibold mb-3 uppercase">
                <div className="p-3 bg-[#d5d4d4]">
                  <GoInbox className="text-md" />
                </div>
                {t("text-18")}
              </div>
              <fieldset className="flex max-w-md flex-col gap-4 p-5 pt-0">
                {distributor?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      id={item.nameDistributor}
                      type="checkbox"
                      className="cursor-pointer outline-none ring-0 rounded-sm text-[#cd5f5f]"
                      value={item.nameDistributor}
                      checked={
                        item.nameDistributor === ""
                          ? !searchParams.get("distributorName")
                          : searchParams
                              .get("distributorName")
                              ?.split(",")
                              .includes(item.nameDistributor)
                      }
                      onChange={() =>
                        handleFilterChange(
                          "distributorName",
                          item.nameDistributor
                        )
                      }
                    />
                    <Label
                      className="text-[#475156] cursor-pointer"
                      htmlFor={item.nameDistributor}
                    >
                      {item.nameDistributor
                        ? t(item.nameDistributor)
                        : t("text-15")}
                    </Label>
                  </div>
                ))}
              </fieldset>
            </div>
          </div>
        </div>

        <div className="col-span-4 min-h-[500px]">
          <div className="flex justify-between items-center bg-[#F2F4F5] mt-5 p-2 px-5 mr-4">
            <div className="flex justify-start items-center text-sm text-[#5F6C72] gap-2">
              {t("text-19")}
              <select
                className="rounded text-sm px-3 py-2 border border-gray-300"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="desc">Cao đến thấp</option>
                <option value="asc">Thấp đến cao</option>
              </select>
            </div>
            <div className="text-sm text-[#5F6C72]">
              <span className="text-[#141414] font-semibold">
                {filteredData.length}
              </span>{" "}
              {t("text-20")}
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
                  <span className="font-bold text-[#3A3A3A] truncate">
                    {item.nameBook}
                  </span>
                  <span className="block text-center text-[#d71a00] font-semibold text-[16px]">
                    {formatNumber(item.price)}
                  </span>
                </div>
                {getDateIfWithin7Days(item.createAt) && (
                  <div className="absolute top-2 left-2 w-10 h-6 bg-red-500 flex justify-center items-center rounded-sm text-sm text-white">
                    {t("text-21")}
                  </div>
                )}
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-4 flex justify-center items-center h-full">
                {t("text-22")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
