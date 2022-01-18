import React, { useState } from "react";
import { Box, Text } from "../../../components/Theme";
import { Feather as Icon } from "@expo/vector-icons";
import { BorderlessButton} from "react-native-gesture-handler";

interface ChecboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <BorderlessButton rippleColor="rgba(0,0,0,0)" onPress={() => setChecked((c) => !c)} style={{justifyContent: 'center'}}>
      <Box flexDirection="row" alignItems="center">
        <Box
          height={20}
          width={20}
          marginRight="m"
          borderColor="primary"
          borderWidth={1}
          borderRadius="s"
          justifyContent="center"
          alignItems="center"
          backgroundColor={checked ? "primary" : "white"}
        >
          <Icon name="check" color="white"/>
        </Box>
        <Text vairant="button" >{label}</Text>
      </Box>
    </BorderlessButton>
  );
};

export default Checkbox;
