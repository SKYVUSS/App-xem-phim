import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { localImages } from "../../utils/localImages";
import { loadMovies } from "../../services/movieService";
const CategoryHome = ({ title, component, navigation, jsonFileName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const movies = await loadMovies(jsonFileName);
      setData(movies);
    };
    loadData();
  }, []);

  return (
    <View style={styles.category}>
      <View style={styles.groupIntro}>
        <View style={styles.titleContainer}>
          <Text style={styles.categoryTitle}>{title}</Text>
        </View>
        {/* Nút See All */}
        <TouchableOpacity onPress={() => navigation.navigate(component)}>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movie}
            onPress={() => navigation.navigate("DetailPage", { item })}
          >
            <Image
              source={localImages[item.posterUrl]}
              style={styles.movieImage}
            />
            <Text
              style={styles.movieTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    marginBottom: 20,
  },
  groupIntro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row", // Giúp Image và Text nằm ngang
    alignItems: "center", // Căn giữa chiều dọc
  },
  categoryTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  redLine: {
    height: 30,
    marginRight: 10,
  },
  seeAll: {
    color: "#ccc",
    fontSize: 14,
  },
  movie: {
    marginRight: 10,
  },
  movieImage: {
    width: 125,
    height: 209,
    borderRadius: 10,
  },
  movieTitle: {
    color: "#FFF",
    fontSize: 14,
    marginTop: 8,
    width: 115,
    textAlign: "center",
  },
});
export default CategoryHome;
