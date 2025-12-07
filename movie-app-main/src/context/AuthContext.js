import React, {createContext, useContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const USERS_KEY = "registered_users";
const LOGGED_IN_USER_KEY = "logged_in_user";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); // Mảng chứa tất cả user đã đăng ký

    // Load dữ liệu từ AsyncStorage khi khởi động app
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem(USERS_KEY);
                const storedLoggedInUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);

                if (storedUsers) setUsers(JSON.parse(storedUsers));
                if (storedLoggedInUser) setUser(JSON.parse(storedLoggedInUser));
            } catch (error) {
                console.error("Lỗi khi load dữ liệu:", error);
            }
        };

        loadData();
    }, []);

    // Đăng ký
    const register = async (newUser) => {
        try {
            console.log("newUser:", newUser);

            // Kiểm tra email đã tồn tại chưa
            const exists = users.some((u) => u.email === newUser.email);
            if (exists) throw new Error("Email đã được đăng ký.");

            // Thêm mảng favoriteMovies vào user mới
            const userWithFavorites = {
                ...newUser,
                favoriteMovies: [],
            };

            // Cập nhật danh sách users
            const updatedUsers = [...users, userWithFavorites];
            console.log("updatedUsers:", updatedUsers);

            // Lưu vào AsyncStorage
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

            // Cập nhật state
            setUsers(updatedUsers);

            // Đăng nhập luôn với danh sách mới
            await loginWithUsers(newUser.email, newUser.password, updatedUsers);
        } catch (err) {
            console.error("Lỗi trong register:", err.message);
            throw err;
        }
    };

    // Đăng nhập (bình thường)
    const login = async (email, password) => {
        await loginWithUsers(email, password, users);
    };

    // Đăng nhập với custom danh sách user (dùng cho register)
    const loginWithUsers = async (email, password, userList) => {
        try {
            const foundUser = userList.find((u) => u.email === email && u.password === password);
            if (!foundUser) throw new Error("Email hoặc mật khẩu không đúng.");

            // Đảm bảo người dùng có trường favoriteMovies
            const userWithFavorites = foundUser.favoriteMovies ? foundUser : {...foundUser, favoriteMovies: []};

            setUser(userWithFavorites);
            await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userWithFavorites));
        } catch (err) {
            console.error("Lỗi trong login:", err.message);
            throw err;
        }
    };

    // Đăng xuất
    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
    };

    // Cập nhật thông tin user hiện tại
    const updateUserInfo = async (newInfo) => {
        const updatedUser = {...user, ...newInfo};
        setUser(updatedUser);
        await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(updatedUser));

        // Cập nhật trong danh sách users
        const updatedUsers = users.map((u) => (u.email === updatedUser.email ? updatedUser : u));
        setUsers(updatedUsers);
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    };

    // Thêm hàm đổi mật khẩu
    const changePassword = async (oldPassword, newPassword) => {
        try {
            // Kiểm tra mật khẩu cũ
            if (user.password !== oldPassword) {
                throw new Error("Mật khẩu cũ không đúng");
            }

            // Cập nhật mật khẩu mới
            const updatedUser = {...user, password: newPassword};

            // Cập nhật trong danh sách users
            const updatedUsers = users.map((u) => (u.email === user.email ? updatedUser : u));

            // Lưu vào AsyncStorage
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
            await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(updatedUser));

            // Cập nhật state
            setUser(updatedUser);
            setUsers(updatedUsers);

            return true;
        } catch (err) {
            console.error("Lỗi khi đổi mật khẩu:", err.message);
            throw err;
        }
    };

    // Thêm phim vào danh sách yêu thích
    const toggleFavoriteMovie = async (movie) => {
        try {
            if (!user) throw new Error("Người dùng chưa đăng nhập");

            // Kiểm tra xem phim đã có trong danh sách chưa
            const isFavorite = user.favoriteMovies.some((m) => m.id === movie.id);

            let updatedFavorites;
            if (isFavorite) {
                // Nếu đã có, xóa khỏi danh sách
                updatedFavorites = user.favoriteMovies.filter((m) => m.id !== movie.id);
            } else {
                // Nếu chưa có, thêm vào danh sách
                updatedFavorites = [...user.favoriteMovies, movie];
            }

            // Cập nhật user trong state và AsyncStorage
            const updatedUser = {...user, favoriteMovies: updatedFavorites};

            // Cập nhật trong danh sách users
            const updatedUsers = users.map((u) => (u.email === user.email ? updatedUser : u));

            // Lưu vào AsyncStorage
            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
            await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(updatedUser));

            // Cập nhật state
            setUser(updatedUser);
            setUsers(updatedUsers);

            return !isFavorite; // Trả về trạng thái mới: true nếu đã thêm, false nếu đã xóa
        } catch (err) {
            console.error("Lỗi khi thao tác với phim yêu thích:", err.message);
            throw err;
        }
    };

    // Kiểm tra xem phim có trong danh sách yêu thích không
    const isMovieFavorite = (movieId) => {
        if (!user || !user.favoriteMovies) return false;
        return user.favoriteMovies.some((movie) => movie.id === movieId);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                users,
                register,
                login,
                logout,
                updateUserInfo,
                changePassword,
                toggleFavoriteMovie,
                isMovieFavorite,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth phải được dùng bên trong AuthProvider");
    }
    return context;
};
