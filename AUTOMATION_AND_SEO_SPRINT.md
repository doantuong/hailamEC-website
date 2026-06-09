# HỆ THỐNG TỰ ĐỘNG HÓA & CHIẾN LƯỢC SEO DOMINATION

## === PHẦN 1: ĐỊNH TUYẾN EMAIL & PHỄU THU THẬP KHÁCH HÀNG (LEAD FUNNEL) ===

### 1. Cấu hình định tuyến 100% Email về info@hailamec.com
- **WPForms:** Truy cập WPForms > All Forms > [Chọn Form] > Settings > Notifications. Tại mục "Send To Email Address", xóa hết và điền cứng: `info@hailamec.com`.
- **WP Mail SMTP:** Truy cập WP Mail SMTP > Settings. Cuộn đến phần Mailer, cấu hình Google/Gmail hoặc SMTP Host (tuỳ chọn của bạn).
- Tại ô **From Email**, nhập `info@hailamec.com` và tích chọn **Force From Email**.
- Tại ô **From Name**, nhập `HAILAMEC Engineering Desk` và tích chọn **Force From Name**.
- Lưu cài đặt và vào tab **Email Test** để thử gửi mail kiểm tra.

### 2. Copywriting cho Lead Magnet Popup (I/O List & Tủ điện chuẩn IEC)
**Tiêu đề:** Tải miễn phí: Checklist thiết kế I/O List & Tủ điện đạt chuẩn IEC
**Mô tả:** Giảm thiểu tới 90% lỗi sai sót trong bóc tách khối lượng và thiết kế phần cứng bảng tủ. Click tải ngay bản PDF & Template Excel độc quyền từ đội ngũ Kỹ sư trưởng Hải Lam E&C.
**Các trường nhập Form:**
- Name / Họ Tên:
- Corporate Email / Email Công Ty:
**Nút Call-To-Action:** DOWLOAD NGAY BỘ CHECKLIST

### 3. Kịch bản Auto-responder (Email song ngữ Anh/Việt)
**Tiêu đề Email:** Your Download: IEC Design Checklist | Tài liệu từ Hải Lam E&C
**Nội dung:**
```html
<p>Dear [Name], / Chào [Name],</p>

<p>Thank you for downloading the <strong>"IEC Control Panel & I/O List Design Checklist"</strong>. You can access your file via the link below:<br>
Cảm ơn bạn đã tải <strong>"Checklist thiết kế I/O List & Tủ điện chuẩn IEC"</strong>. Bạn có thể truy cập tài liệu qua liên kết dưới đây:</p>

<p>🔗 <strong><a href="[LINK_TAI_TAI_LIEU]">Download The Checklist Here / Tải Tài Liệu Tại Đây</a></strong></p>

<p>At <strong>HẢI LAM E&C</strong>, we specialize in high-precision Industrial Automation. If your current project requires expert support in <strong>PLC/SCADA Programming, Turnkey EPC Execution, or Remote Engineering (BIM/CAD/Panel Design)</strong>, our senior engineers are ready to assist.<br>
Tại <strong>HẢI LAM E&C</strong>, chúng tôi chuyên sâu về Tự động hóa Công nghiệp. Nếu dự án hiện tại của bạn cần hỗ trợ về <strong>lập trình PLC/SCADA, tổng thầu EPC hoặc thiết kế kỹ thuật từ xa (Thiết kế tủ điện/BIM/CAD)</strong>, các kỹ sư trưởng của chúng tôi luôn sẵn sàng đồng hành.</p>

<p>Please reply directly to this email at <a href="mailto:info@hailamec.com">info@hailamec.com</a> to schedule a technical consultation.<br>
Vui lòng phản hồi trực tiếp tới <a href="mailto:info@hailamec.com">info@hailamec.com</a> để qua email này nếu cần đặt lịch tư vấn kỹ thuật.</p>

<p>Best regards, / Trân trọng,<br>
<strong>HAILAMEC Engineering Desk</strong><br>
Email: info@hailamec.com | Web: hailamec.com</p>
```

## === PHẦN 2: THỐNG TRỊ TỪ KHÓA TÌM KIẾM (SEO DOMINATION) ===

### 1. Thẻ Meta SEO (Cho Trang chủ)
```html
<title>Hải Lam Engineering & Construction - Chuyên gia Instrument & Control, Tủ Điện, Quan Trắc Môi Trường</title>
<meta name="description" content="Hai Lam Engineering chuyên cung cấp giải pháp Instrument & Control, hệ thống điện, và quan trắc môi trường. Hải Lam E&C là đối tác EPC và Remote Engineering hàng đầu.">
```

### 2. Technical Schema Markup (JSON-LD)
Chèn đoạn mã này vào thẻ `<head>` trong file `header.php`.
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EngineeringBusiness",
      "@id": "https://hailamec.com/#organization",
      "name": "Hải Lam Engineering & Construction",
      "alternateName": [
        "Hai Lam",
        "Hải Lam",
        "Hai Lam Engineering",
        "Hai Lam Engineering & Construction",
        "Hải Lam E&C",
        "HAILAMEC"
      ],
      "url": "https://hailamec.com/",
      "logo": "https://hailamec.com/wp-content/uploads/logo.png",
      "description": "Chuyên gia hàng đầu về Instrument & Control, Tủ Điện, Hệ thống Điện, và Quan Trắc Môi Trường.",
      "email": "info@hailamec.com",
      "telephone": "+84-364-518-980",
      "contactPoint": {
         "@type": "ContactPoint",
         "telephone": "+84-364-518-980",
         "contactType": "Technical Sales & Support",
         "email": "info@hailamec.com"
      },
      "areaServed": "Global",
      "knowsAbout": [
        "Instrument & Control",
        "Quan Trắc Môi Trường",
        "Hệ thống Điện",
        "Tủ Điện",
        "PLC/SCADA",
        "Thiết kế cấu trúc EPC"
      ]
    }
  ]
}
</script>
```

## === PHẦN 3: CHIẾN LƯỢC NỘI DUNG SEO KÉO TRAFFIC (SILO CONTENT) ===

Danh sách 5 tiêu đề Technical Blog đánh thẳng vào tệp B2B (Project Manager, Kỹ sư trưởng):

1. **[Hướng dẫn toàn tập] Tiêu chuẩn thiết kế tủ điện điều khiển MCC & PLC cho hệ thống nhà máy công nghiệp.** *(Từ khóa: tủ điện)*
2. **Hệ thống Instrument & Control (I&C) trong nhà máy: Vai trò, tiêu chuẩn và quy trình hiệu chuẩn thiết bị.** *(Từ khóa: instrument & control)*
3. **Giải pháp tự động hóa hệ thống trạm Quan Trắc Môi Trường (CEMS/WQMS): Quy định pháp lý và cấu trúc mạng truyền dẫn.** *(Từ khóa: quan trắc môi trường)*
4. **Sai lầm thường gặp khi bảo trì, đánh giá chất lượng tủ điện và cách xử lý sự cố thiết bị Instrument & Control.** *(Từ khóa: tủ điện, instrument & control)*
5. **Cấu trúc dữ liệu SCADA cho trạm Quan Trắc Môi Trường tích hợp giám sát năng lượng nhà máy.** *(Từ khóa: quan trắc môi trường)*
