import { ScrollView, View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Graph, { DataPoint } from "./Graph/Graph";
import Transaction from "./Transaction";
import TopCurve from "./TopCurve";
import { TransactionContext } from "../../services/transaction/transaction.context";
import { StackActions } from "@react-navigation/native";

const aspectRatio = 6;

const footerHeight = Dimensions.get("window").width / 6;

const numberOfMonths = 6;

const data: DataPoint[] = [
  {
    date: new Date("2019-02-01").getTime(),
    value: 139.42,
    color: "primary",
    id: 254156,
  },
  {
    date: new Date("2019-03-01").getTime(),
    value: 200,
    color: "primary",
    id: 254114,
  },
  {
    date: new Date("2019-04-01").getTime(),
    value: 281.23,
    color: "danger",
    id: 254157,
  },
  {
    date: new Date("2019-05-01").getTime(),
    value: 198.54,
    color: "orange",
    id: 254158,
  },
  {
    date: new Date("2019-06-01").getTime(),
    value: 50.55,
    color: "primary",
    id: 254152,
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  // Transaction Context
  const { getTransactions, isLoading }: any = useContext(TransactionContext);

  const [history, setHistory] = useState([{}]);

  useEffect(async () => {
    try {
      const retriveTransactionHistory = await getTransactions();
      setHistory(retriveTransactionHistory.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  let totalSpent = 0;
  history.forEach((transaction) => {
    totalSpent += transaction.totalPrice;
  });

  let formattedHistory: any[] = [];

  if (history.length !== 0) {
    history.forEach(({ createdAt, totalPrice, ...rest }) => {
      formattedHistory.push({
        date: new Date(createdAt).getTime(),
        value: totalPrice,
        ...rest,
      });
    });
  }

  if (formattedHistory.length > 0) {
    const startDate = formattedHistory[0].createdAt;
  }

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="transaction history"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        // right={{ icon: "share", onPress: () => true }}
      />
      <Box padding="m" flex={1}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Text variant="header" color="secondary" opacity={0.3}>
              TOTAL SPENT
            </Text>
            <Text variant="title1">${totalSpent >= 0 && totalSpent}</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="m" padding="s">
            <Text color="primary">All time</Text>
          </Box>
        </Box>
        {/* <Graph
          data={data}
          startDate={startDate}
          numberOfMonths={numberOfMonths}
        /> */}

        <ScrollView
          contentContainerStyle={{ paddingBottom: footerHeight }}
          showsVerticalScrollIndicator={false}
        >

          {formattedHistory.map((transaction, i) => (
            <Transaction
              key={i}
              transaction={transaction}
              navigation={navigation}
            />
          ))}
          
        </ScrollView>
      </Box>
      <TopCurve footerHeight={footerHeight} />
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        aspectRatio={aspectRatio}
      >
        <Image
          style={styles.footer}
          source={require("../../components/assets/patterns/2.png")}
        />
      </Box>
    </Box>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 75,
  },
});
