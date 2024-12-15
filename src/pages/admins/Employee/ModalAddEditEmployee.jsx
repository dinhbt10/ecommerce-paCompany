import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../utils/http";

export function ModalAddEditEmployee({
  openModal,
  setOpenModal,
  getDistributor,
}) {
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

  const handleSubmit = async () => {
    const isValid = Object.values(state).every((e) => e);
    if (!isValid) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
    try {
      const res = await instance.post("user/auth/employee/register", null, {
        params: { ...state },
      });

      if (res.data.success) {
        toast.success("Tạo  tài khoản nhân viên thành công");
        await getDistributor();
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thêm nhân viên</Modal.Header>
        <Modal.Body>
          <div className="flex justify-center items-center h-full flex-col relative">
            <form className="flex w-full flex-col gap-1 rounded-md bg-white mb-5">
              <div className="flex flex-col max-h-[345px]">
                <div className="block">
                  <Label value="Tên tài khoản" />
                  <span className="text-red-600">*</span>
                </div>
                <TextInput
                  className="w-full !focus:border-none"
                  id="email1"
                  type="text"
                  placeholder="Nhập tên tài khoản"
                  value={state.username}
                  onChange={(e) =>
                    setState({ ...state, username: e.target.value })
                  }
                />
                <div className="block">
                  <Label value="Mật khẩu" />
                  <span className="text-red-600">*</span>
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
                <div className="block">
                  <Label htmlFor="email1" value="Họ và tên" />
                  <span className="text-red-600">*</span>
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
                <div className="block">
                  <Label htmlFor="email1" value="SDT" />
                  <span className="text-red-600">*</span>
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
                <div className="block">
                  <Label value="Email" />
                  <span className="text-red-600">*</span>
                </div>
                <TextInput
                  placeholder="Nhập email"
                  id="password1"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
                <div className="block">
                  <Label value="Quận / huyện" />
                  <span className="text-red-600">*</span>
                </div>
                <TextInput
                  placeholder="Nhập quận / huyện"
                  id="password1"
                  value={state.street}
                  onChange={(e) =>
                    setState({ ...state, street: e.target.value })
                  }
                />
                <div className="block">
                  <Label value="Tỉnh / thành phố" />
                  <span className="text-red-600">*</span>
                </div>
                <TextInput
                  placeholder="Nhập tỉnh / thành phố"
                  id="password1"
                  value={state.city}
                  onChange={(e) => setState({ ...state, city: e.target.value })}
                />
                <div className="block">
                  <Label value="Ngày sinh" />
                  <span className="text-red-600">*</span>
                </div>
                <TextInput
                  placeholder="Nhập ngày sinh"
                  id="password1"
                  value={state.dob}
                  onChange={(e) => setState({ ...state, dob: e.target.value })}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="outline-none bg-[#d76e6e] py-2 px-4 rounded text-white"
            onClick={handleSubmit}
          >
            Thêm
          </button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
