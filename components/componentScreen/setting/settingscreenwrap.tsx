"use client"

import React, { useEffect, useState } from "react"
import { View,  StyleSheet, ScrollView, Platform, Alert, StatusBar, SafeAreaView } from "react-native"
import LanguageOptions from './languge'
import ModeScreen from './modedarkligt'
import Autorization from './autoriasation'
import Lougout from './Lougout'
import Account from './profile'
import Header from './header'
import { useThemeColors } from "@/utils/colors"
import { useLanguage } from "@/context/LanguageContext"
import { useTranslation } from "react-i18next"
import { getLanguage, getModeScreen } from "../../../utils/serviceAutorisation";
import i18n from "@/utils/i18n" 

const SettingsScreen: React.FC = () => {
 const { language } = useLanguage(); 
 const [mode, setMode] = useState<"light" | "dark">("light");
 useEffect(()=>{
  console.log("SettingsScreen:",language);
 },[language])
  const { t } = useTranslation();
  useEffect(()=>{
   console.log("SettingsScreen:",language);
  },[language])
   useEffect(() => {
     const fetchMode = async () => {
       const modeFromStorage:any = await getModeScreen();
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
   const COLORS = useThemeColors(mode);
  return (

    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <Header/>
      <View style={{height:60}}/>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={[styles.container, { backgroundColor: COLORS.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}


        {/* Account Section */}
 <Account/>
        {/* Language Section */}
          
           <LanguageOptions />
       
     

        {/* Appearance Section */}
       <ModeScreen/>

        {/* Notifications Section */}
              <Autorization/>

        {/* Logout Button */}
                   <Lougout/>

        {/* Bottom padding */}
          <View style={styles.bottomPadding} />
      </ScrollView>

    </SafeAreaView>

  )
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  bottomPadding: {
    height: 40,
  },
})

export default SettingsScreen

