import Header from "../layout/home/Header.jsx";
import Footer from "./home/Footer.jsx";
import { useLocation } from "react-router-dom";
import { MessageCircleMore, X } from "lucide-react";
import ChatAI from "../../../public/chatbot-icon.svg";
import { useState } from "react";

const MainLayout = (props) => {
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  const [content, setContent] = useState("");
  const { children } = props;

  async function callApi(event) {
    event.preventDefault();
    const inputText = document.getElementById("inputText").value;
    if (!inputText) {
      document.getElementById("response").textContent =
        "Please enter some text.";
      return;
    }
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAb_Eo16wpwQE2t-G-hzVygJeiDz3opLpE",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: inputText }] }],
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Lỗi");
      }
      const data = await response.json();
      const dataResponse = data.candidates[0]?.content?.parts[0]?.text ?? "";
      document.getElementById("response").innerHTML = dataResponse.replace(
        /\n/g,
        "<br>"
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#cd5f5f]">
      <Header />
      <div className="bg-[#f4f4f4] flex-grow pb-5">
        <div>{children}</div>
      </div>
      {location.pathname !== "/cart" && <Footer />}
      <div className="fixed bottom-5 right-5 z-[100]">
        {!showChat && (
          <div
            className="flex items-center justify-start gap-1 bg-[#cd5f5f] py-2 px-4 rounded-lg text-white text-sm cursor-pointer"
            style={{
              backgroundImage:
                "linear-gradient(to left, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
            }}
            onClick={() => {
              setShowChat(true);
            }}
          >
            <MessageCircleMore />
            <span>Chat với AI</span>
          </div>
        )}
        {showChat && (
          <div className="flex flex-col w-[320px]">
            <div
              className="flex items-center justify-between py-3 px-2 rounded-tx-md"
              style={{
                backgroundImage:
                  "linear-gradient(to left, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
              }}
            >
              <div className="flex flex-row justify-start items-center gap-2  text-white">
                <img src={ChatAI} className="w-[40px]" />
                <span>AI BookStore</span>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowChat(false);
                }}
              >
                <X color="#fff" />
              </div>
            </div>
            <div className="bg-white min-h-[400px] max-h-[400px] shadow-slate-500 shadow-md">
              <div className="min-h-[358px] overflow-auto p-2">
                {!content && (
                  <div className="flex min-h-[348px] items-center justify-center flex-col">
                    abc
                  </div>
                )}
              </div>
              <div className="border-t-2">
                <input
                  type="text"
                  className="w-full placeholder:text-sm focus:outline-none focus:ring-0 border-none"
                  placeholder="Nhập tin nhắn..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
