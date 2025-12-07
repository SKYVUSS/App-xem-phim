import 'package:flutter/material.dart';
import '../models/movie.dart';
import '../services/movie_service.dart';
import '../utils/constants.dart';
import '../widgets/movie_image.dart';

/// Màn hình trang chủ
class HomeScreen extends StatefulWidget {
  final Function(Movie) onMovieTap;

  const HomeScreen({
    Key? key,
    required this.onMovieTap,
  }) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Movie>> _moviesFuture;
  List<Movie> _allMovies = [];
  int _currentBannerIndex = 0;
  final PageController _pageController = PageController();

  @override
  void initState() {
    super.initState();
    _moviesFuture = MovieService.getMovies().then((movies) {
      _allMovies = movies;
      return movies;
    });

    // Tự động cuộn banner sau 3 giây
    Future.delayed(const Duration(seconds: 3), () {
      _startAutoScroll();
    });
  }

  void _startAutoScroll() {
    Future.doWhile(() async {
      await Future.delayed(const Duration(seconds: 5));
      if (!mounted) return false;
      if (_allMovies.isNotEmpty && _pageController.hasClients) {
        final nextIndex = (_currentBannerIndex + 1) % 5;
        _pageController.animateToPage(
          nextIndex,
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
        );
      }
      return true;
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: FutureBuilder<List<Movie>>(
          future: _moviesFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(
                  color: AppColors.secondary,
                ),
              );
            }

            if (snapshot.hasError) {
              return Center(
                child: Text('Lỗi: ${snapshot.error}'),
              );
            }

            final movies = snapshot.data ?? [];
            final bannerMovies = movies.take(5).toList();
            final trendingMovies = MovieService.getTrendingMovies();
            final popularMovies = MovieService.getPopularMovies();

            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Tiêu đề
                  const Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Text(
                      'Movie App',
                      style: TextStyle(
                        color: AppColors.secondary,
                        fontWeight: FontWeight.bold,
                        fontSize: 24,
                      ),
                    ),
                  ),

                  // Banner trượt
                  SizedBox(
                    height: 300,
                    child: PageView.builder(
                      controller: _pageController,
                      itemCount: bannerMovies.length,
                      onPageChanged: (index) {
                        setState(() {
                          _currentBannerIndex = index;
                        });
                      },
                      itemBuilder: (context, index) {
                        final movie = bannerMovies[index];
                        return _buildBannerItem(movie);
                      },
                    ),
                  ),

                  // Chỉ thị banner
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      bannerMovies.length,
                      (index) => Container(
                        margin: const EdgeInsets.symmetric(
                            horizontal: 4, vertical: 8),
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: index == _currentBannerIndex
                              ? AppColors.secondary
                              : AppColors.textSecondary,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Xu Hướng Section
                  _buildMovieSection('Xu Hướng', trendingMovies),

                  const SizedBox(height: 16),

                  // Phổ Biến Section
                  _buildMovieSection('Phổ Biến', popularMovies),

                  const SizedBox(height: 16),

                  // Đề Xuất Section
                  _buildMovieSection(
                      'Đề Xuất Cho Bạn', MovieService.getRecommendedMovies()),

                  const SizedBox(height: 100),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildBannerItem(Movie movie) {
    return GestureDetector(
      onTap: () => widget.onMovieTap(movie),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: AppColors.surface,
        ),
        child: Column(
          children: [
            // Ảnh banner
            Expanded(
              child: ClipRRect(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
                child: MovieImage(
                  posterUrl: movie.posterUrl,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            // Tên phim & Nút xem
            Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    movie.title,
                    style: AppTextStyles.heading2,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () => widget.onMovieTap(movie),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.secondary,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                    icon: const Icon(Icons.play_arrow, color: Colors.white),
                    label: const Text(
                      'Xem Ngay',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
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

  Widget _buildMovieSection(String title, List<Movie> movies) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            title,
            style: AppTextStyles.heading2,
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 180,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 8),
            itemCount: movies.length,
            itemBuilder: (context, index) {
              final movie = movies[index];
              return _buildMovieCard(movie);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildMovieCard(Movie movie) {
    return GestureDetector(
      onTap: () => widget.onMovieTap(movie),
      child: Container(
        width: 120,
        margin: const EdgeInsets.symmetric(horizontal: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          color: AppColors.surface,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Ảnh poster
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(8),
                    topRight: Radius.circular(8),
                  ),
                  child: MovieImage(
                    posterUrl: movie.posterUrl,
                    height: 120,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 6,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.secondary,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      movie.rating,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 10,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            // Thông tin phim
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      movie.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: AppColors.textPrimary,
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
