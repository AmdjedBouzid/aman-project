import React from 'react'
import DashboardScreen from '../../components/componentScreen/Dashboard/dashboardScreenwrap'
import { LanguageProvider } from "../../context/LanguageContext";

export default function index () {
    return (
        <LanguageProvider>
            <DashboardScreen/>
        </LanguageProvider>
    )
  }

