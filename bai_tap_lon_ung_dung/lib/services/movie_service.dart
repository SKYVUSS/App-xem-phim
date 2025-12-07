import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/movie.dart';

/// Service quản lý dữ liệu phim
class MovieService {
  static List<Movie> _movies = [];

  /// Lấy danh sách tất cả phim từ file JSON
  static Future<List<Movie>> getMovies() async {
    if (_movies.isNotEmpty) return _movies;

    try {
      final String response = await rootBundle.loadString('assets/movies.json');
      final List<dynamic> data = jsonDecode(response);
      _movies = data.map((json) => Movie.fromJson(json)).toList();
      return _movies;
    } catch (e) {
      print('Error loading movies: $e');
      return [];
    }
  }

  /// Lấy phim theo ID
  static Movie? getMovieById(int id) {
    try {
      return _movies.firstWhere((movie) => movie.id == id);
    } catch (e) {
      return null;
    }
  }

  /// Tìm kiếm phim theo tên hoặc mô tả
  static List<Movie> searchMovies(String query) {
    if (query.isEmpty) return _movies;
    return _movies
        .where((movie) =>
            movie.title.toLowerCase().contains(query.toLowerCase()) ||
            movie.description.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }

  /// Lấy phim theo thể loại
  static List<Movie> getMoviesByGenre(String genre) {
    return _movies
        .where((movie) => movie.genres
            .any((g) => g.toLowerCase().contains(genre.toLowerCase())))
        .toList();
  }

  /// Lấy phim xu hướng (rating >= 7.0)
  static List<Movie> getTrendingMovies() {
    return _movies.where((movie) => double.parse(movie.rating) >= 7.0).toList();
  }

  /// Lấy 10 phim phổ biến
  static List<Movie> getPopularMovies() {
    return _movies.take(10).toList();
  }

  /// Lấy 10 phim đề xuất
  static List<Movie> getRecommendedMovies() {
    return _movies.skip(10).take(10).toList();
  }
}
