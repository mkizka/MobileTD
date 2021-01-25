import React, { MutableRefObject } from "react";
import { ScrollView } from "react-native";
import WebView from "react-native-webview";

import { TweetDeckState } from "../observer";
import { Column } from "./components/Column";

type Props = {
  webviewRef: MutableRefObject<WebView | null>;
  deck: TweetDeckState | null;
};

export const MobileTDView: React.FC<Props> = ({ webviewRef, deck }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    >
      {deck?.columns.map((column) => (
        <Column key={column.id} webviewRef={webviewRef} column={column} />
      ))}
    </ScrollView>
  );
};
