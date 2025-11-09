import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './RealTimeTranslator.css'; // Chúng ta sẽ thêm một ít CSS cho đẹp

// URL của WebSocket server (FastAPI backend)
// Đảm bảo thay đổi localhost và port nếu cần
const WEBSOCKET_URL = 'ws://localhost:8000/ws/translate';

// Tần suất gửi frame (miligiây). 200ms = 5 frames/giây
// Đây là một con số tốt để cân bằng giữa hiệu suất và độ real-time
const FRAME_INTERVAL_MS = 200;

function RealTimeTranslator() {
  const webcamRef = useRef(null);
  const websocketRef = useRef(null);
  const sendIntervalRef = useRef(null); // Dùng để lưu trữ ID của setInterval

  // Trạng thái kết nối
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  // Từ hiện tại đang được dự đoán
  const [currentWord, setCurrentWord] = useState('');

  // Lịch sử cuộc hội thoại
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    // 1. Khởi tạo kết nối WebSocket
    websocketRef.current = new WebSocket(WEBSOCKET_URL);

    websocketRef.current.onopen = () => {
      console.log('WebSocket connected!');
      setConnectionStatus('Connected');
      // 2. Khi kết nối thành công, bắt đầu gửi frames
      startSendingFrames();
    };

    websocketRef.current.onclose = () => {
      console.log('WebSocket disconnected.');
      setConnectionStatus('Disconnected');
      // 3. Ngừng gửi frames khi mất kết nối
      stopSendingFrames();
    };

    websocketRef.current.onmessage = (event) => {
      // 4. Nhận dữ liệu (từ đã dịch) từ server
      const prediction = event.data;

      if (prediction && prediction !== '...') {
        // Nếu là một từ hợp lệ (không phải "im lặng")
        setCurrentWord(prediction); // Hiển thị từ hiện tại

        // Thêm vào lịch sử hội thoại
        // Chỉ thêm nếu từ này khác với từ cuối cùng trong lịch sử
        setMessageHistory((prevHistory) => {
          const lastWord = prevHistory[prevHistory.length - 1];
          if (lastWord !== prediction) {
            return [...prevHistory, prediction];
          }
          return prevHistory;
        });
      } else if (prediction === '...') {
        // Nếu server báo "im lặng"
        setCurrentWord(''); // Xóa từ hiện tại
      }
    };

    websocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    // 5. Hàm dọn dẹp (cleanup) khi component bị unmount
    return () => {
      console.log('Cleaning up...');
      stopSendingFrames(); // Dừng vòng lặp gửi frame
      if (websocketRef.current) {
        websocketRef.current.close(); // Đóng kết nối
      }
    };
  }, []); // Chỉ chạy 1 lần khi component mount

  // Hàm bắt đầu vòng lặp gửi frame
  const startSendingFrames = () => {
    stopSendingFrames(); // Xóa interval cũ (nếu có)
    sendIntervalRef.current = setInterval(() => {
      if (
        webcamRef.current &&
        websocketRef.current &&
        websocketRef.current.readyState === WebSocket.OPEN
      ) {
        // Lấy ảnh base64 từ webcam
        const frame = webcamRef.current.getScreenshot({
          width: 640,
          height: 480,
        });
        
        if (frame) {
          // Gửi frame qua WebSocket
          // Backend sẽ nhận được một chuỗi base64
          websocketRef.current.send(frame);
        }
      }
    }, FRAME_INTERVAL_MS);
  };

  // Hàm dừng vòng lặp gửi frame
  const stopSendingFrames = () => {
    if (sendIntervalRef.current) {
      clearInterval(sendIntervalRef.current);
      sendIntervalRef.current = null;
    }
  };

  // Cấu hình cho webcam
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user',
  };

  return (
    <div className="translator-container">
      <header className="translator-header">
        <h1>Verba Manibus</h1>
        <p>Phiên dịch Ngôn ngữ Ký hiệu Real-time</p>
      </header>

      <div className="content-wrapper">
        {/* Phần Webcam */}
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam-feed"
          />
          <div className={`status-indicator ${connectionStatus.toLowerCase()}`}>
            {connectionStatus}
          </div>
        </div>

        {/* Phần kết quả dịch */}
        <div className="results-container">
          <div className="current-word-box">
            <span className="current-word-label">Đang dịch:</span>
            <span className="current-word">{currentWord || '...'}</span>
          </div>

          <div className="history-box">
            <h3>Hội thoại:</h3>
            <div className="history-log">
              {messageHistory.length === 0 ? (
                <p className="placeholder-text">Lịch sử dịch sẽ xuất hiện ở đây...</p>
              ) : (
                messageHistory.map((word, index) => (
                  <span key={index} className="history-word">{word}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealTimeTranslator;