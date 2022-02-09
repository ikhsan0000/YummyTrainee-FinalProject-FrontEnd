import { Dimensions, View } from "react-native";
import React, { Children, ReactNode, useState } from "react";
import { Box, Text } from "../../components/Theme";
import { RectButton } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTiming } from "react-native-redash";

const { width } = Dimensions.get("window");

interface Tab {
  id: string;
  title: string;
}

interface TabsProps {
  tabs: Tab[];
  children: ReactNode;
}

const Tabs = ({ tabs, children }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [index, setIndex] = useState(0);
  const transition = useTiming(index);

  const onPressConfig = (tab:Tab, index: number) => {
    setSelectedTab(tab)
    setIndex(index)
  }

  const contentAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: -width * transition.value }],
  }));

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        {tabs.map((tab, index) => (
          <RectButton key={index}  style={{ flex: 1 }} onPress={() => onPressConfig(tab, index)}>
            <Box
              key={tab.id}
              padding="m"
              opacity={tab == selectedTab ? 1 : 0.5}
            >
              <Text variant="title3" textAlign="center">
                {tab.title}
              </Text>
            </Box>
          </RectButton>
        ))}
      </Box>

      <Animated.View
        style={[{ width: width * tabs.length, flexDirection: "row"}, contentAnimation]}
      >
        {Children.map(children, (child, index) => (
          <Box flex={1} key={index} width={width}>
            {child}
          </Box>
        ))}
      </Animated.View>
    </Box>
  );
};

export default Tabs;
