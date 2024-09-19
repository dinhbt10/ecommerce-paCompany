import { Button, Label, TextInput } from "flowbite-react";

const Login = () => {
  return (
    <div
      className="flex justify-center items-center h-[100vh] w-[100wh] bg-cover "
      style={{
        backgroundImage:
          "url('https://www.ultraimagehub.com/wallpapers/tr:flp-false,gx-0.5,gy-1,q-75,rh-3264,rw-5824,th-1080,tw-1920/1272560257041694853.jpeg')",
      }}
    >
      <form className="flex w-[500px] flex-col gap-4 border-2 border-[#2e2727f] p-10 rounded-md bg-white">
        <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Tài khoản" />
          </div>
          <TextInput
            className="w-full"
            id="email1"
            type="text"
            placeholder="Nhập tài khoản"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Mật khẩu" />
          </div>
          <TextInput
            placeholder="Nhập mật khẩu"
            id="password1"
            type="password"
            required
          />
        </div>
        <Button type="submit">Đăng nhập</Button>
      </form>
    </div>
  );
};

export default Login;
