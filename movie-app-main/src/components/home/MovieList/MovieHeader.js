import {useNavigation} from "@react-navigation/native";
import {Image, View, StyleSheet, Text, TouchableOpacity, StatusBar} from "react-native";
import MenuModal from "../../menu/MenuModal";
import {useState} from "react";

const HeaderMovie = () => {
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);

    const handleSearchPress = () => {
        // Navigate to search screen while preserving the stack
        navigation.navigate("SearchMovie");
    };

    const handleLogoPress = () => {
        // Navigate to home screen and reset the stack
        navigation.navigate("Home", {
            screen: "HomeMovie",
        });
    };

    return (
        <>
            {/* Thay đổi màu nội dung của StatusBar */}
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerLeft} onPress={handleLogoPress}>
                    <Image source={require("../../../../assets/home/icon-video.png")} style={styles.logo} />
                    <Text style={styles.titleBrand}>Phimz</Text>
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={handleSearchPress}>
                        <Image source={require("../../../../assets/home/icon-search.png")} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Image source={require("../../../../assets/home/menu-icon.png")} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <MenuModal visible={showMenu} onClose={() => setShowMenu(false)} />
        </>
    );
};
const styles = StyleSheet.create({
    /* Header */
    header: {
        position: "absolute",
        top: 22,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        zIndex: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    logo: {
        width: 35,
        height: 35,
    },
    titleBrand: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 8,
    },
    headerRight: {
        flexDirection: "row",
    },
    icon: {
        width: 21,
        height: 21,
        marginHorizontal: 8,
    },
    menuIcon: {
        width: 30,
        height: 24,
        marginHorizontal: 8,
    },
});
export default HeaderMovie;
