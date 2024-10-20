import { CgProfile } from "react-icons/cg";
import TabsStatus from "./TabsCartStatus";
import { MdOutlineEventNote } from "react-icons/md";
import PurchaseOrder from "./PurchaseOrder";
import { useEffect, useState } from "react";
import { getUserInfoLocalStorage } from "../../../utils/common";
import instance from "../../../utils/http";

const CartStatus = () => {
  const [data, setData] = useState([]);
  const tabData = [
    {
      title: "Tất cả",
      content: <PurchaseOrder data={data} />,
      icons: <CgProfile />,
    },
    {
      title: "Chở xác nhận",
      content: (
        <PurchaseOrder
          data={data.filter((item) => item.status === "Pending")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Chở thanh toán",
      content: "Đang phát triển",
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Chờ giao hàng",
      content: "Đang phát triển",
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Đã giao",
      content: "Đang phát triển",
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Huỷ đơn hàng",
      content: "Đang phát triển",
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Trả hàng/Hoàn tiền",
      content: "Đang phát triển",
      icons: <MdOutlineEventNote />,
    },
  ];
  const userInfo = getUserInfoLocalStorage();
  const getAllStatus = async () => {
    const res = await instance.get(`orders/list?userId=${userInfo.idUser}`);
    const { success, data } = res.data;
    if (success) {
      setData(data);
    }
  };

  useEffect(() => {
    getAllStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full">
      <TabsStatus tabs={tabData} data={data} />
    </div>
  );
};

export default CartStatus;
