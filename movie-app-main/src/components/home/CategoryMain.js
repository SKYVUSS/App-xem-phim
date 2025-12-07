import {ScrollView, StyleSheet, View} from "react-native";

const CategoryMain = ({data, renderItem}) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.grid}>
                {data.map((item) => (
                    <View key={item.id} style={styles.gridItem}>
                        {renderItem({item})}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#04152D",
        padding: 10,
        paddingTop: 20,
        marginBottom: 50,
    },
    scrollContainer: {
        paddingHorizontal: 10,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap", // Cho phép các phần tử xuống dòng
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%", // Chia đều 2 cột (48% để có khoảng cách giữa các cột)
        marginBottom: 10,
    },
});

export default CategoryMain;
