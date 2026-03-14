const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');

// 1. Prepare Vietnamese HTML
let viHtml = originalHtml;

// Add hreflang
const hreflangTags = `
    <link rel="alternate" hreflang="vi" href="https://hailamec.com/vi/" />
    <link rel="alternate" hreflang="en" href="https://hailamec.com/en/" />
    <link rel="alternate" hreflang="x-default" href="https://hailamec.com/" />
`;
viHtml = viHtml.replace('<link rel="canonical" href="https://hailamec.com/">', '<link rel="canonical" href="https://hailamec.com/vi/">\n' + hreflangTags);
viHtml = viHtml.replace('<meta property="og:url" content="https://hailamec.com/">', '<meta property="og:url" content="https://hailamec.com/vi/">');

// Add CSS for lang switcher
const langSwitcherCss = `
        .lang-switcher {
            font-weight: 700;
            font-size: 15px;
            color: var(--primary);
            display: flex;
            align-items: center;
        }
        .lang-switcher a {
            color: var(--text-light);
            padding: 0 5px;
        }
        .lang-switcher a.active {
            color: var(--accent);
        }
        .lang-switcher a:hover {
            color: var(--primary);
        }
`;
viHtml = viHtml.replace('/* =========================================\n           HEADER', langSwitcherCss + '\n        /* =========================================\n           HEADER');

// Add lang switcher to header
const headerInnerVi = `
        <div class="container header-inner" style="justify-content: space-between;">
            <div class="lang-switcher">
                <a href="#" onclick="switchLang('vi'); return false;" id="lang-vi" class="active">VI</a> | 
                <a href="#" onclick="switchLang('en'); return false;" id="lang-en">EN</a>
            </div>
            <!-- Logo removed -->
`;
viHtml = viHtml.replace('<div class="container header-inner">\n            <!-- Logo removed -->', headerInnerVi);

// Add switchLang script
const switchLangScript = `
<script>
function switchLang(lang) {
    const currentHash = window.location.hash;
    window.location.href = '/' + lang + '/' + currentHash;
}
</script>
`;
viHtml = viHtml.replace('</body>', switchLangScript + '\n</body>');

// Translate About section to Vietnamese for VI version
const aboutEn = `<p style="margin-bottom: 15px;">Hai Lam Engineering & Construction (HAILAMEC) stands at the forefront of Vietnam's rapid industrialization as a premier EPC (Engineering, Procurement, and Construction) contractor. Specializing in delivering comprehensive, turnkey technical solutions, we are the trusted partner for modern manufacturing facilities, energy plants, and critical infrastructure projects. As a leading <strong>electrical engineering contractor Vietnam</strong>, we bridge the gap between complex engineering challenges and reliable, high-performance operational outcomes. Our core mission is to empower factories and industrial plants with state-of-the-art technologies that ensure efficiency, safety, and strict regulatory compliance.</p>
                        <p style="margin-bottom: 15px;">At the heart of our technical expertise is <strong>industrial automation Vietnam</strong>. We design, deploy, and maintain advanced <strong>industrial control systems</strong> that streamline production processes, minimize downtime, and optimize resource utilization. From sophisticated <strong>PLC automation solutions</strong> to comprehensive SCADA system integration, our factory solutions are meticulously tailored to meet the rigorous demands of today’s fast-paced industrial environments. By leveraging cutting-edge automation technologies, we help manufacturing companies achieve unprecedented levels of productivity, operational transparency, and scalable growth.</p>
                        <p style="margin-bottom: 15px;">In addition to automation, HAILAMEC is a highly respected authority in <strong>instrumentation engineering Vietnam</strong>. We provide precise, reliable instrumentation systems that form the sensory network of any industrial plant. Accurate measurement and control are critical to maintaining product quality and process safety. Our expertise spans advanced <strong>flow measurement instrumentation</strong>, temperature monitoring, pressure control, and level measurement. Our team of seasoned engineers ensures that every instrument is meticulously calibrated, installed, and seamlessly integrated into your broader control architecture, guaranteeing data integrity and operational safety.</p>
                        <p style="margin-bottom: 15px;">Environmental compliance is another critical pillar of our engineering portfolio. As environmental regulations become increasingly stringent globally and locally, industrial facilities require robust monitoring solutions to track and minimize their ecological footprint. HAILAMEC delivers industry-leading environmental monitoring solutions, including continuous emission monitoring systems (<strong>CEMS monitoring system</strong>) and advanced <strong>wastewater monitoring system</strong> setups. These systems provide real-time, highly accurate data to help plants meet legal standards, avoid costly penalties, and demonstrate their unwavering commitment to sustainable manufacturing practices.</p>
                        <p style="margin-bottom: 15px;">Our comprehensive approach as an electrical engineering contractor means that we handle every aspect of your project lifecycle. From initial conceptual design and rigorous procurement to precise installation, commissioning, testing, and long-term maintenance, we provide end-to-end engineering solutions for factories. We understand that in the industrial sector, reliability is non-negotiable. That is why our systems are engineered for maximum durability and continuous operation under the most demanding and hazardous conditions.</p>
                        <p style="margin-bottom: 25px;">Whether you are upgrading a legacy facility, optimizing an existing production line, or constructing a new industrial plant from the ground up, HAILAMEC is your dedicated technical partner for success. We combine our deep, multi-disciplinary expertise in industrial automation systems, instrumentation engineering, electrical engineering services, and environmental monitoring systems to deliver holistic, future-proof solutions that drive operational excellence.</p>`;

