import React, { useState } from "react";
import { View } from "react-native";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import Background from "./Background";
import Card from "./Card";


const cards = [
    { 
        index: 3
    },
    { 
        index: 2
    },
    { 
        index: 1
    },
    { 
        index: 0
    }
]

const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  
const [currentIndex, setCurrentIndex] = useState(0)
    
    return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="outfit ideas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />

        <Box flex={1}>
            <Background />
            <Card position={1} />
            <Card position={0.5} />
            <Card position={0} />
        </Box>

    </Box>
  );
};

export default OutfitIdeas;
