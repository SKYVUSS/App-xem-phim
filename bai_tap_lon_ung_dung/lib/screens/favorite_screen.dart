import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../services/movie_service.dart';
import '../utils/constants.dart';
import '../widgets/movie_grid.dart';

class FavoriteScreen extends StatefulWidget {
  const FavoriteScreen({Key? key}) : super(key: key);

  @override
  State<FavoriteScreen> createState() => _FavoriteScreenState();
}

class _FavoriteScreenState extends State<FavoriteScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        elevation: 0,
        title: const Text(
          'Yêu thích',
          style: TextStyle(
            color: AppColors.secondary,
            fontWeight: FontWeight.bold,
            fontSize: 24,
          ),
        ),
      ),
      body: FutureBuilder(
        future: AuthService.getCurrentUser(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(
                color: AppColors.secondary,
              ),
            );
          }

          if (!snapshot.hasData || snapshot.data == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.login,
                    size: 64,
                    color: AppColors.textSecondary,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Vui lòng đăng nhập',
                    style: AppTextStyles.heading2,
                  ),
                ],
              ),
            );
          }

          final user = snapshot.data!;
          final favoriteMovieIds = user.favoriteMovies;

          if (favoriteMovieIds.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.favorite_border,
                    size: 64,
                    color: AppColors.textSecondary,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Chưa có phim yêu thích',
                    style: AppTextStyles.heading2,
                  ),
                ],
              ),
            );
          }

          return FutureBuilder(
            future: MovieService.getMovies(),
            builder: (context, moviesSnapshot) {
              if (moviesSnapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: CircularProgressIndicator(
                    color: AppColors.secondary,
                  ),
                );
              }

              final allMovies = moviesSnapshot.data ?? [];
              final favoriteMovies = allMovies
                  .where((movie) => favoriteMovieIds.contains(movie.id))
                  .toList();

              return MovieGrid(
                movies: favoriteMovies,
                onMovieTap: (movie) {
                  // Navigate to detail screen
                  Navigator.pushNamed(context, '/detail', arguments: movie);
                },
              );
            },
          );
        },
      ),
    );
  }
}
