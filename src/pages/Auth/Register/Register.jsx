import { Label, TextInput } from "flowbite-react";
import BookBG from "../../../../public/book-bg.jpg";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../utils/http";

const Register = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    dob: "",
    phone: "",
    street: "",
    city: "",
  });
  const navigate = useNavigate();
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
      const res = await instance.post("/user/auth/register", undefined, {
        params: state,
      });
      const { success } = res.data;
      if (success) {
        toast.success("Đăng ký thành công", {
          position: "bottom-right",
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
              className="flex w-full flex-col gap-1 px-[80px] rounded-md bg-white mb-5"
              onSubmit={hanldeSubmit}
            >
              <h1 className="text-2xl font-semibold text-center">Đăng ký</h1>
              <div className="flex flex-col max-h-[345px] overflow-auto">
                <div>
                  <div className="mb-2 block">
                    <Label value="Tên tài khoản" />
                  </div>
                  <TextInput
                    className="w-full !focus:border-none"
                    id="email1"
                    type="text"
                    placeholder="Nhập tài khoản"
                    value={state.username}
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
                    type="password"
                    placeholder="Nhập mật khẩu"
                    id="password1"
                    value={state.password}
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Họ và tên" />
                  </div>
                  <TextInput
                    className="w-full !focus:border-none"
                    id="email1"
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={state.fullname}
                    onChange={(e) =>
                      setState({ ...state, fullname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="SDT" />
                  </div>
                  <TextInput
                    className="w-full !focus:border-none"
                    id="email1"
                    type="text"
                    placeholder="Nhập SDT"
                    value={state.phone}
                    onChange={(e) =>
                      setState({ ...state, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Email" />
                  </div>
                  <TextInput
                    placeholder="Nhập email"
                    id="password1"
                    value={state.email}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Quận / huyện" />
                  </div>
                  <TextInput
                    placeholder="Nhập quận / huyện"
                    id="password1"
                    value={state.street}
                    onChange={(e) =>
                      setState({ ...state, street: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Tỉnh / thành phố" />
                  </div>
                  <TextInput
                    placeholder="Nhập tỉnh / thành phố"
                    id="password1"
                    value={state.city}
                    onChange={(e) =>
                      setState({ ...state, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Ngày sinh" />
                  </div>
                  <TextInput
                    placeholder="Nhập ngày sinh"
                    id="password1"
                    value={state.dob}
                    onChange={(e) =>
                      setState({ ...state, dob: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#cd5f5f] p-2 rounded text-white hover:opacity-90"
              >
                Đăng ký
              </button>
            </form>
            <p className="text-xs">
              Bạn đã có tài khoản?{" "}
              <span
                className="cursor-pointer"
                onClick={() => navigate("/login")}
                style={{ textDecoration: "underline" }}
              >
                Đăng nhập
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

export default Register;
