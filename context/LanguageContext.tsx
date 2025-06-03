import { auth } from "@/utils/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  emailToRegister: string | null;
  setEmailToRegister: (email: string | null) => void;
}
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>("en");
  const [user, setUser] = useState<User | null>(null);
  const [emailToRegister, setEmailToRegister] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        user,
        setUser,
        emailToRegister,
        setEmailToRegister,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
