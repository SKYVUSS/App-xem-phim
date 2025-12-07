import React, {useRef, useEffect, useState} from "react";
import {View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, FlatList, Dimensions} from "react-native";
import {Video} from "expo-av";
import {LinearGradient} from "expo-linear-gradient";
import CategoryHome from "../../components/home/CategoryHome";
import Footer from "../../components/home/Footer";
import {COLORS} from "../../constants/colors";

const {width} = Dimensions.get("window");

const HomeMovie = ({navigation}) => {
    const videoRefs = useRef([]);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollInterval = useRef(null);

    useEffect(() => {
        // Auto scroll every 15 seconds
        scrollInterval.current = setInterval(() => {
            const nextIndex = (currentIndex + 1) % trailers.length;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
        }, 15000); // 15 seconds

        return () => {
            clearInterval(scrollInterval.current);
        };
    }, [currentIndex]);

    useEffect(() => {
        if (videoRefs.current) {
            videoRefs.current.forEach((ref, index) => {
                if (ref) {
                    if (index === currentIndex) {
                        ref.playAsync();
                        // Reset video to beginning when it becomes active
                        ref.setPositionAsync(0);
                    } else {
                        ref.pauseAsync();
                    }
                }
            });
        }
    }, [currentIndex]);

    const trailers = [
        {
            id: 1,
            video: require("../../../assets/media/Pho bien/Bàn Tay Diệt Quỷ/Ban_Tay_Diet_Quy.mp4"),
            title: "Bàn Tay Diệt Quỷ",
            posterUrl: require("../../../assets/media/Pho bien/Bàn Tay Diệt Quỷ/7be7a0c1b3f193b5557ef4f00b1f05d9.webp"),
            rating: "6.3",
            year: "2019",
            genres: ["Hành Động", "Gay Cấn", "Kinh Dị", "Phiêu Lưu"],
            description: "Võ sĩ MMA Yong Hoo (Park Seo Joon thủ vai) đã dấn thân vào hành trình trừ tà, trục quỷ sau khi bản thân anh bống nhiên sở hữu “Bàn tay diệt quỷ”. Đối đầu với anh là Giám Mục Bóng Tối (Woo Do Hwan thủ vai) – tên quỷ Satan đột lốt người. Kể từ đó sự thật về cái chết của cha Yong Hoo cũng dần được hé lộ cũng như nguyên nhân anh trở thành “người được chọn”.",
            duration: "2h 09m",
            country: "Hàn Quốc",
            directors: ["Kim Joo-hwan"],
            actors: ["Park Seo-jun", "Ahn Sung-ki", "Woo Do-hwan", "Choi Woo-shik", "Park Ji-hyun", "Jung Ji-hoon", "Lee Seung-hee", "Sim Hee-seop"],
            views: "150000",
        },

        {
            id: 2,
            video: require("../../../assets/media/Moi phat hanh/Khi Cuộc Đời Cho Bạn Quả Quýt/Khi_Cuoc_Doi_Cho_Ban_Qua_Quyt.mp4"),
            title: "Khi Cuộc Đời Cho Bạn Quả Quýt",
            posterUrl: require("../../../assets/media/Moi phat hanh/Khi Cuộc Đời Cho Bạn Quả Quýt/f9197908357fe5ff6b4887a2752bf6ef.webp"),
            rating: "9.3",
            year: "2025",
            genres: ["Chính Kịch", "Tình Cảm", "Cổ Điển", "Tâm Lý", "Lãng Mạn"],
            description: "Ở Jeju, câu chuyện về một cô nàng nhiệt huyết và chàng trai kiên cường trên đảo nảy nở thành câu chuyện trọn đời đầy thăng trầm, minh chứng tình yêu vẫn trường tồn theo thời gian.",
            duration: "1h 00m",
            country: "Hàn Quốc",
            directors: ["Im Sang-choon", "Kim Won-suk"],
            actors: ["IU", "Park Bo-gum", "Moon So-ri", "Park Hae-jun"],
        },
        {
            id: 3,
            video: require("../../../assets/media/Xu huong/Học Viện Siêu Anh Hùng/Hoc_Vien_Sieu_Anh_Hung.mp4"),
            posterUrl: require("../../../assets/media/Xu huong/Học Viện Siêu Anh Hùng/fb4207975c08cb1b7cb443cfbc12b37a.webp"),
            title: "Học Viện Siêu Anh Hùng",
            rating: "7.0",
            year: "2024",
            genres: ["Hành Động", "Khoa Học", "Anime", "Hoạt Hình", "Phiêu Lưu"],
            description:
                'Vào mùa xuân năm thứ hai, trong khi Nhật Bản đang bị tàn phá bởi các cuộc chiến, một người đàn ông bí ẩn bất ngờ xuất hiện có tên là Dark Might. Đối mặt với Deku và những người bạn, hắn tự xưng mình là biểu tượng mới thay thế All Might với tuyên bố hùng hồn: "Tiếp theo là đến lượt ta!". Với dã tâm của mình, Dark Might sử dụng năng lực để tạo ra một pháo đài khổng lồ và nhốt người dân cùng anh hùng vào đó. Deku, Bakugo, Todoroki cùng lớp 1-A của trường U.A. dũng cảm đối đầu với Dark Might và tổ chức tội phạm bí ẩn do hắn cầm đầu, mang tên "Gia đình Gollini". Liệu họ có thể ngăn chặn tham vọng của biểu tượng mới Dark Might và bảo vệ thế giới?',
            duration: "1h 50m",
            country: "Nhật Bản",
            directors: ["Tensai Okamura"],
            actors: ["Daiki Yamashita", "Nobuhiko Okamoto", "Yûki Kaji", "Mamoru Miyano", "Meru Nukumi", "Kenta Miyake", "Ayane Sakura", "Kaito Ishikawa"],
            weeklyViews: "32000",
        },
    ];

    const renderTrailer = ({item, index}) => {
        return (
            <View style={styles.posterContainer}>
                <Video
                    ref={(ref) => (videoRefs.current[index] = ref)}
                    source={item.video}
                    style={styles.poster}
                    isLooping={true}
                    shouldPlay={index === currentIndex}
                    resizeMode="cover"
                    isMuted={true}
                    rate={1.0}
                    progressUpdateIntervalMillis={100}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            // When video finishes, reset it to beginning
                            videoRefs.current[index]?.setPositionAsync(0);
                        }
                    }}
                />
                <View style={styles.posterContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("DetailPage", {item})}>
                        <LinearGradient colors={COLORS.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.playButton}>
                            <Image style={styles.iconPlay} source={require("../../../assets/home/icon-play.png")} />
                            <Text style={styles.playButtonText}>Xem ngay</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / width);
        setCurrentIndex(index);
    };

    const renderIndicator = () => {
        return (
            <View style={styles.indicatorContainer}>
                {trailers.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setCurrentIndex(index);
                            flatListRef.current?.scrollToIndex({
                                index: index,
                                animated: true,
                            });
                        }}
                    >
                        <View style={[styles.indicator, currentIndex === index && styles.indicatorActive]} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {/* Trailer Section */}
                <View style={styles.posterWrapper}>
                    <FlatList
                        ref={flatListRef}
                        data={trailers}
                        renderItem={renderTrailer}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={styles.trailerList}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        initialScrollIndex={0}
                        onScrollToIndexFailed={() => {
                            flatListRef.current?.scrollToIndex({
                                index: 0,
                                animated: true,
                            });
                        }}
                    />
                    {renderIndicator()}
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <CategoryHome title="Xu Hướng" jsonFileName="Xu huong" component="CategoryTrending" navigation={navigation} />
                    <CategoryHome title="Phổ Biến" jsonFileName="Pho bien" component="CategoryPopular" navigation={navigation} />
                    <CategoryHome title="Hành Động" jsonFileName="Hanh dong" component="CategoryAction" navigation={navigation} />
                    <CategoryHome title="Đề Xuất Cho Bạn" jsonFileName="De xuat cho ban" component="CategoryRecommend" navigation={navigation} />
                    <CategoryHome title="Phim Thiếu Nhi" jsonFileName="Hoat hinh" component="CategoryKid" navigation={navigation} />
                    <CategoryHome title="Hài Hước" jsonFileName="Hai huoc" component="CategoryFun" navigation={navigation} />
                    <CategoryHome title="Tình Cảm" jsonFileName="Tinh cam" component="CategoryRomance" navigation={navigation} />
                    <CategoryHome title="Mới Phát Hành" jsonFileName="Moi phat hanh" component="CategoryDebut" navigation={navigation} />

                    {/* Footer */}
                    <Footer />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#04152D",
    },
    posterWrapper: {
        position: "relative",
        height: 500,
    },
    indicatorContainer: {
        position: "absolute",
        right: 20,
        bottom: 20,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: COLORS.primary,
        width: 24, // Active dot is longer
    },
    trailerList: {
        height: 500,
    },
    posterContainer: {
        width: width,
        height: 500,
        position: "relative",
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    posterContent: {
        position: "absolute",
        bottom: 0,
        left: 10,
        padding: 12,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    playButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 32,
        borderRadius: 20,
    },
    iconPlay: {
        width: 18,
        height: 18,
        marginRight: 6,
    },
    playButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
    content: {
        paddingTop: 20,
        paddingHorizontal: 16,
    },
});

export default HomeMovie;
