import { Select, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdOutlineWrongLocation } from "react-icons/md";
import instance from "../../../utils/http";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatNumber,
  getUserInfoLocalStorage,
  isWithin24Hours,
} from "../../../utils/common";
import { useTranslation } from "react-i18next";
import { Rating } from "flowbite-react";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [comments, setComments] = useState([]);
  const userId = getUserInfoLocalStorage().idUser;
  const getOrderDetail = async () => {
    const res = await instance(
      `orders/detail_user?orderId=${id}&userId=${userId}`
    );
    const { data } = res.data;
    setData(data);
    setComments(
      data.books.map((item) => ({
        username: item.feedbacks[0]?.username || "",
        comment: item.feedbacks[0]?.comment || "",
        rating: item.feedbacks[0]?.rating || 5,
        nameBook: item.nameBook,
        orderDetailId: item.orderDetailId,
        idBook: item.idBook,
      }))
    );
  };

  const handleSubmit = async () => {
    try {
      const cleanData = comments.map((item) => ({
        orderDetailId: item.orderDetailId,
        bookId: item.idBook,
        comment: item.comment,
        rating: item.rating,
      }));

      const res = await instance.post(
        `feedback/create?userId=${userId}&orderId=${data.id}`,
        cleanData
      );

      const { success } = res.data;

      if (success) {
        toast.success(t("text-156"), {
          autoClose: 1500,
          position: "bottom-right",
        });
        navigate("/user?active=1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = (index, key) => {
    const cloneComent = [...comments];
    cloneComent[index].rating = key;
    setComments(cloneComent);
  };

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="bg-white">
        <div className="bg-white">
          <div className="flex justify-between items-center max-w-[1100px] mx-auto py-5">
            <div className="text-2xl text-[#cd5f5f] font-semibold">
              {t("text-97")}
            </div>
          </div>
        </div>
      </div>
      {data && (
        <>
          <div className="max-w-[1100px] mx-auto my-3 bg-white px-8 py-6">
            <div className="flex text-xl text-[#cd5f5f] items-center justify-start gap-2 font-medium">
              <MdOutlineWrongLocation /> {t("text-97")}
            </div>
            <div className="flex text-xl text-black items-center justify-start gap-2  mt-3">
              <div className="font-medium">
                {data.receiveName} {data.phone}
              </div>
              <p className="text-gray-600">{data.shippingAdrress}</p>
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto bg-white">
            <div className="p-10">
              <Table>
                <Table.Body>
                  <Table.Row className="bg-white">
                    <Table.Cell className="w-[58%] text-[#0a0a0a] font-medium p-2 text-xl">
                      {t("text-98")}
                    </Table.Cell>
                    <Table.Cell className="p-2 w-[14%]">
                      {t("text-99")}
                    </Table.Cell>
                    <Table.Cell className="p-2 w-[14%]">
                      {t("text-100")}
                    </Table.Cell>
                    <Table.Cell className="p-2 w-[14%]">
                      {t("text-101")}
                    </Table.Cell>
                  </Table.Row>
                  {data.books.map((item, index) => (
                    <Table.Row key={index} className="border">
                      <Table.Cell className="w-[58%] text-[#0a0a0a] flex gap-2 items-center">
                        <div className="bg-black w-[80px]">
                          <img
                            src={item.imageUrls[0]}
                            alt="anh"
                            className="min-w-[80px] h-[80px] object-contain"
                          />
                        </div>
                        <div className="">{item.title}</div>
                      </Table.Cell>
                      <Table.Cell className="p-2 w-[14%]">
                        {formatNumber(item.price)}
                      </Table.Cell>
                      <Table.Cell className="pl-10 p-2 w-[14%]">
                        {item.quantity}
                      </Table.Cell>
                      <Table.Cell className="p-2 w-[14%]">
                        {formatNumber(item.price * item.quantity)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div className="flex flex-row bg-gray-50 px-5 py-8 gap-5 border-b">
              <div className="flex items-center gap-3 outline-none border-none w-[50%]">
                <span>{t("text-102")}:</span>
                <TextInput
                  disabled
                  value={data.note}
                  className="flex-1"
                  id="email1"
                  type="email"
                  placeholder="Luư ý cho người bán"
                />
              </div>
              <div className="flex items-center gap-3 outline-none border-none w-[50%]">
                <span>{t("text-103")}:</span>
                <Select value={data.shipment} disabled>
                  <option value={1}>{t("text-104")}</option>
                  <option value={2}>{t("text-105")}</option>
                </Select>
              </div>
            </div>
            <div className="flex flex-row bg-gray-50 px-5 py-4 gap-5 border-b justify-end items-center">
              <span className="text-sm text-gray-500">
                {t("text-106")} ({data.books.length} {t("text-107")}
                ):
              </span>
              <span className="text-xl text-[#cd5f5f] font-semibold">
                {formatNumber(data.total)}
              </span>
            </div>
          </div>
          <div className="bg-white max-w-[1100px] mx-auto mt-5">
            <div className="flex justify-between items-center p-5 border-b">
              <div className="">{t("text-108")}</div>
              <Select value={data.payment} disabled>
                <option value={1}>{t("text-109")}</option>
                <option value={2}>{t("text-110")}</option>
              </Select>
            </div>
            <div className="flex justify-end p-5 border-b">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center w-[300px]">
                  <span className="text-sm text-gray-500">{t("text-111")}</span>
                  <span className="text-md">{formatNumber(data.total)}</span>
                </div>
                <div className="flex justify-between items-center w-[300px]">
                  <span className="text-sm text-gray-500">{t("text-112")}</span>
                  <span className="text-md">{formatNumber(30000)}</span>
                </div>
                <div className="flex justify-between items-center w-[300px]">
                  <span className="text-sm text-gray-500">{t("text-113")}</span>
                  <span className="text-xl text-[#cd5f5f] font-semibold">
                    {formatNumber(data.total + 30000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {data.status === "Completed" && (
            <div className="bg-white max-w-[1100px] mx-auto mt-5 p-5">
              <div className="mb-3">{t("text-114")}</div>
              <div className="flex flex-col gap-3">
                {comments.length > 0 &&
                  comments.map((comment, index) => (
                    <div key={index} className="border p-3 rounded">
                      <div className="flex items-center justify-start gap-2 mb-2">
                        <div className="text-[16px]">{comment.username}</div>
                        <div className="text-[16px]">{comment.nameBook}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Rating>
                          {[1, 2, 3, 4, 5].map((star, key) => (
                            <Rating.Star
                              key={key}
                              filled={star <= comment.rating}
                              onClick={() => handleRatingChange(index, key + 1)}
                              className="cursor-pointer"
                            />
                          ))}
                        </Rating>
                        <textarea
                          disabled={!isWithin24Hours(data.createdAt)}
                          placeholder="Nhập đánh giá của sản phẩm"
                          rows={2}
                          type="text"
                          value={comment.comment}
                          onChange={(e) => {
                            const cloneComent = [...comments];
                            cloneComent[index].comment = e.target.value;
                            setComments(cloneComent);
                          }}
                          className="w-full rounded focus:outline-none border-[#A8B6E2] text-sm"
                        />
                      </div>
                    </div>
                  ))}
              </div>
              {isWithin24Hours(data.createdAt) && (
                <div className="flex justify-end mt-5" onClick={handleSubmit}>
                  <button
                    type="button"
                    className="bg-[#d76e6e] py-2 px-4 rounded text-white"
                  >
                    Đánh giá
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetail;
