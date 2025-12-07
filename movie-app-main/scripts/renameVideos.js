const fs = require("fs");
const path = require("path");

// ----- CONFIG -----
const videoDir = path.join(__dirname, "../assets/media");
const dataDir = path.join(__dirname, "../src/data");
const logPath = path.join(__dirname, "renamed_videos_log.json");

// ----- UTILS -----

function sanitizeFileName(name) {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/\s+/g, "_") // spaces → _
        .replace(/[()]/g, "") // remove parentheses
        .replace(/[^a-zA-Z0-9_\-\.\/]/g, ""); // remove special chars
}

const renamedList = [];

function walkAndRename(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            walkAndRename(fullPath);
        } else if (file.endsWith(".mp4")) {
            const sanitizedName = sanitizeFileName(file);
            if (sanitizedName !== file) {
                const newPath = path.join(dirPath, sanitizedName);
                fs.renameSync(fullPath, newPath);

                const relativeDir = path.relative(path.join(__dirname, ".."), dirPath);
                renamedList.push({
                    old: path.join(relativeDir, file).replace(/\\/g, "/"),
                    new: path.join(relativeDir, sanitizedName).replace(/\\/g, "/"),
                });

                console.log(`✅ Đã đổi: ${file} → ${sanitizedName}`);
            }
        }
    });
}

function updateJsonFiles() {
    if (renamedList.length === 0) {
        console.log("⚠️ Không có file nào được đổi tên.");
        return;
    }

    const renameMap = {};
    renamedList.forEach(({old, new: newName}) => {
        renameMap[old] = newName;
    });

    const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".json"));

    files.forEach((file) => {
        const filePath = path.join(dataDir, file);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        let updated = false;

        jsonData.forEach((movie) => {
            if (movie.videoUrl && renameMap[movie.videoUrl]) {
                console.log(`🔄 ${movie.videoUrl} → ${renameMap[movie.videoUrl]}`);
                movie.videoUrl = renameMap[movie.videoUrl];
                updated = true;
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
            console.log(`✅ Đã cập nhật JSON: ${file}`);
        }
    });
}

// ----- RUN -----
console.log("🚀 Bắt đầu đổi tên video và cập nhật JSON...");
walkAndRename(videoDir);
fs.writeFileSync(logPath, JSON.stringify(renamedList, null, 2), "utf-8");
console.log(`📝 Đã ghi log vào: ${logPath}`);
updateJsonFiles();
console.log("🎉 Hoàn tất!");
