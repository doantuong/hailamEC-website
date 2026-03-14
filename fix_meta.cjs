const fs = require('fs');

// Fix VI
let viHtml = fs.readFileSync('vi/index.html', 'utf8');
viHtml = viHtml.replace('<title>HAILAMEC | Industrial Automation & Electrical Engineering Contractor Vietnam</title>', '<title>HAILAMEC | Nhà thầu Cơ điện & Tự động hóa Công nghiệp tại Việt Nam</title>');
viHtml = viHtml.replace('<meta name="description" content="HAILAMEC is a leading EPC contractor in Vietnam providing industrial automation, instrumentation engineering, electrical engineering, and environmental & wastewater monitoring systems (CEMS).">', '<meta name="description" content="HAILAMEC là nhà thầu EPC hàng đầu tại Việt Nam cung cấp các giải pháp tự động hóa công nghiệp, kỹ thuật đo lường, cơ điện và hệ thống quan trắc môi trường (CEMS).">');
viHtml = viHtml.replace('<meta name="keywords" content="industrial automation Vietnam, instrumentation engineering Vietnam, electrical engineering contractor Vietnam, industrial control system, CEMS monitoring system, wastewater monitoring system, flow measurement instrumentation, PLC automation solutions">', '<meta name="keywords" content="tự động hóa công nghiệp, kỹ thuật đo lường, nhà thầu cơ điện, hệ thống điều khiển công nghiệp, hệ thống quan trắc CEMS, quan trắc nước thải, thiết bị đo lưu lượng, giải pháp tự động hóa PLC">');
viHtml = viHtml.replace('<meta property="og:title" content="HAILAMEC | Industrial Automation & Electrical Engineering Contractor Vietnam">', '<meta property="og:title" content="HAILAMEC | Nhà thầu Cơ điện & Tự động hóa Công nghiệp tại Việt Nam">');
viHtml = viHtml.replace('<meta property="og:description" content="HAILAMEC is a leading EPC contractor in Vietnam providing industrial automation, instrumentation engineering, electrical engineering, and environmental & wastewater monitoring systems (CEMS).">', '<meta property="og:description" content="HAILAMEC là nhà thầu EPC hàng đầu tại Việt Nam cung cấp các giải pháp tự động hóa công nghiệp, kỹ thuật đo lường, cơ điện và hệ thống quan trắc môi trường (CEMS).">');
viHtml = viHtml.replace('<meta name="twitter:title" content="HAILAMEC | Industrial Automation & Electrical Engineering Contractor Vietnam">', '<meta name="twitter:title" content="HAILAMEC | Nhà thầu Cơ điện & Tự động hóa Công nghiệp tại Việt Nam">');
viHtml = viHtml.replace('<meta name="twitter:description" content="HAILAMEC is a leading EPC contractor in Vietnam providing industrial automation, instrumentation engineering, electrical engineering, and environmental & wastewater monitoring systems (CEMS).">', '<meta name="twitter:description" content="HAILAMEC là nhà thầu EPC hàng đầu tại Việt Nam cung cấp các giải pháp tự động hóa công nghiệp, kỹ thuật đo lường, cơ điện và hệ thống quan trắc môi trường (CEMS).">');
viHtml = viHtml.replace('"url": "https://hailamec.com/",', '"url": "https://hailamec.com/vi/",');
fs.writeFileSync('vi/index.html', viHtml);

// Fix EN
let enHtml = fs.readFileSync('en/index.html', 'utf8');
enHtml = enHtml.replace('"url": "https://hailamec.com/",', '"url": "https://hailamec.com/en/",');
fs.writeFileSync('en/index.html', enHtml);

console.log("Meta tags fixed!");
