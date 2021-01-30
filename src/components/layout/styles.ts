import { StyleSheet } from "react-native";

export const layoutStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  columns: {
    flexDirection: "row",
  },
  leftColumn: {
    width: 50,
  },
  rightColumn: {
    flex: 1,
  },
});
