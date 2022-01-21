import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "../../components/Theme";
import Card, { CardType } from "./Card";
import { useTheme } from "@shopify/restyle";
import AddCard from "./AddCard";
import { CARD_HEIGHT } from "./CardLayout";
import { Button } from "../../components";
import { useNavigation } from "@react-navigation/native";

const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: 1234,
    expiration: "05/24",
  },
  {
    id: 2,
    type: CardType.MASTERCARD,
    last4Digits: 4356,
    expiration: "07/25",
  },
];

interface LineItemProps {
  label: string;
  value: number;
}

const LineItem = ({ label, value }: LineItemProps) => {
  return (
    <Box flexDirection="row" paddingTop="s">
      <Box flex={1}>
        <Text color="white" variant="title3">
          {label}
        </Text>
      </Box>
      <Box>
        <Text color="primary" variant="title3">
          ${value}
        </Text>
      </Box>
    </Box>
  );
};

interface CheckoutProps {
  minHeight: number;
}

const Checkout = ({ minHeight }: CheckoutProps) => {
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const navigation = useNavigation();

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <Box flex={1} padding="m">
        <Box height={CARD_HEIGHT}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <AddCard />
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card.id}
                onSelect={() => setSelectedCard(card.id)}
              />
            ))}
          </ScrollView>
        </Box>

        <Box paddingVertical="m">
          <Text color="white" variant="title3">
            Delivery Address
          </Text>
          <Box flexDirection="row" opacity={0.5} paddingVertical="m">
            <Box flex={1}>
              <Text color="white">1545 Blvd. Cote-Vertu Ouest</Text>
              <Text color="white">Montreal, Quebec</Text>
            </Box>
  
            <TouchableWithoutFeedback onPress={() => navigation.navigate("EditProfile")}>
              <Box justifyContent="center" alignItems="center">
                <Text color="white">Change</Text>
              </Box>
            </TouchableWithoutFeedback>
          </Box>

          <LineItem label="Total Items (6)" value={189.94} />
          <LineItem label="Standard Delivery" value={12.0} />
          <LineItem label="Total Payment" value={201.84} />
        </Box>

        <Box
          paddingVertical="s"
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            label="Pay for $201.84"
            variant="primary"
            onPress={() => true}
          />
        </Box>

      </Box>
    </Box>
  );
};

export default Checkout;
