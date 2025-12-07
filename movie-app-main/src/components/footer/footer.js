import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icon

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.links}>
                <Text style={styles.linkText}>Terms Of Use</Text>
                <Text style={styles.linkText}>Privacy-Policy</Text>
                <Text style={styles.linkText}>About</Text>
                <Text style={styles.linkText}>Blog</Text>
                <Text style={styles.linkText}>FAQ</Text>
            </View>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
            <View style={styles.socialIcons}>
                <Icon name="facebook" size={24} color="white" />
                <Icon name="instagram" size={24} color="white" />
                <Icon name="twitter" size={24} color="white" />
                <Icon name="linkedin" size={24} color="white" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0a0f1a",
        padding: 20,
        alignItems: "center",

        height: 200,
    },
    links: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 10,
    },
    linkText: {
        color: "white",
        fontSize: 14,
    },
    description: {
        color: "#ccc",
        textAlign: "center",
        fontSize: 12,
        marginBottom: 10,
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },
});

export default Footer;
