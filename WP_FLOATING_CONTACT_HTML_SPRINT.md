# SPRINT: VANNILA HTML/CSS/JS FLOATING CONTACT (CHO WORDPRESS FLATSOME)
**Role:** Expert UI/UX Specialist & Frontend Developer
**Objective:** Cung cấp giải pháp Native thuần túy (Không Plugin, Không jQuery, Không thư viện ngoài), chỉ cần Copy-Paste. Tối ưu cực độ cho nền tảng WordPress Flatsome.

---

## MÃ NGUỒN TÍCH HỢP (ALL-IN-ONE)
Bạn lấy ĐOẠN CODE DUY NHẤT này (Bao gồm thẻ `<style>`, `<div>` và `<script>`) dán thẳng vào mục:
👉 **Flatsome > Advanced > Global Settings > Footer Scripts**
*(Hoặc dán vào thẻ **[ux_html]** bằng UX Builder tại Footer).*

```html
<!-- ================================================== -->
<!-- KHỞI TẠO: HAILAM EC FLOATING CONTACT WIDGET        -->
<!-- ================================================== -->

<style>
  /* 1. Reset & Scoped Container */
  .hailam-widget-container {
    position: fixed;
    /* CHÚ Ý: Đổi bottom thành 80px nếu mobile của bạn có thanh menu bar dính ở đáy */
    bottom: 24px; 
    right: 24px;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  /* 2. Style Bảng Tuỳ chọn Liên hệ */
  .hailam-options {
    display: flex;
    flex-direction: column-reverse; /* Xếp từ dưới lên trên */
    gap: 12px;
    margin-bottom: 16px;
    visibility: hidden; /* Sạch sẽ DOM khi đóng */
  }
  .hailam-widget-container.hailam-is-open .hailam-options {
    visibility: visible;
  }

  /* 3. Style Từng Item (Link) */
  .hailam-item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;
    cursor: pointer;
    opacity: 0;
    transform: translateX(20px); /* Animation trượt từ phải(20px) sang trái(0) */
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
  }
  .hailam-widget-container.hailam-is-open .hailam-item {
    opacity: 1;
    transform: translateX(0);
  }

  /* Kịch bản Delays tạo Waterfall effect (Từ dưới lên) */
  /* - Khi ĐÓNG: Xếp delay ngược lại, chạy cùng lúc cũng được nên để delay ngắn */
  .hailam-item.hailam-wa { transition-delay: 120ms; }
  .hailam-item.hailam-email { transition-delay: 90ms; }
  .hailam-item.hailam-call { transition-delay: 60ms; }
  .hailam-item.hailam-messenger { transition-delay: 30ms; }
  .hailam-item.hailam-zalo { transition-delay: 0ms; }

  /* - Khi MỞ: Trượt lên theo thứ tự Zalo > Mess > Call... */
  .hailam-widget-container.hailam-is-open .hailam-item.hailam-wa { transition-delay: 0ms; }
  .hailam-widget-container.hailam-is-open .hailam-item.hailam-email { transition-delay: 40ms; }
  .hailam-widget-container.hailam-is-open .hailam-item.hailam-call { transition-delay: 80ms; }
  .hailam-widget-container.hailam-is-open .hailam-item.hailam-messenger { transition-delay: 120ms; }
  .hailam-widget-container.hailam-is-open .hailam-item.hailam-zalo { transition-delay: 160ms; }

  /* 4. Vòng tròn Icon của Item */
  .hailam-item-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }
  .hailam-item:hover .hailam-item-icon {
    transform: scale(1.1);
  }
  .hailam-item-icon svg {
    width: 24px;
    height: 24px;
    fill: #ffffff;
  }

  /* 5. Tooltip (Chỉ hiện trên Desktop) */
  .hailam-tooltip {
    margin-right: 14px;
    background: rgba(17, 24, 39, 0.95);
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    position: relative;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    pointer-events: none; /* Tránh click nhầm đè lên link */
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  .hailam-tooltip::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -5px;
    transform: translateY(-50%);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid rgba(17, 24, 39, 0.95);
  }
  .hailam-item:hover .hailam-tooltip {
    opacity: 1;
    transform: translateX(0);
  }

  /* 6. Main Button Nút Nhấn Nổi (Primary) */
  .hailam-main-btn {
    width: 60px;
    height: 60px;
    background-color: #1a365d; /* LK Deep Blue */
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(26, 54, 93, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    transition: background 0.3s ease;
    padding: 0;
  }
  .hailam-main-btn:focus {
    outline: none;
  }
  .hailam-main-btn:hover {
    background-color: #112644;
  }

  /* Hỗ trợ hiển thị SVGs Icon đóng / mở */
  .hailam-icon-msg, .hailam-icon-close {
    position: absolute;
    width: 30px;
    height: 30px;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .hailam-icon-msg {
    fill: #ffffff;
    transform: rotate(0) scale(1);
    opacity: 1;
  }
  .hailam-icon-close {
    stroke: #ffffff;
    stroke-width: 2.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transform: rotate(-90deg) scale(0);
    opacity: 0;
  }
  .hailam-widget-container.hailam-is-open .hailam-icon-msg {
    transform: rotate(90deg) scale(0);
    opacity: 0;
  }
  .hailam-widget-container.hailam-is-open .hailam-icon-close {
    transform: rotate(0) scale(1);
    opacity: 1;
  }

  /* 7. Hiệu ứng Pulse Ring Vòng Toả */
  .hailam-pulse {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: #1a365d;
    border-radius: 50%;
    z-index: -1;
    animation: hailam-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .hailam-widget-container.hailam-is-open .hailam-pulse {
    display: none; /* Tắt pulse khi mở */
  }
  @keyframes hailam-ping {
    0% { transform: scale(1); opacity: 0.6; }
    75%, 100% { transform: scale(1.6); opacity: 0; }
  }

  /* 8. Palette Setup Color */
  .hailam-bg-wa { background-color: #25D366; }
  .hailam-bg-email { background-color: #D32F2F; }
  .hailam-bg-call { background-color: #0AE340; }
  .hailam-bg-messenger { background-color: #0084ff; }
  .hailam-bg-zalo { background-color: #0068ff; }

  /* 9. Responsive Mobile Adjustments */
  @media (max-width: 768px) {
    .hailam-widget-container {
      bottom: 20px; 
      right: 15px; 
    }
    .hailam-tooltip {
      display: none !important; /* Ẩn toàn bộ tooltip trên Mobile */
    }
    .hailam-main-btn { width: 56px; height: 56px; }
    .hailam-item-icon { width: 44px; height: 44px; }
    .hailam-item-icon svg { width: 22px; height: 22px; }
    .hailam-icon-msg, .hailam-icon-close { width: 26px; height: 26px; }
  }
</style>

<div id="hailam-floating-widget" class="hailam-widget-container">
  
  <div class="hailam-options">
    <!-- CẤU TRÚC: Từ dưới lên (Phần tử trên cùng trong code là ở phần thấp nhất gần nút chính) -->

    <!-- XÓA KHỐI DƯỚI ĐÂY NẾU KHÔNG DÙNG WHATSAPP -->
    <a href="https://wa.me/84364518980" target="_blank" rel="noopener noreferrer" class="hailam-item hailam-wa">
      <span class="hailam-tooltip">WhatsApp</span>
      <div class="hailam-item-icon hailam-bg-wa">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </div>
    </a>
    <!-- ============================================== -->

    <!-- EMAIL -->
    <a href="mailto:info@hailamec.com" class="hailam-item hailam-email">
      <span class="hailam-tooltip">Tính Toán & Báo Giá (Email)</span>
      <div class="hailam-item-icon hailam-bg-email">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </div>
    </a>

    <!-- CALL / ĐIỆN THOẠI -->
    <a href="tel:+84364518980" class="hailam-item hailam-call">
      <span class="hailam-tooltip">Gọi Đường Dây Nóng Kỹ Thuật</span>
      <div class="hailam-item-icon hailam-bg-call">
        <svg viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/></svg>
      </div>
    </a>

    <!-- MESSENGER -->
    <a href="https://m.me/hailamengineering" target="_blank" rel="noopener noreferrer" class="hailam-item hailam-messenger">
      <span class="hailam-tooltip">Messenger</span>
      <div class="hailam-item-icon hailam-bg-messenger">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.34 5.59 3.58 7.42v3.63c0 .39.42.63.76.43l3.32-1.82c.75.2 1.54.31 2.34.31 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.09 13.11l-2.79-3-4.99 3 5.46-5.83 2.87 3 4.91-3-5.46 5.83z"/></svg>
      </div>
    </a>

    <!-- ZALO -->
    <a href="https://zalo.me/0364518980" target="_blank" rel="noopener noreferrer" class="hailam-item hailam-zalo">
      <span class="hailam-tooltip">Zalo (Kỹ sư trưởng Dương Toán)</span>
      <div class="hailam-item-icon hailam-bg-zalo">
        <svg viewBox="0 0 24 24"><path d="M21.547 13.061c-.551 4.549-4.225 6.44-8.083 6.44-1.353 0-2.614-.249-3.766-.757l-4.717 1.341c-.482.137-.916-.27-.791-.74l.872-3.237c-1.34-1.393-2.128-3.327-2.128-5.46 0-4.636 4.02-8.397 8.981-8.397 4.887 0 8.847 3.593 9.632 8.16.037.215.064.433.064.65h-.064zM6.924 10.373h2.646c.162 0 .294-.132.294-.294V9.67c0-.162-.132-.294-.294-.294H5.975c-.162 0-.294.132-.294.294v4.321c0 .162.132.294.294.294h3.693c.162 0 .294-.132.294-.294v-.409c0-.162-.132-.294-.294-.294H6.924v-2.915zm4.819 2.506c0 .324.263.588.588.588h1.22c.325 0 .588-.264.588-.588v-.409c0-.324-.263-.588-.588-.588h-.633V10.74h.633c.325 0 .588-.264.588-.588V9.743c0-.324-.263-.588-.588-.588h-1.22c-.325 0-.588.264-.588.588v3.136zm3.328 0c0 .324.264.588.588.588h1.834c.325 0 .588-.264.588-.588v-.409c0-.324-.263-.588-.588-.588h-.826v-2.148h.826c.325 0 .588-.264.588-.588V9.743c0-.324-.263-.588-.588-.588h-1.834c-.325 0-.588.264-.588.588v3.136zm2.497 0c0 .324.264.588.588.588h.409c.324 0 .588-.264.588-.588V9.743c0-.324-.264-.588-.588-.588h-.409c-.324 0-.588.264-.588.588v3.136z"/></svg>
      </div>
    </a>
  </div>

  <!-- Nút Float Chính -->
  <button id="hailam-main-btn" class="hailam-main-btn" aria-label="Hiện công cụ tư vấn">
    <span class="hailam-pulse"></span>
    <!-- SVG Icon Message -->
    <svg class="hailam-icon-msg" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
    <!-- SVG Icon Close (X) -->
    <svg class="hailam-icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
  
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var widgetContainer = document.getElementById('hailam-floating-widget');
    var mainBtn = document.getElementById('hailam-main-btn');
    var optionLinks = document.querySelectorAll('.hailam-item');

    // Mở / Đóng Widget khi click button chính
    mainBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Không trigger click ra ngoài
      widgetContainer.classList.toggle('hailam-is-open');
    });

    // Tự động thu gọn khi bấm vào một tuỳ chọn liên hệ
    optionLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        widgetContainer.classList.remove('hailam-is-open');
      });
    });

    // Bấm ra ngoài vùng => Đóng widget
    document.addEventListener('click', function(e) {
      if (widgetContainer.classList.contains('hailam-is-open')) {
        if (!widgetContainer.contains(e.target)) {
          widgetContainer.classList.remove('hailam-is-open');
        }
      }
    });

    // Nhấn phím Mũi tên Escape (ESC) => Đóng widget
    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape" && widgetContainer.classList.contains('hailam-is-open')) {
        widgetContainer.classList.remove('hailam-is-open');
      }
    });
  });
</script>
<!-- ================================================== -->
```

