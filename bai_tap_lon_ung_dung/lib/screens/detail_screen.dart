import 'package:flutter/material.dart';
import '../models/movie.dart';
import '../services/auth_service.dart';
import '../utils/constants.dart';
import '../widgets/movie_image.dart';
import '../widgets/video_player_widget.dart';

/// Màn hình chi tiết phim
class DetailScreen extends StatefulWidget {
  final Movie movie;

  const DetailScreen({
    Key? key,
    required this.movie,
  }) : super(key: key);

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  bool _isFavorite = false;

  @override
  void initState() {
    super.initState();
    _checkIfFavorite();
  }

  Future<void> _checkIfFavorite() async {
    final user = await AuthService.getCurrentUser();
    if (user != null) {
      setState(() {
        _isFavorite = user.favoriteMovies.contains(widget.movie.id);
      });
    }
  }

  Future<void> _toggleFavorite() async {
    try {
      if (_isFavorite) {
        await AuthService.removeFavorite(widget.movie.id);
      } else {
        await AuthService.addFavorite(widget.movie.id);
      }
      setState(() {
        _isFavorite = !_isFavorite;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            _isFavorite
                ? 'Thêm vào danh sách yêu thích'
                : 'Xóa khỏi danh sách yêu thích',
          ),
          duration: const Duration(seconds: 2),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Vui lòng đăng nhập để lưu phim yêu thích'),
        ),
      );
    }
  }

  void _playTrailer() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => VideoPlayerWidget(
          videoUrl: widget.movie.videoUrl,
          title: widget.movie.title,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: Text(widget.movie.title),
        actions: [
          IconButton(
            icon: Icon(
              _isFavorite ? Icons.favorite : Icons.favorite_border,
              color: AppColors.secondary,
            ),
            onPressed: _toggleFavorite,
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Ảnh poster và nút phát trailer
            Stack(
              children: [
                SizedBox(
                  height: 300,
                  width: double.infinity,
                  child: MovieImage(
                    posterUrl: widget.movie.posterUrl,
                    fit: BoxFit.cover,
                  ),
                ),
                // Lớp phủ gradient
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.black.withOpacity(0.7),
                        ],
                      ),
                    ),
                  ),
                ),
                // Nút phát
                Positioned.fill(
                  child: Center(
                    child: GestureDetector(
                      onTap: _playTrailer,
                      child: Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                          color: AppColors.secondary.withOpacity(0.9),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.play_arrow,
                          color: Colors.white,
                          size: 40,
                        ),
                      ),
                    ),
                  ),
                ),
                // Nhãn Xem Trailer
                Positioned(
                  bottom: 16,
                  left: 16,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.secondary,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'Xem Trailer',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Tên phim
                  Text(
                    widget.movie.title,
                    style: AppTextStyles.heading1,
                  ),
                  const SizedBox(height: 8),
                  // Điểm đánh giá & Năm
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: AppColors.secondary,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          widget.movie.rating,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        widget.movie.year,
                        style: AppTextStyles.bodyLarge,
                      ),
                      const SizedBox(width: 12),
                      Text(
                        widget.movie.duration,
                        style: AppTextStyles.bodyLarge,
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Thể loại
                  Text(
                    'Thể loại',
                    style: AppTextStyles.heading3,
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    children: widget.movie.genres
                        .map(
                          (genre) => Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.surface,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: AppColors.accentColor,
                              ),
                            ),
                            child: Text(
                              genre,
                              style: const TextStyle(
                                color: AppColors.accentColor,
                                fontSize: 12,
                              ),
                            ),
                          ),
                        )
                        .toList(),
                  ),
                  const SizedBox(height: 16),
                  // Mô tả
                  Text(
                    'Mô tả',
                    style: AppTextStyles.heading3,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.movie.description,
                    style: AppTextStyles.bodyMedium,
                  ),
                  const SizedBox(height: 16),
                  // Quốc gia
                  Text(
                    'Quốc gia: ${widget.movie.country}',
                    style: AppTextStyles.bodyLarge,
                  ),
                  const SizedBox(height: 8),
                  // Đạo diễn
                  if (widget.movie.directors.isNotEmpty) ...[
                    Text(
                      'Đạo diễn: ${widget.movie.directors.join(', ')}',
                      style: AppTextStyles.bodyLarge,
                    ),
                    const SizedBox(height: 8),
                  ],
                  // Diễn viên
                  if (widget.movie.actors.isNotEmpty) ...[
                    Text(
                      'Diễn viên',
                      style: AppTextStyles.heading3,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      widget.movie.actors.join(', '),
                      style: AppTextStyles.bodyMedium,
                    ),
                  ],
                  const SizedBox(height: 24),
                  // Nút xem phim
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.secondary,
                      ),
                      onPressed: _playTrailer,
                      icon: const Icon(Icons.play_circle_fill,
                          color: Colors.white),
                      label: const Text(
                        'Xem Trailer',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
