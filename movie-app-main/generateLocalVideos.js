const fs = require("fs");
const path = require("path");

// Đường dẫn tới file movies.json
const moviesFilePath = path.join(__dirname, "/src/data/movies.json");

// Đường dẫn tới file localVideo.js
const localVideoFilePath = path.join(__dirname, "/src/utils/localVideos.js");

// Đọc file movies.json
const movies = JSON.parse(fs.readFileSync(moviesFilePath, "utf8"));

// Tạo đối tượng localVideos từ videoUrl
const localVideos = movies
    .filter((movie) => movie.videoUrl) // Lọc các mục có videoUrl
    .reduce((acc, movie) => {
        const videoPath = movie.videoUrl;
        acc[videoPath] = `require("../../assets/${videoPath}")`;
        return acc;
    }, {});

// Tạo nội dung file localVideo.js
const localVideoContent = `export const localVideos = ${JSON.stringify(localVideos, null, 2).replace(/"require\((.*?)\)"/g, "require($1)")};`;

// Ghi vào file localVideo.js
fs.writeFileSync(localVideoFilePath, localVideoContent, "utf8");

console.log("localVideos.js đã được tạo thành công!");
