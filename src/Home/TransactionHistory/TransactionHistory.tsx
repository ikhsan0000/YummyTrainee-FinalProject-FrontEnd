import { View } from "react-native";
import React from "react";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Graph, { DataPoint } from "./Graph/Graph";

const data: DataPoint[] = [
  {
    date: new Date("2019-10-01").getTime(),
    value: 0,
    color: "primary"
  },
  {
    date: new Date("2019-11-01").getTime(),
    value: 0,
    color: "primary"
  },
  {
    date: new Date("2019-12-01").getTime(),
    value: 139.42,
    color: "primary"
  },
  {
    date: new Date("2020-01-01").getTime(),
    value: 0,
    color: "primary"
  },
  {
    date: new Date("2020-02-01").getTime(),
    value: 281.23,
    color: "danger"
  },
  {
    date: new Date("2020-03-01").getTime(),
    value: 198.54,
    color: "violet"
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
      <Box padding="m">
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

        <Graph data={data} />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
