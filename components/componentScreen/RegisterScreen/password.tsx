"use client";

import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useRouter } from "expo-router";

import { auth } from "@/utils/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/LanguageContext";
import { useThemeColors } from "../../../utils/colors";
import i18n from "../../../utils/i18n";
import { getLanguage, getModeScreen } from "../../../utils/serviceAutorisation";

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirme_password, setConfirmePassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const router = useRouter();
  const { language, setUser } = useLanguage();
  const { t } = useTranslation();
  const COLORS = useThemeColors(mode);

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

  const handleSignIn = async () => {
    try {
      setSignIn(true);
      if (!confirme_password || !password) {
        Alert.alert(t("alerts.error"), t("userInfo.fillAllFields"), [
          { text: "OK" },
        ]);
        return;
      }

      if (confirme_password !== password) {
        Alert.alert(t("alerts.error"), t("password.passwordsDoNotMatch"), [
          { text: "OK" },
        ]);
        return;
      }
      //get email from async storage
      const email = await AsyncStorage.getItem("email");
      console.log("Email from AsyncStorage:", email);
      console.log("password:", password);
      if (!email) {
        Alert.alert(t("alerts.error"), "Something went wrong", [
          { text: "OK" },
        ]);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      await AsyncStorage.setItem(
        "information",
        JSON.stringify({
          email: userCredential.user.email,
          password: password,
        })
      );
      router.push("/(tabs)/explore");
      console.log("User created:", userCredential.user);
      setSignIn(false);
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert(t("alerts.error"), t("password.errorCreatingUser"), [
        { text: "OK" },
      ]);
      setSignIn(false);
    }
  };

  return (
    <ThemeProvider value={mode === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: COLORS.background }]}
      >
        <KeyboardAvoidingView
          style={styles.container2}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View
            style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}
          >
            <Ionicons name="leaf" size={32} color="white" />
          </View>
          <TouchableOpacity style={styles.logo}>
            <Text style={[styles.logoText, { color: COLORS.text }]}>
              {t("password.title")}
            </Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputPasswordContainer,
                { backgroundColor: COLORS.inputs },
              ]}
            >
              <TextInput
                style={[
                  styles.inputPassword,
                  {
                    color: COLORS.text,
                  },
                ]}
                onChangeText={(text) => setPassword(text)}
                placeholder={t("password.passwordPlaceholder")}
                value={password.toString()}
                secureTextEntry={seePassword}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity
                onPress={() => setSeePassword(!seePassword)}
                style={{ marginRight: 10 }}
              >
                {seePassword ? (
                  <FontAwesome name="eye-slash" size={24} color={COLORS.text} />
                ) : (
                  <FontAwesome5 name="eye" size={24} color={COLORS.text} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputPasswordContainer,
                { backgroundColor: COLORS.inputs },
              ]}
            >
              <TextInput
                style={[
                  styles.inputPassword,
                  {
                    color: COLORS.text,
                  },
                ]}
                onChangeText={(text) => setConfirmePassword(text)}
                placeholder={t("password.confirmPasswordPlaceholder")}
                value={confirme_password.toString()}
                secureTextEntry={seePassword}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity
                onPress={() => setSeePassword(!seePassword)}
                style={{ marginRight: 10 }}
              >
                {seePassword ? (
                  <FontAwesome name="eye-slash" size={24} color={COLORS.text} />
                ) : (
                  <FontAwesome5 name="eye" size={24} color={COLORS.text} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onPress={handleSignIn}
          >
            {signIn ? (
              <Text style={styles.buttonText}>
                <FontAwesome
                  name="spinner"
                  size={22}
                  style={{ marginRight: 15 }}
                />
              </Text>
            ) : (
              <Text style={styles.buttonText}>{t("password.signIn")}</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => router.push("/(auth)/RegisterScreen")}>
          <Text
            style={{
              color: COLORS.secondary,
            }}
          >
            {t("password.signIn")}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    marginBottom: 35,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "500",
  },
  inputContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    height: 200,
  },
  input: {
    width: 360,
    height: 50,
    marginTop: 15,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
  },
  inputPassword: {
    width: 300,
    height: 50,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: 15,
  },
  inputPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 360,
    borderRadius: 5,
    height: 50,
    marginTop: 15,
    paddingRight: 17,
  },
  forgotPassword: {
    marginTop: 15,
    paddingLeft: 215,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    padding: 15,
    width: 350,
    margin: 20,
    borderRadius: 5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  or: {
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
  login: {
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  Line: {
    width: 120,
    height: 3,
    backgroundColor: "#ffffff0d",
    marginLeft: 10,
    marginRight: 20,
  },
  imageReseau: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 15,
  },
});
