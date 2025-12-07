import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import CategoryMain from "../CategoryMain";
import { loadMovies } from "../../../services/movieService";

const localImages = {
  "media/Xu huong/11 Chiến Binh Cảm Tử/a853a894f0ac4d00f24f416519a7f8d3.webp": require("../../../../assets/media/Xu huong/11 Chiến Binh Cảm Tử/a853a894f0ac4d00f24f416519a7f8d3.webp"),
  "media/Xu huong/Attack on Titan/5e6397fbf8269c4663677e9df07e0f30.webp": require("../../../../assets/media/Xu huong/Attack on Titan/5e6397fbf8269c4663677e9df07e0f30.webp"),
  "media/Xu huong/Cuộc Diễu Hành/f655cfe87ddd77b602c363b1a93c4c36.webp": require("../../../../assets/media/Xu huong/Cuộc Diễu Hành/f655cfe87ddd77b602c363b1a93c4c36.webp"),
  "media/Xu huong/Eephus/55963d3ba455304219109c9ee09e5ba2.webp": require("../../../../assets/media/Xu huong/Eephus/55963d3ba455304219109c9ee09e5ba2.webp"),
  "media/Xu huong/Faceless/1ca761eec4cc93e310422b7e62ce1945.webp": require("../../../../assets/media/Xu huong/Faceless/1ca761eec4cc93e310422b7e62ce1945.webp"),
  "media/Xu huong/Học Viện Siêu Anh Hùng/fb4207975c08cb1b7cb443cfbc12b37a.webp": require("../../../../assets/media/Xu huong/Học Viện Siêu Anh Hùng/fb4207975c08cb1b7cb443cfbc12b37a.webp"),
  "media/Xu huong/iHostage/c02d19716c1ed2423593dc88eb9282ba.webp": require("../../../../assets/media/Xu huong/iHostage/c02d19716c1ed2423593dc88eb9282ba.webp"),
  "media/Xu huong/Người Đàn Bà Ngoài Sân/1bfbadc3036b280ef18e2853935a1ab8.webp": require("../../../../assets/media/Xu huong/Người Đàn Bà Ngoài Sân/1bfbadc3036b280ef18e2853935a1ab8.webp"),
  "media/Xu huong/Thợ Săn Thành Phố/a20b3c891fad42dc38a8c51a2e4f6d6b.webp": require("../../../../assets/media/Xu huong/Thợ Săn Thành Phố/a20b3c891fad42dc38a8c51a2e4f6d6b.webp"),
  "media/Xu huong/Ánh Trăng Bên Cửa Sổ/d9e04aeffc9e00a1d9d8d0ceea58ba1a.webp": require("../../../../assets/media/Xu huong/Ánh Trăng Bên Cửa Sổ/d9e04aeffc9e00a1d9d8d0ceea58ba1a.webp"),
};

const CategoryTrending = ({
  topic = "Xu huong",
  jsonFileName = "Xu huong",
}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const movies = await loadMovies(jsonFileName);
      setData(movies);
    };
    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailPage", { item })}
      style={styles.itemContainer}
    >
      <Image
        source={localImages[item.posterUrl]}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>
        {item.title} ({item.year})
      </Text>
    </TouchableOpacity>
  );

  return (
    <CategoryMain
      topic={topic}
      data={data}
      renderItem={renderItem}
      navigation={navigation}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04152D",
    padding: 10,
    paddingTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 170,
    height: 280,
    marginBottom: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default CategoryTrending;
