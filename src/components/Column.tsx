import React from "react";
import { ColumnSection } from "../../observer";

import { ScrollView } from "react-native";
import { Tweet } from "./Tweet";

export const Column: React.FC<{ column: ColumnSection }> = ({ column }) => {
  return (
    <ScrollView>
      {column.tweets.map((tweet, i) => (
        <Tweet key={i} tweet={tweet} />
      ))}
    </ScrollView>
  );
};
