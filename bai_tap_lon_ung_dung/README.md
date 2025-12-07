# Movie App - Ứng Dụng Xem Phim

Ứng dụng xem phim được xây dựng bằng **Flutter/Dart**, cho phép người dùng duyệt, tìm kiếm và xem trailer các bộ phim.

### Tính Năng

### Tính năng chính:
- **Trang chủ** với banner carousel tự động cuộn
- **Danh sách phim** theo các danh mục: Xu Hướng, Phổ Biến, Đề Xuất
- **Tìm kiếm phim** theo tên
- **Xem chi tiết phim**: thông tin, thể loại, diễn viên, đạo diễn
- **Xem Trailer** video cho mỗi phim
- **Đăng ký/Đăng nhập** tài khoản
- **Danh sách yêu thích** - lưu phim yêu thích
- **Hồ sơ người dùng**

### Công nghệ sử dụng:
- **Flutter** - Framework UI đa nền tảng
- **Dart** - Ngôn ngữ lập trình
- **video_player** & **chewie** - Phát video
- **shared_preferences** - Lưu trữ dữ liệu local
- **Node.js** - Media Server

### Cài Đặt & Chạy

### Yêu cầu hệ thống:
- **Flutter SDK** >= 3.0.6
- **Dart SDK** >= 3.0.0
- **Node.js** >= 14.0 (để chạy media server)
- Android Studio / VS Code
- Android Emulator hoặc thiết bị thật

### Bước 1: Clone project
```bash
git clone <repository-url>
```

### Bước 2: Cấu trúc thư mục
Đảm bảo cấu trúc thư mục như sau:
```
📁 thư-mục-gốc/
├── 📁 bai_tap_lon_ung_dung/    # Flutter project
│   ├── lib/
│   ├── assets/
│   ├── image_server.js         # Media server
│   └── ...
└── 📁 movie-app-main/          # Thư mục chứa media assets
    └── assets/
        └── media/              # Ảnh và video phim
```

> **Quan trọng:** Thư mục `movie-app-main` phải nằm cùng cấp với thư mục `bai_tap_lon_ung_dung`

### Bước 3: Cài đặt Flutter dependencies
```bash
cd bai_tap_lon_ung_dung
flutter pub get
```

### Bước 4: Chạy Media Server
Mở một terminal mới và chạy:
```bash
cd bai_tap_lon_ung_dung
node image_server.js
```

Bạn sẽ thấy output:
```
==================================================
 Media Server - Nhóm 8
==================================================
📁 Thư mục assets: .../movie-app-main/assets
🌐 Server đang chạy tại: http://localhost:8888
==================================================
```

> **Lưu ý:** 
> - Server phải chạy **trước** khi mở app Flutter
> - Nếu thư mục assets khác, dùng: `ASSETS_PATH=/đường/dẫn/assets node image_server.js`

### Bước 5: Chạy ứng dụng Flutter
Mở terminal khác:
```bash
# Kiểm tra thiết bị
flutter devices

# Chạy trên Android Emulator
flutter run -d emulator-5554

# Hoặc chạy trên Chrome (web)
flutter run -d chrome

# Hoặc chạy trên thiết bị Android kết nối
flutter run
```

### Xử lý lỗi thường gặp

**1. Lỗi "Cleartext HTTP traffic not permitted":**
- Đã được cấu hình sẵn trong `android/app/src/main/AndroidManifest.xml`
- Nếu vẫn gặp lỗi, kiểm tra: `android:usesCleartextTraffic="true"`

**2. Ảnh/Video không load:**
- Kiểm tra media server đang chạy (`node image_server.js`)
- Kiểm tra đường dẫn thư mục assets đúng
- Trên Android Emulator, app sử dụng `http://10.0.2.2:8888`
- Trên Web/iOS, app sử dụng `http://localhost:8888`

**3. Lỗi cổng 8888 đã được sử dụng:**
- Tắt process đang dùng cổng hoặc restart máy

### Cấu Trúc Thư Mục

```
lib/
├── main.dart                 # Entry point
├── models/
│   ├── movie.dart           # Model phim
│   └── user.dart            # Model người dùng
├── screens/
│   ├── home_screen.dart     # Màn hình trang chủ
│   ├── detail_screen.dart   # Màn hình chi tiết phim
│   ├── search_screen.dart   # Màn hình tìm kiếm
│   ├── favorite_screen.dart # Màn hình yêu thích
│   ├── profile_screen.dart  # Màn hình hồ sơ
│   ├── login_screen.dart    # Màn hình đăng nhập
│   └── register_screen.dart # Màn hình đăng ký
├── services/
│   ├── movie_service.dart   # Service quản lý phim
│   └── auth_service.dart    # Service xác thực
├── widgets/
│   ├── movie_image.dart     # Widget hiển thị ảnh phim
│   ├── movie_card.dart      # Widget card phim
│   └── video_player_widget.dart # Widget phát video trailer
├── utils/
│   └── constants.dart       # Hằng số, màu sắc, styles
└── assets/
    └── movies.json          # Dữ liệu phim
```

### Screenshots

| Trang Chủ | Chi Tiết Phim | Xem Trailer |
|-----------|---------------|-------------|
| Banner carousel, danh sách phim | Thông tin chi tiết, poster | Video player với controls |

### Ghi Chú Kỹ Thuật

- **Media Server:** App cần media server (Node.js) để phục vụ ảnh và video
- **HTTP Traffic:** Android yêu cầu cấu hình `usesCleartextTraffic` cho HTTP
- **Platform Detection:** App tự động detect platform để dùng đúng địa chỉ server
  - Android Emulator: `10.0.2.2:8888` 
  - Web/iOS: `localhost:8888`
- **Dữ liệu:** Phim được lưu trong `assets/movies.json`

### Tác Giả

**Nhóm 8** - Bài tập lớn môn Đa nền tảng

### License

MIT License