const aboutVi = `<p style="margin-bottom: 15px;">Hai Lam Engineering & Construction (HAILAMEC) là nhà thầu EPC hàng đầu tại Việt Nam, tiên phong trong công cuộc công nghiệp hóa. Chuyên cung cấp các giải pháp kỹ thuật trọn gói (turnkey), chúng tôi là đối tác tin cậy của các nhà máy sản xuất hiện đại, nhà máy năng lượng và các dự án hạ tầng trọng điểm. Với tư cách là nhà thầu cơ điện hàng đầu, chúng tôi thu hẹp khoảng cách giữa các thách thức kỹ thuật phức tạp và hiệu quả vận hành thực tế. Sứ mệnh cốt lõi của chúng tôi là trang bị cho các nhà máy những công nghệ tiên tiến nhất, đảm bảo hiệu suất, an toàn và tuân thủ nghiêm ngặt các tiêu chuẩn pháp lý.</p>
                        <p style="margin-bottom: 15px;">Trọng tâm chuyên môn của chúng tôi là <strong>tự động hóa công nghiệp</strong>. Chúng tôi thiết kế, triển khai và bảo trì các <strong>hệ thống điều khiển công nghiệp</strong> tiên tiến giúp tối ưu hóa quy trình sản xuất, giảm thiểu thời gian ngừng máy và tối ưu hóa việc sử dụng tài nguyên. Từ các <strong>giải pháp tự động hóa PLC</strong> phức tạp đến tích hợp hệ thống SCADA toàn diện, các giải pháp nhà máy của chúng tôi được tinh chỉnh tỉ mỉ để đáp ứng các yêu cầu khắt khe của môi trường công nghiệp nhịp độ nhanh hiện nay. Bằng cách tận dụng các công nghệ tự động hóa tiên tiến, chúng tôi giúp các công ty sản xuất đạt được mức năng suất chưa từng có, minh bạch trong vận hành và khả năng mở rộng bền vững.</p>
                        <p style="margin-bottom: 15px;">Bên cạnh tự động hóa, HAILAMEC còn là chuyên gia uy tín trong lĩnh vực <strong>kỹ thuật đo lường điều khiển</strong>. Chúng tôi cung cấp các hệ thống đo lường chính xác, đáng tin cậy, đóng vai trò như mạng lưới cảm biến của bất kỳ nhà máy công nghiệp nào. Đo lường và điều khiển chính xác là yếu tố then chốt để duy trì chất lượng sản phẩm và an toàn quy trình. Chuyên môn của chúng tôi bao gồm các <strong>thiết bị đo lưu lượng</strong> tiên tiến, giám sát nhiệt độ, điều khiển áp suất và đo mức. Đội ngũ kỹ sư dày dạn kinh nghiệm của chúng tôi đảm bảo rằng mọi thiết bị đều được hiệu chuẩn tỉ mỉ, lắp đặt và tích hợp liền mạch vào kiến trúc điều khiển tổng thể, đảm bảo tính toàn vẹn của dữ liệu và an toàn vận hành.</p>
                        <p style="margin-bottom: 15px;">Tuân thủ môi trường là một trụ cột quan trọng khác trong danh mục kỹ thuật của chúng tôi. Khi các quy định về môi trường ngày càng trở nên nghiêm ngặt, các cơ sở công nghiệp cần các giải pháp giám sát mạnh mẽ để theo dõi và giảm thiểu tác động sinh thái. HAILAMEC cung cấp các giải pháp quan trắc môi trường hàng đầu, bao gồm <strong>hệ thống quan trắc khí thải tự động liên tục (CEMS)</strong> và <strong>hệ thống quan trắc nước thải tự động</strong>. Các hệ thống này cung cấp dữ liệu thời gian thực, độ chính xác cao giúp các nhà máy đáp ứng các tiêu chuẩn pháp lý, tránh các khoản phạt tốn kém và thể hiện cam kết vững chắc đối với các hoạt động sản xuất bền vững.</p>
                        <p style="margin-bottom: 15px;">Cách tiếp cận toàn diện của chúng tôi với tư cách là nhà thầu cơ điện có nghĩa là chúng tôi xử lý mọi khía cạnh trong vòng đời dự án của bạn. Từ thiết kế ý tưởng ban đầu và mua sắm nghiêm ngặt đến lắp đặt chính xác, chạy thử (commissioning), kiểm tra và bảo trì dài hạn, chúng tôi cung cấp các giải pháp kỹ thuật từ đầu đến cuối cho các nhà máy. Chúng tôi hiểu rằng trong lĩnh vực công nghiệp, độ tin cậy là yếu tố không thể thỏa hiệp. Đó là lý do tại sao các hệ thống của chúng tôi được thiết kế để đạt độ bền tối đa và hoạt động liên tục dưới các điều kiện khắc nghiệt và nguy hiểm nhất.</p>
                        <p style="margin-bottom: 25px;">Cho dù bạn đang nâng cấp một cơ sở hiện có, tối ưu hóa dây chuyền sản xuất hay xây dựng một nhà máy công nghiệp mới từ đầu, HAILAMEC là đối tác kỹ thuật tận tâm cho sự thành công của bạn. Chúng tôi kết hợp chuyên môn đa ngành sâu rộng trong các hệ thống tự động hóa công nghiệp, kỹ thuật đo lường, dịch vụ cơ điện và hệ thống quan trắc môi trường để cung cấp các giải pháp toàn diện, đón đầu tương lai, thúc đẩy sự xuất sắc trong vận hành.</p>`;

viHtml = viHtml.replace(aboutEn, aboutVi);

