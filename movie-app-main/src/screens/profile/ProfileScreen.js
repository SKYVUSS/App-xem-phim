import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal, FlatList, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Alert} from "react-native";
import {useAuth} from "../../context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AuthModal from "../../components/auth/AuthModal";

const avatars = Array(18).fill(require("../../../assets/user1.jpg"));
const numColumns = 3;

const CustomInput = ({value, onChangeText, ...rest}) => {
    const [isFocused, setIsFocused] = useState(false);

    return <TextInput style={[styles.input, isFocused && styles.inputFocused]} value={value} onChangeText={onChangeText} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholderTextColor="#aaa" {...rest} />;
};

const ProfileScreen = () => {
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {isLoggedIn, user, updateUserInfo, logout, changePassword} = useAuth();
    const navigation = useNavigation();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    // console.log("isLoggedIn", isLoggedIn);
    // console.log("user", user);
    // Theo dõi trạng thái của bàn phím
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const renderAvatarItem = ({item, index}) => (
        <TouchableOpacity
            style={styles.avatarItem}
            onPress={() => {
                // Update user avatar when selected
                updateUserInfo({avatar: item});
                setShowAvatarModal(false);
            }}
        >
            <Image source={item} style={styles.avatarOption} resizeMode="cover" />
        </TouchableOpacity>
    );

    const handleChangePassword = async () => {
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
                return;
            }

            if (newPassword !== confirmPassword) {
                Alert.alert("Lỗi", "Mật khẩu mới không khớp");
                return;
            }

            if (newPassword.length < 6) {
                Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự");
                return;
            }

            await changePassword(oldPassword, newPassword);
            Alert.alert("Thành công", "Đổi mật khẩu thành công");
            setShowPasswordModal(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };

    const renderLoggedInContent = () => (
        <>
            <Text style={styles.subtitle}>Cập nhật thông tin tài khoản</Text>

            <View style={styles.avatarSection}>
                <Text style={styles.avatarText}>Chào {user?.fullName}</Text>
                <Image source={user?.avatar || require("../../../assets/user1.jpg")} style={styles.avatar} resizeMode="cover" />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Email</Text>
                <CustomInput value={user?.email} editable={false} />

                <Text style={styles.label}>Tên hiển thị</Text>
                <CustomInput value={user?.fullName} onChangeText={(text) => updateUserInfo({fullName: text})} onSubmitEditing={Keyboard.dismiss} />

                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => {
                        Keyboard.dismiss();
                        // Xử lý cập nhật thông tin người dùng
                    }}
                >
                    <Text style={styles.buttonText}>Cập nhật</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowPasswordModal(true)}>
                    <Text style={styles.changePasswordText}>
                        Đổi mật khẩu, nhấn vào <Text style={styles.linkText}>đây</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Thoát</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={showAvatarModal} transparent={true} animationType="slide" onRequestClose={() => setShowAvatarModal(false)}>
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Đổi ảnh đại diện</Text>
                            <TouchableOpacity onPress={() => setShowAvatarModal(false)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={avatars} renderItem={renderAvatarItem} numColumns={numColumns} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.avatarGrid} showsVerticalScrollIndicator={false} />
                    </View>
                </SafeAreaView>
            </Modal>

            <Modal visible={showPasswordModal} transparent={true} animationType="slide" onRequestClose={() => setShowPasswordModal(false)}>
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowPasswordModal(false);
                                    setOldPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                }}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            >
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordFormContainer}>
                            <Text style={styles.label}>Mật khẩu cũ</Text>
                            <CustomInput value={oldPassword} onChangeText={setOldPassword} secureTextEntry />

                            <Text style={styles.label}>Mật khẩu mới</Text>
                            <CustomInput value={newPassword} onChangeText={setNewPassword} secureTextEntry />

                            <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
                            <CustomInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                            <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
                                <Text style={styles.buttonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );

    const renderNotLoggedInContent = () => {
        return (
            <View style={styles.notLoggedInContainer}>
                <Text style={styles.notLoggedInText}>Bạn chưa đăng nhập, hãy đăng nhập ngay</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => setShowAuthModal(true)}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>

                {/* Hiển thị AuthModal */}
                <AuthModal
                    visible={showAuthModal}
                    onClose={() => setShowAuthModal(false)} // Đóng AuthModal khi người dùng nhấn nút đóng
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Phần chính của màn hình - sử dụng KeyboardAvoidingView chỉ cho nội dung */}
            <KeyboardAvoidingView style={styles.keyboardAvoidingArea} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Tài khoản</Text>
                    {isLoggedIn ? renderLoggedInContent() : renderNotLoggedInContent()}
                    {/* Thêm khoảng trống dưới cùng để tránh bị che bởi bottom navigation */}
                    <View style={styles.bottomPadding} />
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Có thể cài đặt Navigation ở đây nếu cần */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#04152D",
    },
    keyboardAvoidingArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 60,
    },
    bottomPadding: {
        height: 100, // Thêm padding dưới cùng để tránh bị che bởi bottom navigation
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
    // Styles cho trạng thái chưa đăng nhập
    notLoggedInContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    notLoggedInText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#F2B916",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    // Giữ nguyên các styles cho trạng thái đã đăng nhập
    subtitle: {
        color: "#999",
        fontSize: 14,
        marginTop: 5,
    },
    avatarSection: {
        alignItems: "left",
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#1a2a3a",
        borderWidth: 2,
        borderColor: "#fff",
        marginLeft: 10,
    },
    avatarText: {
        color: "#fff",
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    formContainer: {
        marginTop: 30,
    },
    label: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 8,
        padding: 12,
        color: "#fff",
        fontSize: 16,
        marginBottom: 15,
    },
    inputFocused: {
        borderColor: "#fff",
        borderWidth: 1,
    },
    updateButton: {
        backgroundColor: "#F2B916",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    changePasswordText: {
        color: "#fff",
        textAlign: "left",
        marginTop: 20,
    },
    linkText: {
        color: "#F2B916",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#161D41",
        borderRadius: 12,
        padding: 0,
        width: "90%",
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "300",
        width: 28,
        height: 28,
        textAlign: "center",
        lineHeight: 26,
        backgroundColor: "rgba(145, 145, 145, 0.45)",
        borderRadius: 16,
    },
    avatarGrid: {
        padding: 15,
    },
    avatarItem: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
        borderRadius: 8,
        overflow: "hidden",
    },
    avatarOption: {
        width: "100%",
        height: "100%",
        backgroundColor: "#2a3a4a",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        alignSelf: "flex-start", // căn trái
        marginTop: 20,
    },
    logoutText: {
        color: "#fff",
        marginLeft: 5,
        fontWeight: "bold",
    },
    passwordFormContainer: {
        padding: 20,
    },
});

export default ProfileScreen;