### 💡 HƯỚNG DẪN DÀNH CHO BẠN:

1. **Tuỳ chỉnh Bottom (nếu bị lấp bởi sticky bar Mobile):** 
   Tìm đoạn CSS `/* CHÚ Ý: Đổi bottom... */` ở dòng 12. Thay đổi `bottom: 24px;` thành `bottom: 70px;` hoặc tuỳ ý nếu giao diện điện thoại của bạn có Bottom Navigation che lấp mất Icon. Bạn chỉnh được độc lập trong đoạn `@media (max-width: 768px)` ở dưới cùng CSS.
2. **Loại bỏ WhatsApp:**
   Tìm dòng chú thích `<!-- XÓA KHỐI DƯỚI ĐÂY NẾU KHÔNG DÙNG WHATSAPP -->` và xóa toàn bộ thẻ `<a>` ngay bên dưới nó. CSS Grid của Flexbox sẽ tự động thu hẹp lại và giữ nguyên hiệu ứng, không phát sinh lỗi.
3. **Cách đổi màu sắc nền hoặc icon:**
   Tất cả mã màu hiện tại được lấy hoàn toàn chuẩn theo thiết kế. Nếu muốn đổi sang màu đỏ LK, tìm đoạn `background-color: #1a365d;` đổi thành `background-color: #D32F2F;`. Mọi hiệu ứng pulse sẽ nương theo màu này.
4. **Vị trí Dán:**
   Nên dán ở phần chèn Script toàn site (Footer Scripts) để đảm bảo nút liên hệ này chạy mượt mà xuyên suốt tất cả các trang B2B của Hải Lam E&C. Không cần phải setup bằng Node packages hay React Component. Khởi chạy tức thì. Tốc độ load ~ 0ms do không yêu cầu Call/Get Network.
