import 'dart:io';
import 'package:flutter/foundation.dart';

class ImageService {
  // Cho web: dùng http server của React Native (nếu đang chạy)
  // Cho desktop/mobile: dùng file path local

  static String getImagePath(String relativePath) {
    if (kIsWeb) {
      // Trên web, cần có server để serve images
      // Tạm thời return placeholder
      return 'https://via.placeholder.com/300x450?text=Movie';
    } else {
      // Trên desktop/mobile
      final basePath =
          r'C:\Users\Thien\Desktop\bài tập ứng dụng 2\movie-app-main\assets';
      return '$basePath\\${relativePath.replaceAll('/', '\\')}';
    }
  }

  static bool isLocalFile(String path) {
    return !kIsWeb && File(path).existsSync();
  }
}
