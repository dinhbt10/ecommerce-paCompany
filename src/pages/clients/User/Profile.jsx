import { useTranslation } from "react-i18next";
import { getUserInfoLocalStorage } from "../../../utils/common";

const Profile = () => {
  const userInfo = getUserInfoLocalStorage();
  const { t } = useTranslation();

  return (
    <div className="bg-white py-5 px-8 rounded">
      <div className="text-xl">{t("text-77")}</div>
      <div className="text-sm">{t("text-78")}</div>
      <div className="border-b my-5" />
      <div className="flex flex-col ml-10 gap-5">
        <div className="flex flex-row gap-[42px]">
          <div className="text-sm text-[#555555cc]">{t("text-79")}</div>
          <div className="text-sm">{userInfo.username}</div>
        </div>
        <div className="flex flex-row gap-[103px]">
          <div className="text-sm text-[#555555cc]">{t("text-80")}</div>
          <div className="text-sm">{userInfo.email}</div>
        </div>
        <div className="flex flex-row gap-[53px]">
          <div className="text-sm text-[#555555cc]">{t("text-81")}</div>
          <div className="text-sm">{userInfo.phone}</div>
        </div>
        <div className="flex flex-row gap-[73px]">
          <div className="text-sm text-[#555555cc]">{t("text-82")}</div>
          <div className="text-sm">{userInfo.dob}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
