import React from 'react';
import './Home.css';
// Gợi ý: Cài đặt react-icons để có icon đẹp
// npm install react-icons
import { FaCamera } from 'react-icons/fa';
import { BsChatDotsFill, BsBookFill, BsPhoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="page-content container home-page">
      {/* SECTION: HERO */}
      <section className="hero">
        <h2>Verba Manibus</h2>
        <h1 className="hero-title">
          Dịch Ngôn ngữ Ký hiệu. <br />
          Kết nối Thế giới.
        </h1>
        <p className="lead">
          Giải pháp AI real-time phá bỏ rào cản giao tiếp, mang cộng đồng người khiếm thính và
          người nghe đến gần nhau hơn.
        </p>
        <div className="hero-cta">
          {/* Bạn có thể link đến trang /app hoặc /demo */}
          <Link className="btn btn-primary btn-large" to="/translator">
            Thử nghiệm Bản dịch <FaCamera style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>

      {/* SECTION: TÍNH NĂNG CHÍNH */}
      <section className="features-section">
        <h3>Tính năng chính</h3>
        <p className="section-lead">Một bộ công cụ toàn diện để hỗ trợ giao tiếp hàng ngày.</p>
        <div className="features-grid">
          <div className="feature-card">
            <BsChatDotsFill className="feature-icon" />
            <h4>Phiên dịch Real-time</h4>
            <p>
              Sử dụng camera của bạn để dịch trực tiếp các ký hiệu sang văn bản với độ trễ
              gần như bằng không.
            </p>
          </div>
          <div className="feature-card">
            <BsBookFill className="feature-icon" />
            <h4>Từ điển Ký hiệu</h4>
            <p>
              Một thư viện video phong phú cho phép tra cứu, học và thực hành các ký hiệu
              cơ bản đến nâng cao.
            </p>
          </div>
          <div className="feature-card">
            <BsPhoneFill className="feature-icon" />
            <h4>Hỗ trợ Đa nền tảng</h4>
            <p>
              Hoạt động mượt mà trên cả trình duyệt web (PC, Mobile) và ứng dụng di động
              chuyên dụng (sắp ra mắt).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: BÀI TOÁN GIẢI QUYẾT (Giữ nguyên) */}
      <section className="mission">
        <h3>Bài toán chúng tôi giải quyết</h3>
        <ul className="problem-list">
          <li>Phá bỏ rào cản giao tiếp giữa người khiếm thính và cộng đồng nghe.</li>
          <li>Hỗ trợ trong y tế, hành chính, giáo dục và tình huống khẩn cấp.</li>
          <li>Tạo cơ hội việc làm và thúc đẩy hòa nhập xã hội.</li>
        </ul>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="how-it-works">
        <h3>Nó hoạt động như thế nào?</h3>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Mở Camera</h4>
            <p>Cho phép ứng dụng truy cập camera trên thiết bị của bạn.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Thực hiện Ký hiệu</h4>
            <p>Đứng trước camera và thực hiện ký hiệu một cách rõ ràng.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Nhận Văn bản</h4>
            <p>Hệ thống AI sẽ phân tích và hiển thị văn bản dịch ngay lập tức.</p>
          </div>
        </div>
      </section>

      {/* SECTION: CALL TO ACTION (Cuối trang) */}
      <section className="call-to-action">
        <h3>Sẵn sàng để phá bỏ mọi rào cản?</h3>
        <p>Khám phá cách Verba Manibus thay đổi cuộc sống và công việc hàng ngày.</p>
        <button className="btn btn-secondary">Tìm hiểu thêm về Tác động</button>
      </section>
    </main>
  );
}

export default Home;
