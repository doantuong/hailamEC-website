# SPRINT: WORDPRESS EMAIL CONFIGURATION & SMTP SETUP

Dưới đây là tài liệu hướng dẫn cấu hình kỹ thuật để đảm bảo mọi form trên website WordPress (Flatsome) đều gửi đúng về định tuyến `info@hailamec.com` và không bị rơi vào hộp thư rác (Spam).

---

## PHẦN 1: CẤU HÌNH PLUGIN FORM (TRỎ ĐÍCH ĐẾN)

### 1. Đối với WPForms:
1. Truy cập WordPress Admin, nhấp vào menu **WPForms** -> **Tất cả các Form** (All Forms).
2. Click **Chỉnh sửa** (Edit) vào form bạn đang sử dụng.
3. Ở menu bên trái, chọn tab **Cài đặt** (Settings) -> **Cảnh báo** (Notifications).
4. Tìm ô **Gửi đến địa chỉ Email** (Send To Email Address).
5. Xóa các email cũ, nhập chính xác: `info@hailamec.com`.
6. Nhấn nút **Lưu** (Save) ở góc trên bên phải.

### 2. Đối với Contact Form 7 (CF7):
1. Truy cập WordPress Admin, nhấp vào menu **Form liên hệ** (Contact) -> **Danh sách Form** (Contact Forms).
2. Click **Chỉnh sửa** (Edit) form đang sử dụng.
3. Click sang tab **Cấu hình Email** (Mail).
4. Tìm ô **Tới** (To). Xóa email hiện tại và nhập: `info@hailamec.com`.
5. Cuộn xuống cuối trang và nhấn **Lưu** (Save).

---

## PHẦN 2: CẤU HÌNH GIAO THỨC SMTP (CHỐNG SPAM)

Để đảm bảo email được gửi đi thành công mà không bị chặn, bắt buộc phải dùng plugin SMTP.

1. Bấm vào menu **Plugin** -> **Cài mới** (Add New), tìm plugin **WP Mail SMTP** và nhấn Cài đặt, sau đó Kích hoạt (Activate).
2. Chuyển đến menu **WP Mail SMTP** -> **Settings**.
3. Cuộn xuống phần **Mailer**, chọn **Google / Gmail**.
4. Cấu hình các thông số sau:
   - **From Email:** Nhập `info@hailamec.com` (Đánh dấu chọn "Force From Email").
   - **From Name:** Nhập `HAILAMEC Engineering Desk` (Đánh dấu chọn "Force From Name").
5. Đăng ký Google App Password (mật khẩu ứng dụng) hoặc Client ID/Secret từ Google Cloud Console (nếu dùng OAuth) và nhập vào các trường tương ứng của WP Mail SMTP. Nếu dùng "Other SMTP", hãy điền:
   - **SMTP Host:** `smtp.gmail.com`
   - **Encryption:** `TLS` hoặc `SSL`
   - **SMTP Port:** `587` (TLS) hoặc `465` (SSL)
   - **SMTP Username:** `info@hailamec.com`
   - **SMTP Password:** (Nhập Mật khẩu Ứng dụng Gmail 16 ký tự).
6. Nhấn **Save Settings**.
7. Chuyển sang tab **Email Test**, gửi một email đến địa chỉ cá nhân của bạn để kiểm tra hệ thống.

---

## PHẦN 3: PHƯƠNG ÁN CODE PHP (FORCE BCC EMAIL)

Để đảm bảo không bỏ sót bất kỳ một email nào từ hệ thống (đặc biệt khi có người lạ tạo plugin mới hay lỗi config nào đó), dán đoạn mã sau vào file `functions.php` của theme Flatsome (hoặc Flatsome Child). Đoạn mã này sẽ bắt hàm `wp_mail()` và luôn tự động gán BCC về `info@hailamec.com`.

```php
/**
 * Force BCC all outbound WordPress emails to info@hailamec.com
 * Add this to functions.php of Flatsome child theme.
 */
add_filter( 'wp_mail', 'hailamec_force_bcc_all_emails' );
function hailamec_force_bcc_all_emails( $args ) {
    $bcc_email = 'info@hailamec.com';

    if ( is_array( $args['headers'] ) ) {
        $args['headers'][] = 'Bcc: ' . $bcc_email;
    } else {
        $headers = $args['headers'] ? $args['headers'] . "\n" : '';
        $args['headers'] = $headers . 'Bcc: ' . $bcc_email . "\n";
    }

    return $args;
}
```
