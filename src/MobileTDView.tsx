import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Column } from "./components/Column";
import { TweetDeckState } from "../observer";

const Tab = createMaterialTopTabNavigator();

export const MobileTDView: React.FC<{ deck: TweetDeckState | null }> = ({
  deck,
}) => {
  return (
    <Tab.Navigator>
      {deck?.columns.map((column, i) => (
        <Tab.Screen
          key={i}
          name={i.toString()}
        >
          {() => <Column column={column} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};
