import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import CategoryMain from "../CategoryMain";
import { loadMovies } from "../../../services/movieService";
export const localImages = {
  "media/Moi phat hanh/Bậc Thầy Đàm Phán/f3cad543652e3b03b732235bbd174e1c.webp": require("../../../../assets/media/Moi phat hanh/Bậc Thầy Đàm Phán/f3cad543652e3b03b732235bbd174e1c.webp"),
  "media/Moi phat hanh/Chuyện Đời Bác Sĩ Nội Trú/e59519897d849aaac2a36f6512d65f68.webp": require("../../../../assets/media/Moi phat hanh/Chuyện Đời Bác Sĩ Nội Trú/e59519897d849aaac2a36f6512d65f68.webp"),
  "media/Moi phat hanh/Cung Điện Ma Ám/5435e324d4d2f29bb00f82b423a84bb0.webp": require("../../../../assets/media/Moi phat hanh/Cung Điện Ma Ám/5435e324d4d2f29bb00f82b423a84bb0.webp"),
  "media/Moi phat hanh/Khi Cuộc Đời Cho Bạn Quả Quýt/f9197908357fe5ff6b4887a2752bf6ef.webp": require("../../../../assets/media/Moi phat hanh/Khi Cuộc Đời Cho Bạn Quả Quýt/f9197908357fe5ff6b4887a2752bf6ef.webp"),
  "media/Moi phat hanh/Khó Dỗ Dành/09d00ac5a6e7f45516547538b4f0dd78.webp": require("../../../../assets/media/Moi phat hanh/Khó Dỗ Dành/09d00ac5a6e7f45516547538b4f0dd78.webp"),
  "media/Moi phat hanh/Trái Tim Bị Chôn Vùi/6a8bc3d402e4970e58bbb273d03bd8dd.webp": require("../../../../assets/media/Moi phat hanh/Trái Tim Bị Chôn Vùi/6a8bc3d402e4970e58bbb273d03bd8dd.webp"),
  "media/Moi phat hanh/Vô Ưu Độ/76ca5e560fbb92c402b0e506c5ee569c.webp": require("../../../../assets/media/Moi phat hanh/Vô Ưu Độ/76ca5e560fbb92c402b0e506c5ee569c.webp"),
  "media/Moi phat hanh/Ăn Chạy Yêu/0b683c030893bc2bff6970e2c2c1a631.webp": require("../../../../assets/media/Moi phat hanh/Ăn Chạy Yêu/0b683c030893bc2bff6970e2c2c1a631.webp"),
};
const CategoryDebut = ({
  topic = "Mới Phát Hành",
  jsonFileName = "Moi phat hanh",
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

export default CategoryDebut;
