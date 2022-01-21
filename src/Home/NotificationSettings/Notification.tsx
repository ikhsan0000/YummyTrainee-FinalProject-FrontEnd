import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";
import { Switch } from "react-native";
import { Box, Text } from "../../components/Theme";

interface NotificationProps {
  title: string;
  description: string;
}

const Notification = ({ title, description }: NotificationProps) => {
  const { colors } = useTheme();
  const [toggled, setToggled] = useState(false);

  return (
    <Box flexDirection="row" marginBottom="m">
      <Box flex={1} justifyContent="center">
        <Text variant="title3">{title}</Text>
        <Text variant="body">{description}</Text>
      </Box>
      <Box paddingVertical="m">
        <Switch
          value={toggled}
          onValueChange={setToggled}
          trackColor={{ true: colors.primary, false: colors.grey }}
        />
      </Box>
    </Box>
  );
};

export default Notification;