import React from "react";
import Register from "../../components/componentScreen/RegisterScreen/Register";
import { LanguageProvider } from "../../context/LanguageContext";

export default function RegisterScreen() {
  return (
    <LanguageProvider>
      <Register />
    </LanguageProvider>
  );
}
