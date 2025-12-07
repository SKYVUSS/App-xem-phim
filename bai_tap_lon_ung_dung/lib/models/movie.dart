/// Model chứa thông tin phim
class Movie {
  final int id;
  final String title;
  final String rating;
  final String year;
  final List<String> genres;
  final String description;
  final String duration;
  final String country;
  final List<String> directors;
  final List<String> actors;
  final String videoUrl;
  final String posterUrl;
  final String? views;

  Movie({
    required this.id,
    required this.title,
    required this.rating,
    required this.year,
    required this.genres,
    required this.description,
    required this.duration,
    required this.country,
    required this.directors,
    required this.actors,
    required this.videoUrl,
    required this.posterUrl,
    this.views,
  });

  /// Tạo Movie từ JSON
  factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      id: json['id'] ?? 0,
      title: json['title'] ?? '',
      rating: json['rating'] ?? '0.0',
      year: json['year'] ?? '',
      genres: List<String>.from(json['genres'] ?? []),
      description: json['description'] ?? '',
      duration: json['duration'] ?? '',
      country: json['country'] ?? '',
      directors: List<String>.from(json['directors'] ?? []),
      actors: List<String>.from(json['actors'] ?? []),
      videoUrl: json['videoUrl'] ?? '',
      posterUrl: json['posterUrl'] ?? '',
      views: json['views'],
    );
  }

  /// Chuyển Movie thành JSON
  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'rating': rating,
        'year': year,
        'genres': genres,
        'description': description,
        'duration': duration,
        'country': country,
        'directors': directors,
        'actors': actors,
        'videoUrl': videoUrl,
        'posterUrl': posterUrl,
        'views': views,
      };
}
