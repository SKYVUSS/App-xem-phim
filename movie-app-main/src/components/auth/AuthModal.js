import React, {useState} from "react";
import {View, Text, Modal, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useAuth} from "../../context/AuthContext";
import {Alert} from "react-native";

const CustomInput = ({value, onChangeText, ...rest}) => {
    const [isFocused, setIsFocused] = useState(false);

    return <TextInput style={[styles.input, isFocused && styles.inputFocused]} value={value} onChangeText={onChangeText} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholderTextColor="#aaa" {...rest} />;
};

const AuthModal = ({visible, onClose}) => {
    const [activeModal, setActiveModal] = useState("login"); // login, register, forgot
    const {login, register} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const renderLoginForm = () => (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Đăng nhập</Text>
            <View style={styles.subtitle}>
                <Text style={styles.subtitleText}>Nếu bạn chưa có tài khoản, </Text>
                <Text onPress={() => setActiveModal("register")}>
                    <Text style={styles.linkSignUp}>đăng ký ngay</Text>
                </Text>
            </View>

            <Text style={styles.label}>Email</Text>
            <CustomInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Mật khẩu</Text>
            <CustomInput value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    if (!email || !password) {
                        Alert.alert("Vui lòng điền đầy đủ thông tin.");
                        return;
                    }

                    login(email, password);
                    onClose();
                }}
            >
                <Text style={styles.submitButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => setActiveModal("forgot")}>
                    <Text style={styles.linkForgot}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderRegisterForm = () => (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Tạo tài khoản mới</Text>
            <View style={styles.subtitle}>
                <Text style={styles.subtitleText}>Nếu bạn đã có tài khoản, </Text>
                <Text onPress={() => setActiveModal("login")}>
                    <Text style={styles.linkSignUp}>đăng nhập ngay</Text>
                </Text>
            </View>

            <Text style={styles.label}>Tên hiển thị</Text>
            <CustomInput value={fullName} onChangeText={setFullName} />

            <Text style={styles.label}>Email</Text>
            <CustomInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Mật khẩu</Text>
            <CustomInput value={password} onChangeText={setPassword} secureTextEntry />

            <Text style={styles.label}>Nhập lại mật khẩu</Text>
            <CustomInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    if (!fullName || !email || !password || !confirmPassword) {
                        Alert.alert("Vui lòng điền đầy đủ thông tin.");
                        return;
                    }

                    if (password !== confirmPassword) {
                        Alert.alert("Mật khẩu không khớp.");
                        return;
                    }
                    // Đăng ký thành công → gọi login để lưu và chuyển qua profile
                    register({email, password, fullName});
                    // onClose();
                }}
            >
                <Text style={styles.submitButtonText}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );

    const renderForgotPasswordForm = () => (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <View style={styles.subtitle}>
                <Text style={styles.subtitleText}>Nếu bạn đã có tài khoản, </Text>
                <Text onPress={() => setActiveModal("login")}>
                    <Text style={styles.linkSignUp}>đăng nhập ngay</Text>
                </Text>
            </View>

            <Text style={styles.label}>Email đăng ký</Text>
            <CustomInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    setActiveModal("login");
                }}
            >
                <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>

                    {activeModal === "login" && renderLoginForm()}
                    {activeModal === "register" && renderRegisterForm()}
                    {activeModal === "forgot" && renderForgotPasswordForm()}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#161D41",
        borderRadius: 12,
        padding: 20,
        width: "90%",
        maxWidth: 400,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 24,
        lineHeight: 24,
    },
    formContainer: {
        marginTop: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "left",
    },
    subtitle: {
        color: "#666",
        fontSize: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    subtitleText: {
        color: "#999",
        fontSize: 14,
        textAlign: "left",
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
        marginBottom: 16,
    },
    inputFocused: {
        borderColor: "#fff",
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: "#F2B916",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    linkContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    linkSignUp: {
        color: "#F2B916",
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
    },
    linkForgot: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
    },
    link: {
        color: "#F2B916",
        fontSize: 14,
        textAlign: "center",
        marginTop: 20,
    },
});

export default AuthModal;
