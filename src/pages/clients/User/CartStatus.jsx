import { CgProfile } from "react-icons/cg";
import TabsStatus from "./TabsCartStatus";
import { MdOutlineEventNote } from "react-icons/md";
import PurchaseOrder from "./PurchaseOrder";
import { useContext, useEffect, useState } from "react";
import instance from "../../../utils/http";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../context/app";

const CartStatus = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const { userInfo } = useContext(AppContext);
  const getAllStatus = async () => {
    const res = await instance.get(
      `orders/list/order_user?userId=${userInfo.idUser}`
    );
    const { success, data } = res.data;
    if (success) {
      setData(data);
    }
  };

  const tabData = [
    {
      title: t("text-15"),
      content: <PurchaseOrder data={data} getAllStatus={getAllStatus} />,
      icons: <CgProfile />,
    },
    {
      title: t("text-90"),
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Processing")}
          getAllStatus={getAllStatus}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: t("text-91"),
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Transport")}
          getAllStatus={getAllStatus}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: t("text-92"),
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Waited")}
          getAllStatus={getAllStatus}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: t("text-93"),
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Completed")}
          getAllStatus={getAllStatus}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: t("text-94"),
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Cancel")}
          getAllStatus={getAllStatus}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
    {
      title: t("text-95"),
      content: (
        <PurchaseOrder
          data={data && data.filter((item) => item.status === "Return")}
          getAllStatus={getAllStatus}
        />
      ),
      icons: <MdOutlineEventNote />,
    },
  ];

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
