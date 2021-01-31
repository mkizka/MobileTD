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
  rightColumnHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  accountLink: {
    flexDirection: "row",
  },
  userName: {
    fontWeight: "bold",
    marginRight: 2,
  },
  textMute: {
    color: "grey",
    fontSize: 14,
  },
  time: {
    marginLeft: "auto",
  },
});
