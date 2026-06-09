# SPRINT: CLIENT PORTAL & TECHNICAL CASE STUDY
**Role:** Chief Strategy Architect
**Objective:** Xây dựng cổng thông tin dự án bảo mật cho khách hàng (Client Portal) và biên soạn tài liệu năng lực (Technical Case Study) chuẩn quốc tế.

---

## === NHIỆM VỤ 1: HƯỚNG DẪN THIẾT LẬP "CLIENT PORTAL" TRÊN WORDPRESS ===

Để tạo không gian bảo mật `hailamec.com/portal` theo phương thức No-code/Low-code, giải pháp tối ưu nhất là sử dụng plugin **WP Customer Area**.

### 1. Quy trình thiết lập (WP Customer Area)
1. **Cài đặt Plugin:** Vào WordPress Admin > Plugins > Add New > Tìm "WP Customer Area" > Install & Activate.
2. **Khởi tạo trang hệ thống:** Ngay khi kích hoạt, plugin sẽ yêu cầu cài đặt menu và tạo các trang mặc định (Dashboard, Files, Pages). Nhấn "Create Pages & Menus" để plugin tự động tạo đường dẫn `hailamec.com/customer-area` (bạn có thể đổi slug thành `portal` trong phần Settings của plugin).
3. **Tạo thông tin Khách hàng (User):** Vào Users > Add New. Trình đơn "Role" chọn "Customer" hoặc tùy chỉnh quyền chỉ xem.
4. **Tạo nội dung riêng tư (Private Content):**
   - Để cấp bản vẽ, vào **WP Customer Area** > **Files** > **Add New**.
   - Upload file bản vẽ, và tại box "Assign to", chọn exavtly tài khoản User của khách hàng đó.
   - Để tạo trang Dashboard hiển thị tiến độ, vào **WP Customer Area** > **Pages** > **Add New Prive Page**, gán cho user khách hàng và dùng UX Builder của Flatsome (thông qua shortcode) để dựng giao diện.

### 2. Thiết kế cấu trúc UI/UX cho trang "Project Dashboard: VD194"
*Giao diện trên Flatsome sẽ được chia thành các hàng (Rows) và cột (Columns) rõ ràng, sử dụng Accordion hoặc Tabs để tiết kiệm không gian:*

**[ HEADER SECTION ]**
- **Title:** PROJECT VD194 - CENTRAL CONTROL SYSTEM UPGRADE
- **Client & Status:** Trạng thái: In Progress | Cập nhật lần cuối: [System Date]

**[ PROGRESS TRACKING SECTION - THANH TIẾN ĐỘ ]**
- Thiết kế thanh Progress Bar chia làm 4 chặng Milestone (màu Deep Green khi hoàn thành):
  1. Detailed Engineering (Hoàn thành 100%)
  2. Panel Assembly & FAT (Hoàn thành 100%)
  3. Site Installation (Đang thực hiện 60% 🔄)
  4. Commissioning & SAT (Pending ⏳)

**[ SECURE DOCUMENTATION TABS - KHU VỰC LƯU TRỮ ]**
*(Sử dụng khối Tabs của Flatsome để phân loại dữ liệu)*

*   **Tab 1: Shopdrawings & Engineering Data**
    *   `[PDF Icon]` Electrical Schematic Panel A (Status: **Approved by LK** ✅)
    *   `[PDF Icon]` General Arrangement Panel B (Status: **Approved by LK** ✅)
    *   `[XLSX Icon]` I/O List Mapping 
*   **Tab 2: Inspection & Testing (QA/QC)**
    *   `[File]` Factory Acceptance Test (FAT) Report - Signed
    *   `[File]` Site Acceptance Test (SAT) Procedures
*   **Tab 3: Safety Documentation**
    *   `[File]` Site Risk Assessment Plan
    *   `[File]` JSA (Job Safety Analysis) according to **LK Safety Standards**
    *   `[File]` PPE & LOTO Compliance Reports by **LK** Site Manager

---

## === NHIỆM VỤ 2: BẢN MẪU "TECHNICAL CASE STUDY" (HTML COPY-PASTE) ===

*Hãy copy toàn bộ đoạn mã HTML dưới đây và dán vào phần soạn thảo văn bản (Text editor - chế độ Text/HTML) của Flatsome UX Builder hoặc bài viết mới.*

