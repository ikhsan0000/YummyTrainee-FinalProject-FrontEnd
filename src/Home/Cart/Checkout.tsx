import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "../../components/Theme";
import Card, { CardType } from "./Card";
import { useTheme } from "@shopify/restyle";
import AddCard from "./AddCard";
import { CARD_HEIGHT } from "./CardLayout";
import { Button } from "../../components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { TransactionContext } from "../../services/transaction/transaction.context";
import { ProfileContext } from "../../services/profile/profile.context";
import ModalBox from "../../components/Modal";
import ModalButtons from "./ModalButton";

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
  cartDetail: any;
}

const Checkout = ({ minHeight, cartDetail }: CheckoutProps) => {
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const navigation = useNavigation();
  const { createTransaction, isLoading }: any = useContext(TransactionContext);
  const { profile }: any = useContext(ProfileContext);

  const totalItem = `Total Items (${cartDetail.length})`;
  const shippingFee = 4;
  let totalPrice = 0;
  cartDetail.forEach((item: any) => {
    totalPrice += item.product.price * item.quantity;
  });

  const totalPaymentLabel = `Pay for $${totalPrice + shippingFee}`;
  const totalPayment = totalPrice + shippingFee;

  const dataTransaction = {
    address: profile && profile.address,
    totalPrice: totalPayment,
    shippingFee,
  };

  // modal handling
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    navigation.navigate("OutfitIdeas")
  };

  const onSubmit = async () => {
    try {
      await createTransaction(dataTransaction);
      setShowModal(true)
    } catch {
      navigation.dispatch(
        StackActions.replace("Authentication", { screen: "Login" })
      );
    }
  };

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <ModalBox
        trigger={showModal}
        closeModal={closeModal}
        label="Transaction Successfull"
        buttons={<ModalButtons closeModal={closeModal} />}
      />

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
              <Text color="white">{profile && profile.address}</Text>
            </Box>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Box justifyContent="center" alignItems="center">
                <Text color="white">Change</Text>
              </Box>
            </TouchableWithoutFeedback>
          </Box>

          <LineItem label={totalItem} value={totalPrice} />
          <LineItem label="Standard Delivery" value={shippingFee} />
          <LineItem label="Total Payment" value={totalPrice + shippingFee} />
        </Box>

        <Box
          paddingVertical="s"
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            label={totalPaymentLabel}
            isLoading={isLoading}
            variant="primary"
            onPress={() => onSubmit()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