const leadGenEn = `<p style="margin-bottom: 10px; font-weight: bold; color: var(--primary-dark);">Ready to elevate your plant's performance?</p>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 8px;">🔹 <a href="#contact" style="color: var(--primary); text-decoration: underline; font-weight: 500;">Request an engineering consultation</a> or <a href="#contact" style="color: var(--primary); text-decoration: underline; font-weight: 500;">request a technical proposal</a> today.</li>
                                <li style="margin-bottom: 8px;">🔹 Explore our <a href="#services" style="color: var(--primary); text-decoration: underline; font-weight: 500;">comprehensive engineering services</a>.</li>
                                <li style="margin-bottom: 8px;">🔹 Review our <a href="#projects" style="color: var(--primary); text-decoration: underline; font-weight: 500;">successful industrial projects</a>.</li>
                                <li>🔹 Dive into our <a href="#technical" style="color: var(--primary); text-decoration: underline; font-weight: 500;">technical knowledge hub</a> to see how HAILAMEC is shaping the future of industrial engineering in Vietnam.</li>
                            </ul>`;

const leadGenVi = `<p style="margin-bottom: 10px; font-weight: bold; color: var(--primary-dark);">Sẵn sàng nâng cao hiệu suất nhà máy của bạn?</p>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 8px;">🔹 <a href="#contact" style="color: var(--primary); text-decoration: underline; font-weight: 500;">Yêu cầu tư vấn kỹ thuật</a> hoặc <a href="#contact" style="color: var(--primary); text-decoration: underline; font-weight: 500;">nhận báo giá</a> ngay hôm nay.</li>
                                <li style="margin-bottom: 8px;">🔹 Khám phá <a href="#services" style="color: var(--primary); text-decoration: underline; font-weight: 500;">các dịch vụ kỹ thuật toàn diện</a> của chúng tôi.</li>
                                <li style="margin-bottom: 8px;">🔹 Xem qua <a href="#projects" style="color: var(--primary); text-decoration: underline; font-weight: 500;">các dự án công nghiệp tiêu biểu</a>.</li>
                                <li>🔹 Truy cập <a href="#technical" style="color: var(--primary); text-decoration: underline; font-weight: 500;">trung tâm kiến thức kỹ thuật</a> để xem cách HAILAMEC định hình tương lai ngành kỹ thuật công nghiệp tại Việt Nam.</li>
                            </ul>`;

viHtml = viHtml.replace(leadGenEn, leadGenVi);

// Fix script src for subfolder
viHtml = viHtml.replace('<script type="module" src="/index.tsx"></script>', '<script type="module" src="/index.tsx"></script>');

fs.mkdirSync('vi', { recursive: true });
fs.writeFileSync('vi/index.html', viHtml);

// 2. Prepare English HTML
let enHtml = originalHtml;

enHtml = enHtml.replace('<html lang="vi">', '<html lang="en">');
enHtml = enHtml.replace('<link rel="canonical" href="https://hailamec.com/">', '<link rel="canonical" href="https://hailamec.com/en/">\n' + hreflangTags);
enHtml = enHtml.replace('<meta property="og:url" content="https://hailamec.com/">', '<meta property="og:url" content="https://hailamec.com/en/">');

enHtml = enHtml.replace('/* =========================================\n           HEADER', langSwitcherCss + '\n        /* =========================================\n           HEADER');

const headerInnerEn = `
        <div class="container header-inner" style="justify-content: space-between;">
            <div class="lang-switcher">
                <a href="#" onclick="switchLang('vi'); return false;" id="lang-vi">VI</a> | 
                <a href="#" onclick="switchLang('en'); return false;" id="lang-en" class="active">EN</a>
            </div>
            <!-- Logo removed -->
`;
enHtml = enHtml.replace('<div class="container header-inner">\n            <!-- Logo removed -->', headerInnerEn);
enHtml = enHtml.replace('</body>', switchLangScript + '\n</body>');

