import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import CategoryMain from "../CategoryMain";
import { loadMovies } from "../../../services/movieService";

const localImages = {
  "media/Hanh dong/Baybylon/769de5591af69fb8f710182e4aa66b97.webp": require("../../../../assets/media/Hanh dong/Baybylon/769de5591af69fb8f710182e4aa66b97.webp"),
  "media/Hanh dong/Chuyện Ngày Xưa ở Hollywood/81c2f0e15a4ef39b6443dc414cef47ee.webp": require("../../../../assets/media/Hanh dong/Chuyện Ngày Xưa ở Hollywood/81c2f0e15a4ef39b6443dc414cef47ee.webp"),
  "media/Hanh dong/Cuồng Nộ/b8d7b2fc1b5e332dfc6a124522632224.webp": require("../../../../assets/media/Hanh dong/Cuồng Nộ/b8d7b2fc1b5e332dfc6a124522632224.webp"),
  "media/Hanh dong/Cuộc Chiến Sân Cỏ/4557e4eeaf6f821844f745b240116f06.webp": require("../../../../assets/media/Hanh dong/Cuộc Chiến Sân Cỏ/4557e4eeaf6f821844f745b240116f06.webp"),
  "media/Hanh dong/Hành Tinh Cát 2/b4c95a5ee38ea9c5479e74540c943a5a.webp": require("../../../../assets/media/Hanh dong/Hành Tinh Cát 2/b4c95a5ee38ea9c5479e74540c943a5a.webp"),
  "media/Hanh dong/Sàn Đấu Sinh Tử/9ce06ff4b5fa5891b0e4e7443f774c75.webp": require("../../../../assets/media/Hanh dong/Sàn Đấu Sinh Tử/9ce06ff4b5fa5891b0e4e7443f774c75.webp"),
  "media/Hanh dong/Sát Thủ Đối Đầu/516da4f5cee1af34216f2a076752b662.webp": require("../../../../assets/media/Hanh dong/Sát Thủ Đối Đầu/516da4f5cee1af34216f2a076752b662.webp"),
  "media/Hanh dong/Thành Phố Quỷ/293eefda0a0b7377772ca82828e97b7e.webp": require("../../../../assets/media/Hanh dong/Thành Phố Quỷ/293eefda0a0b7377772ca82828e97b7e.webp"),
  "media/Hanh dong/Thế Chiến Z/l27wlxJi2NW5SSWpohIZObfkNmm.webp": require("../../../../assets/media/Hanh dong/Thế Chiến Z/l27wlxJi2NW5SSWpohIZObfkNmm.webp"),
  "media/Hanh dong/Venom Kèo Cuối/edcf5bc67e5de974b24f9301e3811def.webp": require("../../../../assets/media/Hanh dong/Venom Kèo Cuối/edcf5bc67e5de974b24f9301e3811def.webp"),
};

const CategoryAction = ({ topic = "Action", jsonFileName = "Hanh dong" }) => {
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

export default CategoryAction;
