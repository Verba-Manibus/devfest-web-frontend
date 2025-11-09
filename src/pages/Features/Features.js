import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      title: 'Phiên dịch Real-time',
      desc: 'Sử dụng webcam để gửi frames đến backend và nhận bản dịch chữ viết ngay lập tức.'
    },
    {
      title: 'Lịch sử hội thoại',
      desc: 'Lưu nhanh các từ/đoạn đã dịch để tham khảo sau này.'
    },
    {
      title: 'Giao diện hướng dẫn',
      desc: 'Giao diện dành cho người dùng và cán bộ dịch vụ để dễ dàng tương tác.'
    },
    {
      title: 'Mở rộng tương lai',
      desc: 'Hỗ trợ đa ngôn ngữ ký hiệu, dịch ngược sang giọng nói và tích hợp với các nền tảng công cộng.'
    }
  ];

  return (
    <main className="page-content container features-page">
      <h2>Tính năng chính</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Features;