// Translate content to English
const translations = [
    ['<span><i>🕒</i> Giờ làm việc: Thứ 2 - Thứ 7 (8:00 - 17:00)</span>', '<span><i>🕒</i> Working Hours: Mon - Sat (8:00 - 17:00)</span>'],
    ['<li><a href="#about">Về chúng tôi</a></li>', '<li><a href="#about">About Us</a></li>'],
    ['<li><a href="#services">Dịch vụ</a></li>', '<li><a href="#services">Services</a></li>'],
    ['<li><a href="#projects">Dự án</a></li>', '<li><a href="#projects">Projects</a></li>'],
    ['<li><a href="#technical">Kiến thức kỹ thuật</a></li>', '<li><a href="#technical">Technical Knowledge</a></li>'],
    ['<li><a href="#contact" class="btn btn-primary" style="padding: 10px 25px; border-radius: 4px;">Liên hệ</a></li>', '<li><a href="#contact" class="btn btn-primary" style="padding: 10px 25px; border-radius: 4px;">Contact Us</a></li>'],
    ['<p class="hero-sub">Hải Lam E&C cung cấp giải pháp thiết kế – thi công – tích hợp hệ thống điện và điều khiển công nghiệp trọn gói cho nhà máy, khu công nghiệp và hạ tầng kỹ thuật.</p>', '<p class="hero-sub">HAILAMEC provides turnkey design, construction, and integration solutions for industrial electrical and control systems for factories, industrial parks, and technical infrastructure.</p>'],
    ['<a href="#contact" class="btn btn-primary">Nhận tư vấn kỹ thuật</a>', '<a href="#contact" class="btn btn-primary">Get Technical Consultation</a>'],
    ['<a href="#services" class="btn btn-outline">Xem hồ sơ năng lực</a>', '<a href="#services" class="btn btn-outline">View Company Profile</a>'],
    ['<h2 class="section-title">Về Hải Lam E&C</h2>', '<h2 class="section-title">About HAILAMEC</h2>'],
    ['<p class="bold" style="font-size: 1.2rem; margin-bottom: 20px; color: var(--primary);">Từ thiết kế đến bàn giao, một đầu mối – một trách nhiệm – một kết quả.</p>', '<p class="bold" style="font-size: 1.2rem; margin-bottom: 20px; color: var(--primary);">From design to handover, one point of contact – one responsibility – one result.</p>'],
    ['<span class="stat-label">Năm kinh nghiệm</span>', '<span class="stat-label">Years of Experience</span>'],
    ['<span class="stat-label">Dự án hoàn thành</span>', '<span class="stat-label">Completed Projects</span>'],
    ['<span class="stat-label">Kỹ sư chuyên môn</span>', '<span class="stat-label">Specialized Engineers</span>'],
    ['<span class="stat-label">Đạt chuẩn ISO/TCVN</span>', '<span class="stat-label">ISO/TCVN Compliant</span>'],
    ['<h2 class="section-title center">Lĩnh Vực Hoạt Động</h2>', '<h2 class="section-title center">Core Business Areas</h2>'],
    ['<p style="max-width: 700px; margin: 0 auto; color: var(--text-light);">Giải pháp trọn gói từ tư vấn, thiết kế, thi công đến bảo trì hệ thống.</p>', '<p style="max-width: 700px; margin: 0 auto; color: var(--text-light);">Turnkey solutions from consulting, design, construction to system maintenance.</p>'],
    ['<p><strong>Đo lường chính xác – điều khiển thông minh – vận hành tự động</strong></p>', '<p><strong>Accurate measurement – smart control – automated operation</strong></p>'],
    ['<li>Hệ thống đo mức, áp suất, lưu lượng, nhiệt độ, phân tích online</li>', '<li>Level, pressure, flow, temperature measurement, online analysis systems</li>'],
    ['<li>Tủ điều khiển, tủ PLC, tủ truyền thông, mạng công nghiệp</li>', '<li>Control panels, PLC panels, communication panels, industrial networks</li>'],
    ['<li>Thu thập dữ liệu – giám sát – cảnh báo – điều khiển từ xa</li>', '<li>Data acquisition – monitoring – alarming – remote control</li>'],
    ['<span class="service-highlight">👉 Ứng dụng: Nhà máy sản xuất, xử lý nước, năng lượng, hạ tầng.</span>', '<span class="service-highlight">👉 Applications: Manufacturing plants, water treatment, energy, infrastructure.</span>'],
    ['Chi tiết &rarr;', 'Details &rarr;'],
    ['<p><strong>Hệ thống điện an toàn – ổn định – tối ưu năng lượng</strong></p>', '<p><strong>Safe – stable – energy-optimized electrical systems</strong></p>'],
    ['<li>Thiết kế & thi công hệ thống điện trung – hạ thế</li>', '<li>Design & installation of medium and low voltage electrical systems</li>'],
    ['<li>Trạm biến áp, tủ phân phối, MCC, DB, MSB</li>', '<li>Substations, distribution boards, MCC, DB, MSB</li>'],
    ['<li>Chiếu sáng, ổ cắm, ELV, CCTV, mạng, PA, Fire Alarm</li>', '<li>Lighting, sockets, ELV, CCTV, networking, PA, Fire Alarm</li>'],
    ['<li>Đo kiểm, phân tích chất lượng điện năng</li>', '<li>Power quality measurement and analysis</li>'],
    ['<span class="service-highlight">👉 Giải pháp trọn gói từ thiết kế → cung cấp → lắp đặt.</span>', '<span class="service-highlight">👉 Turnkey solutions from design → supply → installation.</span>'],
    ['<p><strong>Tuân thủ pháp lý – kết nối trực tiếp cơ quan quản lý</strong></p>', '<p><strong>Legal compliance – direct connection to regulatory agencies</strong></p>'],
    ['<li>Quan trắc khí thải, nước thải, không khí, nước mặt</li>', '<li>Emission, wastewater, ambient air, surface water monitoring</li>'],
    ['<li>Hệ thống CEMS / WQMS / AQMS</li>', '<li>CEMS / WQMS / AQMS systems</li>'],
    ['<li>Truyền dữ liệu tự động về Sở TNMT</li>', '<li>Automatic data transmission to the Department of Natural Resources and Environment (DONRE)</li>'],
    ['<li>Lắp đặt – hiệu chuẩn – bảo trì – vận hành dài hạn</li>', '<li>Installation – calibration – maintenance – long-term operation</li>'],
    ['<span class="service-highlight">👉 Giúp doanh nghiệp an tâm vận hành, tránh rủi ro môi trường.</span>', '<span class="service-highlight">👉 Helping businesses operate with peace of mind, avoiding environmental risks.</span>'],
    ['<p><strong>Thiết kế chuẩn kỹ thuật – hồ sơ chuyên nghiệp – thi công chính xác</strong></p>', '<p><strong>Standardized technical design – professional documentation – accurate construction</strong></p>'],
    ['<li>Thiết kế MEPF / Electrical / I&C</li>', '<li>MEPF / Electrical / I&C Design</li>'],
    ['<li>BOQ – tính toán – thuyết minh – hồ sơ thầu</li>', '<li>BOQ – calculations – specifications – tender documents</li>'],
    ['<li>As-built & tài liệu hoàn công</li>', '<li>As-built & handover documentation</li>'],
    ['<span class="service-highlight">👉 Tối ưu tiến độ thi công và giảm sai sót công trường.</span>', '<span class="service-highlight">👉 Optimizing construction schedules and minimizing site errors.</span>'],
    ['<h2 class="section-title">Tại Sao Chọn Hải Lam E&C?</h2>', '<h2 class="section-title">Why Choose HAILAMEC?</h2>'],
    ['<p>Thiết kế + thi công + tích hợp trọn gói. Giảm thiểu rủi ro và đầu mối quản lý.</p>', '<p>Comprehensive design + build + integration. Minimizing risks and management interfaces.</p>'],
    ['<h4>Thực Chiến Công Nghiệp</h4>', '<h4>Industrial Practical Experience</h4>'],
    ['<p>Đội ngũ kỹ sư điện & tự động hóa giàu kinh nghiệm, hiểu sâu tiêu chuẩn & pháp lý Việt Nam.</p>', '<p>Experienced electrical & automation engineers, deeply understanding Vietnamese standards & regulations.</p>'],
    ['<h4>Tối Ưu Hiệu Quả</h4>', '<h4>Efficiency Optimization</h4>'],
    ['<p>Tối ưu chi phí – tiến độ – hiệu quả vận hành. Cam kết chất lượng cao nhất.</p>', '<p>Optimizing cost – schedule – operational efficiency. Committing to the highest quality.</p>'],
    ['<h4>Đồng Hành Dài Hạn</h4>', '<h4>Long-term Partnership</h4>'],
    ['<p>Cam kết bảo trì dài hạn sau bàn giao. Hỗ trợ xử lý sự cố vận hành 24/7.</p>', '<p>Long-term maintenance commitment after handover. 24/7 operational troubleshooting support.</p>'],
    ['<h2 class="section-title center">Dự Án Tiêu Biểu</h2>', '<h2 class="section-title center">Featured Projects</h2>'],
    ['<div class="project-cat">SCADA System</div>', '<div class="project-cat">SCADA System</div>'],
    ['<h3 class="project-title">Nhà máy Total Gas</h3>', '<h3 class="project-title">Total Gas Plant</h3>'],
    ['<div class="project-cat">Tủ Điện MSB</div>', '<div class="project-cat">MSB Electrical Cabinet</div>'],
    ['<h3 class="project-title">KCN VSIP II Bình Dương</h3>', '<h3 class="project-title">VSIP II Binh Duong</h3>'],
    ['<div class="project-cat">Quan Trắc Nước Thải</div>', '<div class="project-cat">Wastewater Monitoring</div>'],
    ['<h3 class="project-title">THỦY SẢN PHÁT TIẾN</h3>', '<h3 class="project-title">THUY SAN PHAT TIEN</h3>'],
    ['<h3 class="project-title">THỦY SẢN HÙNG CÁ</h3>', '<h3 class="project-title">THUY SAN HUNG CA</h3>'],
    ['<h3 class="project-title">Nhà máy Dược Hậu Giang</h3>', '<h3 class="project-title">Hau Giang Pharmaceutical Plant</h3>'],
    ['<div class="project-cat">Bảo Trì</div>', '<div class="project-cat">Maintenance</div>'],
    ['<h3 class="project-title">Nhà máy Xi măng Hà Tiên</h3>', '<h3 class="project-title">Ha Tien Cement Plant</h3>'],
    ['<h2 class="section-title center">Quy Trình Làm Việc</h2>', '<h2 class="section-title center">Working Process</h2>'],
    ['<h4>Tư Vấn & Khảo Sát</h4>', '<h4>Consulting & Survey</h4>'],
    ['<p style="font-size: 0.9rem; padding: 0 10px;">Đánh giá hiện trạng, lắng nghe nhu cầu và đề xuất giải pháp kỹ thuật sơ bộ.</p>', '<p style="font-size: 0.9rem; padding: 0 10px;">Evaluate current status, listen to needs, and propose preliminary technical solutions.</p>'],
    ['<h4>Thiết Kế (Design)</h4>', '<h4>Design</h4>'],
    ['<p style="font-size: 0.9rem; padding: 0 10px;">Lên bản vẽ Shopdrawing, sơ đồ nguyên lý và danh mục vật tư chi tiết.</p>', '<p style="font-size: 0.9rem; padding: 0 10px;">Develop shop drawings, schematic diagrams, and detailed bill of materials (BOM).</p>'],
    ['<h4>Thi Công (Build)</h4>', '<h4>Build</h4>'],
    ['<p style="font-size: 0.9rem; padding: 0 10px;">Lắp ráp tủ bảng điện, thi công thang máng cáp và đấu nối tại công trường.</p>', '<p style="font-size: 0.9rem; padding: 0 10px;">Assemble electrical panels, install cable trays, and perform site wiring.</p>'],
    ['<h4>Nghiệm Thu (Commission)</h4>', '<h4>Commissioning</h4>'],
    ['<p style="font-size: 0.9rem; padding: 0 10px;">Chạy thử I/O check, SAT, hướng dẫn vận hành và bàn giao tài liệu.</p>', '<p style="font-size: 0.9rem; padding: 0 10px;">Perform I/O checks, SAT, operational training, and document handover.</p>'],
    ['<h2>Sẵn sàng nâng cấp nhà máy của bạn?</h2>', '<h2>Ready to upgrade your plant?</h2>'],
    ['<p style="margin-bottom: 30px; font-size: 1.1rem;">Liên hệ với kỹ sư của Hải Lam E&C để được tư vấn giải pháp tối ưu nhất.</p>', '<p style="margin-bottom: 30px; font-size: 1.1rem;">Contact HAILAMEC engineers for the most optimal technical solutions.</p>'],
    ['<a href="#contact" class="btn" style="background: white; color: var(--accent); border: none;">Gửi yêu cầu báo giá</a>', '<a href="#contact" class="btn" style="background: white; color: var(--accent); border: none;">Request a Quote</a>'],
    ['<h2 class="section-title">Kiến Thức Kỹ Thuật</h2>', '<h2 class="section-title">Technical Knowledge</h2>'],
    ['<p style="margin-bottom: 40px; color: var(--text-light);">Chia sẻ chuyên sâu về Tự động hóa, Điện công nghiệp và các tiêu chuẩn kỹ thuật.</p>', '<p style="margin-bottom: 40px; color: var(--text-light);">In-depth sharing on Automation, Industrial Electrical, and technical standards.</p>'],
    ['<div class="blog-meta">Tự động hóa • Cơ bản</div>', '<div class="blog-meta">Automation • Basics</div>'],
    ['<h3 class="blog-title">1. PLC là gì? Ứng dụng PLC trong nhà máy công nghiệp</h3>', '<h3 class="blog-title">1. What is a PLC? Applications of PLC in industrial plants</h3>'],
    ['<p class="blog-excerpt">PLC (Programmable Logic Controller) là bộ não của dây chuyền sản xuất hiện đại. Bài viết giải thích nguyên lý hoạt động và vai trò không thể thay thế của nó.</p>', '<p class="blog-excerpt">PLC (Programmable Logic Controller) is the brain of modern production lines. This article explains its operating principles and irreplaceable role.</p>'],
    ['<summary>Đọc chi tiết bài viết</summary>', '<summary>Read full article</summary>'],
    ['<h4>Giới thiệu</h4>', '<h4>Introduction</h4>'],
    ['<p>Trong kỷ nguyên Công nghiệp 4.0, PLC (Programmable Logic Controller) đóng vai trò trung tâm. Khác với các hệ thống rơ-le cũ kỹ, PLC là thiết bị điều khiển lập trình được, cho phép thực hiện các thuật toán điều khiển logic, tuần tự, thời gian và đếm.</p>', '<p>In the era of Industry 4.0, PLC plays a central role. Unlike outdated relay systems, a PLC is a programmable control device that allows the execution of logical, sequential, timing, and counting control algorithms.</p>'],
    ['<h4>Cấu tạo và Nguyên lý</h4>', '<h4>Structure and Principles</h4>'],
    ['<p>Một bộ PLC cơ bản bao gồm: Nguồn (Power Supply), CPU (Central Processing Unit), và các module Input/Output (I/O). Nguyên lý hoạt động dựa trên vòng quét (Scan cycle): Đọc tín hiệu đầu vào -> Thực thi chương trình -> Cập nhật đầu ra.</p>', '<p>A basic PLC consists of: Power Supply, CPU (Central Processing Unit), and Input/Output (I/O) modules. The operating principle is based on a Scan cycle: Read inputs -> Execute program -> Update outputs.</p>'],
    ['<h4>Ứng dụng thực tế</h4>', '<h4>Practical Applications</h4>'],
    ['<li>Điều khiển dây chuyền đóng gói, chiết rót.</li>', '<li>Packaging and filling line control.</li>'],
    ['<li>Hệ thống xử lý nước thải.</li>', '<li>Wastewater treatment systems.</li>'],
    ['<li>Điều khiển robot công nghiệp.</li>', '<li>Industrial robot control.</li>'],
    ['<div class="blog-meta">Tự động hóa • Lựa chọn thiết bị</div>', '<div class="blog-meta">Automation • Equipment Selection</div>'],
    ['<h3 class="blog-title">2. Cách chọn PLC phù hợp cho dự án của bạn</h3>', '<h3 class="blog-title">2. How to choose the right PLC for your project</h3>'],
    ['<p class="blog-excerpt">Lựa chọn sai PLC có thể dẫn đến lãng phí chi phí hoặc hệ thống không đáp ứng đủ công suất. Hướng dẫn chọn PLC dựa trên I/O, tốc độ xử lý và giao thức truyền thông.</p>', '<p class="blog-excerpt">Choosing the wrong PLC can lead to wasted costs or a system that doesn\'t meet capacity. A guide to choosing a PLC based on I/O, processing speed, and communication protocols.</p>'],
    ['<h4>Xác định số lượng I/O</h4>', '<h4>Determine the number of I/Os</h4>'],
    ['<p>Bước đầu tiên là thống kê số lượng tín hiệu vào/ra (Digital/Analog). Dự phòng ít nhất 20% cho việc mở rộng trong tương lai.</p>', '<p>The first step is to count the input/output signals (Digital/Analog). Reserve at least 20% for future expansion.</p>'],
    ['<h4>Khả năng truyền thông</h4>', '<h4>Communication capabilities</h4>'],
    ['<p>Nhà máy của bạn dùng chuẩn gì? Profinet, Modbus TCP/IP hay EtherCAT? PLC được chọn phải hỗ trợ native hoặc qua module mở rộng các giao thức này để kết nối với HMI, SCADA và Biến tần.</p>', '<p>What standard does your plant use? Profinet, Modbus TCP/IP, or EtherCAT? The selected PLC must support these protocols natively or via expansion modules to connect with HMI, SCADA, and Inverters.</p>'],
    ['<div class="blog-meta">Điện công nghiệp</div>', '<div class="blog-meta">Industrial Electrical</div>'],
    ['<h3 class="blog-title">3. Cấu tạo và tiêu chuẩn thiết kế tủ điện điều khiển</h3>', '<h3 class="blog-title">3. Structure and design standards of electrical control panels</h3>'],
    ['<p class="blog-excerpt">Tủ điện điều khiển là nơi chứa đựng các thiết bị đóng cắt và điều khiển. Thiết kế tủ điện cần tuân thủ về tản nhiệt, bố trí layout và tiêu chuẩn IP.</p>', '<p class="blog-excerpt">The electrical control panel houses switching and control devices. Panel design must comply with heat dissipation, layout arrangements, and IP standards.</p>'],
    ['<h4>Vỏ tủ điện</h4>', '<h4>Panel Enclosure</h4>'],
    ['<p>Thường làm bằng tôn sơn tĩnh điện hoặc Inox 304 cho môi trường ăn mòn. Độ dày tiêu chuẩn từ 1.2mm - 2.0mm. Cần chú ý cấp bảo vệ IP (IP54 cho trong nhà, IP65 cho ngoài trời).</p>', '<p>Usually made of powder-coated steel or Inox 304 for corrosive environments. Standard thickness from 1.2mm - 2.0mm. Pay attention to the IP protection class (IP54 for indoor, IP65 for outdoor).</p>'],
    ['<h4>Thiết bị bên trong</h4>', '<h4>Internal Devices</h4>'],
    ['<p>Bao gồm Aptomat (MCB, MCCB), Contactor, Relay nhiệt, PLC, Bộ nguồn 24VDC, Cầu đấu (Terminal). Việc bố trí phải đảm bảo khoảng cách tản nhiệt và dễ dàng đi dây (wiring).</p>', '<p>Includes Circuit Breakers (MCB, MCCB), Contactors, Thermal Relays, PLCs, 24VDC Power Supplies, Terminals. The layout must ensure heat dissipation clearance and easy wiring.</p>'],
    ['<h4 style="color: var(--primary); margin-bottom: 15px;">Các chủ đề khác:</h4>', '<h4 style="color: var(--primary); margin-bottom: 15px;">Other topics:</h4>'],
    ['<li>Quy trình thiết kế tủ điện đạt chuẩn IEC</li>', '<li>Standard IEC electrical panel design process</li>'],
    ['<li>SCADA là gì? Tại sao nhà máy cần hệ thống SCADA?</li>', '<li>What is SCADA? Why do plants need a SCADA system?</li>'],
    ['<li>PLC vs DCS: Khi nào nên dùng DCS?</li>', '<li>PLC vs DCS: When to use DCS?</li>'],
    ['<li>Hệ thống CEMS và quy định lắp đặt</li>', '<li>CEMS systems and installation regulations</li>'],
    ['<li>Quan trắc nước thải tự động (WQMS)</li>', '<li>Automatic wastewater monitoring (WQMS)</li>'],
    ['<li>Thiết kế trạm biến áp cho nhà máy</li>', '<li>Substation design for manufacturing plants</li>'],
    ['<li>MCC và hệ thống điều khiển động cơ</li>', '<li>MCC and motor control systems</li>'],
    ['<h4>Tìm kiếm</h4>', '<h4>Search</h4>'],
    ['<input type="text" placeholder="Tìm kiếm bài viết..." style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px;">', '<input type="text" placeholder="Search articles..." style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 4px;">'],
    ['<h4>Danh Mục Kỹ Thuật</h4>', '<h4>Technical Categories</h4>'],
    ['<li><a href="#">Điện Công Nghiệp (12)</a></li>', '<li><a href="#">Industrial Electrical (12)</a></li>'],
    ['<li><a href="#">Tự Động Hóa PLC/SCADA (10)</a></li>', '<li><a href="#">PLC/SCADA Automation (10)</a></li>'],
    ['<li><a href="#">Quan Trắc Môi Trường (5)</a></li>', '<li><a href="#">Environmental Monitoring (5)</a></li>'],
    ['<li><a href="#">Kiến Thức M&E (3)</a></li>', '<li><a href="#">M&E Knowledge (3)</a></li>'],
    ['<h4 style="color: white; border-color: var(--brand-green);">Cần Tư Vấn Ngay?</h4>', '<h4 style="color: white; border-color: var(--brand-green);">Need Immediate Consultation?</h4>'],
    ['<p style="margin-bottom: 20px; font-size: 0.9rem; color: #e2e8f0;">Liên hệ kỹ sư của chúng tôi để được hỗ trợ miễn phí.</p>', '<p style="margin-bottom: 20px; font-size: 0.9rem; color: #e2e8f0;">Contact our engineers for free support.</p>'],
    ['GỌI: 0364 518 980', 'CALL: (+84) 364 518 980'],
    ['<h2 class="section-title center">Liên Hệ Hợp Tác</h2>', '<h2 class="section-title center">Contact for Cooperation</h2>'],
    ['<h3 style="margin-bottom: 25px; border-bottom: 2px solid var(--brand-green); padding-bottom: 10px; display: inline-block;">Thông Tin Liên Hệ</h3>', '<h3 style="margin-bottom: 25px; border-bottom: 2px solid var(--brand-green); padding-bottom: 10px; display: inline-block;">Contact Information</h3>'],
    ['<p>📍 <strong>Địa chỉ:</strong> Verosa Park, 39 Đường số 10, Khu phố 2, Thủ Đức, TP.HCM</p>', '<p>📍 <strong>Address:</strong> Verosa Park, 39 Street 10, Quarter 2, Thu Duc, HCMC</p>'],
    ['<p>📝 <strong>Mã số thuế:</strong> 0319184714</p>', '<p>📝 <strong>Tax Code:</strong> 0319184714</p>'],
    ['Xem bản đồ (Google Maps)', 'View map (Google Maps)'],
    ['<h3 style="color: var(--primary);">Gửi Yêu Cầu Kỹ Thuật</h3>', '<h3 style="color: var(--primary);">Submit Technical Request</h3>'],
    ['<p style="margin-bottom: 25px; color: var(--text-light);">Vui lòng điền thông tin, kỹ sư của chúng tôi sẽ liên hệ lại trong 24h.</p>', '<p style="margin-bottom: 25px; color: var(--text-light);">Please fill in the information, our engineers will contact you within 24 hours.</p>'],
    ['<input type="text" name="name" placeholder="Họ và tên của bạn" required>', '<input type="text" name="name" placeholder="Your full name" required>'],
    ['<input type="email" name="email" placeholder="Email công ty" required>', '<input type="email" name="email" placeholder="Company email" required>'],
    ['<input type="tel" name="phone" placeholder="Số điện thoại" required>', '<input type="tel" name="phone" placeholder="Phone number" required>'],
    ['<option value="">Chọn dịch vụ quan tâm</option>', '<option value="">Select service of interest</option>'],
    ['<option value="Tư vấn thiết kế tủ điện">Tư vấn thiết kế tủ điện</option>', '<option value="Electrical panel design consulting">Electrical panel design consulting</option>'],
    ['<option value="Hệ thống PLC/SCADA">Hệ thống PLC/SCADA</option>', '<option value="PLC/SCADA systems">PLC/SCADA systems</option>'],
    ['<option value="Quan trắc môi trường">Quan trắc môi trường</option>', '<option value="Environmental monitoring">Environmental monitoring</option>'],
    ['<option value="Bảo trì hệ thống">Bảo trì hệ thống</option>', '<option value="System maintenance">System maintenance</option>'],
    ['<option value="Giải pháp thiết kế và thi công hệ thống điện - điện nhẹ">Giải pháp thiết kế và thi công hệ thống điện - điện nhẹ</option>', '<option value="Electrical & ELV system design and construction">Electrical & ELV system design and construction</option>'],
    ['<option value="Đo lường điều khiển">Đo lường điều khiển</option>', '<option value="Instrumentation and control">Instrumentation and control</option>'],
    ['<textarea name="message" rows="5" placeholder="Mô tả sơ bộ dự án hoặc yêu cầu kỹ thuật..."></textarea>', '<textarea name="message" rows="5" placeholder="Brief description of the project or technical requirements..."></textarea>'],
    ['<button type="submit" class="btn btn-primary" style="width: 100%;">Gửi Yêu Cầu</button>', '<button type="submit" class="btn btn-primary" style="width: 100%;">Submit Request</button>'],
    ['<p style="line-height: 1.8;">Design & Build – Turnkey Engineering Solutions.<br>Đồng hành cùng sự phát triển bền vững của nền công nghiệp Việt Nam.</p>', '<p style="line-height: 1.8;">Design & Build – Turnkey Engineering Solutions.<br>Accompanying the sustainable development of Vietnam\'s industry.</p>'],
    ['<h3>Liên Kết Nhanh</h3>', '<h3>Quick Links</h3>'],
    ['<li><a href="#hero">Trang chủ</a></li>', '<li><a href="#hero">Home</a></li>'],
    ['<li><a href="#about">Giới thiệu</a></li>', '<li><a href="#about">About Us</a></li>'],
    ['<li><a href="#projects">Dự án tiêu biểu</a></li>', '<li><a href="#projects">Featured Projects</a></li>'],
    ['<li><a href="#technical">Tin tức kỹ thuật</a></li>', '<li><a href="#technical">Technical News</a></li>'],
    ['<li><a href="#contact">Liên hệ</a></li>', '<li><a href="#contact">Contact</a></li>'],
    ['<h3>Dịch Vụ Chính</h3>', '<h3>Core Services</h3>'],
    ['<li><a href="#">Quan trắc môi trường</a></li>', '<li><a href="#">Environmental Monitoring</a></li>'],
    ['<li><a href="#">Tổng thầu M&E</a></li>', '<li><a href="#">M&E General Contractor</a></li>'],
    ['<p>&copy; 2023 Hải Lam Engineering & Construction. All Rights Reserved.</p>', '<p>&copy; 2023 Hai Lam Engineering & Construction. All Rights Reserved.</p>']
];

for (const [viText, enText] of translations) {
    enHtml = enHtml.replace(viText, enText);
}

fs.mkdirSync('en', { recursive: true });
fs.writeFileSync('en/index.html', enHtml);

// 3. Update root index.html to redirect to /vi/
const redirectHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/vi/">
    <title>Redirecting to HAILAMEC...</title>
    <script>
        // Check browser language and redirect accordingly
        const lang = navigator.language || navigator.userLanguage;
        if (lang.startsWith('en')) {
            window.location.replace('/en/');
        } else {
            window.location.replace('/vi/');
        }
    </script>
</head>
<body>
    <p>If you are not redirected automatically, follow this <a href="/vi/">link to HAILAMEC</a>.</p>
</body>
</html>`;

fs.writeFileSync('index.html', redirectHtml);

console.log("Bilingual setup complete!");
