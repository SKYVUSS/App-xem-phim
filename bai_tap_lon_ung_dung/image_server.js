/**
 * HTTP Server phục vụ file media (hình ảnh và video)
 * Server này cung cấp endpoint để Flutter app có thể load ảnh và video
 * 
 * Cách sử dụng:
 * 1. Mở terminal trong thư mục chứa file này
 * 2. Chạy: node image_server.js
 * 3. Server sẽ chạy trên cổng 8888
 * 
 * Tác giả: Nhóm 8 - Bài tập lớn môn Đa nền tảng
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Cổng server
const PORT = 8888;

// Đường dẫn thư mục assets - sử dụng đường dẫn tương đối
// Mặc định: thư mục assets của React Native project cùng cấp
const ASSETS_PATH = process.env.ASSETS_PATH || path.join(__dirname, '..', 'movie-app-main', 'assets');

// MIME types cho các loại file
const MIME_TYPES = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
};

/**
 * Xử lý request từ client
 */
function handleRequest(req, res) {
    // Cho phép CORS (Cross-Origin Resource Sharing)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Xử lý preflight request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Chỉ cho phép GET request
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    // Lấy đường dẫn file từ URL
    const urlPath = decodeURIComponent(req.url);
    const filePath = path.join(ASSETS_PATH, urlPath);

    // Kiểm tra file có tồn tại không
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            console.log(`[404] File không tồn tại: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File Not Found');
            return;
        }

        // Lấy MIME type từ extension
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

        // Đọc và trả về file
        const readStream = fs.createReadStream(filePath);
        
        res.writeHead(200, {
            'Content-Type': mimeType,
            'Content-Length': stats.size,
            'Cache-Control': 'public, max-age=3600', // Cache 1 giờ
        });

        readStream.pipe(res);

        readStream.on('error', (error) => {
            console.error(`[ERROR] Lỗi đọc file: ${error.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        });

        console.log(`[200] ${mimeType}: ${urlPath}`);
    });
}

// Tạo và khởi động server
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🎬 Media Server - Nhóm 8');
    console.log('='.repeat(50));
    console.log(`📁 Thư mục assets: ${ASSETS_PATH}`);
    console.log(`🌐 Server đang chạy tại: http://localhost:${PORT}`);
    console.log('');
    console.log('Cách truy cập:');
    console.log(`  - Trên trình duyệt/Web: http://localhost:${PORT}/media/...`);
    console.log(`  - Trên Android Emulator: http://10.0.2.2:${PORT}/media/...`);
    console.log(`  - Trên iOS Simulator: http://localhost:${PORT}/media/...`);
    console.log('');
    console.log('💡 Tip: Đặt biến môi trường ASSETS_PATH để thay đổi thư mục assets');
    console.log('   Ví dụ: ASSETS_PATH=/path/to/assets node image_server.js');
    console.log('='.repeat(50));
});

// Xử lý lỗi server
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Cổng ${PORT} đã được sử dụng. Vui lòng đóng ứng dụng đang dùng cổng này hoặc đổi cổng khác.`);
    } else {
        console.error('❌ Lỗi server:', error.message);
    }
    process.exit(1);
});

// Xử lý tắt server
process.on('SIGINT', () => {
    console.log('\n👋 Đang tắt server...');
    server.close(() => {
        console.log('✅ Server đã tắt.');
        process.exit(0);
    });
});
