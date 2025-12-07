import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import CategoryMain from "../CategoryMain";
import { loadMovies } from "../../../services/movieService";

const localImages = {
  "media/Tinh cam/Anora Lọ Lem Thời Hiện Đại/e90cb7b3e095e046d95b39e3cc8848cf.webp": require("../../../../assets/media/Tinh cam/Anora Lọ Lem Thời Hiện Đại/e90cb7b3e095e046d95b39e3cc8848cf.webp"),
  "media/Tinh cam/Baby Girl/d84f5be4d7a23ef57fc13c5876deac14.webp": require("../../../../assets/media/Tinh cam/Baby Girl/d84f5be4d7a23ef57fc13c5876deac14.webp"),
  "media/Tinh cam/Con Nhà Siêu Giàu Châu Á/bb947739743a41c1a7f3eaf1d9a7dcc0.webp": require("../../../../assets/media/Tinh cam/Con Nhà Siêu Giàu Châu Á/bb947739743a41c1a7f3eaf1d9a7dcc0.webp"),
  "media/Tinh cam/Cô Hầu Gái/804cb75217e0a4e485f4c9e9ae724ae0.webp": require("../../../../assets/media/Tinh cam/Cô Hầu Gái/804cb75217e0a4e485f4c9e9ae724ae0.webp"),
  "media/Tinh cam/Gia Tài Của Ngoại/8d6a5598265b0cde177ed69add43c040.webp": require("../../../../assets/media/Tinh cam/Gia Tài Của Ngoại/8d6a5598265b0cde177ed69add43c040.webp"),
  "media/Tinh cam/Hạnh Phúc Mãi Về Sau/16d44254bec87ddbe462c60ec3cfa30f.webp": require("../../../../assets/media/Tinh cam/Hạnh Phúc Mãi Về Sau/16d44254bec87ddbe462c60ec3cfa30f.webp"),
  "media/Tinh cam/La La Land/61e70aae6a839b0df65093ea9a814fcf.webp": require("../../../../assets/media/Tinh cam/La La Land/61e70aae6a839b0df65093ea9a814fcf.webp"),
  "media/Tinh cam/Queer/8710c547f9662aa8af4c55d1cf6d426b.webp": require("../../../../assets/media/Tinh cam/Queer/8710c547f9662aa8af4c55d1cf6d426b.webp"),
  "media/Tinh cam/Titanic/48a56c1a50fc82c435cdf67cc823eb14.webp": require("../../../../assets/media/Tinh cam/Titanic/48a56c1a50fc82c435cdf67cc823eb14.webp"),
  "media/Tinh cam/Đã Đến Lúc/1f0bea02711fcdea1974fc0510327391.webp": require("../../../../assets/media/Tinh cam/Đã Đến Lúc/1f0bea02711fcdea1974fc0510327391.webp"),
};
const CategoryRomance = ({ topic = "Romance", jsonFileName = "Tinh cam" }) => {
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

export default CategoryRomance;
