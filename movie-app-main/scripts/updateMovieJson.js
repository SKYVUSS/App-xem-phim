const fs = require("fs");
const path = require("path");

// Đường dẫn tới file movies.json
const moviesFilePath = path.join(__dirname, "../src/data/movies.json");

// Đường dẫn tới thư mục media
const mediaFolderPath = path.join(__dirname, "../assets/media");

// Đọc file movies.json
const movies = JSON.parse(fs.readFileSync(moviesFilePath, "utf8"));

// Hàm đọc tất cả các file JSON trong thư mục media
function readAllMediaFiles(folderPath) {
    const mediaData = [];

    // Lấy danh sách các thư mục con và file trong thư mục media
    const entries = fs.readdirSync(folderPath, {withFileTypes: true});

    entries.forEach((entry) => {
        const fullPath = path.join(folderPath, entry.name);

        if (entry.isFile() && entry.name.endsWith(".json")) {
            // Nếu là file JSON, đọc và thêm vào danh sách
            const fileData = JSON.parse(fs.readFileSync(fullPath, "utf8"));
            mediaData.push(...fileData);
        } else if (entry.isDirectory()) {
            // Nếu là thư mục, đệ quy xử lý các file JSON bên trong
            const subFolderData = readAllMediaFiles(fullPath);
            mediaData.push(...subFolderData);
        }
    });

    return mediaData;
}

// Đọc tất cả các file JSON trong thư mục media
const allMediaData = readAllMediaFiles(mediaFolderPath);

// Cập nhật videoUrl trong movies.json bằng cách so sánh theo title
movies.forEach((movie) => {
    const mediaItem = allMediaData.find((item) => item.title === movie.title);
    if (mediaItem) {
        movie.videoUrl = mediaItem.videoUrl;
    }
});

// Ghi lại file movies.json
fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), "utf8");
console.log("movies.json đã được cập nhật thành công!");
