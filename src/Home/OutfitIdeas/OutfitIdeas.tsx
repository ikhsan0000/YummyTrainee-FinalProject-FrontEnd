import React, { useContext, useState } from "react";
import { View } from "react-native";
import { sub, useDerivedValue } from "react-native-reanimated";
import { useTiming } from "react-native-redash";

import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import Background from "./Background";
import Card from "./Card";
import Categories from "./Categories";

const cards = [
  {
    index: 3,
    source: require("./assets/person/5.png")
  },
  {
    index: 2,
    source: require("./assets/person/1.png")
  },
  {
    index: 1,
    source: require("./assets/person/4.png")
  },
  {
    index: 0,
    source: require("./assets/person/3.png")
  },
];

const step = 1 / (cards.length - 1);

const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const aIndex = useTiming(currentIndex);

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="outfit ideas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-cart", onPress: () => navigation.navigate("Cart") }}
      />

      <Box flex={1}>
        <Background />

        <Categories />

        {/* {cards.map(
          ({ index, source }) =>
            currentIndex < index * step + step && (
              <Card
                key={index}
                index={index}
                aIndex={aIndex}
                step={step}
                source={source}
                onSwipe={() => setCurrentIndex((prev) => prev + step)}
              />
            )
        )} */}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
