import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { BackHandler, FlatList, TouchableOpacity } from "react-native";
import { Header } from "../../components";
import { Box, Text } from "../../components/Theme";
import ProductCardHistory from "./ProductCardHistory";

const TransactionHistoryDetail = ({ route, navigation }: any) => {
  const { transaction } = route.params;

  // Back Button Handler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = (): any => {
        navigation.navigate("TransactionHistory");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  // Flatlist Render
  const renderItem = ({ item }: any) => {
    return (
      <Box flex={1} marginTop="l">
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetail", {
              product: item,
              favorite: true,
            })
          }
        > */}
        <ProductCardHistory product={item} />
        {/* </TouchableOpacity> */}
      </Box>
    );
  };

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="transaction history"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        // right={{ icon: "share", onPress: () => true }}
      />

      <Box padding="m" flex={0.1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Text variant="header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">${transaction.value}</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="m" padding="s">
            <Text color="primary">
              {transaction && moment(transaction.date).format("DD MMM, YYYY")}
            </Text>
          </Box>
        </Box>

        <Text variant="header" color="darkGrey" style={{ marginTop: -10 }}>
          Transaction #{transaction.id}
        </Text>
      </Box>

      <Box padding="m" flex={0.9}>
        <Text variant="title3">Bought on this day: </Text>
        <Box width='100%' height={1} backgroundColor="primary" />
        <FlatList
          data={transaction && transaction.transactionItems}
          renderItem={renderItem}
        ></FlatList>
      </Box>
    </Box>
  );
};

export default TransactionHistoryDetail;
