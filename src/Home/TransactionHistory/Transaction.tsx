import { View } from "react-native";
import React from "react";
import { DataPoint } from "./Graph";
import { Box, Text } from "../../components/Theme";
import moment from "moment";

interface TransactionProps {
  transaction: DataPoint;
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <Box
      marginTop="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box flexDirection="row" alignItems="center">
          <Box
            backgroundColor="primary"
            marginRight="s"
            style={{ width: 10, height: 10, borderRadius: 5 }}
          />
          <Text variant="title3">TransactionID#{transaction.id}</Text>
        </Box>
        <Text color="darkGrey">{`$${transaction.totalPrice} - ${moment(transaction.date).format("DD MMM, YYYY")}`}</Text>
      </Box>
      <Box>
        <Text color="secondary" variant="button">See more</Text>
      </Box>
    </Box>
  );
};

export default Transaction;
