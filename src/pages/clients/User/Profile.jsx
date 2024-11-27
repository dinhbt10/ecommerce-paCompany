import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/app";
import instance from "../../../utils/http";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo, setRefreshUserInfo } = useContext(AppContext);
  const { t } = useTranslation();
  const [user, setUser] = useState(userInfo);

  const handleSubmit = async () => {
    try {
      const res = await instance.put("/user/auth/update_info", null, {
        params: {
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
        },
      });

      const { success } = res.data;
      if (success) {
        toast.success(t("text-161"), {
          onClose: 1500,
          position: "bottom-right",
        });
        setRefreshUserInfo((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white py-5 px-8 rounded">
      <div className="text-xl">{t("text-77")}</div>
      <div className="text-sm">{t("text-78")}</div>
      <div className="border-b my-5" />
      <div className="flex flex-col ml-10 gap-5">
        <div className="flex flex-row gap-[67px]">
          <div className="text-sm text-[#555555cc]">{t("text-79")}</div>
          <input
            value={user.fullname}
            className="p-1 w-full flex-1"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, fullname: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-row gap-[103px]">
          <div className="text-sm text-[#555555cc]">{t("text-80")}</div>
          <input
            value={user.email}
            className="p-1 w-full flex-1"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-row gap-[53px]">
          <div className="text-sm text-[#555555cc]">{t("text-81")}</div>
          <input
            type="number"
            value={user.phone}
            className="p-1 w-full flex-1"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-row gap-[73px]">
          <div className="text-sm text-[#555555cc]">{t("text-82")}</div>
          <input
            value={user.dob}
            className="p-1 w-full flex-1"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-row justify-end" onClick={handleSubmit}>
          <button className="w-[120px] p-1 rounded bg-[#cd5f5f] text-white hover:opacity-95">
            {t("text-160")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
