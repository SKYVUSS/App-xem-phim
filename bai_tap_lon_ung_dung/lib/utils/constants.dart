import 'package:flutter/material.dart';

/// Màu sắc chủ đạo của ứng dụng
class AppColors {
  static const Color primary = Color(0xFF1F1F1F); // Màu chính
  static const Color secondary = Color(0xFFE50914); // Màu phụ
  static const Color background = Color(0xFF121212); // Nền
  static const Color surface = Color(0xFF1E1E1E); // Bề mặt
  static const Color textPrimary = Color(0xFFFFFFFF); // Chữ chính
  static const Color textSecondary = Color(0xFFB3B3B3); // Chữ phụ
  static const Color accentColor = Color(0xFF00D4FF); // Màu nhấn
}

/// Kiểu chữ sử dụng trong ứng dụng
class AppTextStyles {
  static const TextStyle heading1 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle heading2 = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle heading3 = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle bodyLarge = TextStyle(
    fontSize: 16,
    color: AppColors.textPrimary,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontSize: 14,
    color: AppColors.textSecondary,
  );

  static const TextStyle bodySmall = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );
}
