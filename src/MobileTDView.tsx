import React from "react";
import { ScrollView } from "react-native";
import { Tweet } from "./components/Tweet";
import { TweetDeckState } from "../observer/dist";

export const MobileTDView: React.FC<{ deck: TweetDeckState | null }> = ({
  deck,
}) => {
  return (
    <ScrollView style={{ display: deck != null ? "flex" : "none"}}>
      {deck?.columns[0].tweets.map((tweet, i) => (
        <Tweet key={i} tweet={tweet} />
      ))}
    </ScrollView>
  );
};
