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
          data={data && data.filter((item) => item.status === "Processing")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Chở thanh toán",
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Transport")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Chờ giao hàng",
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Waited")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Đã giao",
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Completed")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Huỷ đơn hàng",
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Cancel")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: "Trả hàng/Hoàn tiền",
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Return")}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
  ];
  const userInfo = getUserInfoLocalStorage();
  const getAllStatus = async () => {
    const res = await instance.get(
      `orders/list/order_user?userId=${userInfo.idUser}`
    );
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
