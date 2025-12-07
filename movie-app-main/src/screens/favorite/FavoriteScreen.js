import React from "react";
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../context/AuthContext";
import {localImages} from "../../utils/localImages";

const {width} = Dimensions.get("window");
const movieWidth = (width - 40) / 2;

const FavoriteScreen = () => {
    const navigation = useNavigation();
    const {user, isLoggedIn} = useAuth();

    // Lấy danh sách yêu thích từ user hiện tại
    const favorites = isLoggedIn && user ? user.favoriteMovies : [];

    const renderMovieItem = ({item}) => (
        <TouchableOpacity style={styles.movieItem} onPress={() => navigation.navigate("DetailPage", {item})}>
            <Image source={localImages[item.posterUrl]} style={styles.movieImage} resizeMode="cover" />
            <Text style={styles.movieTitle} numberOfLines={2}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    // Hiển thị thông báo nếu không đăng nhập
    if (!isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Danh sách yêu thích</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Bạn chưa đăng nhập</Text>
                    <Text style={styles.emptySubText}>Đăng nhập để xem danh sách phim yêu thích của bạn</Text>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => {
                            navigation.navigate("Profile");
                        }}
                    >
                        <Text style={styles.homeButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Hiển thị thông báo khi không có phim yêu thích
    if (favorites.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Danh sách yêu thích</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Không có phim yêu thích</Text>
                    <Text style={styles.emptySubText}>Vào trang chủ để thêm phim mới vào danh sách</Text>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{name: "Home"}],
                            });
                        }}
                    >
                        <Text style={styles.homeButtonText}>Trang chủ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Danh sách yêu thích</Text>
            <FlatList data={favorites} renderItem={renderMovieItem} keyExtractor={(item) => item.id.toString()} numColumns={2} contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#04152D",
        paddingTop: 80,
        width: "100%",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        transform: [{translateY: -60}],
    },
    emptyText: {
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 14,
        color: "#8E95A5",
        textAlign: "center",
        marginBottom: 20,
    },
    homeButton: {
        backgroundColor: "#FDC252",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        width: "100%",
    },
    homeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    listContainer: {
        padding: 8,
    },
    movieItem: {
        flex: 1,
        margin: 8,
        maxWidth: "50%",
    },
    movieImage: {
        width: "100%",
        height: movieWidth * 1.5,
        borderRadius: 10,
        marginBottom: 8,
    },
    movieTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        textAlign: "center",
    },
});

export default FavoriteScreen;
