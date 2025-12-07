import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { loadMovies } from "../../services/movieService";
import { localImages } from "../../utils/localImages";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SearchMovie = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 0, name: "Tất cả", jsonFileName: "movies" },
    { id: 1, name: "Đề Xuất", jsonFileName: "De xuat cho ban" },
    { id: 2, name: "Phim Hài Hước", jsonFileName: "Hai huoc" },
    { id: 3, name: "Phim Hành Động", jsonFileName: "Hanh dong" },
    { id: 4, name: "Phim Hoạt Hình", jsonFileName: "Hoat hinh" },
    { id: 5, name: "Phim Mới Phát Hành", jsonFileName: "Moi phat hanh" },
    { id: 6, name: "Phim Phổ Biến", jsonFileName: "Pho bien" },
    { id: 7, name: "Phim Tình Cảm", jsonFileName: "Tinh cam" },
    { id: 8, name: "Phim Xu Hướng", jsonFileName: "Xu huong" },
  ];

  // Load dữ liệu khi component mount hoặc khi activeFilter thay đổi
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const movies = await loadMovies(categories[activeFilter].jsonFileName);
        setAllMovies(movies || []);
        setFilteredMovies(movies || []);
      } catch (error) {
        console.error("Error loading movies:", error);
        setAllMovies([]);
        setFilteredMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [activeFilter]);

  // Xử lý tìm kiếm khi searchQuery thay đổi
  const handleSearch = (text) => {
    setSearchQuery(text);
    // Loại bỏ khoảng trắng ở đầu và cuối
    const trimmedText = text.trim();

    if (trimmedText) {
      const filtered = (allMovies || []).filter(
        (movie) =>
          movie.title.toLowerCase().includes(trimmedText.toLowerCase()) ||
          movie.description.toLowerCase().includes(trimmedText.toLowerCase()) ||
          movie.genres.some((genre) =>
            genre.toLowerCase().includes(trimmedText.toLowerCase())
          )
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(allMovies || []);
    }
  };

  const renderFilter = ({ item }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(item.id)}
      style={[
        styles.filterItem,
        activeFilter === item.id && styles.filterItemActive,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === item.id && styles.filterTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate("DetailPage", { item })}
    >
      <Image source={localImages[item.posterUrl]} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <View style={styles.resultMeta}>
          <Text style={styles.resultYear}>{item.year}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FDC252" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.genresContainer}>
          {item.genres.map((genre, index) => (
            <Text key={index} style={styles.genreText}>
              {genre}
              {index < item.genres.length - 1 ? " • " : ""}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNotFound = () => (
    <View style={styles.notFoundContainer}>
      <FontAwesome name="search" size={80} color="rgba(255,255,255,0.3)" />
      <Text style={styles.notFoundText}>
        {searchQuery
          ? "Không tìm thấy phim phù hợp với từ khóa tìm kiếm"
          : "Không có phim nào trong danh mục này"}
      </Text>
      {searchQuery && (
        <TouchableOpacity
          style={styles.clearSearchButton}
          onPress={() => handleSearch("")}
        >
          <Text style={styles.clearSearchText}>Xóa tìm kiếm</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("HomeMovie")}
        >
          <Image
            source={require("../../../assets/home/icon-back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <Image
            source={require("../../../assets/home/icon-search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm phim..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          data={categories}
          renderItem={renderFilter}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Search Results */}
      {isLoading ? (
        renderLoading()
      ) : filteredMovies && filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        renderNotFound()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04152D",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 45,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#ffffff",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "rgba(255,255,255,0.5)",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    height: "100%",
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 24,
    fontWeight: "bold",
  },
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  filterItemActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: "#ffffff",
    fontSize: 14,
  },
  filterTextActive: {
    fontWeight: "bold",
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    overflow: "hidden",
  },
  resultImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
  },
  resultInfo: {
    flex: 1,
    padding: 12,
  },
  resultTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultYear: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  rating: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  genresContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  genreText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginRight: 4,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  clearSearchButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  clearSearchText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginTop: 10,
  },
});

export default SearchMovie;
