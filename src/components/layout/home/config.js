// Hàm lắng nghe giọng nói và chuyển đổi thành văn bản
export function startSpeechRecognition(onResult, onEnd) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Trình duyệt không hỗ trợ Web Speech API.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "vi-VN";

  // Xử lý kết quả nhận được và truyền qua callback onResult
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    onResult(transcript); // Gọi callback onResult để xử lý văn bản
  };

  // Khi quá trình lắng nghe kết thúc
  recognition.onend = () => {
    onEnd(); // Gọi callback onEnd để cập nhật trạng thái
  };

  // Bắt đầu lắng nghe
  recognition.start();
  return recognition; // Trả về đối tượng recognition để dừng khi cần
}
