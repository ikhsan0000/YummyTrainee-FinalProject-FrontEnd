import React from 'react'
import { View } from 'react-native'
import {Feather as Icon } from '@expo/vector-icons'
import theme, { Box, Theme } from '../../components/Theme'


interface RoundedIconProps {
    name: string;
    size: number;
    color: keyof Theme["colors"];
    backgroundColor: keyof Theme["colors"];
}


const RoundedIcon = ({name, size, color, backgroundColor}:RoundedIconProps) => {
    return (
        <Box paddingHorizontal="m">
            <Box
              borderRadius="m"
              height={size}
              width={size}
              backgroundColor={backgroundColor}
              alignItems="center"
              justifyContent="center"
            >
              <Icon name={name} color={color} size={size * 0.8} />
            </Box>
          </Box>
    )
}

export default RoundedIcon
