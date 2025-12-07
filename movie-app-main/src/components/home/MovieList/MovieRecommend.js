import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";
import {Text, Image, StyleSheet} from "react-native";
import CategoryMain from "../CategoryMain";
import {loadMovies} from "../../../services/movieService";
const localImages = {
    "media/De xuat cho ban/Bàn Tay Diệt Quỷ/7be7a0c1b3f193b5557ef4f00b1f05d9.webp": require("../../../../assets/media/De xuat cho ban/Bàn Tay Diệt Quỷ/7be7a0c1b3f193b5557ef4f00b1f05d9.webp"),
    "media/De xuat cho ban/Cộng Sự Bất Đắc Dĩ/2704d4778783eb7028e8605f128bfae3.webp": require("../../../../assets/media/De xuat cho ban/Cộng Sự Bất Đắc Dĩ/2704d4778783eb7028e8605f128bfae3.webp"),
    "media/De xuat cho ban/Giải Mã Mê Cung/79c7eb6d1453801f4ccd7e136ce7bb9b.webp": require("../../../../assets/media/De xuat cho ban/Giải Mã Mê Cung/79c7eb6d1453801f4ccd7e136ce7bb9b.webp"),
    "media/De xuat cho ban/Joker/4fae6d95653559785b89387ee01c4501.webp": require("../../../../assets/media/De xuat cho ban/Joker/4fae6d95653559785b89387ee01c4501.webp"),
    "media/De xuat cho ban/Mật Vụ Kingsman/f91a03a1032e1c80107d4240f52bf25f.webp": require("../../../../assets/media/De xuat cho ban/Mật Vụ Kingsman/f91a03a1032e1c80107d4240f52bf25f.webp"),
    "media/De xuat cho ban/Năm Mươi Sắc Thái/edd9889eef96baec794f0aa88bcc48c9.webp": require("../../../../assets/media/De xuat cho ban/Năm Mươi Sắc Thái/edd9889eef96baec794f0aa88bcc48c9.webp"),
    "media/De xuat cho ban/Phù Thủy Tối Thượng/5d3f386be3b1dc2e64195b29d8d3fe75.webp": require("../../../../assets/media/De xuat cho ban/Phù Thủy Tối Thượng/5d3f386be3b1dc2e64195b29d8d3fe75.webp"),
    "media/De xuat cho ban/Sinh Vật Huyền Bí Và Nơi Tìm Ra Chúng/71d1943048c397623125ee0a94eabd9d.webp": require("../../../../assets/media/De xuat cho ban/Sinh Vật Huyền Bí Và Nơi Tìm Ra Chúng/71d1943048c397623125ee0a94eabd9d.webp"),
    "media/De xuat cho ban/Sói Già Phố Wall/a0440026b15517e63c3bf86cc72f1f7f.webp": require("../../../../assets/media/De xuat cho ban/Sói Già Phố Wall/a0440026b15517e63c3bf86cc72f1f7f.webp"),
    "media/De xuat cho ban/Thị Trấn Wonka/4cbd9a645e1453cb6315be13b94e8b86.webp": require("../../../../assets/media/De xuat cho ban/Thị Trấn Wonka/4cbd9a645e1453cb6315be13b94e8b86.webp"),
};
const CategoryRecommend = ({topic = "Recommended", jsonFileName = "De xuat cho ban", a}) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const movies = await loadMovies(jsonFileName);
            setData(movies);
        };
        loadData();
    }, []);
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("DetailPage", {item})} style={styles.itemContainer}>
            <Image source={localImages[item.posterUrl]} style={styles.image} />
            <Text style={styles.title}>
                {item.title} ({item.year})
            </Text>
        </TouchableOpacity>
    );

    return <CategoryMain topic={topic} data={data} renderItem={renderItem} navigation={navigation} />;
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

export default CategoryRecommend;
