import { ScrollView, View } from "react-native";
import React from "react";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Graph, { DataPoint } from "./Graph/Graph";
import Transaction from "./Transaction";

const startDate = new Date("2019-01-01").getTime()
const numberOfMonths = 6

const data: DataPoint[] = [
  {
    date: new Date("2019-02-01").getTime(),
    value: 139.42,
    color: "primary",
    id: 254156
  },
  {
    date: new Date("2019-04-01").getTime(),
    value: 281.23,
    color: "danger",
    id: 254157
  },
  {
    date: new Date("2019-05-01").getTime(),
    value: 198.54,
    color: "violet",
    id: 254158
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="transaction history"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "share", onPress: () => true }}
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
            <Text variant="title1">$999,99</Text>
          </Box>
          <Box backgroundColor="primaryLight" borderRadius="m" padding="s">
            <Text color="primary">All time</Text>
          </Box>
        </Box>

        <Graph data={data} startDate={startDate} numberOfMonths={numberOfMonths} />
        <ScrollView>
          {data.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>

      </Box>
    </Box>
  );
};

export default TransactionHistory;
