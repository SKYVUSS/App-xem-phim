/// Model chứa thông tin người dùng
class User {
  final String email;
  final String password;
  final String? name;
  final List<int> favoriteMovies;

  User({
    required this.email,
    required this.password,
    this.name,
    this.favoriteMovies = const [],
  });

  /// Tạo User từ JSON
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      email: json['email'] ?? '',
      password: json['password'] ?? '',
      name: json['name'],
      favoriteMovies: List<int>.from(json['favoriteMovies'] ?? []),
    );
  }

  /// Chuyển User thành JSON
  Map<String, dynamic> toJson() => {
        'email': email,
        'password': password,
        'name': name,
        'favoriteMovies': favoriteMovies,
      };
}
