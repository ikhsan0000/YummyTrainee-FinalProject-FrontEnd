import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Slide, { SLIDER_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";

import { theme } from "../../components";
import { AuthNavigationProps } from "../../components/Navigation";

const { width } = Dimensions.get("window");
const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description: "Confused about outfits? dont worry",
    color: "#BFEAF5",
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description: "Explore hundreds of ...",
    color: "#BEECC4",
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description: "Create you individual unique style",
    color: "#FFE4D9",
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description: "Discover the latest trends",
    color: "#FFDDDD",
  },
];

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const scroll = React.createRef();
  const x = useSharedValue(0);

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const colorInterpolated = interpolateColor(
      x.value,
      [0, width, width * 2, width * 3],
      ["#BFEAF5", "#BEECC4", "#FFE4D9", "#FFDDDD"]
    );
    return { backgroundColor: colorInterpolated };
  });

  const animatedSubslider = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -x.value }],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
  });


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedBackgroundColor]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={scrollHandler}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }}></Slide>
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <Animated.View style={styles.footer}>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            animatedBackgroundColor,
          ]}
        />

        <View style={styles.footerContent}>
          
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot
                key={index}
                sharedValue={x}
                // currentIndex={x.value / width}
                {...{ index, x }}
              />
            ))}
          </View>

          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: width * slides.length,
              },
              animatedSubslider,
            ]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;

              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if(last){
                      navigation.navigate("Welcome")
                    } else {
                      if (scroll.current) {
                        scroll.current.scrollTo({
                          x: width * (index + 1),
                          animated: true,
                        });
                      }
                    }
                  }}
                  subtitle={subtitle}
                  description={description}
                  last={last}
                ></Subslide>
              )
            })}
          </Animated.View>

        </View>

      </Animated.View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDER_HEIGHT,
    backgroundColor: "cyan",
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    flexDirection: "row",
    height: theme.borderRadii.xl,
    justifyContent: "center",
    alignItems: "center",
  },
});