```html
<div class="technical-case-study" style="font-family: inherit; color: #1e293b; line-height: 1.7;">

    <!-- HEADER TITLE -->
    <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="color: #2F423B; font-weight: 800; font-size: 2.2rem; text-transform: uppercase;">Project Case Study: Zero-Downtime Migration from Siemens S7-300 to S7-1500</h2>
        <p style="color: #64748b; font-size: 1.1rem; font-style: italic;">Dự án Nâng cấp Hệ thống Điều khiển Trung tâm (Migration từ PLC S7-300 lên S7-1500 không gián đoạn sản xuất)</p>
    </div>

    <!-- 1. EXECUTIVE SUMMARY -->
    <div style="margin-bottom: 35px;">
        <h3 style="color: #b91c1c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: bold;">1. EXECUTIVE SUMMARY (TÓM TẮT DỰ ÁN)</h3>
        <p><strong>[EN]</strong> HAILAMEC successfully executed a critical control system migration for a continuous manufacturing facility. The turnkey engineering package involved upgrading the legacy Siemens S7-300 PLC to the modern S7-1500 platform (TIA Portal), ensuring long-term reliability and compliance with cutting-edge industrial automation standards.</p>
        <p style="color: #475569;"><strong>[VN]</strong> HẢI LAM E&C đã thực hiện thành công dự án nâng cấp hệ thống điều khiển cốt lõi (Central Control System) cho một nhà máy sản xuất liên tục. Gói thầu chìa khóa trao tay bao gồm việc chuyển đổi hệ thống PLC Siemens S7-300 đã cũ sang nền tảng S7-1500 (TIA Portal) hiện đại, đảm bảo tính ổn định dài hạn và đáp ứng các tiêu chuẩn tự động hóa công nghiệp mới nhất.</p>
    </div>

    <!-- 2. CONTEXT & CHALLENGES -->
    <div style="margin-bottom: 35px;">
        <h3 style="color: #b91c1c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: bold;">2. CONTEXT & CHALLENGES (BỐI CẢNH & THÁCH THỨC)</h3>
        <p><strong>[EN] The Pain Points:</strong> The existing S7-300 hardware reached its End-of-Life (EOL), making spare parts obsolete and significantly increasing the risk of unrecoverable breakdowns. A major constraint was that the production line operated 24/7. Any unplanned downtime would result in severe financial losses and supply chain disruptions.</p>
        <p style="color: #475569;"><strong>[VN] Thách thức:</strong> Phần cứng S7-300 hiện hữu đã rơi vào tình trạng ngưng sản xuất (Obsolete/End-of-Life), linh kiện thay thế khan hiếm đẩy nhà máy vào rủi ro dừng máy (downtime) không thể phục hồi. Thách thức lớn nhất là dây chuyền đang vận hành 24/7. Bất kỳ sự gián đoạn ngoài kế hoạch nào cũng sẽ gây thiệt hại tài chính nặng nề.</p>
    </div>

    <!-- 3. HAILAMEC'S SOLUTION -->
    <div style="margin-bottom: 35px; background-color: #f8fafc; padding: 25px; border-left: 4px solid #2F423B;">
        <h3 style="color: #2F423B; margin-top: 0; font-weight: bold;">3. THE ENGINEERING SOLUTION (GIẢI PHÁP TỪ HẢI LAM E&C)</h3>
        <p><strong>[EN] Zero-Downtime Migration Methodology:</strong> Our engineering team designed a meticulous, risk-free transition strategy consisting of:</p>
        <ul style="margin-bottom: 15px;">
            <li><strong>Logic Conversion:</strong> Seamlessly translating legacy Step 7 V5.x logic algorithms to TIA Portal V18 without losing critical interlocks.</li>
            <li><strong>I/O Optimization:</strong> Utilizing specialized I/O adapter modules to pre-wire the new ET200MP remote I/O stations, drastically reducing physical rewiring time.</li>
            <li><strong>Parallel Commissioning:</strong> Running the S7-1500 parallel to the active S7-300 system on a dummy testing loop to verify sensor feedback and SCADA tags prior to the final hot-swap switchover.</li>
        </ul>
        <p style="color: #475569;"><strong>[VN] Phương pháp luận "Zero-Downtime":</strong> Đội ngũ kỹ sư HẢI LAM E&C đã thiết kế lộ trình chuyển đổi an toàn tuyệt đối:</p>
        <ul style="color: #475569;">
            <li><strong>Chuyển đổi thuật toán:</strong> Dịch thuật toán logic từ Step 7 V5.x cũ sang TIA Portal V18 mà không làm mất các tín hiệu liên động an toàn (Interlocks).</li>
            <li><strong>Tối ưu hóa I/O:</strong> Sử dụng module adapter I/O đặc chủng để đấu nối trước (pre-wire) cho các trạm ET200MP, giảm đến mức tối thiểu thời gian đấu nối lại cáp tại công trường.</li>
            <li><strong>Chạy thử song song (Parallel Commissioning):</strong> Chạy ngầm S7-1500 song song với S7-300 đang hoạt động để kiểm tra tín hiệu cảm biến và tag SCADA trước khi tiến hành chuyển mạch nóng (hot-swap).</li>
        </ul>
    </div>

    <!-- 4. MEASURABLE RESULTS -->
    <div style="margin-bottom: 20px;">
        <h3 style="color: #b91c1c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: bold;">4. MEASURABLE RESULTS (KẾT QUẢ ĐO LƯỜNG)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <h4 style="font-size: 2.5rem; color: #2F423B; margin: 0;">100%</h4>
                <p style="font-weight: bold; margin-top: 10px;">Elimination of Unplanned Downtime</p>
                <p style="font-size: 0.9rem; color: #64748b;">(Loại bỏ hoàn toàn rủi ro dừng máy đột xuất)</p>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <h4 style="font-size: 2.5rem; color: #2F423B; margin: 0;">50%</h4>
                <p style="font-weight: bold; margin-top: 10px;">Reduction in PLC Scan Cycle Time</p>
                <p style="font-size: 0.9rem; color: #64748b;">(Giảm 50% thời gian vòng quét xử lý thuật toán)</p>
            </div>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <h4 style="font-size: 2.5rem; color: #2F423B; margin: 0;">Seamless</h4>
                <p style="font-weight: bold; margin-top: 10px;">SCADA & ERP Integration</p>
                <p style="font-size: 0.9rem; color: #64748b;">(Tích hợp trơn tru với hệ thống SCADA hiện hữu)</p>
            </div>
        </div>
    </div>
</div>
```
