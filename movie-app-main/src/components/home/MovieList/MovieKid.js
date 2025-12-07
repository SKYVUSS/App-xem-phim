import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import CategoryMain from "../CategoryMain";
import { loadMovies } from "../../../services/movieService";

const localImages = {
  "media/Hoat hinh/Cô Bé Người Cá Ponyo/1d6a2d698e0d73b1739d0a7dbd56c5db.webp": require("../../../../assets/media/Hoat hinh/Cô Bé Người Cá Ponyo/1d6a2d698e0d73b1739d0a7dbd56c5db.webp"),
  "media/Hoat hinh/Flow/19287291640b7f79df76ee3b352ba5cf.webp": require("../../../../assets/media/Hoat hinh/Flow/19287291640b7f79df76ee3b352ba5cf.webp"),
  "media/Hoat hinh/Hành Trình Của Moana 2/2158ee264cb3c24609f03b6530a9f896.webp": require("../../../../assets/media/Hoat hinh/Hành Trình Của Moana 2/2158ee264cb3c24609f03b6530a9f896.webp"),
  "media/Hoat hinh/Kẻ Trộm Mặt Trăng 4/d9e78a4d1564d9c47370facec7065ca0.webp": require("../../../../assets/media/Hoat hinh/Kẻ Trộm Mặt Trăng 4/d9e78a4d1564d9c47370facec7065ca0.webp"),
  "media/Hoat hinh/Lâu Đài Di Động Của Pháp Sư Howl/4d72a37142e5f0765f475e0faa66adb0.webp": require("../../../../assets/media/Hoat hinh/Lâu Đài Di Động Của Pháp Sư Howl/4d72a37142e5f0765f475e0faa66adb0.webp"),
  "media/Hoat hinh/Na Tra Ma Đồng Giáng Thế/51b568964f25a46b2a96d5fa6b50c890.webp": require("../../../../assets/media/Hoat hinh/Na Tra Ma Đồng Giáng Thế/51b568964f25a46b2a96d5fa6b50c890.webp"),
  "media/Hoat hinh/Những Mảnh Ghép Cảm Xúc 2/8b4c36dcec2d5608c726229d8387fba1.webp": require("../../../../assets/media/Hoat hinh/Những Mảnh Ghép Cảm Xúc 2/8b4c36dcec2d5608c726229d8387fba1.webp"),
  "media/Hoat hinh/SAKAMOTO DAYS Sát Thủ Về Vườn/64411717e3ce622c0100111e7302becb.webp": require("../../../../assets/media/Hoat hinh/SAKAMOTO DAYS Sát Thủ Về Vườn/64411717e3ce622c0100111e7302becb.webp"),
  "media/Hoat hinh/Shin Movie 32 Cậu Bé Bút Chì/7e3f335f8d1e2489b4787811c3ef8d62.webp": require("../../../../assets/media/Hoat hinh/Shin Movie 32 Cậu Bé Bút Chì/7e3f335f8d1e2489b4787811c3ef8d62.webp"),
  "media/Hoat hinh/Vùng Đất Linh Hồn/f416e981c5594516dcdedede5c359895.webp": require("../../../../assets/media/Hoat hinh/Vùng Đất Linh Hồn/f416e981c5594516dcdedede5c359895.webp"),
};
const CategoryKid = ({ topic = "Kid's Movie", jsonFileName = "Hoat hinh" }) => {
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
      <Image source={localImages[item.posterUrl]} style={styles.image} />
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

export default CategoryKid;
