import React from "react";
import {Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../../constants/colors";

const MenuModal = ({visible, onClose}) => {
    const navigation = useNavigation();

    const categories = [
        {name: "Xu Hướng", route: "CategoryTrending", icon: require("../../../assets/background-menu.jpg")},
        {name: "Phổ Biến", route: "CategoryPopular", icon: require("../../../assets/background-menu.jpg")},
        {name: "Đánh Giá Cao", route: "CategoryTopRated", icon: require("../../../assets/background-menu.jpg")},
        {name: "Đề Xuất", route: "CategoryRecommend", icon: require("../../../assets/background-menu.jpg")},
        {name: "Thiếu Nhi", route: "CategoryKid", icon: require("../../../assets/background-menu.jpg")},
        {name: "Phiêu Lưu", route: "CategoryAdventure", icon: require("../../../assets/background-menu.jpg")},
        {name: "Lãng Mạn", route: "CategoryRomance", icon: require("../../../assets/background-menu.jpg")},
    ];

    const handleCategoryPress = (route) => {
        onClose();
        navigation.navigate("Home", {
            screen: route,
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Danh Mục</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Categories */}
                    <ScrollView style={styles.categoriesContainer}>
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => handleCategoryPress(category.route)}>
                                <View style={styles.categoryContent}>
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 50,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "100%",
        height: 1000,
        backgroundColor: "#04152D",
        justifyContent: "flex-end",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    modalTitle: {
        color: COLORS.primary,
        fontSize: 24,
        fontWeight: "bold",
    },
    closeButton: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 15,
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 20,
    },
    categoriesContainer: {
        flex: 1,
        padding: 15,
    },
    categoryItem: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 10,
    },
    categoryContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    categoryIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
        tintColor: "#fff",
    },
    categoryText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default MenuModal;
