import { useLocation, useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/common";
import { MdOutlineWrongLocation } from "react-icons/md";
import { Select, Table, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import instance from "../../../utils/http";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../context/app";

const Checkout = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [vouchers, setVouchers] = useState([]);
  const [checkout, setCheckout] = useState({
    note: "",
    shipmentId: 1,
    paymentId: 1,
    voucher: undefined,
  });
  const { userInfo } = useContext(AppContext);

  const getUser = async () => {
    try {
      const res = await instance.get(`/vouchers/list`);
      if (typeof res.data.data !== "string") {
        setVouchers(res.data.data.voucher);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const selectedIds = data.map((item) => item.idCart).join(",");
      const res = await instance.post(
        `/orders/create?userId=${userInfo.idUser}&shippingAddress=${
          userInfo.address
        }&selectedCartDetailIds=${selectedIds}&paymentId=${
          checkout.paymentId
        }&shipmentId=${checkout.shipmentId}&phone=${
          userInfo.phone
        }&receivingName=${userInfo.fullname}&note=${checkout.note}&voucher=${
          checkout.voucher === "1122" ? undefined : Number(checkout.voucher)
        }`
      );
      const { success } = res.data;

      if (success) {
        if (checkout.shipmentId === "2") {
          try {
            const total =
              data.length > 1
                ? data.reduce(
                    (a, b) => a.price * a.quantity + b.price * b.quantity
                  )
                : data[0].price * data[0].quantity;

            const resListOrder = await instance.get(
              `/orders/list/order_user?userId=${userInfo.idUser}`
            );
            const { data: dataListOrder, success: successOrder } =
              resListOrder.data;
            if (successOrder) {
              console.log(dataListOrder);

              const idorder = dataListOrder[0].id;
              const res = await instance.post(
                `api/payment/momo?idorder=${idorder}&amount=${total}&orderInfo=test&email=email=${userInfo.email}`
              );
              console.log(res);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          navigate("/user?active=1");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="bg-white">
        <div className="bg-white">
          <div className="flex justify-between items-center max-w-[1100px] mx-auto py-5">
            <div className="text-2xl text-[#cd5f5f] font-semibold">
              {t("text-115")}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto my-3 bg-white px-8 py-6">
        <div className="flex text-xl text-[#cd5f5f] items-center justify-start gap-2 font-medium">
          <MdOutlineWrongLocation /> {t("text-116")}
        </div>
        <div className="flex text-xl text-black items-center justify-start gap-2  mt-3">
          <div className="font-medium">
            {userInfo.fullname} {userInfo.phone}
          </div>
          <p className="text-gray-600">{userInfo.address}</p>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto bg-white">
        <div className="p-10">
          <Table>
            <Table.Body>
              <Table.Row className="bg-white">
                <Table.Cell className="w-[58%] text-[#0a0a0a] font-medium p-2 text-xl">
                  {t("text-117")}
                </Table.Cell>
                <Table.Cell className="p-2 w-[14%]">{t("text-118")}</Table.Cell>
                <Table.Cell className="p-2 w-[14%]">{t("text-119")}</Table.Cell>
                <Table.Cell className="p-2 w-[14%]">{t("text-120")}</Table.Cell>
              </Table.Row>
              {data &&
                data.map((item, index) => (
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
            <span>{t("text-121")}:</span>
            <TextInput
              value={checkout.note}
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  note: e.target.value,
                }))
              }
              className="flex-1"
              id="email1"
              type="email"
              placeholder="Luư ý cho người bán"
            />
          </div>
          <div className="flex items-center gap-3 outline-none border-none w-[50%]">
            <span>{t("text-122")}:</span>
            <Select
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  shipmentId: e.target.value,
                }))
              }
            >
              <option value={1}>{t("text-123")}</option>
              <option value={2}>{t("text-124")}</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row bg-gray-50 px-5 py-4 gap-5 border-b justify-end items-center">
          <span className="text-sm text-gray-500">
            {t("text-125")} ({data.length} {t("text-126")}):
          </span>
          <span className="text-xl text-[#cd5f5f] font-semibold">
            {formatNumber(
              data.length > 1
                ? data.reduce(
                    (a, b) => a.price * a.quantity + b.price * b.quantity
                  )
                : data[0].price * data[0].quantity
            )}
          </span>
        </div>
      </div>
      <div className="bg-white max-w-[1100px] mx-auto mt-5">
        <div className="flex justify-between items-center p-5 border-b">
          <div className="">{t("text-127")}</div>
          <Select
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                shipmentId: e.target.value,
              }))
            }
          >
            <option value={1}>{t("text-128")}</option>
            <option value={2}>{t("text-129")}</option>
          </Select>
        </div>
        <div className="flex justify-end px-5 py-3">
          <div className="flex justify-between items-center gap-1">
            <Select
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  voucher: e.target.value,
                }))
              }
            >
              <option value={1122}>{t("text-162")}</option>
              {vouchers.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.code} : {t("text-163")} {item.discount}%
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex justify-end px-5 pb-5 border-b">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center w-[300px]">
              <span className="text-sm text-gray-500">{t("text-130")}</span>
              <span className="text-md">
                {formatNumber(
                  data.length > 1
                    ? data.reduce(
                        (a, b) => a.price * a.quantity + b.price * b.quantity
                      )
                    : data[0].price * data[0].quantity
                )}
              </span>
            </div>
            <div className="flex justify-between items-center w-[300px]">
              <span className="text-sm text-gray-500">{t("text-132")}</span>
              <span className="text-xl text-[#cd5f5f] font-semibold">
                {formatNumber(
                  data.length > 1
                    ? data.reduce(
                        (a, b) => a.price * a.quantity + b.price * b.quantity
                      )
                    : data[0].price * data[0].quantity
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <div className="text-sm text-gray-500">{t("text-133")}</div>
          <button
            className="bg-[#cd5f5f] w-[200px] p-2 rounded-sm text-white"
            onClick={handleSubmit}
          >
            {t("text-134")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
