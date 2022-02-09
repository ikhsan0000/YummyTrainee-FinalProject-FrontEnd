import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Box } from "../../components/Theme";
import Category from "./Category";
const categories = [
  {
    id: "all",
    title: "All Product",
    color: "#FFDDDD",
  },
  {
    id: "sports-wear",
    title: "Sports Wear",
    color: "#BEECC4",
  },
  {
    id: "casual-wear",
    title: "Casual Wear",
    color: "#BFEAF5",
  },
  {
    id: "formal-wear",
    title: "Formal Wear",
    color: "#F1E0FF",
  }
];

interface CategoriesProps {
  onCategoryChange: (title:string) => void;
}

const Categories = ({ onCategoryChange }: CategoriesProps) => {
  return (
    <Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Category key={category.id} category={category} onCategoryChange={onCategoryChange}/>
        ))}
      </ScrollView>
    </Box>
  );
};

export default Categories;
