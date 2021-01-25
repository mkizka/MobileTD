import React from "react";
import { ScrollView } from "react-native";
import { Column } from "./components/Column";
import { TweetDeckState } from "../observer";

type Props = {
  deck: TweetDeckState | null;
};

export const MobileTDView: React.FC<Props> = ({ deck }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    >
      {deck?.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </ScrollView>
  );
};
