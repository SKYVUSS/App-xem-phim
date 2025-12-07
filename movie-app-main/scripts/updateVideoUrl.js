const fs = require("fs");
const path = require("path");

// Đường dẫn đến file JSON và thư mục media
const jsonFilePath = path.join(__dirname, "..", "assets", "media", "De xuat cho ban", "dexuatchoban.json");
const mediaFolderPath = path.join(__dirname, "..", "assets", "media", "De xuat cho ban");

// Đọc file JSON
let data = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

// Lấy danh sách tất cả các file .mp4 trong thư mục media
const videoFiles = {};
const getAllVideoFiles = (dirPath) => {
    fs.readdirSync(dirPath).forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllVideoFiles(fullPath);
        } else if (file.endsWith(".mp4")) {
            videoFiles[file.toLowerCase()] = path.relative(mediaFolderPath, fullPath).replace(/\\/g, "/");
        }
    });
};
getAllVideoFiles(mediaFolderPath);

// Cập nhật các trường videoUrl trong JSON
data.forEach((movie) => {
    const videoName = path.basename(movie.videoUrl).toLowerCase(); // Lấy tên file từ videoUrl
    if (videoFiles[videoName]) {
        movie.videoUrl = `media/De xuat cho ban/${videoFiles[videoName]}`;
    }
});

// Ghi lại file JSON sau khi cập nhật
fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 4), "utf8");

console.log("Cập nhật videoUrl thành công!");
