import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";

const Footer = () => {
  const socialLinks = [
    {
      id: 1,
      icon: require("../../../assets/home/facebook.png"),
      url: "#",
    },
    {
      id: 2,
      icon: require("../../../assets/home/instagram.png"),
      url: "#",
    },
    {
      id: 3,
      icon: require("../../../assets/home/twitter.png"),
      url: "#",
    },
    {
      id: 4,
      icon: require("../../../assets/home/linkedin.png"),
      url: "#",
    },
  ];

  const handleSocialPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <LinearGradient colors={["#04152D", "#041021"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {" "}
          <Image
            style={{ width: 28, height: 28 }}
            source={require("../../../assets/home/icon-video.png")}
          />{" "}
          Phimz
        </Text>
        <View style={styles.contact}>
          <TouchableOpacity style={styles.contactItem}>
            <Text style={styles.contactText}>Điều khoản sử dụng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Text style={styles.contactText}>Chính sách bảo mật</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Text style={styles.contactText}>Giới thiệu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Text style={styles.contactText}>Liên hệ</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Phimz là ứng dụng xem phim trực tiếp, mang đến trải nghiệm giải trí
          hoàn hảo với các bộ phim đặc sắc nhất hiện nay. Với giao diện thân
          thiện, dễ sử dụng và kho phim đa dạng, chúng tôi cam kết mang lại
          những giây phút thư giãn tuyệt vời cho người xem.
        </Text>

        <View style={styles.socialContainer}>
          {socialLinks.map((social) => (
            <TouchableOpacity
              key={social.id}
              style={styles.socialButton}
              onPress={() => handleSocialPress(social.url)}
            >
              <Image source={social.icon} style={styles.socialIcon} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.copyright}>
          © 2024 Phimz. Tất cả các quyền được bảo lưu.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginTop: 20,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  description: {
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    tintColor: "#ffffff",
  },
  copyright: {
    color: "#ffffff",
    opacity: 0.5,
    fontSize: 12,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  contactItem: {
    paddingHorizontal: 5,
  },
  contactText: {
    color: "#ffffff",
    fontSize: 13,
  },
});

export default Footer;
