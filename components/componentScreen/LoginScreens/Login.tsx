"use client";

import { useLanguage } from "@/context/LanguageContext";
import { auth } from "@/utils/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColors } from "../../../utils/colors";
import i18n from "../../../utils/i18n";
import { getLanguage, getModeScreen } from "../../../utils/serviceAutorisation";
interface SignInScreenProps {
  navigation: any;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { t } = useTranslation();
  const router = useRouter();
  const { language, setUser } = useLanguage();
  // Fetch theme mode from storage
  useEffect(() => {
    const fetchMode = async () => {
      const modeFromStorage: any = await getModeScreen();
      if (modeFromStorage && modeFromStorage !== mode) {
        setMode(modeFromStorage);
      }
    };

    fetchMode();

    const fetchLanguage = async () => {
      const lang = await getLanguage();
      if (lang && lang !== i18n.language) {
        i18n.changeLanguage(lang);
      }
    };

    fetchLanguage();
  }, []);

  // Get colors based on current theme mode
  const COLORS = useThemeColors(mode);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t("signUp.emailRequired"));
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError(t("signUp.emailInvalid"));
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError(t("signUp.passwordRequired"));
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async () => {
    try {
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);

      if (!isEmailValid || !isPasswordValid) {
        return;
      }

      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      setUser(userCredential.user);
      setIsLoading(false);
      router.push("/(tabs)/explore");
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: COLORS.background }]}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo and Header */}
          <View style={styles.logoContainer}>
            <View
              style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}
            >
              <Ionicons name="leaf" size={32} color="white" />
            </View>
            <Text style={[styles.appName, { color: COLORS.text }]}>Aman</Text>
            <Text style={[styles.welcomeText, { color: COLORS.text }]}>
              {t("signUp.welcomeBack")}
            </Text>
            <Text
              style={[styles.subtitleText, { color: COLORS.textSecondary }]}
            >
              {t("signUp.signInToAccount")}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: COLORS.text }]}>
                {t("signUp.email")}
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: emailError ? COLORS.danger : COLORS.border,
                    backgroundColor: COLORS.inputs,
                  },
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.icons}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: COLORS.text }]}
                  placeholder={t("signUp.emailPlaceholder")}
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) validateEmail(text);
                  }}
                />
              </View>
              {emailError ? (
                <Text style={[styles.errorText, { color: COLORS.danger }]}>
                  {emailError}
                </Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: COLORS.text }]}>
                  {t("signUp.password")}
                </Text>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: passwordError ? COLORS.danger : COLORS.border,
                    backgroundColor: COLORS.inputs,
                  },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.icons}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: COLORS.text }]}
                  placeholder={t("signUp.passwordPlaceholder")}
                  placeholderTextColor={COLORS.textSecondary}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={COLORS.icons}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={[styles.errorText, { color: COLORS.danger }]}>
                  {passwordError}
                </Text>
              ) : null}
            </View>

            {/* Remember Me Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: COLORS.border,
                    backgroundColor: rememberMe
                      ? COLORS.primary
                      : "transparent",
                  },
                ]}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={[styles.checkboxLabel, { color: COLORS.text }]}>
                {t("signUp.rememberMe")}
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.signInButton, { backgroundColor: COLORS.primary }]}
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.signInButtonText}>
                  {t("signUp.signIn")}
                </Text>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text
                style={[styles.signUpText, { color: COLORS.textSecondary }]}
              >
                {t("signUp.dontHaveAccount")}{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/RegisterScreen")}
              >
                <Text style={[styles.signUpLink, { color: COLORS.primary }]}>
                  {t("signUp.signUp")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginTop: 29,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  signInButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
