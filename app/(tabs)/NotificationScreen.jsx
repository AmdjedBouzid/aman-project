
import { LanguageProvider } from "../../context/LanguageContext";
import NotificationsScreen from '../../components/componentScreen/Notification/NotificationScreenwrap'
export default function Notifications () {
    return (
        <LanguageProvider>
            <NotificationsScreen/>
        </LanguageProvider>
     
    )
  }

