import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

/// Service xác thực người dùng
class AuthService {
  static const String _usersKey = 'registered_users';
  static const String _loggedInUserKey = 'logged_in_user';

  /// Đăng ký tài khoản mới
  static Future<void> register(String email, String password,
      {String? name}) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final String? usersJson = prefs.getString(_usersKey);

      List<User> users = [];
      if (usersJson != null) {
        final List<dynamic> decoded = jsonDecode(usersJson);
        users = decoded.map((u) => User.fromJson(u)).toList();
      }

      // Kiểm tra email đã tồn tại
      if (users.any((u) => u.email == email)) {
        throw Exception('Email đã được đăng ký.');
      }

      final newUser = User(
        email: email,
        password: password,
        name: name,
        favoriteMovies: [],
      );

      users.add(newUser);

      final usersEncoded = jsonEncode(users.map((u) => u.toJson()).toList());
      await prefs.setString(_usersKey, usersEncoded);

      // Tự động đăng nhập sau khi đăng ký
      await login(email, password);
    } catch (e) {
      rethrow;
    }
  }

  /// Đăng nhập
  static Future<User> login(String email, String password) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final String? usersJson = prefs.getString(_usersKey);

      List<User> users = [];
      if (usersJson != null) {
        final List<dynamic> decoded = jsonDecode(usersJson);
        users = decoded.map((u) => User.fromJson(u)).toList();
      }

      final user = users.firstWhere(
        (u) => u.email == email && u.password == password,
        orElse: () => throw Exception('Email hoặc mật khẩu không đúng.'),
      );

      final userJson = jsonEncode(user.toJson());
      await prefs.setString(_loggedInUserKey, userJson);

      return user;
    } catch (e) {
      rethrow;
    }
  }

  /// Lấy thông tin người dùng hiện tại
  static Future<User?> getCurrentUser() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final String? userJson = prefs.getString(_loggedInUserKey);

      if (userJson == null) return null;

      final Map<String, dynamic> decoded = jsonDecode(userJson);
      return User.fromJson(decoded);
    } catch (e) {
      return null;
    }
  }

  /// Đăng xuất
  static Future<void> logout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_loggedInUserKey);
    } catch (e) {
      rethrow;
    }
  }

  /// Thêm phim vào danh sách yêu thích
  static Future<void> addFavorite(int movieId) async {
    try {
      final user = await getCurrentUser();
      if (user == null) throw Exception('Chưa đăng nhập');

      final prefs = await SharedPreferences.getInstance();
      final String? usersJson = prefs.getString(_usersKey);

      List<User> users = [];
      if (usersJson != null) {
        final List<dynamic> decoded = jsonDecode(usersJson);
        users = decoded.map((u) => User.fromJson(u)).toList();
      }

      final userIndex = users.indexWhere((u) => u.email == user.email);
      if (userIndex != -1) {
        if (!users[userIndex].favoriteMovies.contains(movieId)) {
          users[userIndex].favoriteMovies.add(movieId);
          final usersEncoded =
              jsonEncode(users.map((u) => u.toJson()).toList());
          await prefs.setString(_usersKey, usersEncoded);

          // Cập nhật user hiện tại
          final userJson = jsonEncode(users[userIndex].toJson());
          await prefs.setString(_loggedInUserKey, userJson);
        }
      }
    } catch (e) {
      rethrow;
    }
  }

  /// Xóa phim khỏi danh sách yêu thích
  static Future<void> removeFavorite(int movieId) async {
    try {
      final user = await getCurrentUser();
      if (user == null) throw Exception('Chưa đăng nhập');

      final prefs = await SharedPreferences.getInstance();
      final String? usersJson = prefs.getString(_usersKey);

      List<User> users = [];
      if (usersJson != null) {
        final List<dynamic> decoded = jsonDecode(usersJson);
        users = decoded.map((u) => User.fromJson(u)).toList();
      }

      final userIndex = users.indexWhere((u) => u.email == user.email);
      if (userIndex != -1) {
        users[userIndex].favoriteMovies.removeWhere((id) => id == movieId);
        final usersEncoded = jsonEncode(users.map((u) => u.toJson()).toList());
        await prefs.setString(_usersKey, usersEncoded);

        // Cập nhật user hiện tại
        final userJson = jsonEncode(users[userIndex].toJson());
        await prefs.setString(_loggedInUserKey, userJson);
      }
    } catch (e) {
      rethrow;
    }
  }
}
