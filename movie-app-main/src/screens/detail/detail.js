import React, {useRef, useState, useEffect} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Footer from "../../components/home/Footer";
import {useAuth} from "../../context/AuthContext";
import AuthModal from "../../components/auth/AuthModal";
import {localVideos} from "../../utils/localVideos"; // Import file localVideos
import CategoryRecommend from "../../components/home/MovieList/MovieRecommend";
import {Video} from "expo-av";
import VideoPlayer from "../../components/videoPlayer/videoPlayer"; // import component mới

const DetailPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {item} = route.params; // Nhận toàn bộ item từ route.params
    const [isFavorite, setIsFavorite] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const {isLoggedIn, user, toggleFavoriteMovie, isMovieFavorite} = useAuth();

    // Kiểm tra đăng nhập ngay khi vào trang
    useEffect(() => {
        const currentRouteName = navigation.getState().routes[navigation.getState().index].name;
        if (!isLoggedIn && currentRouteName === "DetailPage") {
            setShowLoginModal(true);
        }
    }, [isLoggedIn, navigation]);

    // Kiểm tra xem phim này có trong danh sách yêu thích của người dùng không
    useEffect(() => {
        if (isLoggedIn && user) {
            setIsFavorite(isMovieFavorite(item.id));
        } else {
            setIsFavorite(false);
        }
    }, [isLoggedIn, user, item.id]);

    const toggleFavorite = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            const newFavoriteStatus = await toggleFavoriteMovie(item);
            setIsFavorite(newFavoriteStatus);
        } catch (error) {
            console.error("Lỗi khi thêm/xóa phim yêu thích:", error);
        }
    };

    const handleLoginPress = () => {
        setShowLoginModal(false);
        setShowAuthModal(true);
    };

    const handleCloseAuthModal = () => {
        setShowAuthModal(false);
    };

    // Dữ liệu cho FlatList
    const data = [
        {key: "video", type: "video"},
        {key: "details", type: "details"},
        {key: "recommend", type: "recommend"},
        {key: "footer", type: "footer"},
    ];

    const videoSource = localVideos[item.videoUrl]; // Lấy video từ localVideos

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* VIDEO */}
                {videoSource ? (
                    <View style={styles.videos}>
                        <VideoPlayer source={videoSource} />
                    </View>
                ) : (
                    <View style={styles.videoErrorContainer}>
                        <Text style={styles.videoErrorText}>Không tìm thấy video phù hợp</Text>
                    </View>
                )}

                {/* DETAILS */}
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleSection}>
                            <Text style={styles.title} numberOfLines={2}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={styles.ratingFavoriteContainer}>
                            <View style={styles.ratingContainer}>
                                <FontAwesome name="star" size={16} color="#FDC252" />
                                <Text style={styles.rating}>{item.rating}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                                <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={24} color={isFavorite ? "#FF0000" : "#FFF"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.overview}>{item.description}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.sectionBlock}>
                            <Text style={styles.sectionTitle}>Thời lượng:</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.info}>{item.duration}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.sectionBlock}>
                            <Text style={styles.sectionTitle}>Phát hành:</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.info}>{item.year}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.sectionBlock}>
                            <Text style={styles.sectionTitle}>Thể loại:</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.info}>{item.genres.join(", ")}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.sectionBlock}>
                            <Text style={styles.sectionTitle}>Quốc gia:</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.info}>{item.country}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.sectionBlock}>
                            <Text style={styles.sectionTitle}>Đạo diễn:</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.info}>{item.directors}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.sectionBlock}>
                            <Text style={styles.sectionTitle}>Diễn Viên:</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.info}>{item.actors}</Text>
                        </View>
                    </View>
                </View>

                {/* RECOMMEND */}
                <View>
                    <Text style={styles.recommendTitle}>Đề xuất cho bạn</Text>
                    <CategoryRecommend />
                </View>

                {/* FOOTER */}
                <Footer />
            </ScrollView>

            {/* Login Modal */}
            <Modal
                visible={showLoginModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setShowLoginModal(false);
                    navigation.goBack();
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thông báo</Text>
                        <Text style={styles.modalText}>Vui lòng đăng nhập để tiếp tục xem phim này</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.loginButton]} onPress={handleLoginPress}>
                                <Text style={styles.loginButtonText}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.closeButton]}
                                onPress={() => {
                                    setShowLoginModal(false);
                                    navigation.goBack();
                                }}
                            >
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Auth Modal */}
            {showAuthModal && <AuthModal visible={showAuthModal} onClose={handleCloseAuthModal} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#04152D",
    },
    poster: {
        width: "100%",
        height: 350,
        marginTop: 80,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 15,
        zIndex: 2,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 25,
        padding: 10,
    },
    scrollContainer: {
        backgroundColor: "rgba(4, 21, 45, 0.95)", // Màu nền gần giống tấm poster để tạo hiệu ứng hòa trộn
    },
    content: {
        padding: 15,
        backgroundColor: "#04152D", // Đảm bảo khi kéo lên, nội dung "đi vào" phía sau poster
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 15,
        width: "100%",
    },
    titleSection: {
        width: "70%",
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        flexWrap: "wrap",
    },
    ratingFavoriteContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    rating: {
        color: "#FDC252",
        marginLeft: 5,
        fontSize: 13,
        fontWeight: "bold",
    },
    favoriteButton: {
        padding: 5,
    },
    subtitle: {
        color: "#aaa",
        marginVertical: 5,
    },
    overview: {
        color: "#ddd",
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    sectionBlock: {
        flex: 1,
        marginRight: 0, // Khoảng cách giữa sectionBlock và infoBlock
    },
    infoBlock: {
        flex: 2,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    info: {
        color: "#bbb",
    },
    categoryTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        marginLeft: 20,
    },
    relatedMovies: {
        position: "absolute", // Ban đầu đặt ở vị trí này
        width: "100%",
        backgroundColor: "#04152D",
        paddingVertical: 10,
    },
    sticky: {
        top: 200,
        position: "absolute",
        zIndex: 10,
    },
    castSection: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 15,
    },
    castList: {
        paddingVertical: 10,
    },
    castItem: {
        marginRight: 15,
        alignItems: "center",
        width: 80,
    },
    castImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    castName: {
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: "center",
        width: "100%",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#161D41",
        borderRadius: 12,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 100,
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: "#F2B916",
    },
    closeButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    recommendTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginLeft: 15,
        marginTop: 50,
    },
    videos: {
        width: "100%", // Chiều rộng 100% màn hình
        height: 200, // Chiều cao 100% màn hình
        backgroundColor: "#000", // Đặt nền đen cho video
        marginTop: 80,
    },
    videoErrorContainer: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        marginBottom: 10,
        borderRadius: 10,
    },
    videoErrorText: {
        color: "red",
        fontSize: 16,
    },
});

export default DetailPage;
