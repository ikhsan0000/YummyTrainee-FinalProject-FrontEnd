import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "../../components";

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: ()=> void
}

const Subslide = ({ subtitle, description, last, onPress }: SubslideProps) => {

    return (
    <View style={styles.container}>
      <Text variant="title2" style={styles.subtitle}>{subtitle}</Text>
      <Text variant="body" style={styles.description}>{description}</Text>
      <Button
        label={last ? "Let's get started" : "Next"}
        variant={last ? "primary" : "default"}
        {...{onPress}}
      />
    </View>
  );
};

export default Subslide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "white"
  },
  subtitle: {
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 40,
  },
});
