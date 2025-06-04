import React, { Component } from 'react'
import { LanguageProvider } from "../../context/LanguageContext";
import SettingsScreen from '../../components/componentScreen/setting/settingscreenwrap'

export default function setting () {
    return (
       <LanguageProvider>
                 <SettingsScreen/>
             </LanguageProvider>
    )
}
