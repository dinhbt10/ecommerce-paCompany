import { Label, TextInput } from "flowbite-react";
import BookBG from "../../../../public/book-bg.jpg";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../utils/http";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const hanldeSubmit = async (e) => {
    let allFieldsValid = true;

    e.preventDefault();
    Object.values(state).forEach((item) => {
      if (item === "") {
        allFieldsValid = false;
      }
    });

    if (!allFieldsValid) {
      toast.error("Vui lòng kiểm tra lại dữ liệu", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
    if (allFieldsValid) {
      const res = await instance.post("/user/auth/login-token", undefined, {
        params: state,
      });
      const { success, data } = res.data;
      if (success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error("Tài khoản hoặc mật khẩu không chính xác", {
          position: "bottom-right",
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(203,124,124,0.7) 25%, rgba(236,81,81,0.7) 100%)",
      }}
    >
      <div className="grid grid-cols-2 bg-white h-[80vh] w-3/4 rounded-xl">
        <div className="col-span-1">
          <img
            src={BookBG}
            alt="book-bg"
            className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
          />
        </div>
        <div className="col-span-1">
          <div className="flex justify-center items-center h-full flex-col relative">
            <form
              className="flex w-full flex-col gap-3 px-[80px] rounded-md bg-white mb-5 "
              onSubmit={hanldeSubmit}
            >
              <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Tên tài khoản" />
                </div>
                <TextInput
                  value={state.username}
                  className="w-full !focus:border-none"
                  id="email1"
                  type="text"
                  placeholder="Nhập tài khoản"
                  onChange={(e) =>
                    setState({ ...state, username: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Mật khẩu" />
                </div>
                <TextInput
                  placeholder="Nhập mật khẩu"
                  value={state.password}
                  id="password1"
                  type="password"
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-[#cd5f5f] p-2 rounded text-white hover:opacity-90"
              >
                Đăng nhập
              </button>
            </form>
            <p className="text-xs">
              Bạn đã có tài khoản?{" "}
              <span
                className="cursor-pointer"
                onClick={() => navigate("/register")}
                style={{ textDecoration: "underline" }}
              >
                Đăng ký
              </span>
            </p>
            <MdCancel
              className="absolute top-4 right-4 text-xl cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
