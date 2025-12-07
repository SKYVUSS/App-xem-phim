import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import CategoryMain from "../CategoryMain";
import { loadMovies } from "../../../services/movieService";

const localImages = {
  "media/Hai huoc/404 Chạy Ngay Đi/875e0692ccefd5c2f9fb9463ab072571.webp": require("../../../../assets/media/Hai huoc/404 Chạy Ngay Đi/875e0692ccefd5c2f9fb9463ab072571.webp"),
  "media/Hai huoc/Anh Không Đau/633c80aad4c327a4b132d08f4c3f7c1e.webp": require("../../../../assets/media/Hai huoc/Anh Không Đau/633c80aad4c327a4b132d08f4c3f7c1e.webp"),
  "media/Hai huoc/Dưa Hấu Lấp Lánh/927e598f8827735f646056a08eb089fa.webp": require("../../../../assets/media/Hai huoc/Dưa Hấu Lấp Lánh/927e598f8827735f646056a08eb089fa.webp"),
  "media/Hai huoc/Gia Đình Hiện Đại/93961650954e3c6c30059733b9120d03.webp": require("../../../../assets/media/Hai huoc/Gia Đình Hiện Đại/93961650954e3c6c30059733b9120d03.webp"),
  "media/Hai huoc/Gia Đình Là Số Một 2 Chung Một Mái Nhà/3a587746320162fee512e2ff05a2702d.webp": require("../../../../assets/media/Hai huoc/Gia Đình Là Số Một 2 Chung Một Mái Nhà/3a587746320162fee512e2ff05a2702d.webp"),
  "media/Hai huoc/Hành Trình Của Moana 2/2158ee264cb3c24609f03b6530a9f896.webp": require("../../../../assets/media/Hai huoc/Hành Trình Của Moana 2/2158ee264cb3c24609f03b6530a9f896.webp"),
  "media/Hai huoc/Linh Mục Nhiệt Huyết/4c7991b965966201a2e223d10a7595ea.webp": require("../../../../assets/media/Hai huoc/Linh Mục Nhiệt Huyết/4c7991b965966201a2e223d10a7595ea.webp"),
  "media/Hai huoc/SAKAMOTO DAYS Sát Thủ Về Vườn/64411717e3ce622c0100111e7302becb.webp": require("../../../../assets/media/Hai huoc/SAKAMOTO DAYS Sát Thủ Về Vườn/64411717e3ce622c0100111e7302becb.webp"),
  "media/Hai huoc/Sát Thủ Vô Cùng Cực Hài/4ecccca5aa2421c6116481e76123833a.webp": require("../../../../assets/media/Hai huoc/Sát Thủ Vô Cùng Cực Hài/4ecccca5aa2421c6116481e76123833a.webp"),
};
const CategoryFun = ({ topic = "Hài Hước", jsonFileName = "Hai huoc" }) => {
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

export default CategoryFun;
