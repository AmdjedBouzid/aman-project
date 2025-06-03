import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../utils/colors";
const Card = ({ children, style }: any) => {
  const color: any = useThemeColors;
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: color("dark").card,
          borderColor: color("dark").border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
});
export default Card;
