import { TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { DataPoint } from "./Graph";
import { Box, Text } from "../../components/Theme";
import moment from "moment";


const Transaction = ({ transaction, navigation }: any) => {
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
        <Text color="darkGrey">{`$${transaction.value} - ${moment(transaction.date).format("DD MMM, YYYY")}`}</Text>
      </Box>
      <Box>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("TransactionHistoryDetail", {transaction: transaction})}>
          <Text color="secondary" variant="button">See more</Text>
        </TouchableWithoutFeedback>
      </Box>
    </Box>
  );
};

export default Transaction;
