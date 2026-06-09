# SPRINT: AUTOMATED LEAD FUNNEL & EMAIL ROUTING
**Role:** Chief Strategy Architect & Lead Automation Engineer
**Objective:** Seamlessly integrate WordPress (Flatsome) with Make.com/Zapier, funnel all B2B data to `info@hailamec.com`, and deploy a high-trust auto-responder.

---

## 1. CẤU TRÚC FORM B2B CHUẨN (WORDPRESS)
Tạo Form này trong WPForms hoặc Contact Form 7.

**Các trường dữ liệu (Fields) bắt buộc:**
- `First & Last Name` (Single Line Text - Required)
- `Job Title` (Single Line Text - Required)
- `Company Name` (Single Line Text - Required)
- `Corporate Email` (Email - Required)
- `Country / Region` (Single Line Text - Required)
- `Project Type / Required Service` (Dropdown - Required)
- `Technical Requirements / Project Scope` (Paragraph Text - Required)

**Gợi ý Dropdown cho trường `Project Type`:**
1. PLC/SCADA Architecture & Programming (Outsource)
2. Remote CAD Drafting & Revit 3D/BIM (Outsource)
3. Electrical Panel Design & Shop Drawings (Outsource)
4. Turnkey Local EPC Execution (Vietnam)
5. Instrumentation, CEMS & WQMS
6. Maintenance & Plant Reliability
7. General Engineering Consultation

---

## 2. HƯỚNG DẪN CẤU HÌNH MAKE.COM (STEP-BY-STEP)

**Bước 1: Tạo Custom Webhook (Hứng Data từ Website)**
1. Đăng nhập Make.com, tạo một **New Scenario**.
2. Thêm Module đầu tiên: Tìm kiếm **Webhooks** -> Chọn **Custom Webhook**.
3. Nhấn **Add**, đặt tên là `HAILAMEC B2B Lead Form`.
4. Nhấn **Save** và sao chép đường link URL xuất hiện (VD: `https://hook.eu1.make.com/...`).
5. Vào WordPress, dán Webhook URL này vào cài đặt của WPForms (tab Webhooks) hoặc Contact Form 7 (cần cài plugin CF7 to Webhook).
6. Ra ngoài trang web, điền thử một form gửi đi. Trên Make sẽ báo chữ xanh `"Successfully determined"` -> Make đã nhận được cấu trúc data.

**Bước 2: Cấu hình gửi Email Nội Bộ (Tới Kỹ sư trưởng)**
1. Bấm nút dấu `+` nối vào Webhook, tìm module **Email** (Hoặc Gmail/Outlook) -> Chọn **Send an email**.
2. **To:** Điền cứng `info@hailamec.com`.
3. **Subject:** Gõ `[NEW B2B LEAD] - ` rồi kéo thả biến "Company Name" và "Project Type" từ Webhook vào hộp thoại. Dạng: `[NEW B2B LEAD] - {{Company Name}} - {{Project Type}}`.
4. **Content Type:** Đổi thành **HTML**.
5. Dán đoạn Code HTML ở phần (3) bên dưới vào ô Content (nhớ thay các biến `{{...}}` bằng biến thực tế từ Webhook). 

**Bước 3: Cấu hình gửi Email Auto-Responder (Tới Khách hàng)**
1. Bấm dấu `+` tiếp theo tạo thêm một Module **Email** -> **Send an email**.
2. **To:** Kéo thả biến `{{Corporate Email}}` mà khách vừa điền vào.
3. **Subject:** Điền `Your Engineering Request Received | HAILAMEC Technical Desk`.
4. **Content Type:** **HTML**.
5. Dán phần nội dung Auto-Responder ở phần (4) vào ô Content (thay biến Name).
6. Nhấn nút Run Once để test thử toàn bộ luồng, sau đó gạt công tắc góc trái sang **ON** để tự động hoá vĩnh viễn.

---

## 3. HTML TEMPLATE CHO EMAIL NỘI BỘ (Chuyển tiếp về info@hailamec.com)
*Lưu ý: Thay thế các phần `{{...}}` bằng các biến dữ liệu map từ webhooks của Make.com*

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; color: #1e293b;">
    <div style="background-color: #2F423B; padding: 20px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px;">🚨 NEW ENGINEERING LEAD CAPTURED</h2>
    </div>
    <div style="padding: 20px; background-color: #f8fafc;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold; width: 35%;">Client Name:</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1;">{{Full Name}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold;">Job Title:</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1;">{{Job Title}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold;">Company:</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1;">{{Company Name}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold;">Country / Region:</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1;">{{Country}}</td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold;">Email:</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1;"><a href="mailto:{{Corporate Email}}" style="color: #2563eb; text-decoration: none;">{{Corporate Email}}</a></td>
            </tr>
            <tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold;">Project Type:</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">{{Project Type}}</td>
            </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: white; border: 1px solid #cbd5e1; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <p style="margin-top: 0; font-weight: bold; font-size: 13px; color: #64748b; text-transform: uppercase;">Technical Requirements / Scope:</p>
            <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">{{Technical Requirements}}</p>
        </div>
        <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:{{Corporate Email}}" style="background-color: #2563eb; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Reply to Client</a>
        </div>
    </div>
</div>
```

---

## 4. NỘI DUNG AUTO-RESPONDER (Gửi cho khách hàng B2B)
*Tone: Chuyên nghiệp, thẩm quyền, tạo sự yên tâm cho đối tác Global. Chọn định dạng HTML trong Make.com và dán nội dung này vào.*

```html
<p>Dear {{Full Name}},</p>

<p>Thank you for reaching out to the <strong>HẢI LAM E&C Engineering Desk</strong>. We have officially received your technical inquiry regarding <strong>{{Project Type}}</strong> on behalf of {{Company Name}}.</p>

<p>Our Principal Engineers are currently reviewing the scope of your request. A designated technical specialist will respond to you shortly to schedule an initial consultation or provide a bespoke technical proposal based on your requirements.</p>

<p>Should you have any immediate architectural drawings, BOQ documents, or P&ID schematics you wish to share prior to our technical review, please feel free to reply directly to this email or forward them to <a href="mailto:info@hailamec.com">info@hailamec.com</a>.</p>

<p>We look forward to demonstrating how our scalable engineering solutions can bring exceptional value and precision to your upcoming projects.</p>

<p>Best regards,</p>

<br>

<p><strong>The Engineering Team</strong></p>

<hr style="border: none; border-top: 1px solid #cbd5e1; margin: 25px 0;">

<p style="font-size: 12px; color: #475569; line-height: 1.6; font-family: Arial, sans-serif;">
<strong style="color: #2F423B; font-size: 13px;">HẢI LAM ENGINEERING & CONSTRUCTION CO., LTD</strong><br>
<em>Industrial Automation & Global Remote Engineering Partner</em><br><br>
📍 Verosa Park, 39 Street 10, Thu Duc City, Ho Chi Minh City, Vietnam<br>
📞 (+84) 364 518 980<br>
📧 <a href="mailto:info@hailamec.com" style="color: #2563eb; text-decoration: none;">info@hailamec.com</a><br>
🌐 <a href="https://hailamec.com" style="color: #2563eb; text-decoration: none;">www.hailamec.com</a>
</p>
```
