import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import '../utils/constants.dart';

/// Widget hiển thị ảnh phim từ server
///
/// Cách sử dụng:
/// 1. Chạy image_server.js trước khi mở app
/// 2. Android Emulator: dùng 10.0.2.2
/// 3. iOS Simulator: dùng localhost
/// 4. Thiết bị thật: dùng IP máy tính trong mạng LAN
class MovieImage extends StatelessWidget {
  final String posterUrl;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  /// Địa chỉ server media
  /// - Android Emulator: 10.0.2.2 (IP đặc biệt trỏ về localhost máy host)
  /// - iOS Simulator/Web: localhost
  /// - Thiết bị thật: thay bằng IP máy tính (ví dụ: 192.168.1.x)
  static String get baseUrl {
    if (kIsWeb) {
      return 'http://localhost:8888';
    }
    // Android Emulator dùng 10.0.2.2 để truy cập localhost của máy host
    return 'http://10.0.2.2:8888';
  }

  const MovieImage({
    Key? key,
    required this.posterUrl,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final imageUrl =
        '$baseUrl/${Uri.encodeComponent(posterUrl).replaceAll('%2F', '/')}';

    Widget imageWidget = Image.network(
      imageUrl,
      width: width,
      height: height,
      fit: fit,
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return _buildLoading();
      },
      errorBuilder: (context, error, stackTrace) {
        debugPrint('Error loading image: $imageUrl - $error');
        return _buildPlaceholder();
      },
    );

    if (borderRadius != null) {
      return ClipRRect(
        borderRadius: borderRadius!,
        child: imageWidget,
      );
    }

    return imageWidget;
  }

  /// Widget hiển thị khi đang tải ảnh
  Widget _buildLoading() {
    return Container(
      width: width,
      height: height,
      color: AppColors.surface,
      child: const Center(
        child: CircularProgressIndicator(
          color: AppColors.secondary,
          strokeWidth: 2,
        ),
      ),
    );
  }

  /// Widget hiển thị khi lỗi tải ảnh
  Widget _buildPlaceholder() {
    return Container(
      width: width,
      height: height,
      color: AppColors.surface,
      child: Center(
        child: Icon(
          Icons.movie,
          size: (height ?? 100) * 0.4,
          color: AppColors.textSecondary,
        ),
      ),
    );
  }
}
