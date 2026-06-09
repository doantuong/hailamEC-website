# SPRINT 1: AI LEAD GENERATION ASSISTANT FLOW
**Role:** Kỹ sư Sales Kỹ thuật số (Digital Technical Sales Engineer) tại HẢI LAM E&C

Dưới đây là sơ đồ luồng hội thoại phân loại khách hàng (Lead Qualification Tree) được tối ưu để triển khai ngay vào Botpress, Chatbase hoặc hệ thống prompt của bot.

---

## 1. Lời Chào (Hook)
**Bot (Gửi ngay khi mở chat):** 
> "Welcome to HAI LAM E&C Engineering Desk. I am your Digital Technical Consultant. How can our engineering team assist you with your project today?"

*(Gợi ý - Có thể làm 2 nút bấm Quick Replies trên Cửa sổ Chat)*
- `[ Remote Engineering / Outsourcing ]`
- `[ Local EPC Integration (Vietnam) ]`

---

## 2. Phân Luồng Gốc (Initial Branching)
*Nếu khách hàng không chọn nút bấm mà nhập text, bot tự động hỏi phân luồng.*

**Bot:** 
> "To align you with the right engineering specialists, are you looking for **Remote Engineering/Outsourcing** globally, or **Local EPC/IoT Integration** within Vietnam?"

### 🔀 Nhánh A: Remote Engineering / Outsourcing (Quốc tế)
👉 *Tiếp tục xuống Bước 3 (Technical Scoping).*

### 🔀 Nhánh B: Local EPC/IoT Integration (Nội địa Việt Nam)
*(Luồng này đi vào các dự án thi công/tích hợp thực tế ở VN. Tiếp nhận thông tin địa điểm nhà máy, hạng mục cần thi công, sau đó chuyển xuống phần xin Contact (Bước 5)).*

---

## 3. Đào Sâu Kỹ Thuật (Technical Scoping) - Dành cho Nhánh Quốc tế
*Bot hỏi từng câu một (one-by-one) thay vì dồn dập nhiều câu cùng lúc để tăng tỷ lệ phản hồi.*

**Câu hỏi 3.1: Hệ thống**
**Bot:** 
> "Excellent. To scope your requirements, are you specifically looking for **PLC/SCADA Programming** or **Electrical Panel Design / Revit BIM** services?"
- *Nếu User chọn PLC/SCADA:* "Which specific brand or ecosystem does your project utilize (e.g., Siemens, Rockwell/Allen-Bradley, Schneider, Ignition)?"
- *Nếu User chọn Design/Revit:* "Are you looking for electrical switchgear design or comprehensive Revit/BIM 3D modeling?"

**Câu hỏi 3.2: Tiêu Chuẩn**
**Bot:** 
> "Understood. Which technical standards must this project comply with? (For example: IEC, IEEE, UL, or another specific regional standard?)"

**Câu hỏi 3.3: Quy Mô Dự Án**
**Bot:** 
> "To help us assign the appropriate resources, could you provide a rough estimate of the project scale? (e.g., Estimated I/O count, number of panels, or anticipated engineering man-hours?)"

---

## 4. Bắt Tín Hiệu "Lead VIP" (Green Flag)

**Điều kiện (Background Logic):**
Nếu khách hàng trả lời một trong các keyword hoặc thông số báo hiệu quy mô lớn:
- I/O count > `500`
- Man-hours > `200`
- Các cụm từ: `"full package"`, `"turnkey outsource"`, `"BIM model"`, `"entire plant"`.

**Phản ứng của Bot (Thái độ ưu tiên):**
**Bot:** 
> "Thank you for the detailed scope. Given the significant scale and technical depth of your requirement, I am flagging this as high-priority. Our Principal Engineers will directly review your case."

*(Nếu quy mô nhỏ / bình thường, bot trả lời nhã nhặn bình thường: "Thank you for sharing the technical details.")*

---

## 5. Chốt Hạ (Data Capture & Routing)
Tiến hành thu thập thông tin để chuyển thành Lead trong CRM.

**Bot:** 
> "To proceed with a formal review, please share your contact information."
- Prompt 1: "May I have your **Full Name**?"
- Prompt 2: "What is your **Company Name**?"
- Prompt 3: "Finally, what is your **Corporate Email Address**?"

**💥 Final Confirmation (Xác nhận Gửi Email)**
*(Chỉ hiển thị sau khi đã lấy đủ Tên, Công ty, Email)*

**Bot (Thông báo xác nhận - Tiếng Anh):**
> "Thank you, [Name]. Your Scope of Work has been successfully consolidated into a Technical Brief and is being automatically routed to our Chief Engineer via **info@hailamec.com**. Our technical team will review this and reach out to you shortly. Have a great day!"

---

## 💡 Lưu Ý Khi Set Up Lên Nền Tảng (Botpress/Chatbase)
- **Biến (Variables):** Nhớ thiết lập các biến lưu trữ `@user_name`, `@company_name`, `@work_email`, `@project_scale`, `@tech_standard`.
- **API Call / Webhook:** Tại bước 5, cấu hình một Webhook POST method gửi toàn bộ Payload (Tóm tắt đoạn chat + Thông tin user) về hệ thống CRM của Website hoặc gửi Email trực tiếp tới `info@hailamec.com`.
