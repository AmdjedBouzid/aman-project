import React from "react";
import Password from "../../components/componentScreen/RegisterScreen/password";
import { LanguageProvider } from "../../context/LanguageContext";

export default function PasswordAuthScreen() {
  return (
    <LanguageProvider>
      <Password />
    </LanguageProvider>
  );
}
